import type React from 'react';
import type { Language, ThemeMode } from '../../types';
import type { TranslationKey } from '../../i18n';
import { IconSun, IconMoon, IconDeviceDesktop, IconSparkles } from '@tabler/icons-react';

interface HeaderProps {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  t: Record<TranslationKey, string>;
}

function ThemeIcon(props: { theme: ThemeMode }): React.ReactNode {
  if (props.theme === 'dark') {
    return <IconMoon size={18} className="theme-icon text-muted" />;
  }

  if (props.theme === 'light') {
    return <IconSun size={18} className="theme-icon text-muted" />;
  }

  return <IconDeviceDesktop size={18} className="theme-icon text-muted" />;
}

export function Header(props: HeaderProps): React.ReactNode {
  function setRussianLanguage(): void {
    props.setLanguage('ru');
  }

  function setEnglishLanguage(): void {
    props.setLanguage('en');
  }

  function handleThemeChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    props.setTheme(event.target.value as ThemeMode);
  }

  return (
    <header className="app-header navbar navbar-expand-md">
      <a className="brand navbar-brand" href="/" aria-label="Iconizer">
        <span className="brand-mark" aria-hidden="true">
          <IconSparkles size={18} />
        </span>
        <span className="h3 mb-0 fw-bold">{props.t.appTitle}</span>
      </a>
      <nav className="header-actions navbar-nav flex-row align-items-center gap-2" aria-label="Preferences">
        <div className="btn-group" role="group" aria-label={props.t.language}>
          <button className={`btn btn-sm ${props.language === 'ru' ? 'btn-primary' : 'btn-outline-secondary'}`} type="button" onClick={setRussianLanguage}>RU</button>
          <button className={`btn btn-sm ${props.language === 'en' ? 'btn-primary' : 'btn-outline-secondary'}`} type="button" onClick={setEnglishLanguage}>EN</button>
        </div>
        <label className="theme-control d-inline-flex align-items-center gap-2" aria-label={props.t.theme}>
          <ThemeIcon theme={props.theme} />
          <select className="form-select form-select-sm theme-select" aria-label={props.t.theme} value={props.theme} onChange={handleThemeChange}>
            <option value="system">{props.t.system}</option>
            <option value="light">{props.t.light}</option>
            <option value="dark">{props.t.dark}</option>
          </select>
        </label>
      </nav>
    </header>
  );
}
