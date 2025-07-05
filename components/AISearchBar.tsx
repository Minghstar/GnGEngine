import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2, History, Keyboard } from 'lucide-react';

interface AISearchBarProps {
  onSearch: (filters: any) => void;
  onClear: () => void;
  placeholder?: string;
  className?: string;
}

interface SearchHistory {
  query: string;
  timestamp: number;
}

const AISearchBar: React.FC<AISearchBarProps> = ({ 
  onSearch, 
  onClear, 
  placeholder = "Try: 'Male D1 tennis players from Melbourne'",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gng_search_history');
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load search history:', error);
      }
    }
  }, []);

  // Save search history to localStorage
  const saveToHistory = (query: string) => {
    const newHistory = [
      { query, timestamp: Date.now() },
      ...searchHistory.filter(item => item.query !== query)
    ].slice(0, 10); // Keep only last 10 searches
    
    setSearchHistory(newHistory);
    localStorage.setItem('gng_search_history', JSON.stringify(newHistory));
  };

  // Handle search submission
  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/parse-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to parse query');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      saveToHistory(query.trim());
      onSearch(data.filters);
      setShowHistory(false);
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to process your search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on '/' key
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      
      // Submit on Enter
      if (e.key === 'Enter' && document.activeElement === inputRef.current) {
        handleSearch();
      }
      
      // Clear on Escape
      if (e.key === 'Escape') {
        setShowHistory(false);
        setError(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [query]);

  // Handle history item click
  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    setShowHistory(false);
    // Auto-search when clicking history item
    setTimeout(() => {
      setQuery(historyQuery);
      handleSearch();
    }, 100);
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setError(null);
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 200)}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-base font-body"
          disabled={isLoading}
        />
        
        {/* Keyboard shortcut hint */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <div className="flex items-center space-x-2">
            {isLoading ? (
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
            ) : query ? (
              <button
                onClick={handleClear}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            ) : (
              <div className="flex items-center text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                <Keyboard className="h-3 w-3 mr-1" />
                /
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-red-600 font-body"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search History Dropdown */}
      <AnimatePresence>
        {showHistory && searchHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
          >
            <div className="p-2">
              <div className="flex items-center px-3 py-2 text-sm text-gray-500 font-medium">
                <History className="h-4 w-4 mr-2" />
                Recent searches
              </div>
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleHistoryClick(item.query)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg transition-colors font-body"
                >
                  {item.query}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Button */}
      <div className="mt-3">
        <motion.button
          onClick={handleSearch}
          disabled={!query.trim() || isLoading}
          className="w-full bg-primary text-white py-3 px-6 rounded-xl font-heading font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Search className="h-5 w-5" />
              <span>Search Athletes</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default AISearchBar; 