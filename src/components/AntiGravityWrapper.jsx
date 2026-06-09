import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const AntiGravityWrapper = ({
  children,
  speed = 'normal',
  drift = true,
  delay = 0,
  className = '',
  style = {}
}) => {
  const { antigravityIntensity, systemOnline } = useContext(AppContext);

  // Map speed presets to base seconds
  const speedMap = {
    slow: 12,
    normal: 6,
    fast: 3
  };

  const baseDuration = speedMap[speed] || 6;
  const isZero = !systemOnline || antigravityIntensity === 0;

  // Compute duration: higher intensity = faster bobbing
  const floatDuration = isZero ? 0 : baseDuration / antigravityIntensity;
  const driftDuration = isZero ? 0 : (baseDuration * 1.5) / antigravityIntensity;

  // Float animation styles
  const floatStyle = !isZero
    ? {
        animationName: 'float',
        animationDuration: `${floatDuration}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDelay: `${delay}s`,
        transition: 'transform 1s cubic-bezier(0.25, 0.8, 0.25, 1)'
      }
    : {
        transform: 'translateY(0px)',
        transition: 'transform 1.5s ease-out'
      };

  // Drift animation styles
  const driftStyle = !isZero && drift
    ? {
        animationName: 'drift',
        animationDuration: `${driftDuration}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDelay: `${delay * 0.5}s`,
        transition: 'transform 1s cubic-bezier(0.25, 0.8, 0.25, 1)'
      }
    : {
        transform: 'translateX(0px)',
        transition: 'transform 1.5s ease-out'
      };

  return (
    <div style={{ ...floatStyle, ...style }} className={className}>
      <div style={driftStyle}>
        {children}
      </div>
    </div>
  );
};

export default AntiGravityWrapper;
