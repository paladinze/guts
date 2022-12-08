import { useEffect, useLayoutEffect } from 'react';


export default function Lifecycle() {
  useEffect(() => {
    console.log('effect')
  });

  useLayoutEffect(() => {
    console.log('layout effect')
  })

  return <>
  </>
}
