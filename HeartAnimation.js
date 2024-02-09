import React, {useEffect, useState} from 'react';
import { useTrail, animated } from 'react-spring';
import { FaHeart } from 'react-icons/fa';

const HeartAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  const hearts = Array.from({ length: 200 }).map((_, index) => ({
    id: index,
    x: Math.random() * window.innerWidth, 
    y: Math.random() * window.innerHeight,
    scale: Math.random() * 0.5 + 0.5, 
  }));

  const trail = useTrail(hearts.length, {
    from: { transform: 'translate3d(0px, 0px, 0) scale(0)', opacity: isVisible ? 1 : 0 },
    to: { transform: 'translate3d(0px, -500px, 0) scale(1)', opacity: isVisible ? 1 : 0 },
    config: { mass: 5, tension: 200, friction: 50 },
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.5)',
    delay: 200,
  });

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {trail.map((props, index) => (
        <animated.div
          key={hearts[index].id}
          style={{
            ...props,
            position: 'absolute',
            left: hearts[index].x + 'px',
            bottom: hearts[index].y + 'px',
            willChange: 'transform, opacity',
          }}
        >
          <FaHeart color="pink" size="24px" />
        </animated.div>
      ))}
    </>
  );
};

export default HeartAnimation;

// Esto va en el css
// .heart-animation-container {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   pointer-events: none;
//   z-index: 9999;
// }
// Esto va en el index.js o app.js
//  <div className="heart-animation-container">
//          <HeartAnimation />
//   </div>
  