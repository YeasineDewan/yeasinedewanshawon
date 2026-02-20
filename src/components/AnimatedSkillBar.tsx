import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@heroui/react';
import { Icon } from '@iconify/react';

interface AnimatedSkillBarProps {
  name: string;
  icon: string;
  level: number;
  color: string;
  delay?: number;
}

const AnimatedSkillBar: React.FC<AnimatedSkillBarProps> = ({ 
  name, 
  icon, 
  level, 
  color,
  delay = 0 
}) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const duration = 1500;
        const steps = 60;
        const increment = level / steps;
        let currentStep = 0;
        
        const animationTimer = setInterval(() => {
          currentStep++;
          setAnimatedLevel(Math.min(Math.round(increment * currentStep), level));
          
          if (currentStep >= steps) {
            clearInterval(animationTimer);
          }
        }, duration / steps);
        
        return () => clearInterval(animationTimer);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, level, delay]);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
      onViewportEnter={() => setIsVisible(true)}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-green-500 transition-all duration-300 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: color }}
            whileHover={{ 
              scale: 1.1,
              rotate: 360,
              boxShadow: `0 0 20px ${color}`
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon icon={icon} className="w-5 h-5 text-black" />
          </motion.div>
          <h3 className="font-semibold text-white">{name}</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Proficiency</span>
            <motion.span 
              style={{ color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ delay: delay + 0.5 }}
            >
              {animatedLevel}%
            </motion.span>
          </div>
          
          <div className="relative">
            <Progress 
              value={animatedLevel} 
              size="sm"
              className="h-3"
              color="success"
              style={{
                background: '#1a1a1a',
                boxShadow: animatedLevel > 0 ? `0 0 15px ${color}` : 'none'
              }}
            />
            
            {/* Animated glow effect */}
            {animatedLevel > 0 && (
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                  width: '20px',
                  filter: 'blur(8px)'
                }}
                animate={{
                  left: ['0%', '100%'],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </div>
          
          {/* Skill level indicators */}
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 h-1 rounded-full"
                style={{
                  backgroundColor: i < Math.ceil(level / 20) ? color : '#374151'
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ 
                  delay: delay + 0.1 + i * 0.05,
                  duration: 0.3,
                  transformOrigin: 'left'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedSkillBar;
