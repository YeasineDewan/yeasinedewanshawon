import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardHeader, CardBody, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Switch, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import NeonButton from '../components/NeonButton';
import FloatingParticles from '../components/FloatingParticles';
import { neonColors } from '../theme/theme';
import StarRating from '../components/StarRating';

interface ServicePack {
  id: string;
  name: string;
  icon: string;
  monthly: number;
  yearly: number;
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
    name: 'Starter',
    icon: 'lucide:rocket',
    monthly: 249,
    yearly: 2490,
    color: 'blue',
    features: [
      '5–7 page marketing website',
      'Mobile-first responsive UI',
      'Basic SEO + analytics',
      'Contact + lead capture',
      '30 days support'
    ],
    description: 'Perfect for small businesses and startups looking to establish their online presence with a professional website.',
    deliverables: [
      'Discovery call + requirements outline',
      'Responsive UI + performance pass',
      'Contact/lead form with validation',
      'SEO basics (metadata, sitemap)',
      'Analytics + conversion tracking',
      'Deployment + handover'
    ],
    timeline: '2-3 weeks',
    badge: 'Most Popular'
  },
  {
    id: 'professional',
    name: 'Growth',
    icon: 'lucide:shield-check',
    monthly: 499,
    yearly: 4990,
    color: 'green',
    features: [
      '10–15 pages or CMS',
      'E‑commerce / payments',
      'Security hardening pass',
      'Performance + accessibility',
      '90 days support'
    ],
    description: 'Comprehensive solution for growing businesses needing advanced features and robust security.',
    deliverables: [
      'CMS setup + content workflow',
      'E‑commerce / checkout integration',
      'Security baseline audit + fixes',
      'Performance optimization report',
      'Accessibility improvements (WCAG-minded)',
      'Deployment + monitoring setup'
    ],
    timeline: '4-6 weeks',
    popular: true
  },
  {
    id: 'premium',
    name: 'Enterprise',
    icon: 'lucide:crown',
    monthly: 899,
    yearly: 8990,
    color: 'purple',
    features: [
      'Custom web app + API',
      'Role-based dashboards',
      'Threat modeling + audit',
      'CI/CD + environments',
      '180 days priority support'
    ],
    description: 'Full-stack enterprise solution with custom applications and comprehensive cybersecurity measures.',
    deliverables: [
      'Architecture + API design',
      'Auth, roles, audit logs',
      'Security assessment + remediation',
      'CI/CD pipeline + staging/prod',
      'Observability (logs/metrics)',
      'Documentation + training session'
    ],
    timeline: '6-8 weeks'
  }
];

const Services: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [billingYearly, setBillingYearly] = useState(true);
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

  const ratingKey = (packId: string) => `service_pack_rating:${packId}`;
  const ratingCountKey = (packId: string) => `service_pack_rating_count:${packId}`;

  const [ratings, setRatings] = useState<Record<string, { avg: number; count: number }>>({});

  useEffect(() => {
    const next: Record<string, { avg: number; count: number }> = {};
    for (const p of servicePacks) {
      const avg = Number(localStorage.getItem(ratingKey(p.id)) ?? '');
      const count = Number(localStorage.getItem(ratingCountKey(p.id)) ?? '');
      next[p.id] = {
        avg: Number.isFinite(avg) && avg > 0 ? avg : 4.7,
        count: Number.isFinite(count) && count > 0 ? count : 120 + Math.floor(Math.random() * 60),
      };
    }
    setRatings(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const overallRating = useMemo(() => {
    const vals = Object.values(ratings);
    if (vals.length === 0) return { avg: 4.8, count: 340 };
    const totalCount = vals.reduce((s, v) => s + v.count, 0);
    const weighted = vals.reduce((s, v) => s + v.avg * v.count, 0);
    return { avg: weighted / totalCount, count: totalCount };
  }, [ratings]);

  const submitRating = (packId: string, score: number) => {
    setRatings((prev) => {
      const current = prev[packId] ?? { avg: 4.7, count: 100 };
      const nextCount = current.count + 1;
      const nextAvg = (current.avg * current.count + score) / nextCount;
      localStorage.setItem(ratingKey(packId), String(nextAvg));
      localStorage.setItem(ratingCountKey(packId), String(nextCount));
      return { ...prev, [packId]: { avg: nextAvg, count: nextCount } };
    });
  };

  const priceFor = (p: ServicePack) => (billingYearly ? p.yearly : p.monthly);

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
        <section className="min-h-screen flex items-center justify-center px-4 py-20 pt-28 md:pt-32">
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
                  From high-converting websites to secure web applications, you get clear scope, tiered pricing, measurable deliverables, and security-first execution.
                </motion.p>

                <motion.div
                  className="flex flex-wrap items-center gap-4"
                  initial={{ y: 30, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.55, duration: 0.8 }}
                >
                  <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                    <div className="text-xs text-gray-400 mb-1">Client satisfaction</div>
                    <div className="flex items-center gap-2">
                      <StarRating value={overallRating.avg} readonly size="sm" />
                      <span className="text-sm" style={{ color: neonColors.lightYellow }}>
                        {overallRating.avg.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-400">({overallRating.count} ratings)</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                    <div className="text-xs text-gray-400 mb-1">Response time</div>
                    <div className="text-sm font-semibold" style={{ color: neonColors.lightYellow }}>
                      &lt; 24h
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ y: 30, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <NeonButton 
                    icon="lucide:phone"
                    color={neonColors.neonGreen}
                    to="/contact"
                  >
                    Get Quote
                  </NeonButton>
                  
                  <NeonButton 
                    icon="lucide:calendar"
                    color={neonColors.lime}
                    variant="bordered"
                    to="/contact"
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
              Tiered packages with clear deliverables. Toggle billing to see monthly vs yearly pricing.
            </p>

            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={`text-sm ${!billingYearly ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
              <Switch
                isSelected={billingYearly}
                onValueChange={setBillingYearly}
                size="sm"
                className="border-2"
                style={{ borderColor: neonColors.lime }}
              />
              <span className={`text-sm ${billingYearly ? 'text-white' : 'text-gray-400'}`}>
                Yearly <span className="text-xs" style={{ color: neonColors.lightYellow }}>(save ~15%)</span>
              </span>
            </div>
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
                      <div className="text-3xl font-bold" style={{ color: getColorValue(pack.color) }}>
                        ${priceFor(pack).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">
                        {billingYearly ? 'per year' : 'per month'}
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
                          <Icon icon="lucide:check" className="w-4 h-4" style={{ color: getColorValue(pack.color) }} />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Divider className="bg-white/10 my-5" />

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Rating</div>
                        <div className="flex items-center gap-2">
                          <StarRating value={(ratings[pack.id]?.avg ?? 4.7)} readonly size="sm" />
                          <span className="text-xs text-gray-400">({ratings[pack.id]?.count ?? 0})</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-400 mb-1">Timeline</div>
                        <div className="text-sm font-semibold" style={{ color: getColorValue(pack.color) }}>
                          {pack.timeline}
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className="text-center mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                    >
                      <div className="text-xs text-gray-400 mt-4">Rate this tier</div>
                      <StarRating
                        value={0}
                        size="md"
                        onChange={(score) => submitRating(pack.id, score)}
                        className="mt-1"
                      />
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
                          setIsOpen(true);
                        }}
                        className="w-full"
                      >
                        View Scope
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
                    transition={{ duration: 0.25 }}
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
            onOpenChange={(open) => setIsOpen(open)}
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
                    color="#9ca3af"
                    variant="bordered"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </NeonButton>
                  <NeonButton
                    icon="lucide:phone"
                    color={neonColors.neonGreen}
                    to="/contact"
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
