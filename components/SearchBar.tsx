import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Find your next champion...",
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Trigger search when debounced term changes
  useEffect(() => {
    onSearch(debouncedTerm);
  }, [debouncedTerm, onSearch]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    setDebouncedTerm('');
    onSearch('');
  }, [onSearch]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-gray" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-charcoal-black border border-neutral-gray rounded-xl text-text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent font-body text-base transition-all duration-200"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-gray hover:text-primary-red transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar; 