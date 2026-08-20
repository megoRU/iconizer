import JSZip from 'jszip';
import type { GeneratedIco, GeneratedPng, ZipStructure } from '../types';
export async function generateZip(pngs: GeneratedPng[], ico: GeneratedIco | null, structure: ZipStructure): Promise<Blob> { const zip = new JSZip(); const pngFolder = structure === 'grouped' ? zip.folder('png') : zip; const icoFolder = structure === 'grouped' ? zip.folder('ico') : zip; pngs.forEach((png) => { pngFolder?.file(png.filename, png.blob); }); if (ico !== null) { icoFolder?.file(ico.filename, ico.blob); } return zip.generateAsync({ type: 'blob', compression: 'DEFLATE' }); }
