import React from 'react';

interface ErrorProps {
  className?: string,
  children: React.ReactNode
}

export function ErrorMessage({ className, children }: ErrorProps) {
  return (
    <p css={{ color: 'red', fontWeight: 'bold' }} className={className}>
      {children}
    </p>
  );
}

// `fontSize: '1.5rem'` is passed down to the ErrorMessage component via the
// className prop, so ErrorMessage must accept a className prop for this to
// work!
export function LargeErrorMessage({ className, children }: ErrorProps) {
  return (
    <ErrorMessage css={{ fontSize: '1.5rem' }} className={className}>
      {children}
    </ErrorMessage>
  );
}
