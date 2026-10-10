import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'zh'],
  parser: 'dot',
  // GitHub Pages cannot perform the server-side rewrites required to hide the
  // default locale, so both languages use real URL prefixes: /en and /zh.
  hideLocale: 'never',
});
