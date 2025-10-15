import { useState, useEffect, useCallback } from 'react';
import type { Country, ResolvedBorder } from '../types/country';
import { getCountryByCode, getBordersByCodes } from '../api/countries';

export interface CountryDetail extends Omit<Country, 'borders'> {
    borders: ResolvedBorder[];
}

const countryCache: Record<string, CountryDetail> = {};

export function useCountryInfo(code?: string) {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchAttempt, setFetchAttempt] = useState(0);
    const [country, setCountry] = useState<CountryDetail | null>(null);

    const fetchCountryData = useCallback(async (countryCode: string) => {
        setIsError(false);
        setIsLoading(true);

        if (countryCache[countryCode]) {
            setCountry(countryCache[countryCode]);
            setIsLoading(false);
            return;
        }

        try {
            const mainCountry: Country = await getCountryByCode(countryCode);

            const resolvedBorders: ResolvedBorder[] = mainCountry.borders?.length
                ? await getBordersByCodes(mainCountry.borders) : [];

            const detailData: CountryDetail = { ...mainCountry, borders: resolvedBorders };
            countryCache[countryCode] = detailData;
            setCountry(detailData);

        } catch (err) {
            console.error(`Failed fetching country ${countryCode}:`, err);
            setIsError(true);
            setCountry(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refetch = useCallback(() => {
        if (code && countryCache[code]) delete countryCache[code];
        setFetchAttempt(prev => prev + 1);
    }, [code]);

    useEffect(() => {
        if (code) fetchCountryData(code);
        else setIsError(true);
    }, [code, fetchCountryData, fetchAttempt]);

    return { refetch, isError, country, isLoading };
}
