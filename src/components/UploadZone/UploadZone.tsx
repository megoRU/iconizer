import { useRef, useState } from 'react';
import type React from 'react';
import { IconUpload, IconFilePlus, IconClipboard } from '@tabler/icons-react';
import type { TranslationKey } from '../../i18n';

interface UploadZoneProps {
  t: Record<TranslationKey, string>;
  onFile: (file: File) => void;
}

export function UploadZone(props: UploadZoneProps): React.ReactNode {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  function openFileDialog(): void {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  }

  function pick(files: FileList | null): void {
    if (files !== null && files.length > 0) {
      props.onFile(files[0]);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openFileDialog();
    }
  }

  function handleDragOver(event: React.DragEvent<HTMLElement>): void {
    event.preventDefault();
    setDragging(true);
  }

  function handleDrop(event: React.DragEvent<HTMLElement>): void {
    event.preventDefault();
    setDragging(false);
    pick(event.dataTransfer.files);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    pick(event.target.files);
  }

  return (
    <section className={`upload-zone card ${dragging ? 'is-dragging' : ''}`} tabIndex={0} onKeyDown={handleKeyDown} onDragOver={handleDragOver} onDragLeave={() => setDragging(false)} onDrop={handleDrop} aria-label={props.t.dropHere}>
      <input ref={inputRef} className="visually-hidden" type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={handleInputChange} />
      <div className="upload-zone-inner">
        <span className="upload-icon" aria-hidden="true">
          <IconUpload size={32} stroke={1.75} />
        </span>
        <h2 className="card-title h2">{dragging ? props.t.dropActive : props.t.dropHere}</h2>
        <p className="text-secondary mb-2">{props.t.or}</p>
        <button className="btn btn-primary" type="button" onClick={openFileDialog}>
          <IconFilePlus size={18} className="me-1" />
          {props.t.chooseFile}
        </button>
        <span className="paste-hint text-secondary mt-2">
          <IconClipboard size={16} className="me-1" />
          {props.t.pasteHint}
        </span>
      </div>
    </section>
  );
}
