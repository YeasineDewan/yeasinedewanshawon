import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface AnimatedCounterProps {
  target: number;
  label: string;
  icon: string;
  color: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  target, 
  label, 
  icon, 
  color,
  suffix = '+',
  duration = 2000,
  delay = 0 
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const steps = 60;
        const increment = target / steps;
        let currentStep = 0;
        
        const counter = setInterval(() => {
          currentStep++;
          setCount(Math.min(Math.round(increment * currentStep), target));
          
          if (currentStep >= steps) {
            clearInterval(counter);
          }
        }, duration / steps);
        
        return () => clearInterval(counter);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, target, duration, delay]);

  return (
    <motion.div
      className="text-center"
      initial={{ y: 50, opacity: 0, scale: 0.5 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      onViewportEnter={() => setIsVisible(true)}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay, duration: 0.8, type: 'spring' }}
      whileHover={{ 
        scale: 1.1,
        rotateY: 180,
        transition: { type: 'spring', stiffness: 300 }
      }}
      style={{ perspective: '1000px' }}
    >
      <motion.div 
        className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center relative"
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}80)`,
          boxShadow: `0 0 30px ${color}`
        }}
        whileHover={{ 
          scale: 1.2,
          rotate: 360,
          boxShadow: `0 0 50px ${color}`
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Icon icon={icon} className="w-10 h-10 text-black" />
        
        {/* Orbiting particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
            animate={{
              rotate: [0, 360],
              translateX: '30px'
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1
            }}
          />
        ))}
      </motion.div>
      
      <motion.div 
        className="text-5xl font-bold mb-2"
        style={{ 
          color,
          textShadow: `0 0 20px ${color}`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: delay + 0.3 }}
      >
        {count}
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.5, type: 'spring' }}
        >
          {suffix}
        </motion.span>
      </motion.div>
      
      <motion.div 
        className="text-gray-300 text-sm font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.4 }}
      >
        {label}
      </motion.div>
      
      {/* Celebration effect when counter completes */}
      {count === target && isVisible && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ 
                backgroundColor: color,
                left: '50%',
                top: '50%'
              }}
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 50],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 50],
                opacity: [1, 0]
              }}
              transition={{ duration: 0.8 }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedCounter;
