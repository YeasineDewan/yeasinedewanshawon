import React, { useState } from 'react';
import { Input, Textarea, Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from '../components/NeonButton';
import FloatingParticles from '../components/FloatingParticles';
import { neonColors } from '../theme/theme';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus('Please fix the errors below');
      setTimeout(() => setStatus(''), 3000);
      return;
    }
    
    setIsSubmitting(true);
    setStatus('Sending...');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success
    setStatus('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setIsSubmitting(false);
    
    // Reset status after 3 seconds
    setTimeout(() => setStatus(''), 3000);
  };

  const contactInfo = [
    {
      icon: 'lucide:mail',
      label: 'Email',
      value: 'yeasinedewanshawon@example.com',
      href: 'mailto:yeasinedewanshawon@example.com'
    },
    {
      icon: 'lucide:phone',
      label: 'Phone',
      value: '+880 1234 5678',
      href: 'tel:+88012345678'
    },
    {
      icon: 'lucide:map-pin',
      label: 'Location',
      value: 'Dhaka, Bangladesh',
      href: '#'
    },
    {
      icon: 'lucide:linkedin',
      label: 'LinkedIn',
      value: 'Connect with me',
      href: 'https://linkedin.com/in/md-yeasine-dewan-shawon-07a383210'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Particles */}
      <FloatingParticles count={25} colors={[neonColors.neonGreen, neonColors.lime, neonColors.lightYellow]} />

      <div className="relative z-10 container mx-auto px-4 py-16 pt-28 md:pt-32">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            style={{ textShadow: `0 0 30px ${neonColors.neonGreen}` }}
          >
            <span style={{ color: neonColors.lightYellow }}>Get in</span>{' '}
            <span 
              style={{ 
                background: `linear-gradient(135deg, ${neonColors.neonGreen}, ${neonColors.lime})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Touch
            </span>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Let's discuss your next project. Whether you need a web application, security audit, or consultation, I'm here to help bring your ideas to life.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            <Card className="bg-gray-900/50 backdrop-blur-sm border-2" style={{ borderColor: neonColors.neonGreen }}>
              <CardBody className="p-6 md:p-8">
                <motion.h2 
                  className="text-2xl font-bold mb-6"
                  style={{ color: neonColors.lightYellow }}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  Send Me a Message
                </motion.h2>
                
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Icon icon="lucide:user" className="w-4 h-4" style={{ color: neonColors.lime }} />
                      </motion.div>
                      <Input
                        label="Your Name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        isInvalid={!!errors.name}
                        errorMessage={errors.name}
                        classNames={{
                          input: "pl-10 text-white",
                          inputWrapper: [
                            "bg-gray-800/50 border-gray-700 hover:border-gray-600",
                            focusedField === 'name' && `border-2 shadow-lg`,
                            errors.name && "border-red-500"
                          ].filter(Boolean).join(" ")
                        }}
                        style={{
                          borderColor: focusedField === 'name' ? neonColors.neonGreen : undefined,
                          boxShadow: focusedField === 'name' ? `0 0 0 3px ${neonColors.neonGreen}40` : undefined
                        }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      >
                        <Icon icon="lucide:mail" className="w-4 h-4" style={{ color: neonColors.lime }} />
                      </motion.div>
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        isInvalid={!!errors.email}
                        errorMessage={errors.email}
                        classNames={{
                          input: "pl-10 text-white",
                          inputWrapper: [
                            "bg-gray-800/50 border-gray-700 hover:border-gray-600",
                            focusedField === 'email' && `border-2 shadow-lg`,
                            errors.email && "border-red-500"
                          ].filter(Boolean).join(" ")
                        }}
                        style={{
                          borderColor: focusedField === 'email' ? neonColors.neonGreen : undefined,
                          boxShadow: focusedField === 'email' ? `0 0 0 3px ${neonColors.neonGreen}40` : undefined
                        }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      >
                        <Icon icon="lucide:edit" className="w-4 h-4" style={{ color: neonColors.lime }} />
                      </motion.div>
                      <Input
                        label="Subject"
                        name="subject"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        required
                        isInvalid={!!errors.subject}
                        errorMessage={errors.subject}
                        classNames={{
                          input: "pl-10 text-white",
                          inputWrapper: [
                            "bg-gray-800/50 border-gray-700 hover:border-gray-600",
                            focusedField === 'subject' && `border-2 shadow-lg`,
                            errors.subject && "border-red-500"
                          ].filter(Boolean).join(" ")
                        }}
                        style={{
                          borderColor: focusedField === 'subject' ? neonColors.neonGreen : undefined,
                          boxShadow: focusedField === 'subject' ? `0 0 0 3px ${neonColors.neonGreen}40` : undefined
                        }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute left-3 top-6 z-10"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                      >
                        <Icon icon="lucide:message-square" className="w-4 h-4" style={{ color: neonColors.lime }} />
                      </motion.div>
                      <Textarea
                        label="Message"
                        name="message"
                        placeholder="Tell me about your project..."
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        isInvalid={!!errors.message}
                        errorMessage={errors.message}
                        classNames={{
                          input: "pl-10 text-white",
                          inputWrapper: [
                            "bg-gray-800/50 border-gray-700 hover:border-gray-600",
                            focusedField === 'message' && `border-2 shadow-lg`,
                            errors.message && "border-red-500"
                          ].filter(Boolean).join(" ")
                        }}
                        style={{
                          borderColor: focusedField === 'message' ? neonColors.neonGreen : undefined,
                          boxShadow: focusedField === 'message' ? `0 0 0 3px ${neonColors.neonGreen}40` : undefined
                        }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex justify-end mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    <NeonButton
                      icon="lucide:send"
                      color={neonColors.neonGreen}
                      disabled={isSubmitting}
                      type="submit"
                      className="px-8 py-3"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </NeonButton>
                  </motion.div>
                </motion.form>

                {/* Status Message */}
                <AnimatePresence>
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.5 }}
                      className={`mt-4 p-4 rounded-lg text-center ${
                        status.includes('successfully') 
                          ? 'bg-green-900/50 border border-green-500 text-green-400' 
                          : status.includes('fix the errors')
                          ? 'bg-yellow-900/50 border border-yellow-500 text-yellow-400'
                          : 'bg-red-900/50 border border-red-500 text-red-400'
                      }`}
                      style={{
                        borderColor: status.includes('successfully') ? neonColors.neonGreen : 
                                     status.includes('fix the errors') ? neonColors.lightYellow : '#ef4444',
                        boxShadow: status.includes('successfully') ? `0 0 20px ${neonColors.neonGreen}40` : 
                                     status.includes('fix the errors') ? `0 0 20px ${neonColors.lightYellow}40` : 
                                     `0 0 20px #ef444440`
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Icon 
                          icon={status.includes('successfully') ? 'lucide:check-circle' : 
                                status.includes('fix the errors') ? 'lucide:alert-triangle' :
                                'lucide:alert-circle'} 
                          className="w-5 h-5" 
                        />
                        <span>{status}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardBody>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <Card className="bg-gray-900/50 backdrop-blur-sm border-2" style={{ borderColor: neonColors.neonGreen }}>
              <CardBody className="p-6 md:p-8">
                <motion.h2 
                  className="text-2xl font-bold mb-6"
                  style={{ color: neonColors.lightYellow }}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  Contact Information
                </motion.h2>
                
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <motion.div
                      key={info.label}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + contactInfo.indexOf(info) * 0.1, duration: 0.8 }}
                      whileHover={{ scale: 1.05, x: 10 }}
                    >
                      <motion.div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: neonColors.neonGreen }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Icon icon={info.icon} className="w-6 h-6 text-black" />
                      </motion.div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">{info.label}</div>
                        <motion.a
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-white font-medium hover:text-neon-green transition-colors"
                          style={{ color: neonColors.lightYellow }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {info.value}
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <motion.div
                  className="pt-6 border-t"
                  style={{ borderColor: `${neonColors.neonGreen}33` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <h3 className="text-lg font-semibold mb-4" style={{ color: neonColors.lightYellow }}>
                    Follow Me
                  </h3>
                  <div className="flex gap-4">
                    {[
                      { icon: 'logos:github', href: 'https://github.com/yeasinedewan', label: 'GitHub' },
                      { icon: 'logos:linkedin', href: 'https://linkedin.com/in/md-yeasine-dewan-shawon-07a383210', label: 'LinkedIn' },
                      { icon: 'logos:twitter', href: 'https://twitter.com/yeasinedewan', label: 'Twitter' }
                    ].map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Icon icon={social.icon} className="w-5 h-5 text-white" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </CardBody>
            </Card>

            {/* Quick Response Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-2" style={{ borderColor: neonColors.lime }}>
                <CardBody className="p-6 text-center">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: neonColors.lightYellow }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon icon="lucide:zap" className="w-8 h-8 text-black" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: neonColors.lightYellow }}>
                    Quick Response
                  </h3>
                  <p className="text-gray-300 text-sm">
                    I typically respond within 24 hours. For urgent matters, please don't hesitate to call or message directly.
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
