import { ReactElement } from 'react';
import { ErrorBoundary } from '../../../components/errorBoundary';

export const Block = ({
  children,
  classes,
}: {
  children: ReactElement;
  classes: string;
}) => {
  return (
    <ErrorBoundary>
      <div className={classes}>{children}</div>{' '}
    </ErrorBoundary>
  );
};
