import type React from 'react';
import type { Language, ThemeMode } from '../../types';
import type { TranslationKey } from '../../i18n';

interface HeaderProps {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  t: Record<TranslationKey, string>;
}

function ThemeIcon(props: { theme: ThemeMode }): JSX.Element {
  if (props.theme === 'dark') {
    return <svg aria-hidden="true" className="theme-icon" viewBox="0 0 24 24"><path d="M20.2 14.1A7.5 7.5 0 0 1 9.9 3.8a8.5 8.5 0 1 0 10.3 10.3Z" /></svg>;
  }

  if (props.theme === 'light') {
    return <svg aria-hidden="true" className="theme-icon" viewBox="0 0 24 24"><path d="M12 5.2a6.8 6.8 0 1 0 0 13.6 6.8 6.8 0 0 0 0-13.6Zm0-3.2v2m0 16v2m10-10h-2M4 12H2m17.1-7.1-1.4 1.4M6.3 17.7l-1.4 1.4m14.2 0-1.4-1.4M6.3 6.3 4.9 4.9" /></svg>;
  }

  return <svg aria-hidden="true" className="theme-icon" viewBox="0 0 24 24"><path d="M4 5.8C4 4.8 4.8 4 5.8 4h12.4c1 0 1.8.8 1.8 1.8v8.4c0 1-.8 1.8-1.8 1.8H5.8c-1 0-1.8-.8-1.8-1.8V5.8Zm6 14.2h4m-2-4v4" /></svg>;
}

export function Header(props: HeaderProps): JSX.Element {
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
        <span className="brand-mark" aria-hidden="true">✦</span>
        <span>{props.t.appTitle}</span>
      </a>
      <nav className="header-actions navbar-nav flex-row" aria-label="Preferences">
        <div className="btn-group" role="group" aria-label={props.t.language}>
          <button className={`btn btn-sm ${props.language === 'ru' ? 'btn-primary' : 'btn-outline-secondary'}`} type="button" onClick={setRussianLanguage}>RU</button>
          <button className={`btn btn-sm ${props.language === 'en' ? 'btn-primary' : 'btn-outline-secondary'}`} type="button" onClick={setEnglishLanguage}>EN</button>
        </div>
        <label className="theme-control" aria-label={props.t.theme}>
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
