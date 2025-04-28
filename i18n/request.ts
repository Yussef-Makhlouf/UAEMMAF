import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale = 'en' }) => ({
  messages: (await import(`../translations/${locale}.json`)).default,
  locale
})); 