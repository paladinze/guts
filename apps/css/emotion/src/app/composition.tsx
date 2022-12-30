import React from 'react';
import { css } from '@emotion/react';

const magnify = css`
  font-size: 2rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    font-size: 6rem;
  };
`

const base = css`
  color: salmon;
`

const GlobalStyles: React.FC = () => {
  return (
    <div>
      <div css={base}>base style only</div>
      <div css={[base, magnify]}>
        composed styles
      </div>
    </div>
  )
}

export default GlobalStyles
