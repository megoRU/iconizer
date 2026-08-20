import type { FitMode, ImagePosition, SourceImage } from '../types';
const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_DIMENSION = 8192;
const MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
export function validateImageFile(file: File): 'tooLarge' | 'unsupported' | null { if (file.size > MAX_FILE_SIZE) return 'tooLarge'; if (!MIME_TYPES.includes(file.type)) return 'unsupported'; return null; }
export async function loadSourceImage(file: File): Promise<SourceImage> { const objectUrl = URL.createObjectURL(file); try { const bitmap = await createImageBitmap(file); if (bitmap.width > MAX_DIMENSION || bitmap.height > MAX_DIMENSION) { bitmap.close(); URL.revokeObjectURL(objectUrl); throw new Error('maxResolution'); } return { file, objectUrl, bitmap, width: bitmap.width, height: bitmap.height }; } catch (error) { URL.revokeObjectURL(objectUrl); throw error; } }
export function getDrawRect(sourceWidth: number, sourceHeight: number, targetWidth: number, targetHeight: number, fit: FitMode, position: ImagePosition): { sx: number; sy: number; sw: number; sh: number; dx: number; dy: number; dw: number; dh: number } {
 if (fit === 'stretch') return { sx: 0, sy: 0, sw: sourceWidth, sh: sourceHeight, dx: 0, dy: 0, dw: targetWidth, dh: targetHeight };
 const sourceRatio = sourceWidth / sourceHeight; const targetRatio = targetWidth / targetHeight;
 if (fit === 'contain') { const scale = Math.min(targetWidth / sourceWidth, targetHeight / sourceHeight); const dw = sourceWidth * scale; const dh = sourceHeight * scale; return { sx: 0, sy: 0, sw: sourceWidth, sh: sourceHeight, dx: (targetWidth - dw) / 2, dy: (targetHeight - dh) / 2, dw, dh }; }
 let sx = 0; let sy = 0; let sw = sourceWidth; let sh = sourceHeight;
 if (sourceRatio > targetRatio) { sw = sourceHeight * targetRatio; if (position === 'left') sx = 0; else if (position === 'right') sx = sourceWidth - sw; else sx = (sourceWidth - sw) / 2; } else { sh = sourceWidth / targetRatio; if (position === 'top') sy = 0; else if (position === 'bottom') sy = sourceHeight - sh; else sy = (sourceHeight - sh) / 2; }
 return { sx, sy, sw, sh, dx: 0, dy: 0, dw: targetWidth, dh: targetHeight };
}
