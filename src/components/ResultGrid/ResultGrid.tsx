import type React from 'react';
import type { GeneratedIco, GeneratedPng } from '../../types';
import type { TranslationKey } from '../../i18n';
import { downloadBlob } from '../../utils/files';
import { IconDownload, IconFolderDown, IconGridDots, IconFileTypePng } from '@tabler/icons-react';

export function ResultGrid(props: { t: Record<TranslationKey, string>; pngs: GeneratedPng[]; ico: GeneratedIco | null; onZip: () => void }): React.ReactNode {
  return (
    <section className="card results-card">
      <div className="card-header border-bottom-0 pb-0 ps-0 pe-0">
        <div className="section-head w-100">
          <h2 className="card-title h2 d-flex align-items-center gap-2 mb-0">
            <IconGridDots size={22} className="text-primary" />
            {props.t.generated}
          </h2>
          {props.pngs.length > 0 ? (
            <button className="btn btn-success d-inline-flex align-items-center gap-1" onClick={props.onZip}>
              <IconFolderDown size={18} />
              {props.t.downloadAll}
            </button>
          ) : null}
        </div>
      </div>

      <div className="card-body ps-0 pe-0 pt-3">
        {props.pngs.length === 0 ? (
          <p className="muted">{props.t.noResults}</p>
        ) : (
          <div className="result-grid">
            {props.pngs.map((png) => (
              <article className="result-card" key={png.filename}>
                <div className="checker result-preview">
                  <img src={png.url} alt="" />
                </div>
                <strong>{png.size.width} × {png.size.height}</strong>
                <span className="muted text-truncate">{png.filename}</span>
                <button className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center gap-1" onClick={() => downloadBlob(png.blob, png.filename)}>
                  <IconDownload size={14} />
                  {props.t.download}
                </button>
              </article>
            ))}
          </div>
        )}

        {props.ico !== null ? (
          <div className="ico-box">
            <div>
              <h3 className="h3 d-flex align-items-center gap-2 mb-1">
                <IconFileTypePng size={20} className="text-primary" />
                {props.t.ico}
              </h3>
              <p className="muted">{props.ico.filename}</p>
            </div>
            <button className="btn btn-outline-primary d-flex align-items-center gap-1" onClick={() => downloadBlob(props.ico!.blob, props.ico!.filename)}>
              <IconDownload size={16} />
              {props.t.downloadIco}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
