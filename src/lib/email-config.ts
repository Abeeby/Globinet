// Configuration pour l'envoi d'emails en mode statique
// Choisissez l'une des options ci-dessous et configurez-la

// Option 1: EmailJS (https://www.emailjs.com/)
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID', // À remplacer
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // À remplacer
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // À remplacer
  enabled: false // Mettre à true après configuration
}

// Option 2: Formspree (https://formspree.io/)
export const FORMSPREE_CONFIG = {
  ENDPOINT: 'https://formspree.io/f/YOUR_FORM_ID', // À remplacer
  enabled: false // Mettre à true après configuration
}

// Option 3: Web3Forms (https://web3forms.com/)
export const WEB3FORMS_CONFIG = {
  ACCESS_KEY: 'YOUR_ACCESS_KEY', // À remplacer
  enabled: false // Mettre à true après configuration
}

// Option 4: Endpoint PHP personnalisé sur Hostinger
export const PHP_ENDPOINT_CONFIG = {
  URL: '/send-email.php', // Créer ce fichier sur votre hébergement
  enabled: false // Mettre à true après création du fichier PHP
}

// Fonction helper pour envoyer l'email selon la configuration active
export async function sendEmail(formData: {
  name: string;
  email: string;
  company?: string;
  project?: string;
  budget?: string;
  message: string;
}): Promise<any> {
  // EmailJS
  if (EMAILJS_CONFIG.enabled) {
    try {
      // Note: Pour utiliser EmailJS, installez d'abord: npm install @emailjs/browser
      // Puis décommentez le code ci-dessous:
      /*
      const emailjs = await import('@emailjs/browser');
      return emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formData,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      */
      console.warn('EmailJS est activé mais le module n\'est pas installé.');
      console.log('Installez-le avec: npm install @emailjs/browser');
    } catch (error) {
      console.error('Erreur EmailJS:', error);
    }
  }

  // Formspree
  if (FORMSPREE_CONFIG.enabled) {
    return fetch(FORMSPREE_CONFIG.ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  }

  // Web3Forms
  if (WEB3FORMS_CONFIG.enabled) {
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_CONFIG.ACCESS_KEY,
        ...formData,
      }),
    });
  }

  // PHP Endpoint
  if (PHP_ENDPOINT_CONFIG.enabled) {
    return fetch(PHP_ENDPOINT_CONFIG.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  }

  // Si aucune méthode n'est configurée, simuler l'envoi
  console.warn('Aucun service d\'email configuré. Simulation d\'envoi.');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Email simulé envoyé:', formData);
      resolve({ ok: true });
    }, 1000);
  });
}
