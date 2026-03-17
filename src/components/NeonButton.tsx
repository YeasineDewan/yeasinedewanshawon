import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { neonColors } from '../theme/theme';
import { Link } from 'react-router-dom';

interface NeonButtonProps {
  children: React.ReactNode;
  icon?: string;
  color?: string;
  variant?: 'solid' | 'bordered' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  external?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  icon, 
  color = neonColors.neonGreen,
  variant = 'solid',
  size = 'lg',
  href,
  to,
  external = false,
  disabled = false,
  type = 'button',
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

  const isLink = Boolean(href || to);
  const isExternalLink = external || (href ? /^https?:\/\//i.test(href) : false);

  const motionVariants = {
    rest: { scale: 1 },
    hover: { scale: disabled ? 1 : 1.03 },
    tap: { scale: disabled ? 1 : 0.98 },
  } as const;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={motionVariants}
    >
      <Button
        as={to ? Link : href ? 'a' : 'button'}
        // react-router Link prop
        {...(to ? { to } : {})}
        // anchor props
        {...(href ? { href } : {})}
        {...(href && isExternalLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onClick={onClick}
        size={size}
        type={!isLink ? type : undefined}
        isDisabled={disabled}
        className={`relative overflow-hidden ${baseClasses}`}
        style={getButtonStyle()}
      >
        <motion.div
          className="flex items-center gap-2"
          variants={{
            rest: { x: 0 },
            hover: { x: disabled ? 0 : 2 },
          }}
        >
          {icon && (
            <motion.div
              animate={disabled ? undefined : { rotate: [0, 10, -10, 0] }}
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
          variants={{
            rest: { opacity: 0, scale: 1 },
            hover: { opacity: disabled ? 0 : 0.45, scale: disabled ? 1 : 1.15 },
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
          animate={
            disabled
              ? undefined
              : {
                  opacity: [0, 1, 0],
                  scale: [1, 1.08, 1],
                }
          }
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
