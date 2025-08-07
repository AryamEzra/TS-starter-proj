'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface SearchContextType {
  searchTerm: string;
  debouncedSearchTerm: string;
  activeSearchTerm: string;
  setSearchTerm: (term: string) => void;
  setActiveSearchTerm: (term: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const clearSearch = () => {
    setSearchTerm('');
    setActiveSearchTerm('');
  };

  return (
    <SearchContext.Provider value={{ 
      searchTerm,
      debouncedSearchTerm,
      activeSearchTerm,
      setSearchTerm,
      setActiveSearchTerm,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}