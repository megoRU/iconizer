export type ThemeMode = 'light' | 'dark' | 'system';
export type Language = 'ru' | 'en';
export type FitMode = 'cover' | 'contain' | 'stretch';
export type ImagePosition = 'center' | 'top' | 'bottom' | 'left' | 'right';
export type ZipStructure = 'grouped' | 'root';
export interface IconSize { id: string; width: number; height: number; selected: boolean; custom: boolean; }
export interface SourceImage { file: File; objectUrl: string; bitmap: ImageBitmap; width: number; height: number; }
export interface GeneratedPng { size: IconSize; filename: string; blob: Blob; url: string; }
export interface GeneratedIco { filename: string; blob: Blob; url: string; }
export interface GenerateOptions { fit: FitMode; position: ImagePosition; fileName: string; sizes: IconSize[]; }
export interface ProgressState { current: number; total: number; label: string; done: boolean; }
