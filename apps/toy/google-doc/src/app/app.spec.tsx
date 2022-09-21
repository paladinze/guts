import { render } from '@testing-library/react';

import AppSlate from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppSlate />);

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<AppSlate />);

    expect(getByText(/Welcome toy-google-doc/gi)).toBeTruthy();
  });
});
