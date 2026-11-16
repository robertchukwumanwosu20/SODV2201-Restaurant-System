import { useEffect, useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      return Array.isArray(saved) ? saved : initialValue;
    } catch {
      return initialValue;
    }
  });
  const [storageError, setStorageError] = useState('');
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setStorageError('');
    } catch {
      setStorageError('Browser storage is unavailable or full. Changes may be lost when you refresh.');
    }
  }, [key, value]);
  return [value, setValue, storageError];
}
