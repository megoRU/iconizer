import type { SourceImage } from '../../types';
import type { TranslationKey } from '../../i18n';
import { formatBytes } from '../../utils/files';
export function ImagePreview(props: { source: SourceImage; t: Record<TranslationKey, string>; onReplace: () => void }): JSX.Element { return <section className="card source-card"><div className="checker source-preview"><img src={props.source.objectUrl} alt={props.source.file.name} /></div><div><strong>{props.source.file.name}</strong><p className="muted">{props.source.width} × {props.source.height} • {formatBytes(props.source.file.size)}</p></div><button className="btn btn-outline-secondary" onClick={props.onReplace}>{props.t.replaceImage}</button></section>; }
