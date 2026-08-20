import { useCallback, useEffect, useMemo, useState } from 'react';
import type React from 'react';
import { Header } from './components/Header/Header';
import { UploadZone } from './components/UploadZone/UploadZone';
import { ImagePreview } from './components/ImagePreview/ImagePreview';
import { Settings } from './components/Settings/Settings';
import { ResultGrid } from './components/ResultGrid/ResultGrid';
import { Progress } from './components/Progress/Progress';
import { getDictionary } from './i18n';
import { useTheme } from './hooks/useTheme';
import { useLocalState } from './hooks/useLocalState';
import { generateIco } from './services/icoGenerator';
import { validateImageFile, loadSourceImage } from './services/imageProcessor';
import { generatePngs } from './services/pngGenerator';
import { generateZip } from './services/zipGenerator';
import { downloadBlob } from './utils/files';
import type { FitMode, GeneratedIco, GeneratedPng, IconSize, ImagePosition, Language, ProgressState, SourceImage, ZipStructure } from './types';
import { IconGlobe, IconHeart } from '@tabler/icons-react';

const DEFAULT_SIZES: IconSize[] = [16, 32, 48, 64, 96, 128, 256, 512, 1024].map((value) => ({
  id: `default-${value}`,
  width: value,
  height: value,
  selected: true,
  custom: false
}));

export function App(): React.ReactNode {
  const [theme, setTheme] = useTheme();
  const [language, setLanguage] = useLocalState<Language>('iconizer.language', 'en');
  const t = useMemo(() => getDictionary(language), [language]);
  const [source, setSource] = useState<SourceImage | null>(null);
  const [fileName, setFileName] = useLocalState('iconizer.fileName', 'icon');
  const [sizes, setSizes] = useLocalState<IconSize[]>('iconizer.sizes', DEFAULT_SIZES);
  const [fit, setFit] = useLocalState<FitMode>('iconizer.fit', 'cover');
  const [position, setPosition] = useLocalState<ImagePosition>('iconizer.position', 'center');
  const [icoName, setIcoName] = useLocalState('iconizer.icoName', 'favicon.ico');
  const [zipStructure, setZipStructure] = useLocalState<ZipStructure>('iconizer.zipStructure', 'grouped');
  const [pngs, setPngs] = useState<GeneratedPng[]>([]);
  const [ico, setIco] = useState<GeneratedIco | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressState | null>(null);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'ru' ? 'Iconizer — Создание иконок разных размеров' : 'Iconizer — Create Icons & Resize Images';
    const meta = document.querySelector('meta[name="description"]');
    if (meta !== null) {
      meta.setAttribute(
        'content',
        language === 'ru' ? 'Создавайте иконки разных размеров из одного изображения.' : 'Create icons in multiple sizes from one image.'
      );
    }
  }, [language]);

  useEffect(() => {
    return () => {
      if (source !== null) {
        source.bitmap.close();
        URL.revokeObjectURL(source.objectUrl);
      }
    };
  }, [source]);

  const handleFile = useCallback(
    async (file: File): Promise<void> => {
      const validation = validateImageFile(file);
      if (validation !== null) {
        setError(t[validation]);
        return;
      }
      try {
        const next = await loadSourceImage(file);
        setSource((previous) => {
          if (previous !== null) {
            previous.bitmap.close();
            URL.revokeObjectURL(previous.objectUrl);
          }
          return next;
        });
        pngs.forEach((png) => URL.revokeObjectURL(png.url));
        if (ico !== null) URL.revokeObjectURL(ico.url);
        setPngs([]);
        setIco(null);
        setError(null);
      } catch (loadError) {
        setError(loadError instanceof Error && loadError.message === 'maxResolution' ? t.maxResolution : t.openError);
      }
    },
    [ico, pngs, t]
  );

  useEffect(() => {
    const listener = (event: ClipboardEvent): void => {
      const items = event.clipboardData?.files;
      if (items !== undefined && items.length > 0) void handleFile(items[0]);
    };
    window.addEventListener('paste', listener);
    return () => window.removeEventListener('paste', listener);
  }, [handleFile]);

  async function generate(): Promise<void> {
    if (source === null) return;
    const selected = sizes.filter((size) => size.selected);
    if (selected.length === 0) {
      setError(t.noSize);
      return;
    }
    setError(null);
    setProgress({ current: 0, total: selected.length, label: t.generating, done: false });
    pngs.forEach((png) => URL.revokeObjectURL(png.url));
    if (ico !== null) URL.revokeObjectURL(ico.url);
    const nextPngs = await generatePngs(source, { fit, position, fileName, sizes }, (current, total) =>
      setProgress({ current, total, label: t.generating, done: false })
    );
    const nextIco = await generateIco(source, icoName, fit, position);
    setPngs(nextPngs);
    setIco(nextIco);
    setProgress({ current: selected.length, total: selected.length, label: t.done, done: true });
  }

  async function downloadZip(): Promise<void> {
    const blob = await generateZip(pngs, ico, zipStructure);
    downloadBlob(blob, 'iconizer.zip');
  }

  return (
    <>
      <Header language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} t={t} />
      <main className="page">
        <section className="hero">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSubtitle}</p>
        </section>

        {error !== null ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : null}

        {source === null ? (
          <UploadZone t={t} onFile={handleFile} />
        ) : (
          <>
            <ImagePreview source={source} t={t} onReplace={() => setSource(null)} />
            <div className="workspace">
              <Settings
                t={t}
                fileName={fileName}
                setFileName={setFileName}
                sizes={sizes}
                setSizes={setSizes}
                fit={fit}
                setFit={setFit}
                position={position}
                setPosition={setPosition}
                icoName={icoName}
                setIcoName={setIcoName}
                zipStructure={zipStructure}
                setZipStructure={setZipStructure}
                onGenerate={generate}
                disabled={progress !== null && progress.done === false}
              />
              <div>
                <Progress progress={progress} />
                <ResultGrid t={t} pngs={pngs} ico={ico} onZip={downloadZip} />
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="footer footer-transparent d-print-none py-4 border-top mt-auto">
        <div className="container-xl">
          <div className="row text-center align-items-center flex-row-reverse">
            <div className="col-lg-auto ms-lg-auto mb-2 mb-lg-0">
              <a
                href="https://megoru.ru"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1"
              >
                <IconGlobe size={16} />
                megoru.ru
              </a>
            </div>
            <div className="col-12 col-lg-auto">
              <div className="d-flex align-items-center justify-content-center gap-1 text-secondary">
                <span>{t.footer}</span>
                <span className="text-red ms-1 me-1">
                  <IconHeart size={16} fill="currentColor" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
