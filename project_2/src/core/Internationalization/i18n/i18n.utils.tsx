import lang from '../locales';

function getResources() {
  let _resources: any = {};
  for (let name in lang) {
    if (lang.hasOwnProperty(name)) {
      _resources[name] = { translation: Reflect.get(lang, name) };
    }
  }
  return _resources;
}

export const resources = getResources();

export enum Languages {
  ES = 'es',
  EN = 'en',
  FR = 'fr',
  default = 'en',
}

export const languageFromStorage = localStorage.getItem('i18nextLng');

export function getLocalI18n() {
  return languageFromStorage ? resources[languageFromStorage].translation : resources[Languages.default].translation;
}

export async function getI18nFile(url: string) {
  return getLocalI18n();
}
