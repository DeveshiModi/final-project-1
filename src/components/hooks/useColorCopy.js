import { useState } from 'react';

const useColorCopy = () => {
  const [copied, setCopied] = useState(false);
  const [copiedColor, setCopiedColor] = useState("");

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedColor(text);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCloseSnackbar = () => {
    setCopied(false);
  };

  return {
    copied,
    copiedColor,
    copyToClipboard,
    handleCloseSnackbar
  };
};

export default useColorCopy; 