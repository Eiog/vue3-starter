import { createI18n } from 'vue-i18n';
import zh_cn from './cn.json';
import en_us from './en.json';
type MessageSchema = typeof zh_cn;
const i18n = createI18n<[MessageSchema], 'zh_cn' | 'en_us'>({
  locale: 'zh_cn',
  legacy: false,
  fallbackLocale: 'zh_cn',
  messages: {
    zh_cn: zh_cn,
    en_us: en_us,
  },
});
export default i18n;
