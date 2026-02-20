import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';

interface CertificationCardProps {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  icon: string;
  color: string;
  delay?: number;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ 
  name, 
  issuer, 
  date, 
  credentialId, 
  icon, 
  color,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0, rotateY: -90 }}
      animate={{ y: 0, opacity: 1, rotateY: 0 }}
      transition={{ delay, duration: 0.8, type: 'spring' }}
      whileHover={{ 
        y: -10,
        scale: 1.05,
        rotateX: 5,
        transition: { type: 'spring', stiffness: 300 }
      }}
      style={{ perspective: '1000px' }}
    >
      <Card 
        className="h-full bg-gray-900/50 backdrop-blur-sm border-2 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
        style={{ 
          borderColor: color,
          boxShadow: `0 0 20px ${color}20`
        }}
      >
        {/* Neon glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${color}, transparent)`,
            filter: 'blur(20px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <CardBody className="p-6 text-center relative z-10">
          <motion.div
            className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center relative"
            style={{ backgroundColor: color }}
            whileHover={{ 
              scale: 1.1,
              rotate: 360,
              boxShadow: `0 0 40px ${color}`
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon icon={icon} className="w-10 h-10 text-black" />
            
            {/* Pulsing ring effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: color }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          <motion.h3 
            className="text-lg font-bold mb-2 text-white"
            style={{ textShadow: `0 0 10px ${color}` }}
            whileHover={{ scale: 1.05 }}
          >
            {name}
          </motion.h3>
          
          <motion.div 
            className="space-y-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
          >
            <div className="flex items-center justify-center gap-2">
              <Icon icon="lucide:building" className="w-4 h-4" style={{ color }} />
              <span className="text-sm text-gray-300">{issuer}</span>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Icon icon="lucide:calendar" className="w-4 h-4" style={{ color }} />
              <span className="text-sm text-gray-300">{date}</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.5 }}
          >
            <Chip
              size="sm"
              className="text-xs font-mono"
              style={{
                backgroundColor: color,
                color: '#000',
                boxShadow: `0 0 10px ${color}`
              }}
            >
              {credentialId}
            </Chip>
          </motion.div>
          
          {/* Floating particles */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: color,
                  left: `${10 + i * 25}%`,
                  top: `${20 + i * 15}%`
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4
                }}
              />
            ))}
          </motion.div>
          
          {/* Verification badge */}
          <motion.div
            className="absolute top-2 right-2"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: delay + 0.7, type: 'spring' }}
            whileHover={{ scale: 1.2, rotate: 360 }}
          >
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              <Icon icon="lucide:check" className="w-3 h-3 text-black" />
            </div>
          </motion.div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default CertificationCard;
