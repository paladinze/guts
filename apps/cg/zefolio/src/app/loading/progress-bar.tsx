import { Html, useProgress } from '@react-three/drei'
import { useEffect, useRef } from 'react';

export default function ProgressBar() {
  const { active, loaded, total, progress, item } = useProgress()
  // console.table({ id: 'bar', active, loaded, total, progress })
  const loaderRef = useRef<HTMLDivElement | null>(null!);

  useEffect(() => {
    if (!loaderRef.current) return;
    setTimeout(() => {
      loaderRef.current!.style.width = `${progress}%`
    })
  }, [progress])

  return <Html fullscreen={true} wrapperClass="loading-bar-container">
    <div ref={loaderRef} className='loader'/>
  </Html>
}
