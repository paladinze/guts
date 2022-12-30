import { css } from '@emotion/react'
import React from 'react';

const cardCss = {
  self: css({
    backgroundColor: 'white',
    border: '1px solid #eee',
    borderRadius: '0.5rem',
    padding: '1rem',
    borderColor: `var(--border-color)`,
  }),

  title: css({
    fontSize: '1.25rem'
  })
}

interface CardProps {
  title: string;
  borderColor: string;
  children: React.ReactNode
}

export function Card({ title, children, borderColor }: CardProps) {
  return (
    <div css={cardCss.self} style={{ ['--border-color' as any]: borderColor}}>
      <h5 css={cardCss.title}>{title}</h5>
      {children}
    </div>
  )
}
