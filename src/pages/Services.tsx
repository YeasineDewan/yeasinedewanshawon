import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardBody, Button, Chip, Progress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

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
      'Cloud deployment & DevOps setup',
      'Advanced analytics dashboard',
      'API development & integration',
      '6 months premium support & maintenance',
      'Training & documentation'
    ],
    timeline: '8-12 weeks',
    badge: 'Best Value'
  }
];

// Color mapping function for dynamic classes
const getColorClasses = (color: string) => {
  const colorMap: { [key: string]: { bg: string; text: string; border: string; gradient: string } } = {
    blue: { 
      bg: 'from-blue-500 to-cyan-500', 
      text: 'text-blue-500', 
      border: 'border-blue-200',
      gradient: 'from-blue-50 to-cyan-50'
    },
    green: { 
      bg: 'from-green-500 to-emerald-500', 
      text: 'text-green-500', 
      border: 'border-green-200',
      gradient: 'from-green-50 to-emerald-50'
    },
    purple: { 
      bg: 'from-purple-500 to-pink-500', 
      text: 'text-purple-500', 
      border: 'border-purple-200',
      gradient: 'from-purple-50 to-pink-50'
    }
  };
  return colorMap[color] || colorMap.blue;
};

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO at TechStart',
    content: 'Exceptional service! Our new website has increased conversions by 40%. The security audit gave us complete confidence.',
    avatar: '👩‍💼',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Founder of InnovateCo',
    content: 'Professional, reliable, and delivered beyond expectations. The custom web application transformed our business operations.',
    avatar: '👨‍💻',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    content: 'The e-commerce solution is flawless. Great attention to detail and ongoing support has been invaluable.',
    avatar: '👩‍🎨',
    rating: 5
  }
];

// FAQ data
const faqs = [
  {
    question: 'What is included in the maintenance support?',
    answer: 'Maintenance includes bug fixes, security updates, performance optimization, content updates (up to 2 hours/month), and technical support via email and scheduled calls.'
  },
  {
    question: 'Can I customize the service packages?',
    answer: 'Yes! All packages can be tailored to your specific needs. Contact me for a custom quote based on your requirements.'
  },
  {
    question: 'How long does the development process take?',
    answer: 'Timeline varies by package: Starter Pack (2-3 weeks), Business Pack (4-6 weeks), Enterprise Pack (8-12 weeks). Rush delivery options available.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'I accept bank transfers, credit cards, and digital payment methods. Payment plans are available for larger projects.'
  }
];

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedDeliverables, setExpandedDeliverables] = useState<string | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });;
  const pricingInView = useInView(pricingRef, { once: true, margin: '-100px' });;
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });;
  
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const activePack = servicePacks.find(pack => pack.id === activeTab);
  const colors = activePack ? getColorClasses(activePack.color) : getColorClasses('blue');
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const handleDeliverablesToggle = (packId: string) => {
    setExpandedDeliverables(expandedDeliverables === packId ? null : packId);
  };
  
  const handleFaqToggle = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>
      
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 container mx-auto px-4 py-16 max-w-7xl"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            animate={heroInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="p-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl">
              <Icon icon="lucide:sparkles" className="text-6xl text-white" />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Premium Services
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transform your digital presence with cutting-edge web development and cybersecurity solutions.
            <br />
            <span className="text-lg text-gray-500">Tailored packages designed for businesses that demand excellence.</span>
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Chip color="primary" variant="flat" size="lg" className="px-4 py-2">
              <Icon icon="lucide:users" className="mr-2" />
              50+ Happy Clients
            </Chip>
            <Chip color="success" variant="flat" size="lg" className="px-4 py-2">
              <Icon icon="lucide:clock" className="mr-2" />
              24/7 Support
            </Chip>
            <Chip color="warning" variant="flat" size="lg" className="px-4 py-2">
              <Icon icon="lucide:award" className="mr-2" />
              100% Satisfaction
            </Chip>
            <Chip color="danger" variant="flat" size="lg" className="px-4 py-2">
              <Icon icon="lucide:shield-check" className="mr-2" />
              Security First
            </Chip>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Tab Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 max-w-7xl"
      >
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200">
            {servicePacks.map((pack, index) => (
              <motion.button
                key={pack.id}
                onClick={() => setActiveTab(pack.id)}
                className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === pack.id
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeTab === pack.id && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${getColorClasses(pack.color).bg} rounded-xl`}
                    layoutId="activeTab"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon icon={pack.icon} className="text-xl" />
                  {pack.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Pricing Cards Section */}
      <motion.div 
        ref={pricingRef}
        className="relative z-10 container mx-auto px-4 max-w-7xl mb-20"
      >
        <AnimatePresence mode="wait">
          {activePack && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Main Service Card */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -50 }}
                animate={pricingInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <Card className={`h-full bg-gradient-to-br ${colors.gradient} border-2 ${colors.border} hover:shadow-2xl transition-all duration-500 overflow-hidden group`}>
                  {/* Badge */}
                  {activePack.badge && (
                    <motion.div 
                      className="absolute top-4 right-4 z-20"
                      initial={{ scale: 0 }}
                      animate={pricingInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.3, type: 'spring' }}
                    >
                      <Chip 
                        color="warning" 
                        variant="solid" 
                        size="sm"
                        className="px-3 py-1 font-semibold"
                      >
                        <Icon icon="lucide:star" className="mr-1" />
                        {activePack.badge}
                      </Chip>
                    </motion.div>
                  )}
                  
                  <CardHeader className="text-center pb-6 pt-8">
                    <motion.div 
                      className="flex justify-center mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className={`p-6 bg-gradient-to-r ${colors.bg} rounded-3xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300`}>
                        <Icon icon={activePack.icon} width="48" height="48" className="text-white" />
                      </div>
                    </motion.div>
                    <h2 className={`text-4xl font-bold mb-3 ${colors.text}`}>{activePack.name}</h2>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                      {activePack.description}
                    </p>
                  </CardHeader>
                  
                  <CardBody className="space-y-8 px-8">
                    {/* Features List */}
                    <div>
                      <h3 className="text-xl font-semibold mb-6 text-gray-800">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activePack.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={pricingInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                            className="flex items-start gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm"
                          >
                            <Icon icon="lucide:check-circle" className={`w-5 h-5 ${colors.text} mt-0.5 flex-shrink-0`} />
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Expandable Deliverables */}
                    <div>
                      <motion.button
                        onClick={() => handleDeliverablesToggle(activePack.id)}
                        className="flex items-center justify-between w-full text-left mb-4 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h3 className="text-xl font-semibold text-gray-800">What You'll Get</h3>
                        <motion.div
                          animate={{ rotate: expandedDeliverables === activePack.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon icon="lucide:chevron-down" className="text-gray-500" />
                        </motion.div>
                      </motion.button>
                      
                      <AnimatePresence>
                        {expandedDeliverables === activePack.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-white/70 rounded-xl p-6 backdrop-blur-sm border border-gray-200">
                              <ul className="space-y-3">
                                {activePack.deliverables.map((deliverable, index) => (
                                  <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                    className="flex items-start gap-3"
                                  >
                                    <Icon icon="lucide:package" className={`w-4 h-4 ${colors.text} mt-1 flex-shrink-0`} />
                                    <span className="text-gray-700 text-sm">{deliverable}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                      <Icon icon="lucide:clock" className={`w-5 h-5 ${colors.text}`} />
                      <span className="font-semibold text-gray-800">Timeline:</span>
                      <span className="text-gray-600">{activePack.timeline}</span>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Pricing Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={pricingInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <Card className="h-full bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg}`} />
                  </div>
                  
                  <CardHeader className="text-center pb-4 pt-8 relative z-10">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Investment</h3>
                    <div className="space-y-4">
                      {/* Animated Price Display */}
                      <motion.div 
                        className="text-center"
                        initial={{ scale: 0.8 }}
                        animate={pricingInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                      >
                        {activePack.originalPrice > activePack.currentPrice && (
                          <div className="flex justify-center items-center gap-2 mb-2">
                            <span className="text-gray-400 line-through text-lg">
                              ৳{activePack.originalPrice.toLocaleString()}
                            </span>
                            <Chip color="danger" size="sm" variant="flat">
                              Save {Math.round(((activePack.originalPrice - activePack.currentPrice) / activePack.originalPrice) * 100)}%
                            </Chip>
                          </div>
                        )}
                        <div className="flex justify-center items-baseline gap-2">
                          <span className="text-5xl font-bold text-gray-800">
                            ৳{activePack.currentPrice.toLocaleString()}
                          </span>
                          <span className="text-gray-500 text-lg">/project</span>
                        </div>
                      </motion.div>
                      
                      {activePack.renewalPrice > 0 && (
                        <motion.div 
                          className="text-center p-3 bg-gray-50 rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={pricingInView ? { opacity: 1 } : {}}
                          transition={{ delay: 0.6, duration: 0.5 }}
                        >
                          <p className="text-sm text-gray-600">
                            <Icon icon="lucide:refresh-cw" className="inline mr-1" />
                            Renewal: ৳{activePack.renewalPrice.toLocaleString()}/year
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardBody className="space-y-6 px-6 relative z-10">
                    {/* Progress indicator */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ width: 0 }}
                      animate={pricingInView ? { width: '100%' } : {}}
                      transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }}
                    >
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Project Complexity</span>
                        <span>{activePack.id === 'basic' ? 'Basic' : activePack.id === 'professional' ? 'Advanced' : 'Enterprise'}</span>
                      </div>
                      <Progress 
                        value={activePack.id === 'basic' ? 30 : activePack.id === 'professional' ? 70 : 100} 
                        color={activePack.color === 'blue' ? 'primary' : activePack.color === 'green' ? 'success' : 'secondary'}
                        size="sm"
                        className="h-2"
                      />
                    </motion.div>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          color="primary" 
                          size="lg"
                          className={`w-full bg-gradient-to-r ${colors.bg} hover:shadow-lg transition-all duration-300 font-semibold`}
                          as="a"
                          href="/contact"
                        >
                          <Icon icon="lucide:rocket" className="mr-2" />
                          Get Started Now
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          color="default" 
                          variant="bordered"
                          size="lg"
                          className="w-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                          onClick={onOpen}
                        >
                          <Icon icon="lucide:calendar" className="mr-2" />
                          Schedule Consultation
                        </Button>
                      </motion.div>
                    </div>

                    {/* Trust indicators */}
                    <motion.div 
                      className="flex justify-center gap-4 pt-4"
                      initial={{ opacity: 0 }}
                      animate={pricingInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <div className="text-center">
                        <Icon icon="lucide:shield-check" className="w-6 h-6 text-green-500 mx-auto mb-1" />
                        <span className="text-xs text-gray-600">Secure</span>
                      </div>
                      <div className="text-center">
                        <Icon icon="lucide:headphones" className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                        <span className="text-xs text-gray-600">Support</span>
                      </div>
                      <div className="text-center">
                        <Icon icon="lucide:award" className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                        <span className="text-xs text-gray-600">Quality</span>
                      </div>
                    </motion.div>
                  </CardBody>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        ref={testimonialsRef}
        className="relative z-10 container mx-auto px-4 max-w-7xl mb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            What Clients Say
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Don't just take my word for it - hear from businesses I've helped transform
          </motion.p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Card className="bg-white border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardBody className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="text-6xl">{testimonials[currentTestimonial].avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Icon key={i} icon="lucide:star" className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-lg text-gray-700 mb-6 italic">
                        "{testimonials[currentTestimonial].content}"
                      </blockquote>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                        <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </AnimatePresence>
          
          {/* Testimonial Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentTestimonial === index ? 'bg-blue-500 w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 max-w-4xl mb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Got questions? I've got answers
          </motion.p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={testimonialsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            >
              <Card className="bg-white border border-gray-200 hover:border-blue-300 transition-colors duration-300">
                <CardBody className="p-6">
                  <motion.button
                    onClick={() => handleFaqToggle(index)}
                    className="flex items-center justify-between w-full text-left group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon icon="lucide:chevron-down" className="text-gray-500 group-hover:text-blue-600 transition-colors" />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-4"
                      >
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Custom Solution CTA */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 max-w-4xl mb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-0 shadow-2xl">
          <CardBody className="p-12 text-center">
            <motion.h2 
              className="text-4xl font-bold text-white mb-6"
              initial={{ scale: 0.8 }}
              animate={testimonialsInView ? { scale: 1 } : {}}
              transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
            >
              Need a Custom Solution?
            </motion.h2>
            <motion.p 
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={testimonialsInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Every business is unique. Let's discuss your specific requirements and create a tailored solution that perfectly fits your needs and budget.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
                as="a"
                href="/contact"
              >
                <Icon icon="lucide:message-square" className="mr-2" />
                Get Custom Quote
              </Button>
            </motion.div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Consultation Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl font-bold">
                <Icon icon="lucide:calendar" className="mr-2" />
                Schedule a Consultation
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  <p className="text-gray-600">
                    Let's discuss your project requirements and find the perfect solution for your business.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Icon icon="lucide:users" className="w-8 h-8 text-blue-500 mb-2" />
                      <h4 className="font-semibold text-gray-800 mb-1">Free 30-Minute Call</h4>
                      <p className="text-sm text-gray-600">Discuss your project needs and get expert recommendations</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <Icon icon="lucide:file-text" className="w-8 h-8 text-green-500 mb-2" />
                      <h4 className="font-semibold text-gray-800 mb-1">No-Obligation Quote</h4>
                      <p className="text-sm text-gray-600">Receive a detailed proposal tailored to your requirements</p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      <Icon icon="lucide:clock" className="inline mr-2" />
                      Response Time
                    </h4>
                    <p className="text-sm text-yellow-700">
                      I typically respond within 24 hours. For urgent inquiries, please mention it in your message.
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Maybe Later
                </Button>
                <Button 
                  color="primary" 
                  className="bg-gradient-to-r from-blue-500 to-purple-500"
                  onPress={onClose}
                  as="a"
                  href="/contact"
                >
                  Schedule Now
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Services;
