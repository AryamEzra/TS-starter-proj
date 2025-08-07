'use client';

import { useSearch } from '@/context/SearchContext';
import Image from 'next/image';

export default function HeaderSearch() {
  const { searchTerm, setSearchTerm, setActiveSearchTerm } = useSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearchTerm(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4 hidden sm:flex items-center">
      <input
        className="flex-1 h-10 px-4 rounded-l text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="bg-yellow-400 w-12 h-10 rounded-r flex items-center justify-center"
      >
        <Image 
          src="/images/icons/search-icon.png" 
          alt="Search"
          width={20}
          height={20}
        />
      </button>
    </form>
  );
}