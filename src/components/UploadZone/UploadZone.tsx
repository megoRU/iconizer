import { useRef, useState } from 'react';
import type React from 'react';
import type { TranslationKey } from '../../i18n';

interface UploadZoneProps {
  t: Record<TranslationKey, string>;
  onFile: (file: File) => void;
}

export function UploadZone(props: UploadZoneProps): JSX.Element {
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
        <span className="upload-icon" aria-hidden="true">↑</span>
        <h2>{dragging ? props.t.dropActive : props.t.dropHere}</h2>
        <p className="muted">{props.t.or}</p>
        <button className="btn btn-primary" type="button" onClick={openFileDialog}>{props.t.chooseFile}</button>
        <span className="paste-hint"><span aria-hidden="true">⌘</span>{props.t.pasteHint}</span>
      </div>
    </section>
  );
}
