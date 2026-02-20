import React from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import NeonButton from '../components/NeonButton';
import FloatingParticles from '../components/FloatingParticles';

const neonColors = {
  darkGreen: '#059212',
  neonGreen: '#06D001',
  lightYellow: '#F3FF90',
  lime: '#9BEC00'
};

const Terms: React.FC = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: 'lucide:check-circle',
      content: 'By accessing this website, you agree to be bound by these terms.'
    },
    {
      title: 'Services Description',
      icon: 'lucide:briefcase',
      content: 'Web development, mobile apps, cybersecurity, data management, and consultation services.'
    },
    {
      title: 'Payment Terms',
      icon: 'lucide:credit-card',
      content: '50% upfront, 50% on completion. Payment methods include bank transfer and digital payments.'
    },
    {
      title: 'Refund Policy',
      icon: 'lucide:refresh-cw',
      content: 'Refunds available within 7 days for unused services, subject to terms.'
    },
    {
      title: 'Intellectual Property',
      icon: 'lucide:shield',
      content: 'Client owns final deliverables. We retain rights to our tools and methodologies.'
    },
    {
      title: 'Confidentiality',
      icon: 'lucide:lock',
      content: 'All client information remains confidential and secure.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <FloatingParticles count={20} colors={[neonColors.neonGreen, neonColors.lime, neonColors.lightYellow]} />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ textShadow: `0 0 30px ${neonColors.neonGreen}` }}>
            <span style={{ color: neonColors.lightYellow }}>Terms &</span>{' '}
            <span style={{ background: `linear-gradient(135deg, ${neonColors.neonGreen}, ${neonColors.lime})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Conditions
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Clear terms for our professional services and client relationships.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: neonColors.neonGreen }}>
            <Icon icon="lucide:calendar" className="w-4 h-4 text-black" />
            <span className="text-black font-semibold">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <motion.div key={section.title} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + index * 0.1 }}>
              <Card className="bg-gray-900/50 backdrop-blur-sm border-2 hover:shadow-2xl transition-all duration-300" style={{ borderColor: neonColors.neonGreen }}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <motion.div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: neonColors.neonGreen }} whileHover={{ scale: 1.2, rotate: 360 }}>
                      <Icon icon={section.icon} className="w-6 h-6 text-black" />
                    </motion.div>
                    <motion.h2 className="text-2xl font-bold" style={{ color: neonColors.lightYellow }} whileHover={{ scale: 1.05 }}>
                      {section.title}
                    </motion.h2>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-300 leading-relaxed">{section.content}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-16 text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gray-900/50 backdrop-blur-sm border-2 max-w-2xl mx-auto" style={{ borderColor: neonColors.lime }}>
            <CardBody className="p-8">
              <motion.div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: neonColors.lightYellow }} animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity }}>
                <Icon icon="lucide:file-text" className="w-8 h-8 text-black" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: neonColors.lightYellow }}>
                Need Clarification?
              </h3>
              <p className="text-gray-300 mb-6">
                Have questions about our terms? We're here to help.
              </p>
              <NeonButton icon="lucide:mail" color={neonColors.neonGreen} href="/contact" className="px-8 py-3">
                Contact Legal Team
              </NeonButton>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
