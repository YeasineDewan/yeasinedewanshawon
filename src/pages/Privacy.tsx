import React from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import NeonButton from '../components/NeonButton';
import FloatingParticles from '../components/FloatingParticles';

// Neon color palette
const neonColors = {
  darkGreen: '#059212',
  neonGreen: '#06D001',
  lightYellow: '#F3FF90',
  lime: '#9BEC00'
};

const Privacy: React.FC = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: 'lucide:database',
      content: [
        'Name and contact information when you reach out to us',
        'Email address for newsletter subscriptions',
        'Project details and requirements for service inquiries',
        'Technical information from your browser (IP address, browser type)',
        'Usage data and analytics for website improvement'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: 'lucide:settings',
      content: [
        'To provide and improve our services',
        'To communicate with you about projects and inquiries',
        'To send you newsletters and updates (with your consent)',
        'To analyze website usage and improve user experience',
        'To comply with legal and regulatory requirements'
      ]
    },
    {
      title: 'Information Sharing',
      icon: 'lucide:share-2',
      content: [
        'We do not sell or rent your personal information',
        'We may share information with trusted service providers',
        'Information may be disclosed if required by law',
        'Data is shared with your explicit consent for third-party services',
        'Aggregated anonymous data may be used for analytics'
      ]
    },
    {
      title: 'Data Security',
      icon: 'lucide:shield-check',
      content: [
        'SSL/TLS encryption for all data transmissions',
        'Secure storage of personal information',
        'Regular security audits and penetration testing',
        'Access limited to authorized personnel only',
        'Compliance with international data protection standards'
      ]
    },
    {
      title: 'Your Rights',
      icon: 'lucide:user-check',
      content: [
        'Access to your personal information',
        'Correction of inaccurate information',
        'Deletion of your personal data upon request',
        'Opt-out of marketing communications',
        'Data portability and transfer rights'
      ]
    },
    {
      title: 'Cookies and Tracking',
      icon: 'lucide:cookie',
      content: [
        'Essential cookies for website functionality',
        'Analytics cookies for usage monitoring',
        'Marketing cookies for personalized content',
        'You can control cookie preferences in your browser',
        'Cookie policy is regularly updated'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Particles */}
      <FloatingParticles count={20} colors={[neonColors.neonGreen, neonColors.lime, neonColors.lightYellow]} />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ textShadow: `0 0 30px ${neonColors.neonGreen}` }}
          >
            <span style={{ color: neonColors.lightYellow }}>Privacy</span>{' '}
            <span 
              style={{ 
                background: `linear-gradient(135deg, ${neonColors.neonGreen}, ${neonColors.lime})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Policy
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
          </motion.p>

          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ backgroundColor: neonColors.neonGreen }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          >
            <Icon icon="lucide:calendar" className="w-4 h-4 text-black" />
            <span className="text-black font-semibold">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </motion.div>
        </motion.div>

        {/* Privacy Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border-2 hover:shadow-2xl transition-all duration-300" style={{ borderColor: neonColors.neonGreen }}>
                <CardHeader className="pb-4">
                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: neonColors.neonGreen }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon icon={section.icon} className="w-6 h-6 text-black" />
                    </motion.div>
                    <motion.h2 
                      className="text-2xl font-bold"
                      style={{ color: neonColors.lightYellow }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {section.title}
                    </motion.h2>
                  </motion.div>
                </CardHeader>
                
                <CardBody>
                  <motion.ul 
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  >
                    {section.content.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        className="flex items-start gap-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 + itemIndex * 0.05, duration: 0.8 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: itemIndex * 0.2 }}
                        >
                          <Icon icon="lucide:check" className="w-4 h-4 mt-1" style={{ color: neonColors.lime }} />
                        </motion.div>
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardBody>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${neonColors.neonGreen}10, transparent)`,
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  animate={{
                    background: [
                      `radial-gradient(circle at center, ${neonColors.neonGreen}10, transparent)`,
                      `radial-gradient(circle at 30% 30%, ${neonColors.lime}10, transparent)`,
                      `radial-gradient(circle at center, ${neonColors.neonGreen}10, transparent)`,
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

        {/* Contact Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <Card className="bg-gray-900/50 backdrop-blur-sm border-2 max-w-2xl mx-auto" style={{ borderColor: neonColors.lime }}>
            <CardBody className="p-8">
              <motion.div
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: neonColors.lightYellow }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Icon icon="lucide:help-circle" className="w-8 h-8 text-black" />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4" style={{ color: neonColors.lightYellow }}>
                Questions About Privacy?
              </h3>
              <p className="text-gray-300 mb-6">
                If you have any questions about this privacy policy or how we handle your data, please don't hesitate to contact us.
              </p>
              
              <NeonButton
                icon="lucide:mail"
                color={neonColors.neonGreen}
                href="/contact"
                className="px-8 py-3"
              >
                Contact Privacy Team
              </NeonButton>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
