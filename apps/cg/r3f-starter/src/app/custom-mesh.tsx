import { BufferGeometry, DoubleSide } from 'three';
import { useEffect, useMemo, useRef } from 'react';
import { Geometry } from 'three/examples/jsm/deprecated/Geometry';

const verticesCount = 10 * 3; // 10 triangles * 3 vertices


export default function CustomMesh(props: any) {
  const geoRef = useRef<BufferGeometry>(null!);

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 5;
    }
    return positions;
  }, []);

  useEffect(() => {
    geoRef.current.computeVertexNormals();
  }, []);

  return <mesh scale={1} {...props}>
    <bufferGeometry ref={geoRef}>
      <bufferAttribute
        attach='attributes-position'
        count={verticesCount}
        itemSize={3}
        array={positions}
      />
    </bufferGeometry>
    <meshStandardMaterial color='blue' side={DoubleSide} />
  </mesh>;
}
