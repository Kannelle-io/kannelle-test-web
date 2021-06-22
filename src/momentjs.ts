import log from 'loglevel';
import moment from 'moment';
import 'moment/locale/fr';
import i18n from './i18n';

i18n.on('languageChanged', () => {
  let newMomentLanguage;
  switch (i18n.language) {
    case 'fr-FR':
      newMomentLanguage = 'fr';
      break;
    case 'en-US':
    default:
      newMomentLanguage = 'en';
      break;
  }
  moment.locale(newMomentLanguage);
  log.info(`Switching moment.js language to '${newMomentLanguage}'`);
});
