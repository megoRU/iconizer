import { useEffect, useState } from 'react';
import { readStorage, writeStorage } from '../utils/storage';
export function useLocalState<T>(key: string, fallback: T): [T, React.Dispatch<React.SetStateAction<T>>] { const [value, setValue] = useState<T>(() => readStorage<T>(key, fallback)); useEffect(() => { writeStorage(key, value); }, [key, value]); return [value, setValue]; }
