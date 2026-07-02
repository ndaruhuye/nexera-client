export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedThemeMode = 'light' | 'dark';

export interface ThemeState {
  mode: ThemeMode;
  resolvedMode: ResolvedThemeMode;
  isDark: boolean;
}
