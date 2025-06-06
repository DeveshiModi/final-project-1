/**
 * Custom hook for generating color palettes using the backend API.
 * Handles state, API calls, error handling, and persistence to localStorage.
 */
import { useState, useCallback, useEffect, useMemo } from "react";

const useColorGeneration = () => {
  // State for the generated color palette
  const [colors, setColors] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(false);
  // State for error messages
  const [error, setError] = useState(null);
  // State for the last used prompt
  const [lastPrompt, setLastPrompt] = useState("");
  // State for the last used style
  const [lastStyle, setLastStyle] = useState("modern");

  // Memoize the API endpoint for performance
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  /**
   * Fetches a color palette from the backend API using the provided prompt and style.
   * Handles loading and error state.
   */
  const fetchColorsFromGemini = useCallback(async (prompt, style) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/api/colors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, style }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.colors || !Array.isArray(data.colors)) {
        throw new Error("Invalid response format from server");
      }

      setColors(data.colors);
      setLastPrompt(prompt);
      setLastStyle(style);
    } catch (err) {
      console.error("Error fetching colors:", err);
      setError(err.message || "Failed to generate colors");
      setColors([]);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  /**
   * Generates a color palette based on the user's prompt and style.
   * Validates input and delegates to fetchColorsFromGemini.
   */
  const generateColors = useCallback(
    async (prompt, style = 'modern') => {
      if (!prompt.trim()) {
        setError("Please enter a prompt");
        return;
      }
      await fetchColorsFromGemini(prompt, style);
    },
    [fetchColorsFromGemini]
  );

  // Save colors, prompt, and style to localStorage whenever they change
  useEffect(() => {
    if (colors.length > 0) {
      localStorage.setItem('lastGeneratedColors', JSON.stringify(colors));
      localStorage.setItem('lastPrompt', lastPrompt);
      localStorage.setItem('lastStyle', lastStyle);
    }
  }, [colors, lastPrompt, lastStyle]);

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(
    () => ({
      colors,
      loading,
      error,
      generateColors,
      lastPrompt,
      lastStyle,
    }),
    [colors, loading, error, generateColors, lastPrompt, lastStyle]
  );
};

export default useColorGeneration; 