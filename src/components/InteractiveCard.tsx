import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';

interface InteractiveCardProps {
  title: string;
  description: string;
  icon: string;
  highlights: string[];
  color: string;
  delay?: number;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ 
  title, 
  description, 
  icon, 
  highlights, 
  color,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
      whileHover={{ 
        y: -15,
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300 }
      }}
      onHoverStart={() => {
        // Add hover sound effect or visual feedback
      }}
    >
      <Card 
        className="h-full bg-gray-900/50 backdrop-blur-sm border-2 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
        style={{ borderColor: color }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${color}, transparent)`,
          }}
          animate={{
            background: [
              `linear-gradient(135deg, ${color}, transparent)`,
              `linear-gradient(225deg, ${color}, transparent)`,
              `linear-gradient(135deg, ${color}, transparent)`,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <CardBody className="p-6 text-center relative z-10">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: color }}
            whileHover={{ 
              scale: 1.2, 
              rotate: 360,
              boxShadow: `0 0 30px ${color}`
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon icon={icon} className="w-8 h-8 text-black" />
          </motion.div>
          
          <motion.h3 
            className="text-xl font-bold mb-3"
            style={{ color: color }}
            whileHover={{ scale: 1.05 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-300 text-sm mb-4 leading-relaxed"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {description}
          </motion.p>
          
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
          >
            {highlights.map((highlight, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: delay + 0.1 + i * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  <Icon icon="lucide:check" className="w-4 h-4" style={{ color }} />
                </motion.div>
                <span className="text-xs text-gray-400">{highlight}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Floating particles effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: color,
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </motion.div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default InteractiveCard;
