import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  color: string;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ 
  testimonials, 
  color 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -300, scale: 0.8 }}
          transition={{ 
            duration: 0.6, 
            ease: 'easeInOut',
            type: 'spring',
            stiffness: 300
          }}
        >
          <Card 
            className="bg-gray-900/50 backdrop-blur-sm border-2 relative overflow-hidden group"
            style={{ 
              borderColor: color,
              boxShadow: `0 0 30px ${color}30`
            }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 opacity-10"
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
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <CardBody className="p-8 relative z-10">
              <div className="flex items-start gap-6">
                <motion.div 
                  className="text-6xl relative"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {testimonials[currentIndex].avatar}
                  
                  {/* Pulsing ring around avatar */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: color }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                
                <div className="flex-1">
                  <motion.div 
                    className="flex items-center gap-2 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                        whileHover={{ scale: 1.3, rotate: 360 }}
                      >
                        <Icon 
                          icon="lucide:star" 
                          className="w-5 h-5" 
                          style={{ 
                            color,
                            filter: `drop-shadow(0 0 5px ${color})`
                          }} 
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.blockquote 
                    className="text-lg text-gray-300 mb-6 italic leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{ textShadow: `0 0 10px ${color}40` }}
                  >
                    "{testimonials[currentIndex].content}"
                  </motion.blockquote>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="font-semibold text-white text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div 
                      className="text-sm font-medium"
                      style={{ color }}
                    >
                      {testimonials[currentIndex].role}
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Floating quote marks */}
              <motion.div
                className="absolute top-4 right-4 text-6xl opacity-20"
                style={{ color }}
                animate={{
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                "
              </motion.div>
            </CardBody>
          </Card>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-6">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            isIconOnly
            variant="bordered"
            onClick={prevTestimonial}
            className="border-2"
            style={{ 
              borderColor: color,
              color,
              boxShadow: `0 0 10px ${color}`
            }}
          >
            <Icon icon="lucide:chevron-left" className="w-5 h-5" />
          </Button>
        </motion.div>
        
        {/* Dots Indicator */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'w-8' : 'w-2'
              }`}
              style={{
                backgroundColor: currentIndex === index ? color : '#4a4a4a',
                boxShadow: currentIndex === index ? `0 0 10px ${color}` : 'none'
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            isIconOnly
            variant="bordered"
            onClick={nextTestimonial}
            className="border-2"
            style={{ 
              borderColor: color,
              color,
              boxShadow: `0 0 10px ${color}`
            }}
          >
            <Icon icon="lucide:chevron-right" className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
      
      {/* Auto-play indicator */}
      <div className="flex justify-center mt-4">
        <motion.div
          className="flex gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: isAutoPlaying ? 1 : 0.3 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: color }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
