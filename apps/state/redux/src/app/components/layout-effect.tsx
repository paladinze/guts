import { useLayoutEffect, useState } from 'react';


export default function WindowSizeMeasurement(props: {}) {
  const [winSize, setWinSize] = useState({width: 0, height: 0});

  useLayoutEffect(() => {
    const handleSizeChange = () => {
      setWinSize({ width: window.innerWidth, height: window.innerHeight});
    }
    handleSizeChange();

    window.addEventListener('resize', handleSizeChange);
    return () => {
      window.removeEventListener('resize', handleSizeChange);
    }

  }, [])

  return (
    <>
      <h2>Hook: useLayoutEffect</h2>
      <p>width: {winSize.width}</p>
      <p>width: {winSize.height}</p>
    </>
  )
}
