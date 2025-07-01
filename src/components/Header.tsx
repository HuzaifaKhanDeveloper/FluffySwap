import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, ExternalLink } from 'lucide-react';
import { WalletConnect } from './WalletConnect';
import { ThemeToggle } from './ThemeToggle';
import { FAUCET_LINKS } from '../config/contracts';

export const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 pt-4 sm:pt-6 lg:pt-8 pb-4"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <motion.div 
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                boxShadow: [
                  '0 4px 20px rgba(236, 72, 153, 0.3)',
                  '0 8px 30px rgba(168, 85, 247, 0.4)',
                  '0 4px 20px rgba(236, 72, 153, 0.3)',
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart size={20} className="sm:w-6 sm:h-6 text-white" fill="currentColor" />
              </motion.div>
            </motion.div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                FluffySwap
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Kawaii DEX</p>
            </div>
          </motion.div>

          {/* Actions Section */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Secondary actions group - left side on desktop */}
            <div className="hidden sm:flex items-center gap-2 lg:gap-3">
              <ThemeToggle />
              
              <motion.a
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                }}
                whileTap={{ scale: 0.9 }}
                href={FAUCET_LINKS.sepolia}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 lg:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border border-blue-200 dark:border-blue-800"
              >
                <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden lg:inline">Get Testnet ETH</span>
                <span className="lg:hidden">Faucet</span>
              </motion.a>
              
              <motion.a
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 6px 20px rgba(107, 114, 128, 0.3)'
                }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/HuzaifaKhanDeveloper/FluffySwap"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full transition-all duration-200 border border-gray-200 dark:border-gray-700"
                title="GitHub Repository"
              >
                <Github size={18} className="sm:w-5 sm:h-5" />
              </motion.a>
            </div>

            {/* Primary action - Wallet Connect */}
            <WalletConnect />
          </div>

          {/* Mobile-only secondary actions row */}
          <div className="flex sm:hidden items-center justify-center gap-3 mt-2">
            <ThemeToggle />
            
            <motion.a
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 6px 20px rgba(59, 130, 246, 0.3)'
              }}
              whileTap={{ scale: 0.9 }}
              href={FAUCET_LINKS.sepolia}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full transition-all duration-200 border border-blue-200 dark:border-blue-800"
              title="Get Testnet ETH"
            >
              <ExternalLink size={18} />
            </motion.a>
            
            <motion.a
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 6px 20px rgba(107, 114, 128, 0.3)'
              }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/HuzaifaKhanDeveloper/FluffySwap"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full transition-all duration-200 border border-gray-200 dark:border-gray-700"
              title="GitHub Repository"
            >
              <Github size={18} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  );
};