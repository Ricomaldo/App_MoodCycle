// services/api/testApi.js - version fixée
export const testApiConnection = async () => {
    try {
      const API_BASE = __DEV__ ? 'http://192.168.1.174:4000' : 'https://ton-domaine.com';
      
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Device-ID': 'test-device-123'
        },
        body: JSON.stringify({
          message: "Bonjour Melune, comment vas-tu ?",
          context: {
            persona: "emma",
            userProfile: { 
              prenom: "Test", 
              ageRange: "18-25" 
            },
            currentPhase: "follicular"
          }
        })
      });
  
      const data = await response.json();
      console.log('✅ API Response:', data);
      return data;
    } catch (error) {
      console.error('❌ API Error:', error);
      throw error;
    }
  };