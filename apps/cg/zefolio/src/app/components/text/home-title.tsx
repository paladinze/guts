import { Text } from '@react-three/drei';
import { forwardRef } from 'react';

const HomeTitle = forwardRef(({ outlineColor, text }: any, ref) => {
  return <group
    position={[-3.5, 0.75, 0.75]}
    rotation-y={1.3}
  >
    <Text
      ref={ref}
      font='assets/fonts/Bangers-Regular.ttf'
      fontSize={1.5}
      outlineWidth={0.05}
      outlineColor={outlineColor}
      outlineOpacity={0.7}
      maxWidth={2}
      textAlign={'center'}
    >
      {text}
    </Text>
  </group>;
});

export default HomeTitle;
