import { createContext, useContext, useState, type ReactNode } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface SearchContextType {
  searchTerm: string;
  debouncedSearchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <SearchContext.Provider value={{ 
      searchTerm, // Immediate value for the input field
      debouncedSearchTerm, // Debounced value for search operations
      setSearchTerm 
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