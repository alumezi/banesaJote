import { ReactElement } from 'react';

export const Block = ({
  children,
  classes,
}: {
  children: ReactElement;
  classes: string;
}) => {
  return <div className={classes}>{children}</div>;
};
