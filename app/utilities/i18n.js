import React from 'react';

export const I18nClass = class {
  static resource = {};
  static langs = ['en', 'es'];
  // TODO: require files on demand
  static resources = {
    es: require('../locales/es.json'),
    en: require('../locales/en.json')
  };

  matchStringVariablesRegex = /\{[a-zA-Z0-9]+}/ig;

  constructor (forceLang) {
    if (forceLang) {
      this.loadLangBundle(forceLang)
    } else {
      this.loadLangBundle(this.getAutoDetectedLanguage());
    }
  }

  loadLangBundle (lang) {
    if (I18nClass.langs.indexOf(lang) !== -1 && I18nClass.resources[lang]) {
      I18nClass.resource = I18nClass.resources[lang];
    } else {
      console.warn(`I18n - Warning: Unable to load language files. "${lang}" is not defined as resource`);
    }
  }

  get (key, variables = {}, onlyString = false) {
    return (key && I18nClass.resource[key]) ?
      this.getPreProcessedString(I18nClass.resource[key], variables, onlyString) :
      key;
  }

  getString (key, variables = {}) {
    return this.get(key, variables, true);
  }

  getAutoDetectedLanguage () {
    // TODO: autodetect language
    return 'es'
  }

  getPreProcessedString (string, variables = {}, onlyString = false) {
    let found;
    let result = string;

    while(found = this.matchStringVariablesRegex.exec(string)) {
      const variableName = found[0].substring(1, found[0].length - 1);

      result  = result.replace(found[0], variables[variableName])
    }

    return (onlyString) ? result : (<span dangerouslySetInnerHTML={{__html: result}} />);
  }
};
export const i18n = new I18nClass();
export default I18nClass;

