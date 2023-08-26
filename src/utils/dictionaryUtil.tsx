import { Children } from 'react';

const codeToImg = (icons: string[]) => {
  return (
    <>{Children.toArray(icons.map(icon => <img src={icon} alt="icon" />))}</>
  );
};

export { codeToImg };
