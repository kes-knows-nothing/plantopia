import { Children } from 'react';
import './codeToImg.scss';

const CodeToImg = (icons: string[]) => {
  return (
    <>{Children.toArray(icons.map(icon => <img src={icon} alt="icon" />))}</>
  );
};

export { CodeToImg };
