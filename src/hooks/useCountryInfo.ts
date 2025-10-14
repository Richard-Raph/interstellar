// src/hooks/useCountryInfo.ts

import { useState, useEffect, useCallback } from 'react';
import type { Country, ResolvedBorder } from '../types/country'; 
import { getCountryByCode, getBordersByCodes } from '../api/countries'; 

// --- Interface for the Hook's Return Value (Country Detail) ---
/**
 * CORRECTED: We use Omit<Country, 'borders'> to remove the original 
 * 'borders?: string[]' property first, and then manually define it 
 * with the new 'ResolvedBorder[]' type.
 */
export interface CountryDetail extends Omit<Country, 'borders'> {
    borders: ResolvedBorder[]; // ✅ Now correctly defined as ResolvedBorder[]
}

// Simple in-memory cache for country details
const countryCache: Record<string, CountryDetail> = {};

// --- The Custom Hook ---
export function useCountryInfo(code: string | undefined) {
    const [country, setCountry] = useState<CountryDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchCountryData = useCallback(async (countryCode: string) => {
        setIsLoading(true);
        setIsError(false);

        // 1. Check Cache
        if (countryCache[countryCode]) {
            setCountry(countryCache[countryCode]);
            setIsLoading(false);
            return;
        }

        try {
            // 2. Fetch Primary Country Data
            // We cast mainCountry to ensure TypeScript knows we will resolve the borders later.
            const mainCountry = await getCountryByCode(countryCode);

            // 3. Resolve Border Country Names using the imported utility function
            // We use the 'borders' property from the base Country type here: string[]
            const borderCodes = mainCountry.borders || [];
            let resolvedBorders: ResolvedBorder[] = [];

            if (borderCodes.length > 0) {
                resolvedBorders = await getBordersByCodes(borderCodes); 
            }

            // 4. Combine and Cache
            const detailData: CountryDetail = {
                ...mainCountry,
                // Assign the resolved array to the new 'borders' property
                borders: resolvedBorders, 
            } as CountryDetail; // Final cast to satisfy the assignment to CountryDetail

            countryCache[countryCode] = detailData;
            setCountry(detailData);

        } catch (err) {
            console.error("Fetching country detail failed:", err);
            setIsError(true);
            setCountry(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (code) {
            fetchCountryData(code);
        } else {
            setIsError(true);
            setIsLoading(false);
        }
    }, [code, fetchCountryData]);

    return { country, isLoading, isError };
}
