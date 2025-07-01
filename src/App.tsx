import React from 'react';
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { wagmiConfig, chains } from './config/wagmi';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { SwapInterface } from './components/SwapInterface';
import { PoolInfo } from './components/PoolInfo';
import { WalletInfo } from './components/WalletInfo';
import { FloatingParticles } from './components/FloatingParticles';
import { Footer } from './components/Footer';

import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const { isDark, isTransitioning } = useTheme();

  const customLightTheme = lightTheme({
    accentColor: '#ec4899',
    accentColorForeground: 'white',
    borderRadius: 'large',
    fontStack: 'system',
    overlayBlur: 'small',
  });

  const customDarkTheme = darkTheme({
    accentColor: '#ec4899',
    accentColorForeground: 'white',
    borderRadius: 'large',
    fontStack: 'system',
    overlayBlur: 'small',
  });

  return (
    <RainbowKitProvider 
      chains={chains} 
      theme={isDark ? customDarkTheme : customLightTheme}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="min-h-screen relative overflow-hidden transition-all duration-600"
          style={{
            background: isDark 
              ? 'linear-gradient(-45deg, #1f2937, #581c87, #164e63, #111827)'
              : 'linear-gradient(-45deg, #fce7f3, #f3e8ff, #e0f2fe, #fdf2f8)',
            backgroundSize: '400% 400%',
            animation: 'gradient-shift 15s ease infinite'
          }}
        >
          {/* Enhanced Multi-Layer Background with Ultra Smooth Transitions */}
          <div className="absolute inset-0">
            {/* Base animated gradient */}
            <motion.div
              className="absolute inset-0 transition-all duration-600"
              animate={{
                background: isDark ? [
                  'linear-gradient(135deg, #1f2937, #581c87, #164e63)',
                  'linear-gradient(225deg, #111827, #4c1d95, #155e75)',
                  'linear-gradient(315deg, #1f2937, #5b21b6, #0e7490)',
                  'linear-gradient(45deg, #111827, #581c87, #164e63)',
                  'linear-gradient(135deg, #1f2937, #581c87, #164e63)',
                ] : [
                  'linear-gradient(135deg, #fce7f3, #f3e8ff, #e0f2fe)',
                  'linear-gradient(225deg, #fdf2f8, #ede9fe, #cffafe)',
                  'linear-gradient(315deg, #fce7f3, #ddd6fe, #e0f7fa)',
                  'linear-gradient(45deg, #fdf2f8, #f3e8ff, #e0f2fe)',
                  'linear-gradient(135deg, #fce7f3, #f3e8ff, #e0f2fe)',
                ]
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            />

            {/* Ultra smooth animated orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 transition-all duration-600"
              style={{
                background: isDark 
                  ? 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)'
                  : 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 100%)',
                filter: `blur(${isDark ? 2 : 3}px)`
              }}
              animate={{
                x: [0, 120, -60, 30, 0],
                y: [0, -60, 120, -30, 0],
                scale: [1, 1.3, 0.8, 1.1, 1],
                opacity: [0.2, 0.4, 0.1, 0.3, 0.2],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            />

            <motion.div
              className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full opacity-15 transition-all duration-600"
              style={{
                background: isDark 
                  ? 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 100%)'
                  : 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)',
                filter: `blur(${isDark ? 1 : 2}px)`
              }}
              animate={{
                x: [0, -100, 140, -20, 0],
                y: [0, 100, -80, 40, 0],
                scale: [0.8, 1.4, 0.9, 1.2, 0.8],
                opacity: [0.15, 0.3, 0.1, 0.25, 0.15],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 3
              }}
            />

            {/* Ultra smooth grid pattern */}
            <motion.div 
              className="absolute inset-0 transition-all duration-600"
              style={{
                backgroundImage: `
                  linear-gradient(${isDark ? 'rgba(168, 85, 247, 0.15)' : 'rgba(168, 85, 247, 0.08)'} 1px, transparent 1px),
                  linear-gradient(90deg, ${isDark ? 'rgba(168, 85, 247, 0.15)' : 'rgba(168, 85, 247, 0.08)'} 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
                opacity: isDark ? 0.15 : 0.08
              }}
              animate={{
                backgroundPosition: ['0px 0px', '60px 60px', '0px 0px'],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Ultra smooth ambient lighting */}
            <motion.div
              className="absolute inset-0 transition-all duration-600"
              style={{
                background: isDark 
                  ? 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
                  : 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.05) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            />
          </div>

          <FloatingParticles />
          
          {/* Header with ultra smooth transitions */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2 
            }}
          >
            <Header />
          </motion.div>

          {/* Main Content with staggered animations */}
          <motion.main 
            className="relative z-10 container mx-auto px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4 
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
              {/* Main Swap Interface - Center */}
              <motion.div 
                className="lg:col-span-6 lg:col-start-4"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.6 
                }}
              >
                <SwapInterface />
              </motion.div>

              {/* Pool Info - Left Sidebar */}
              <motion.div 
                className="lg:col-span-3 lg:col-start-1 lg:row-start-1 order-2 lg:order-1"
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.8 
                }}
              >
                <PoolInfo />
              </motion.div>

              {/* Wallet Info - Right Sidebar */}
              <motion.div 
                className="lg:col-span-3 lg:col-start-10 lg:row-start-1 order-3 lg:order-2"
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 1.0 
                }}
              >
                <WalletInfo />
              </motion.div>
            </div>
          </motion.main>

          {/* Footer with ultra smooth entrance */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 1.2 
            }}
          >
            <Footer />
          </motion.div>

          {/* Ultra smooth transition overlay */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 100%)',
                  backdropFilter: 'blur(2px)',
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Toast Notifications with ultra smooth styling */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: '20px',
                fontWeight: '600',
                backdropFilter: 'blur(20px)',
                backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                color: isDark ? '#f3f4f6' : '#374151',
                border: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.4)' : 'rgba(255, 255, 255, 0.4)'}`,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              },
            }}
          />
        </motion.div>
      </AnimatePresence>
    </RainbowKitProvider>
  );
};

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export default App;