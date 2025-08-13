#!/bin/bash

# Script de déploiement pour Hostinger
# Utilisation: ./deploy.sh

echo "🚀 Début du déploiement pour Hostinger..."
echo ""

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Nettoyer le dossier de build précédent
if [ -d "out" ]; then
    echo "🧹 Nettoyage du dossier de build précédent..."
    rm -rf out
fi

# Créer le build statique
echo "🔨 Construction du site statique..."
npm run build

# Vérifier si le build a réussi
if [ ! -d "out" ]; then
    echo "❌ Erreur lors de la construction du site."
    exit 1
fi

# Copier les fichiers nécessaires
echo "📋 Copie des fichiers de configuration..."
cp .htaccess out/.htaccess 2>/dev/null || echo "⚠️  Fichier .htaccess non trouvé"
cp public/send-email.php out/send-email.php 2>/dev/null || echo "⚠️  Fichier send-email.php non trouvé"

# Créer un fichier robots.txt si nécessaire
if [ ! -f "out/robots.txt" ]; then
    echo "🤖 Création du fichier robots.txt..."
    cat > out/robots.txt << EOF
User-agent: *
Allow: /
Sitemap: https://votre-domaine.com/sitemap.xml
EOF
fi

# Afficher les statistiques du build
echo ""
echo "✅ Build terminé avec succès !"
echo ""
echo "📊 Statistiques du build :"
echo "  - Nombre de fichiers HTML : $(find out -name "*.html" | wc -l)"
echo "  - Nombre de fichiers CSS : $(find out -name "*.css" | wc -l)"
echo "  - Nombre de fichiers JS : $(find out -name "*.js" | wc -l)"
echo "  - Taille totale : $(du -sh out | cut -f1)"
echo ""

# Instructions pour le déploiement
echo "📤 Prochaines étapes pour le déploiement :"
echo ""
echo "1. Connectez-vous à votre panneau Hostinger"
echo "2. Allez dans le Gestionnaire de fichiers"
echo "3. Naviguez vers le dossier public_html"
echo "4. Supprimez les anciens fichiers (gardez une sauvegarde)"
echo "5. Uploadez tout le contenu du dossier 'out/'"
echo ""
echo "💡 Conseil : Pour tester localement avant le déploiement :"
echo "   npm run deploy:test"
echo ""
echo "📧 N'oubliez pas de configurer l'envoi d'emails :"
echo "   - Modifiez src/lib/email-config.ts"
echo "   - Ou configurez public/send-email.php avec votre email"
echo ""
echo "🎉 Bonne chance pour votre déploiement !"
