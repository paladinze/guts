import React from 'react';
import { css } from '@emotion/react';

const breakpoints = [576, 768, 992, 1200]

const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`)

const Temp: React.FC = () => {
  return (
    <div>
      <div
        css={{
          color: 'green',
          [mq[0]]: {
            color: 'gray'
          },
          [mq[1]]: {
            color: 'hotpink'
          }
        }}
      >
        Media query (object CSS style)
      </div>
      <p
        css={css`
        color: green;
        ${mq[0]} {
          color: gray;
        }
        ${mq[1]} {
          color: hotpink;
        }
      `}
      >
        Media query (tag template string CSS style)
      </p>
    </div>
  )
}

export default Temp
