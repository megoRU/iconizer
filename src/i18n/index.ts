import { en } from './en';
import { ru } from './ru';
import type { Language } from '../types';
export const dictionaries = { en, ru };
export type TranslationKey = keyof typeof en;
export function getDictionary(language: Language): typeof en { return dictionaries[language]; }
