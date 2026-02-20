import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface NeonButtonProps {
  children: React.ReactNode;
  icon?: string;
  color: string;
  variant?: 'solid' | 'bordered' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  icon, 
  color,
  variant = 'solid',
  size = 'lg',
  href,
  onClick,
  className = ''
}) => {
  const baseClasses = `font-semibold transition-all duration-300 ${className}`;
  
  const getButtonStyle = () => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: color,
          color: '#000',
          boxShadow: `0 0 20px ${color}`,
          border: 'none'
        };
      case 'bordered':
        return {
          backgroundColor: 'transparent',
          color,
          borderColor: color,
          boxShadow: `0 0 10px ${color}`,
          borderWidth: '2px'
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color,
          boxShadow: `inset 0 0 20px ${color}20`,
          border: 'none'
        };
      default:
        return {
          backgroundColor: color,
          color: '#000',
          boxShadow: `0 0 20px ${color}`
        };
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => {
        // Add hover sound effect if needed
      }}
    >
      <Button
        as={href ? 'a' : 'button'}
        href={href}
        onClick={onClick}
        size={size}
        className={baseClasses}
        style={getButtonStyle()}
      >
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ x: 2 }}
        >
          {icon && (
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon icon={icon} className="w-5 h-5" />
            </motion.div>
          )}
          <span>{children}</span>
        </motion.div>
        
        {/* Animated glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${color}, transparent)`,
            filter: 'blur(20px)',
            opacity: 0
          }}
          whileHover={{
            opacity: 0.5,
            scale: 1.2
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Electric pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            border: `1px solid ${color}`,
            opacity: 0
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </Button>
    </motion.div>
  );
};

export default NeonButton;
