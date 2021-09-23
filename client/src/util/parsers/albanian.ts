const currentLanguage = 'Albanian'; //todo: derive the current language of app from state

export const parseFeaturesInCurrentLanguage = (feature) => {
  switch (currentLanguage) {
    case 'Albanian':
      return parseFeaturesInAlbanian(feature);
    default:
      return '';
  }
};

const parseFeaturesInAlbanian = (feature) => {
  switch (feature) {
    case 'kitchen':
      return 'Kuzhinë';
    case 'terrace':
      return 'Terrasë';
    case 'wifi':
      return 'Wifi';
    case 'tv':
      return 'TV';
    case 'fridge':
      return 'Frigorifer';
    case 'washingMachine':
      return 'Rrobalarëse';
    default:
      return '';
  }
};
