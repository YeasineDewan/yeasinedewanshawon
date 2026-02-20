import React from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
  className?: string;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({ 
  count = 30,
  colors = ['#06D001', '#9BEC00', '#F3FF90', '#059212'],
  className = ''
}) => {
  const particles: Particle[] = React.useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)]
    })),
    [count, colors]
  );

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 1, 0.8, 0],
            scale: [1, Math.random() * 0.5 + 0.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: particle.delay,
            ease: 'easeInOut'
          }}
        />
      ))}
      
      {/* Connection lines between nearby particles */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.slice(0, 10).map((particle, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${particle.x}%`}
            y1={`${particle.y}%`}
            x2={`${particles[(i + 1) % 10].x}%`}
            y2={`${particles[(i + 1) % 10].y}%`}
            stroke={particle.color}
            strokeWidth="0.5"
            opacity="0.3"
            animate={{
              opacity: [0.3, 0.1, 0.3],
              stroke: [particle.color, colors[(i + 1) % colors.length], particle.color]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut'
            }}
          />
        ))}
      </svg>
      
      {/* Glowing orbs */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
            width: '100px',
            height: '100px',
            background: `radial-gradient(circle, ${colors[i % colors.length]}40, transparent)`,
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
