import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system';
    }
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    const updateTheme = async () => {
      setIsTransitioning(true);
      
      let newResolvedTheme: 'light' | 'dark';
      
      if (theme === 'system') {
        newResolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        newResolvedTheme = theme;
      }
      
      setResolvedTheme(newResolvedTheme);
      
      // Enhanced transition preparation
      root.style.setProperty('--theme-transition-duration', '0.6s');
      root.style.setProperty('--theme-transition-timing', 'cubic-bezier(0.25, 0.46, 0.45, 0.94)');
      
      // Remove all theme classes with smooth transition
      root.classList.remove('light', 'dark');
      body.classList.remove('light', 'dark');
      
      // Add transition classes
      root.classList.add('theme-transition');
      body.classList.add('theme-transition');
      
      // Small delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Add the new theme class
      root.classList.add(newResolvedTheme);
      body.classList.add(newResolvedTheme);
      
      // Update meta theme-color with ultra smooth transition
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', newResolvedTheme === 'dark' ? '#1f2937' : '#ffffff');
      }

      // Enhanced CSS custom properties for ultra smooth theming
      if (newResolvedTheme === 'dark') {
        root.style.setProperty('--bg-primary', '#1f2937');
        root.style.setProperty('--bg-secondary', '#374151');
        root.style.setProperty('--bg-tertiary', '#4b5563');
        root.style.setProperty('--text-primary', '#f9fafb');
        root.style.setProperty('--text-secondary', '#d1d5db');
        root.style.setProperty('--text-tertiary', '#9ca3af');
        root.style.setProperty('--border-color', '#4b5563');
        root.style.setProperty('--border-light', '#6b7280');
        root.style.setProperty('--particle-opacity', '0.8');
        root.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 0.15)');
        root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.15)');
        root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.3)');
      } else {
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f9fafb');
        root.style.setProperty('--bg-tertiary', '#f3f4f6');
        root.style.setProperty('--text-primary', '#111827');
        root.style.setProperty('--text-secondary', '#6b7280');
        root.style.setProperty('--text-tertiary', '#9ca3af');
        root.style.setProperty('--border-color', '#e5e7eb');
        root.style.setProperty('--border-light', '#f3f4f6');
        root.style.setProperty('--particle-opacity', '0.6');
        root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.15)');
        root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.3)');
        root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
      }
      
      // Enhanced body background with ultra smooth gradient animation
      body.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      // Complete transition
      setTimeout(() => {
        setIsTransitioning(false);
        root.classList.remove('theme-transition');
        body.classList.remove('theme-transition');
      }, 600);
    };

    updateTheme();
    localStorage.setItem('theme', theme);

    // Listen for system theme changes with smooth transitions
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    // Cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  // Ultra smooth theme setter with enhanced transition effects
  const setThemeWithTransition = (newTheme: Theme) => {
    if (isTransitioning) return; // Prevent rapid theme changes
    
    // Add ultra smooth transition effect
    const body = document.body;
    const root = document.documentElement;
    
    // Enhanced transition preparation
    body.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    root.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    setTheme(newTheme);
    
    // Trigger ultra smooth animation to indicate theme change
    setTimeout(() => {
      body.style.transform = 'scale(1.002)';
      root.style.filter = 'brightness(1.02)';
      
      setTimeout(() => {
        body.style.transform = 'scale(1)';
        root.style.filter = 'brightness(1)';
      }, 200);
    }, 100);
  };

  return {
    theme,
    resolvedTheme,
    setTheme: setThemeWithTransition,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    isSystem: theme === 'system',
    isTransitioning,
  };
};