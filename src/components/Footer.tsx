import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, ExternalLink, Code, Star, Mail, Globe, Coffee } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub Profile',
      url: 'https://github.com/HuzaifaKhanDeveloper',
      icon: Github,
      color: 'from-gray-600 to-gray-800',
      hoverColor: 'hover:from-gray-700 hover:to-gray-900',
    },
    {
      name: 'Project Repository',
      url: 'https://github.com/HuzaifaKhanDeveloper/fluffyswap',
      icon: Star,
      color: 'from-yellow-500 to-orange-600',
      hoverColor: 'hover:from-yellow-600 hover:to-orange-700',
    },
    {
      name: 'Portfolio',
      url: 'https://huzaifakhan.dev',
      icon: Globe,
      color: 'from-blue-500 to-purple-600',
      hoverColor: 'hover:from-blue-600 hover:to-purple-700',
    },
  ];

  const features = [
    { icon: '🌸', text: 'Kawaii Design' },
    { icon: '🔒', text: 'Secure Smart Contracts' },
    { icon: '⚡', text: 'Lightning Fast' },
    { icon: '🎨', text: 'Beautiful Animations' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      className="relative z-10 mt-20 pb-8"
    >
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <motion.div 
          className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 max-w-6xl mx-auto border border-white/40 dark:border-gray-700/40 shadow-2xl overflow-hidden"
          whileHover={{
            scale: 1.005,
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)'
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-pink-400/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl"></div>

          {/* Header Section */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Heart size={32} className="text-pink-500" fill="currentColor" />
              </motion.div>
              <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                FluffySwap
              </span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <Heart size={32} className="text-purple-500" fill="currentColor" />
              </motion.div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              A kawaii-themed decentralized exchange built for the Ethereum Sepolia testnet.
              Trade ETH for FLUF tokens with adorable animations and secure smart contracts.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-md"
                >
                  <span className="text-lg">{feature.icon}</span>
                  {feature.text}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Developer Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Developer Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 }}
                className="text-center md:text-left"
              >
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Code size={24} className="text-pink-500" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      Made with 💖 by
                    </h3>
                    <motion.a
                      href="https://github.com/HuzaifaKhanDeveloper"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent hover:from-pink-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2"
                    >
                      Huzaifa Khan
                      <ExternalLink size={18} className="text-pink-500" />
                    </motion.a>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Full-Stack Developer & Blockchain Enthusiast
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Coffee size={16} />
                  <span>Powered by coffee and creativity</span>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.2 }}
                className="space-y-3"
              >
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02, 
                      x: 5,
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-4 bg-gradient-to-r ${link.color} ${link.hoverColor} text-white rounded-xl transition-all duration-200 shadow-lg group`}
                  >
                    <link.icon size={20} className="group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">{link.name}</span>
                    <ExternalLink size={16} className="ml-auto opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6 }}
            className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {currentYear} FluffySwap. Built with React, TypeScript, and lots of ❤️
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                <motion.span 
                  whileHover={{ color: '#6366f1', scale: 1.05 }}
                  className="flex items-center gap-1 cursor-default"
                >
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Sepolia Testnet
                </motion.span>
                <motion.span 
                  whileHover={{ color: '#8b5cf6', scale: 1.05 }}
                  className="flex items-center gap-1 cursor-default"
                >
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                  Open Source
                </motion.span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="text-center mt-6"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block text-2xl"
          >
            🌸
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};