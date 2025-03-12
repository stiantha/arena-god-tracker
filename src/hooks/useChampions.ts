import { useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react';
import { Champion, SortOption, ChampionContextType } from '../types';
import useLocalStorage from './useLocalStorage';
import championService from '../api';

export const useChampions = (localStorageKey: string): ChampionContextType => {
    const [champions, setChampions] = useState<Champion[]>([]);
    const [completedChampionIds, setCompletedChampionIds] = useLocalStorage<number[]>(
        localStorageKey,
        []
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [hideCompleted, setHideCompleted] = useState(false);
    const [hidePending, setHidePending] = useState(false);
    const [sortOption, setSortOption] = useState<SortOption>('name-asc');
    const [isLoading, setIsLoading] = useState(true);

    // Load champions data
    useEffect(() => {
        const fetchChampions = async () => {
            try {
                setIsLoading(true);
                const data = await championService.getChampions();
                setChampions(data);
            } catch (error) {
                console.error('Error fetching champions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChampions();
    }, []);

    // Event handlers with useCallback
    const toggleChampionCompletion = useCallback((championId: number) => {
        setCompletedChampionIds(prev => {
            if (prev.includes(championId)) {
                return prev.filter(id => id !== championId);
            } else {
                return [...prev, championId];
            }
        });
    }, [setCompletedChampionIds]);

    const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, [setSearchTerm]);

    const handleSortChange = useCallback((option: SortOption) => {
        setSortOption(option);
    }, [setSortOption]);

    const toggleHideCompleted = useCallback(() => {
        setHideCompleted(prev => !prev);
    }, [setHideCompleted]);

    const toggleHidePending = useCallback(() => {
        setHidePending(prev => !prev);
    }, [setHidePending]);

    const resetProgress = useCallback(() => {
        if (window.confirm("Reset ALL progress? This cannot be undone.")) {
            setCompletedChampionIds([]);
        }
    }, [setCompletedChampionIds]);


    // Memoized calculations
    const filteredChampions = useMemo(() => {
        let filtered = [...champions];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(champion =>
                champion.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply completion filters
        if (hideCompleted) {
            filtered = filtered.filter(champion => !completedChampionIds.includes(champion.id));
        }

        if (hidePending) {
            filtered = filtered.filter(champion => completedChampionIds.includes(champion.id));
        }

        // Apply sorting
        filtered.sort((a, b) => {
            const [sortBy, direction] = sortOption.split('-');
            const isAsc = direction === 'asc';

            if (sortBy === 'name') {
                return isAsc
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            }

            // Add other sort options as needed
            return 0;
        });

        return filtered;
    }, [champions, searchTerm, hideCompleted, hidePending, completedChampionIds, sortOption]);

    const progressPercentage = useMemo(() => {
        return champions.length > 0
            ? (completedChampionIds.length / champions.length) * 100
            : 0;
    }, [champions.length, completedChampionIds.length]);

    return {
        champions,
        filteredChampions,
        completedChampionIds,
        searchTerm,
        hideCompleted,
        hidePending,
        sortOption,
        isLoading,
        progressPercentage,
        progress: completedChampionIds.length,
        toggleChampionCompletion,
        handleSearchChange,
        handleSortChange,
        toggleHideCompleted,
        toggleHidePending,
        resetProgress
    };
};
