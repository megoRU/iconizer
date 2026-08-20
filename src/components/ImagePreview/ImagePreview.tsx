import type React from 'react';
import type { SourceImage } from '../../types';
import type { TranslationKey } from '../../i18n';
import { formatBytes } from '../../utils/files';
import { IconPhoto, IconRefresh } from '@tabler/icons-react';

export function ImagePreview(props: { source: SourceImage; t: Record<TranslationKey, string>; onReplace: () => void }): React.ReactNode {
  return (
    <section className="card source-card">
      <div className="checker source-preview">
        <img src={props.source.objectUrl} alt={props.source.file.name} />
      </div>
      <div>
        <div className="d-flex align-items-center gap-2 mb-1">
          <IconPhoto size={20} className="text-secondary" />
          <strong>{props.source.file.name}</strong>
        </div>
        <p className="muted">{props.source.width} × {props.source.height} • {formatBytes(props.source.file.size)}</p>
      </div>
      <button className="btn btn-outline-secondary" onClick={props.onReplace}>
        <IconRefresh size={16} className="me-1" />
        {props.t.replaceImage}
      </button>
    </section>
  );
}
