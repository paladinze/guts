import { css } from '@emotion/react'
import React from 'react';

const paragraph = css`
  color: blue;

  @media (max-width: 600px) {
    font-size: 50px;
    background-color: black;
  }

  header & {
    color: purple;
  }
`

export default function() {
  return (
    <div>
      <header>
        <p css={paragraph}>Nested inside a header</p>
      </header>
      <p css={paragraph}>Outside the header</p>
    </div>
  )
}
