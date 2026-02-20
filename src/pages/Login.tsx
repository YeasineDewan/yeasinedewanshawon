import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, Input } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/AuthContext';
import NeonButton from '../components/NeonButton';
import FloatingParticles from '../components/FloatingParticles';

// Neon color palette
const neonColors = {
  darkGreen: '#059212',
  neonGreen: '#06D001',
  lightYellow: '#F3FF90',
  lime: '#9BEC00'
};

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const success = await login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Background Particles */}
      <FloatingParticles count={15} colors={[neonColors.neonGreen, neonColors.lime, neonColors.lightYellow]} />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="w-96 h-96 rounded-full"
            style={{
              background: `radial-gradient(circle, ${neonColors.neonGreen}, transparent)`,
              filter: 'blur(100px)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        >
          <Card className="bg-gray-900/50 backdrop-blur-sm border-2 shadow-2xl" style={{ borderColor: neonColors.neonGreen }}>
            <CardHeader className="text-center pb-0">
              <motion.div
                className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: neonColors.neonGreen }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 360 }}
              >
                <Icon icon="lucide:shield-check" className="w-10 h-10 text-black" />
              </motion.div>
              
              <motion.h1 
                className="text-3xl font-bold mb-2"
                style={{ color: neonColors.lightYellow }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Admin Login
              </motion.h1>
              
              <motion.p 
                className="text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Secure access to portfolio management
              </motion.p>
            </CardHeader>

            <CardBody className="pt-6">
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
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
                      label="Username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="bg-gray-800/50 text-white border-gray-700"
                      style={{
                        borderColor: neonColors.neonGreen,
                        paddingLeft: '2.5rem'
                      }}
                      startContent={
                        <Icon icon="lucide:user" className="w-4 h-4" style={{ color: neonColors.lime }} />
                      }
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                      <Icon icon="lucide:lock" className="w-4 h-4" style={{ color: neonColors.lime }} />
                    </motion.div>
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-gray-800/50 text-white border-gray-700"
                      style={{
                        borderColor: neonColors.neonGreen,
                        paddingLeft: '2.5rem'
                      }}
                      startContent={
                        <Icon icon="lucide:lock" className="w-4 h-4" style={{ color: neonColors.lime }} />
                      }
                    />
                  </div>
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 rounded-lg bg-red-900/50 border border-red-500 text-red-400 text-sm"
                      style={{
                        borderColor: '#ef4444',
                        boxShadow: `0 0 20px #ef444440`
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:alert-circle" className="w-4 h-4" />
                        <span>{error}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  <NeonButton
                    icon="lucide:log-in"
                    color={neonColors.neonGreen}
                    disabled={isLoading}
                    className="w-full py-3"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(e as any);
                    }}
                  >
                    {isLoading ? (
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Authenticating...
                      </motion.div>
                    ) : (
                      'Login'
                    )}
                  </NeonButton>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <motion.a
                    href="/contact"
                    className="text-sm text-gray-400 hover:text-neon-green transition-colors"
                    style={{ color: neonColors.lightYellow }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Need access? Contact administrator
                  </motion.a>
                </motion.div>
              </motion.form>
            </CardBody>
          </Card>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Icon icon="lucide:shield" className="w-4 h-4" style={{ color: neonColors.lime }} />
            </motion.div>
            <span>Secured with 256-bit encryption</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
