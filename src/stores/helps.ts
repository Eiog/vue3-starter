import { colord } from 'colord';
export const getSatusColor = (color: string = '#ff461f') => {
  return {
    color: color,
    hover: colord(color).lighten(0.1).toHex(),
    pressed: colord(color).darken(0.1).toHex(),
    suppl: colord(color).lighten(0.1).toHex(),
  };
};
