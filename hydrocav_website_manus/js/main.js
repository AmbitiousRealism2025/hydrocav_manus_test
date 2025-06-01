// Import all module initialization functions
import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { initFormHandling } from './modules/form.js';
import { initLazyLoading } from './modules/lazyload.js';

// Call initialization functions after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();
  initFormHandling();
  initLazyLoading();
  console.log('HydroCav website scripts initialized via new main.js and Vite.');
});
