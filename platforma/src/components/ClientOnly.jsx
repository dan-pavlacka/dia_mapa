'use client';
import { useEffect, useState } from 'react';
import { defineCustomElements } from '@gov-design-system-ce/components/loader';

let govDsInitialized = false;

export default function ClientOnly({ children, fallback = null }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Initialize Gov DS only once
    if (!govDsInitialized) {
      govDsInitialized = true;
      
      // Initialize custom elements
      defineCustomElements(window);
      
      // Initialize navigation scripts with better timing
      const initNavigation = async () => {
        try {
          console.log('🔧 Initializing Gov DS...');
          
          const { initTemplateScripts } = await import('@gov-design-system-ce/templates/dist/scripts/scripts');
          
          // Wait for DOM to be fully ready
          await new Promise(resolve => {
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', resolve);
            } else {
              resolve();
            }
          });
          
          // Additional small delay
          await new Promise(resolve => setTimeout(resolve, 50));
          
          initTemplateScripts();
          
          console.log('✅ Gov DS initialized');
          
          // Debug information
          const navElements = document.querySelectorAll('.gov-navigation');
          const triggerElements = document.querySelectorAll('.js-gov-header__navigation-trigger');
          
          console.log(`🔍 Found ${navElements.length} navigation elements`);
          console.log(`🔍 Found ${triggerElements.length} trigger elements`);
          
          // Test navigation functionality
          if (triggerElements.length > 0) {
            console.log('📱 Navigation trigger ready');
          }
          
        } catch (error) {
          console.error('❌ Gov DS initialization failed:', error);
        }
      };
      
      // Start initialization after a short delay
      setTimeout(initNavigation, 200);
    }
  }, []);

  if (!hasMounted) {
    return fallback;
  }

  return children;
} 