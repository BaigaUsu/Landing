'use client';
import { useState, useEffect } from "react";
import { useSearchQuery } from "../api/searchApi";

interface SearchBarProps {
  type: "projects" | "tasks" | "applications" | "stages" | "substages";
  placeholder?: string;
  onResults?: (results: any[]) => void;
}

export const SearchBar = ({ type, placeholder = "Поиск...", onResults }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const { data, isFetching } = useSearchQuery(
    { type, query },
    { skip: !query }
  );

  // 🔁 Передаём результаты наружу, как только они приходят
  useEffect(() => {
    if (!query) {
      onResults?.([]); // или undefined
    } else if (data?.results) {
      onResults?.(data.results);
    }
  }, [query, data]);

  return (
    <div className="w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
      />
      {isFetching && <p className="text-sm text-gray-500 mt-1">Поиск...</p>}
    </div>
  );
};