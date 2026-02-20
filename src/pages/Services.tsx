import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardBody, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import NeonButton from '../components/NeonButton';
import FloatingParticles from '../components/FloatingParticles';

// Neon color palette
const neonColors = {
  darkGreen: '#059212',
  neonGreen: '#06D001',
  lightYellow: '#F3FF90',
  lime: '#9BEC00'
};

interface ServicePack {
  id: string;
  name: string;
  icon: string;
  originalPrice: number;
  currentPrice: number;
  renewalPrice: number;
  features: string[];
  color: string;
  description: string;
  deliverables: string[];
  timeline: string;
  popular?: boolean;
  badge?: string;
}

const servicePacks: ServicePack[] = [
  {
    id: 'basic',
    name: 'Starter Pack',
    icon: 'lucide:rocket',
    originalPrice: 12000,
    currentPrice: 8000,
    renewalPrice: 2000,
    color: 'blue',
    features: [
      'Basic website development',
      'Mobile responsive design',
      'Contact form integration',
      'Basic SEO optimization',
      '1 month support'
    ],
    description: 'Perfect for small businesses and startups looking to establish their online presence with a professional website.',
    deliverables: [
      'Responsive website design (5-7 pages)',
      'Mobile-first development',
      'Contact form with email integration',
      'Basic SEO setup',
      'Google Analytics integration',
      'Social media links',
      '1 month free support & maintenance'
    ],
    timeline: '2-3 weeks',
    badge: 'Most Popular'
  },
  {
    id: 'professional',
    name: 'Business Pack',
    icon: 'lucide:shield-check',
    originalPrice: 20000,
    currentPrice: 15000,
    renewalPrice: 4000,
    color: 'green',
    features: [
      'Advanced website development',
      'E-commerce integration',
      'Penetration testing',
      'Advanced security features',
      '3 months support'
    ],
    description: 'Comprehensive solution for growing businesses needing advanced features and robust security.',
    deliverables: [
      'Advanced website development (10-15 pages)',
      'E-commerce functionality',
      'Content Management System',
      'Security audit & penetration testing',
      'Advanced SEO optimization',
      'Performance optimization',
      'Database integration',
      '3 months support & maintenance'
    ],
    timeline: '4-6 weeks',
    popular: true
  },
  {
    id: 'premium',
    name: 'Enterprise Pack',
    icon: 'lucide:crown',
    originalPrice: 35000,
    currentPrice: 25000,
    renewalPrice: 6000,
    color: 'purple',
    features: [
      'Full-stack development',
      'Custom web applications',
      'Complete cybersecurity',
      'Advanced security audits',
      '6 months support'
    ],
    description: 'Full-stack enterprise solution with custom applications and comprehensive cybersecurity measures.',
    deliverables: [
      'Custom web application development',
      'Full-stack architecture (Frontend + Backend + API)',
      'Complete cybersecurity assessment',
      'Advanced security implementations',
      'Custom dashboard & analytics',
      'API development & integration',
      '6 months priority support & maintenance'
    ],
    timeline: '6-8 weeks'
  }
];

const Services: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const heroRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const pricingInView = useInView(pricingRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const getColorValue = (color: string) => {
    switch (color) {
      case 'blue': return '#3B82F6';
      case 'green': return neonColors.neonGreen;
      case 'purple': return '#8B5CF6';
      default: return neonColors.lime;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Particles */}
      <FloatingParticles count={25} colors={[neonColors.neonGreen, neonColors.lime, neonColors.lightYellow]} />

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10"
      >
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950 to-black opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-lime-900/20" />
          
          <div className="relative z-10 container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={heroInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={heroInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="inline-block"
                >
                  <Chip 
                    className="px-4 py-2 text-sm font-semibold"
                    style={{ 
                      backgroundColor: neonColors.neonGreen,
                      color: '#000',
                      boxShadow: `0 0 20px ${neonColors.neonGreen}`
                    }}
                  >
                    <Icon icon="lucide:zap" className="mr-2" />
                    Professional Services
                  </Chip>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold leading-tight"
                  initial={{ y: 50, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <span className="block" style={{ color: neonColors.lightYellow }}>
                    Digital Solutions
                  </span>
                  <span 
                    className="block"
                    style={{ 
                      background: `linear-gradient(135deg, ${neonColors.neonGreen}, ${neonColors.lime})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: `drop-shadow(0 0 30px ${neonColors.neonGreen})`
                    }}
                  >
                    Tailored for You
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 leading-relaxed"
                  initial={{ y: 30, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  From basic websites to enterprise applications, I provide comprehensive development and cybersecurity solutions tailored to your business needs.
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ y: 30, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <NeonButton 
                    icon="lucide:phone"
                    color={neonColors.neonGreen}
                    href="/contact"
                  >
                    Get Quote
                  </NeonButton>
                  
                  <NeonButton 
                    icon="lucide:calendar"
                    color={neonColors.lime}
                    variant="bordered"
                    href="/contact"
                  >
                    Schedule Consultation
                  </NeonButton>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={heroInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                className="relative"
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div 
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${neonColors.neonGreen}, ${neonColors.lime})`,
                      filter: 'blur(40px)',
                      opacity: 0.3
                    }}
                  />
                  <motion.div
                    className="relative z-10 w-full h-96 rounded-2xl overflow-hidden border-2"
                    style={{ borderColor: neonColors.neonGreen }}
                    whileHover={{ borderColor: neonColors.lime }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-80" />
                    <div className="relative z-20 p-8 h-full flex flex-col justify-center">
                      <motion.div
                        className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: neonColors.neonGreen }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Icon icon="lucide:settings" className="w-8 h-8 text-black" />
                      </motion.div>
                      
                      <motion.div className="space-y-4">
                        {[
                          { icon: 'lucide:code', text: 'Custom Development' },
                          { icon: 'lucide:shield', text: 'Security First' },
                          { icon: 'lucide:zap', text: 'Fast Delivery' }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                          >
                            <motion.div
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: neonColors.lime }}
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ type: 'spring', stiffness: 300 }}
                            >
                              <Icon icon={item.icon} className="w-5 h-5 text-black" />
                            </motion.div>
                            <span className="text-gray-300">{item.text}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Pricing Section */}
      <motion.div 
        ref={pricingRef}
        className="relative z-10 py-20"
        initial={{ opacity: 0 }}
        animate={pricingInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={pricingInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span style={{ color: neonColors.lightYellow }}>Service</span>{' '}
              <span 
                style={{ 
                  background: `linear-gradient(135deg, ${neonColors.neonGreen}, ${neonColors.lime})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Packages
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect package for your business needs. All packages include security-first development and ongoing support.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicePacks.map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ y: 50, opacity: 0 }}
                animate={pricingInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -20, scale: 1.02 }}
              >
                <Card 
                  className={`relative bg-gray-900/50 backdrop-blur-sm border-2 hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                    pack.popular ? 'ring-4' : ''
                  }`}
                  style={{ 
                    borderColor: getColorValue(pack.color)
                  }}
                >
                  {/* Popular Badge */}
                  {pack.popular && (
                    <motion.div
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 rounded-full text-black font-bold text-sm"
                      style={{ backgroundColor: neonColors.lightYellow }}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                    >
                      <Icon icon="lucide:star" className="inline mr-1 w-4 h-4" />
                      Most Popular
                    </motion.div>
                  )}

                  <CardHeader className="pb-0 pt-8">
                    <motion.div
                      className="text-center mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
                    >
                      <motion.div
                        className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: getColorValue(pack.color) }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Icon icon={pack.icon} className="w-8 h-8 text-white" />
                      </motion.div>
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-2" style={{ color: neonColors.lightYellow }}>
                      {pack.name}
                    </h3>
                    
                    <div className="text-center mb-4">
                      <div className="text-gray-400 line-through text-sm">
                        ${pack.originalPrice.toLocaleString()}
                      </div>
                      <div className="text-3xl font-bold" style={{ color: getColorValue(pack.color) }}>
                        ${pack.currentPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">
                        ${pack.renewalPrice.toLocaleString()}/year renewal
                      </div>
                    </div>
                  </CardHeader>

                  <CardBody className="pt-0">
                    <motion.p 
                      className="text-gray-300 text-sm mb-6 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    >
                      {pack.description}
                    </motion.p>

                    <div className="space-y-3 mb-6">
                      {pack.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 + i * 0.05, duration: 0.8 }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          >
                            <Icon icon="lucide:check" className="w-4 h-4" style={{ color: getColorValue(pack.color) }} />
                          </motion.div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      className="text-center mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                    >
                      <div className="text-sm text-gray-400 mb-2">Timeline</div>
                      <div 
                        className="text-lg font-semibold"
                        style={{ color: getColorValue(pack.color) }}
                      >
                        {pack.timeline}
                      </div>
                    </motion.div>
                  </CardBody>

                  <div className="p-6 pt-0">
                    <motion.div
                      className="w-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <NeonButton
                        icon="lucide:shopping-cart"
                        color={getColorValue(pack.color)}
                        onClick={() => {
                          setSelectedPack(pack.id);
                          onOpen();
                        }}
                        className="w-full"
                      >
                        Choose Package
                      </NeonButton>
                    </motion.div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${getColorValue(pack.color)}10, transparent)`,
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    animate={{
                      background: [
                        `radial-gradient(circle at center, ${getColorValue(pack.color)}10, transparent)`,
                        `radial-gradient(circle at 30% 30%, ${getColorValue(pack.color)}15, transparent)`,
                        `radial-gradient(circle at center, ${getColorValue(pack.color)}10, transparent)`,
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Package Details Modal */}
      <AnimatePresence>
        {selectedPack && (
          <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            size="2xl"
            className="bg-black/90 backdrop-blur-md"
          >
            <ModalContent className="bg-gray-900 text-white border-2" style={{ borderColor: neonColors.neonGreen }}>
              <ModalHeader className="border-b" style={{ borderColor: `${neonColors.neonGreen}33` }}>
                <motion.h2 
                  className="text-2xl font-bold"
                  style={{ color: neonColors.lightYellow }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {servicePacks.find(p => p.id === selectedPack)?.name} - Details
                </motion.h2>
              </ModalHeader>
              
              <ModalBody className="py-6">
                {selectedPack && (() => {
                  const pack = servicePacks.find(p => p.id === selectedPack)!;
                  return (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3" style={{ color: getColorValue(pack.color) }}>
                          What's Included
                        </h3>
                        <div className="space-y-3">
                          {pack.deliverables.map((item, i) => (
                            <motion.div
                              key={i}
                              className="flex items-start gap-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.1, duration: 0.8 }}
                            >
                              <Icon icon="lucide:check-circle" className="w-5 h-5 mt-0.5" style={{ color: getColorValue(pack.color) }} />
                              <span className="text-gray-300">{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm text-gray-400 mb-2">Timeline</h4>
                          <div className="text-xl font-semibold" style={{ color: getColorValue(pack.color) }}>
                            {pack.timeline}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm text-gray-400 mb-2">Support</h4>
                          <div className="text-xl font-semibold" style={{ color: getColorValue(pack.color) }}>
                            {pack.features.find(f => f.includes('support'))?.split(' ')[0] || 'Basic'}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </ModalBody>
              
              <ModalFooter className="border-t" style={{ borderColor: `${neonColors.neonGreen}33` }}>
                <div className="flex gap-4 w-full">
                  <NeonButton
                    icon="lucide:x"
                    color="gray"
                    variant="bordered"
                    onClick={() => onOpenChange(false)}
                  >
                    Close
                  </NeonButton>
                  <NeonButton
                    icon="lucide:phone"
                    color={neonColors.neonGreen}
                    href="/contact"
                    className="flex-1"
                  >
                    Get Started
                  </NeonButton>
                </div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
