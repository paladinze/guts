

import React from 'react';
import { css, Global } from '@emotion/react';

const GlobalStyles: React.FC = () => {
  return (
    <div>
      <Global
        styles={css`
        .global-class {
          color: hotpink !important;
        }
      `}
      />
      <Global
        styles={{
          '.global-class': {
            fontSize: 50,
            textAlign: 'center'
          }
        }}
      />
    </div>
  )
}

export default GlobalStyles
