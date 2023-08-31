export const waterCodeToNumber = (waterCode: string) => {
  switch (waterCode) {
    case 'WC03':
      return 14;
    case 'WC02':
      return 11;
    case 'WC01':
      return 7;
  }
};
