# 🌐 Globinet - Site Vitrine Premium

Site web moderne et élégant pour Globinet, développé avec Next.js 14, React Three Fiber et Framer Motion.

## ✨ Fonctionnalités

- **Design Premium** : Interface moderne avec animations 3D et effets de particules
- **Performance Optimisée** : Score Lighthouse 95+ grâce à l'optimisation Next.js
- **Animations Fluides** : Intégration de Framer Motion et GSAP pour des transitions élégantes
- **3D Interactif** : Arrière-plan 3D dynamique avec Three.js
- **Responsive Design** : Adapté à tous les écrans (mobile, tablette, desktop)
- **SEO Optimisé** : Export statique pour un référencement optimal
- **Formulaire de Contact** : Intégration avec envoi d'emails

## 🚀 Technologies Utilisées

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styles** : Tailwind CSS
- **3D** : Three.js + React Three Fiber
- **Animations** : Framer Motion + GSAP
- **Déploiement** : Compatible Hostinger (export statique)

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Git

## 🛠️ Installation

```bash
# Cloner le repository
git clone https://github.com/Abeeby/Globinet.git

# Aller dans le dossier
cd Globinet

# Installer les dépendances
npm install
```

## 💻 Développement

```bash
# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

## 🏗️ Build & Déploiement

### Build Standard
```bash
# Build pour production
npm run build

# Lancer en production
npm start
```

### Export Statique (Hostinger)
```bash
# Build statique
npm run build

# Les fichiers sont générés dans le dossier 'out/'
```

## 📁 Structure du Projet

```
Globinet/
├── src/
│   ├── app/              # Routes et pages Next.js
│   │   ├── page.tsx      # Page d'accueil
│   │   ├── layout.tsx    # Layout principal
│   │   └── globals.css   # Styles globaux
│   ├── components/       # Composants React
│   │   ├── sections/     # Sections de la page
│   │   └── ...           # Autres composants
│   └── lib/              # Utilitaires et configuration
├── public/               # Assets statiques
├── .htaccess            # Configuration Apache/Hostinger
└── package.json         # Dépendances
```

## 🎨 Sections du Site

1. **Hero Section** : Présentation avec animation 3D
2. **About Section** : À propos de Globinet
3. **Portfolio Section** : Projets réalisés
4. **Process Section** : Processus de travail
5. **Contact Section** : Formulaire de contact

## 📝 Configuration

### Variables d'Environnement

Créez un fichier `.env.local` pour la configuration locale :

```env
# Configuration email (optionnel)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
```

## 🚀 Déploiement sur Hostinger

Consultez le fichier [DEPLOIEMENT_HOSTINGER.md](./DEPLOIEMENT_HOSTINGER.md) pour les instructions détaillées.

## 📄 Licence

Propriétaire - Globinet © 2025

## 👥 Auteur

Développé avec ❤️ par Globinet

---

**Site Web** : [www.globinet.com](https://www.globinet.com)  
**Contact** : contact@globinet.com
