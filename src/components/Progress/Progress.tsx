import type React from 'react';
import type { ProgressState } from '../../types';
import { IconLoader2, IconCheck } from '@tabler/icons-react';

export function Progress(props: { progress: ProgressState | null }): React.ReactNode {
  if (props.progress === null) return null;
  const percent = props.progress.total === 0 ? 0 : Math.round((props.progress.current / props.progress.total) * 100);

  return (
    <div className="progress-card card p-3 mb-3" role="status" aria-live="polite">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <strong className="d-flex align-items-center gap-2">
          {props.progress.done ? (
            <IconCheck size={18} className="text-success" />
          ) : (
            <IconLoader2 size={18} className="text-primary icon-spin" />
          )}
          {props.progress.label}
        </strong>
        <span className="badge bg-blue-lt">{props.progress.current} / {props.progress.total}</span>
      </div>
      <div className="progress progress-sm">
        <div className={`progress-bar ${props.progress.done ? 'bg-success' : 'bg-primary'}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
