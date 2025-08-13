#!/bin/bash

# Script de déploiement pour Globinet - Compatible Linux/Mac/WSL
# Usage: ./deploy.sh

echo "🚀 Début du déploiement Globinet..."
echo "=================================="

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérification de Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js détecté${NC}"

# Installation des dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installation des dépendances...${NC}"
    npm install
fi

# Build du projet
echo -e "${YELLOW}🔨 Construction du site...${NC}"
npm run build

# Vérification que le build s'est bien passé
if [ ! -d "out" ]; then
    echo -e "${RED}❌ Erreur: Le dossier 'out' n'a pas été créé${NC}"
    exit 1
fi

# Copie des fichiers nécessaires pour Hostinger
echo -e "${YELLOW}📋 Copie des fichiers de configuration...${NC}"

# Copie du .htaccess
if [ -f ".htaccess" ]; then
    cp .htaccess out/.htaccess
    echo -e "${GREEN}✓ .htaccess copié${NC}"
else
    echo -e "${YELLOW}⚠️  .htaccess non trouvé${NC}"
fi

# Copie du script PHP d'envoi d'email
if [ -f "public/send-email.php" ]; then
    cp public/send-email.php out/send-email.php
    echo -e "${GREEN}✓ send-email.php copié${NC}"
else
    echo -e "${YELLOW}⚠️  send-email.php non trouvé${NC}"
fi

# Résumé
echo ""
echo "=================================="
echo -e "${GREEN}✅ Build terminé avec succès !${NC}"
echo ""
echo "📁 Les fichiers sont prêts dans le dossier 'out/'"
echo ""
echo "📤 Prochaines étapes pour déployer sur Hostinger:"
echo "   1. Connectez-vous à votre panneau Hostinger"
echo "   2. Utilisez le gestionnaire de fichiers ou FTP"
echo "   3. Uploadez TOUT le contenu du dossier 'out/' dans 'public_html'"
echo "   4. Assurez-vous que le fichier .htaccess est bien présent"
echo ""
echo "💡 Pour tester localement avant le déploiement:"
echo "   cd out && python3 -m http.server 3000"
echo "   Puis ouvrez http://localhost:3000"
echo ""
echo "=================================="

# Option pour tester localement
read -p "Voulez-vous tester le site localement maintenant ? (o/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Oo]$ ]]; then
    echo -e "${YELLOW}🌐 Lancement du serveur de test...${NC}"
    echo "Ouvrez http://localhost:3000 dans votre navigateur"
    echo "Appuyez sur Ctrl+C pour arrêter le serveur"
    cd out && python3 -m http.server 3000
fi
