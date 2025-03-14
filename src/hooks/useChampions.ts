import { useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react';
import { Champion, SortOption, ChampionContextType } from '../utils/types';
import useLocalStorage from './useLocalStorage';
import championService from '../utils/api';

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


    const filteredChampions = useMemo(() => {
        let filtered = [...champions];

        if (searchTerm) {
            filtered = filtered.filter(champion =>
                champion.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }


        if (hideCompleted) {
            filtered = filtered.filter(champion => !completedChampionIds.includes(champion.id));
        }

        if (hidePending) {
            filtered = filtered.filter(champion => completedChampionIds.includes(champion.id));
        }

        filtered.sort((a, b) => {
            switch (sortOption) {
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'completed': {
                    const aCompletedForCompleted = completedChampionIds.includes(a.id);
                    const bCompletedForCompleted = completedChampionIds.includes(b.id);
                    return bCompletedForCompleted === aCompletedForCompleted ? 0 : bCompletedForCompleted ? 1 : -1;
                }
                case 'pending': {
                    const aCompletedForPending = completedChampionIds.includes(a.id);
                    const bCompletedForPending = completedChampionIds.includes(b.id);
                    return aCompletedForPending === bCompletedForPending ? 0 : aCompletedForPending ? 1 : -1;
                }
                default:
                    return 0;
            }
        });


        return filtered;
    }, [champions, searchTerm, hideCompleted, hidePending, completedChampionIds, sortOption]);

    const progressPercentage = useMemo(() => {
        return completedChampionIds.length / 60 * 100;
      }, [completedChampionIds.length]);

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
