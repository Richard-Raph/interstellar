// src/hooks/useCountryInfo.ts (No changes needed)

import { useState, useEffect, useCallback } from 'react';
import type { Country, ResolvedBorder } from '../types/country';
import { getCountryByCode, getBordersByCodes } from '../api/countries';

// --- Interface for the Hook's Return Value (Country Detail) ---
export interface CountryDetail extends Omit<Country, 'borders'> {
    borders: ResolvedBorder[];
}

// Simple in-memory cache for country details
const countryCache: Record<string, CountryDetail> = {};

// --- The Custom Hook ---
export function useCountryInfo(code: string | undefined) {
    const [country, setCountry] = useState<CountryDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // ✅ Keep fetchAttempt to trigger re-fetch, but don't return/use the constant value
    const [fetchAttempt, setFetchAttempt] = useState(0);

    const fetchCountryData = useCallback(async (countryCode: string) => {
        if (!countryCache[countryCode]) {
            setIsLoading(true);
        }
        setIsError(false);

        // 1. Check Cache
        if (countryCache[countryCode]) {
            setCountry(countryCache[countryCode]);
            setIsLoading(false);
            return;
        }

        try {
            // 2. Fetch Primary Country Data
            const mainCountry: Country = await getCountryByCode(countryCode);

            // 3. Resolve Border Country Names
            const borderCodes = mainCountry.borders || [];
            let resolvedBorders: ResolvedBorder[] = [];

            if (borderCodes.length > 0) {
                resolvedBorders = await getBordersByCodes(borderCodes);
            }

            // 4. Combine and Cache
            const detailData: CountryDetail = {
                ...mainCountry,
                borders: resolvedBorders,
            };

            countryCache[countryCode] = detailData;
            setCountry(detailData);

        } catch (err) {
            console.error(`Fetching country detail for ${countryCode} failed:`, err);
            setIsError(true);
            setCountry(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refetch = useCallback(() => {
        // ✅ Incrementing this state value invalidates the cache for the current country
        // and triggers the useEffect to call fetchCountryData.
        setFetchAttempt(prev => prev + 1);
        if (code && countryCache[code]) {
            delete countryCache[code];
        }
    }, [code]);

    useEffect(() => {
        if (code) {
            // Include fetchAttempt here to trigger a re-fetch when refetch() is called
            fetchCountryData(code);
        } else {
            setIsError(true);
            setIsLoading(false);
        }
    }, [code, fetchCountryData, fetchAttempt]); // ✅ FIX: Added fetchAttempt to dependency array

    return {
        refetch,
        country,
        isError,
        isLoading,
    };
}
