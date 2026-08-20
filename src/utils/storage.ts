export function readStorage<T>(key: string, fallback: T): T { const value = window.localStorage.getItem(key); if (value === null) return fallback; try { return JSON.parse(value) as T; } catch { return fallback; } }
export function writeStorage<T>(key: string, value: T): void { window.localStorage.setItem(key, JSON.stringify(value)); }
