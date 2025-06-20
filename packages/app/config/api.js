// config/api.js
// Configuration API simple pour MVP MoodCycle
// Approche pragmatique : simplicité maintenant, évolutivité future

/**
 * 🎯 CONFIGURATION API MVP
 * Simple et pragmatique - évite over-engineering
 */
const API_CONFIG = {
  development: {
    baseURL: 'http://192.168.1.174:4000', // IP locale actuelle
    timeout: 10000,
    retries: 2
  },
  production: {
    baseURL: 'https://api.moodcycle.app', // Domaine futur (sera configuré au déploiement)
    timeout: 15000,
    retries: 3
  }
};

/**
 * 🔧 RÉCUPÉRATION CONFIG ACTIVE
 * Auto-sélection développement/production
 */
export const getApiConfig = () => {
  const config = __DEV__ ? API_CONFIG.development : API_CONFIG.production;
  
  if (__DEV__) {
    console.log('🔧 API Config (DEV):', config.baseURL);
  }
  
  return config;
};

/**
 * 🌐 URL API RAPIDE (backward compatibility)
 * Pour migration facile du code existant
 */
export const getApiUrl = () => {
  return getApiConfig().baseURL;
};

/**
 * ⚙️ CONFIGURATION COMPLÈTE
 * Headers, timeout, etc. pour les appels
 */
export const getApiRequestConfig = (deviceId) => {
  const config = getApiConfig();
  
  return {
    baseURL: config.baseURL,
    timeout: config.timeout,
    headers: {
      'Content-Type': 'application/json',
      'X-Device-ID': deviceId,
      'X-App-Version': '1.0.0-mvp'
    },
    retries: config.retries
  };
};

// Export par défaut pour compatibilité
export default {
  getApiConfig,
  getApiUrl,
  getApiRequestConfig
};
