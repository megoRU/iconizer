import type React from 'react';
import type { FitMode, IconSize, ImagePosition, ZipStructure } from '../../types';
import type { TranslationKey } from '../../i18n';
import {
  IconSettings,
  IconPlus,
  IconX,
  IconSparkles,
  IconChecklist,
  IconSquareX,
  IconAdjustmentsHorizontal
} from '@tabler/icons-react';

export function Settings(props: {
  t: Record<TranslationKey, string>;
  fileName: string;
  setFileName: (value: string) => void;
  sizes: IconSize[];
  setSizes: (sizes: IconSize[]) => void;
  fit: FitMode;
  setFit: (fit: FitMode) => void;
  position: ImagePosition;
  setPosition: (position: ImagePosition) => void;
  icoName: string;
  setIcoName: (value: string) => void;
  zipStructure: ZipStructure;
  setZipStructure: (value: ZipStructure) => void;
  onGenerate: () => void;
  disabled: boolean;
}): React.ReactNode {
  function toggle(id: string): void {
    props.setSizes(props.sizes.map((size) => (size.id === id ? { ...size, selected: !size.selected } : size)));
  }

  function remove(id: string): void {
    props.setSizes(props.sizes.filter((size) => size.id !== id));
  }

  function add(): void {
    const width = 300;
    const height = 300;
    props.setSizes([...props.sizes, { id: `custom-${Date.now()}`, width, height, selected: true, custom: true }]);
  }

  function update(id: string, key: 'width' | 'height', value: number): void {
    const safe = Math.min(4096, Math.max(1, value));
    props.setSizes(props.sizes.map((size) => (size.id === id ? { ...size, [key]: safe } : size)));
  }

  return (
    <section className="card settings-card">
      <div className="card-header border-bottom-0 pb-0 ps-0 pe-0">
        <h2 className="card-title h2 d-flex align-items-center gap-2 mb-0">
          <IconSettings size={22} className="text-primary" />
          {props.t.settings}
        </h2>
      </div>

      <div className="card-body ps-0 pe-0 pt-3">
        <label className="form-label mb-3">
          {props.t.fileName}
          <input className="form-control" value={props.fileName} onChange={(event) => props.setFileName(event.target.value)} />
        </label>

        <div className="section-head mb-2">
          <h3 className="h3 d-flex align-items-center gap-1 mb-0">
            {props.t.sizes}
          </h3>
          <div className="d-flex gap-1">
            <button className="link-button btn btn-ghost-primary btn-sm d-inline-flex align-items-center gap-1" onClick={() => props.setSizes(props.sizes.map((size) => ({ ...size, selected: true })))}>
              <IconChecklist size={15} />
              {props.t.selectAll}
            </button>
            <button className="link-button btn btn-ghost-secondary btn-sm d-inline-flex align-items-center gap-1" onClick={() => props.setSizes(props.sizes.map((size) => ({ ...size, selected: false })))}>
              <IconSquareX size={15} />
              {props.t.clearAll}
            </button>
          </div>
        </div>

        <div className="size-list mb-2">
          {props.sizes.map((size) => (
            <div className="size-row" key={size.id}>
              <label className="form-check m-0">
                <input className="form-check-input" type="checkbox" checked={size.selected} onChange={() => toggle(size.id)} />
                <span className="form-check-label">{size.width} × {size.height}</span>
              </label>
              {size.custom ? (
                <div className="custom-size">
                  <input aria-label={props.t.width} type="number" min={1} max={4096} value={size.width} onChange={(event) => update(size.id, 'width', Number(event.target.value))} />
                  <input aria-label={props.t.height} type="number" min={1} max={4096} value={size.height} onChange={(event) => update(size.id, 'height', Number(event.target.value))} />
                  <button className="btn btn-sm btn-outline-danger btn-icon" onClick={() => remove(size.id)}>
                    <IconX size={14} />
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <button className="btn btn-outline-primary btn-sm mb-3" onClick={add}>
          <IconPlus size={16} className="me-1" />
          {props.t.addSize}
        </button>

        <h3 className="h3 d-flex align-items-center gap-2 mt-2 mb-2">
          <IconAdjustmentsHorizontal size={18} className="text-secondary" />
          {props.t.imageSettings}
        </h3>

        <label className="form-label mb-2">
          {props.t.fit}
          <select className="form-select" value={props.fit} onChange={(event) => props.setFit(event.target.value as FitMode)}>
            <option value="cover">{props.t.cover}</option>
            <option value="contain">{props.t.contain}</option>
            <option value="stretch">{props.t.stretch}</option>
          </select>
        </label>

        {props.fit === 'cover' ? (
          <label className="form-label mb-2">
            {props.t.position}
            <select className="form-select" value={props.position} onChange={(event) => props.setPosition(event.target.value as ImagePosition)}>
              <option value="center">{props.t.center}</option>
              <option value="top">{props.t.top}</option>
              <option value="bottom">{props.t.bottom}</option>
              <option value="left">{props.t.left}</option>
              <option value="right">{props.t.right}</option>
            </select>
          </label>
        ) : null}

        <label className="form-label mb-2">
          {props.t.icoFileName}
          <input className="form-control" value={props.icoName} onChange={(event) => props.setIcoName(event.target.value)} />
        </label>

        <label className="form-label mb-3">
          {props.t.zipStructure}
          <select className="form-select" value={props.zipStructure} onChange={(event) => props.setZipStructure(event.target.value as ZipStructure)}>
            <option value="grouped">{props.t.grouped}</option>
            <option value="root">{props.t.root}</option>
          </select>
        </label>

        <button className="btn btn-primary generate-btn d-flex align-items-center justify-content-center gap-2" disabled={props.disabled} onClick={props.onGenerate}>
          <IconSparkles size={18} />
          {props.t.generate}
        </button>
      </div>
    </section>
  );
}
