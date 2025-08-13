# Guide de Déploiement sur Hostinger

## 📋 Prérequis

- Un compte Hostinger avec un hébergement mutualisé actif
- Node.js installé localement (version 18+ recommandée)
- Accès FTP ou au gestionnaire de fichiers Hostinger

## 🚀 Étapes de Déploiement

### 1. Préparation du Build

Exécutez les commandes suivantes dans votre terminal local :

```bash
# Installer les dépendances si ce n'est pas déjà fait
npm install

# Créer le build statique
npm run build:static

# Préparer les fichiers pour le déploiement
npm run deploy:prepare
```

Le dossier `out/` contiendra tous les fichiers statiques prêts à être déployés.

### 2. Test Local (Optionnel)

Pour tester le site en local avant le déploiement :

```bash
npm run deploy:test
```

Ouvrez http://localhost:3000 pour vérifier que tout fonctionne.

### 3. Upload sur Hostinger

#### Option A : Via le Gestionnaire de Fichiers Hostinger

1. Connectez-vous à votre panneau de contrôle Hostinger
2. Allez dans "Gestionnaire de fichiers"
3. Naviguez vers le dossier `public_html`
4. **IMPORTANT** : Supprimez tous les fichiers existants dans `public_html` (gardez une sauvegarde si nécessaire)
5. Uploadez **TOUT** le contenu du dossier `out/` (pas le dossier lui-même)
6. Assurez-vous que le fichier `.htaccess` est bien présent à la racine

#### Option B : Via FTP (Recommandé pour les gros projets)

1. Utilisez un client FTP (FileZilla, Cyberduck, etc.)
2. Connectez-vous avec vos identifiants FTP Hostinger :
   - Hôte : ftp.votredomaine.com
   - Utilisateur : votre_utilisateur_ftp
   - Mot de passe : votre_mot_de_passe_ftp
   - Port : 21

3. Naviguez vers `/public_html`
4. Supprimez les anciens fichiers
5. Uploadez tout le contenu du dossier `out/`

### 4. Configuration Post-Déploiement

#### Activer HTTPS (Recommandé)

1. Dans le panneau Hostinger, allez dans "SSL"
2. Activez le certificat SSL gratuit
3. Une fois activé, décommentez les lignes HTTPS dans le fichier `.htaccess` :

```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

#### Configuration du Domaine

Si vous utilisez un sous-domaine ou un domaine personnalisé :
1. Configurez-le dans le panneau Hostinger
2. Pointez-le vers le dossier `public_html`

## 🔧 Résolution des Problèmes

### Erreur 404 sur toutes les pages

**Solution** : Vérifiez que :
- Le fichier `.htaccess` est présent et correctement uploadé
- Les permissions des fichiers sont correctes (644 pour les fichiers, 755 pour les dossiers)
- Le module `mod_rewrite` est activé (normalement activé par défaut sur Hostinger)

### Les images ne s'affichent pas

**Solution** : 
- Vérifiez que toutes les images sont dans le dossier `public/` de votre projet
- Les chemins d'images doivent commencer par `/` (ex: `/images/logo.png`)

### Le formulaire de contact ne fonctionne pas

**Solution** :
- Pour un hébergement mutualisé, vous devrez configurer un service externe (EmailJS, Formspree, etc.)
- Ou utiliser les fonctions PHP de Hostinger pour l'envoi d'emails

### Pages dynamiques non fonctionnelles

**Important** : L'export statique ne supporte pas :
- Les routes API Next.js (sauf si converties en endpoints externes)
- Le rendu côté serveur (SSR)
- La génération statique incrémentale (ISR)
- Les fonctionnalités nécessitant un serveur Node.js

## 📝 Notes Importantes

1. **Mise à jour du site** : À chaque modification, vous devez :
   - Reconstruire le site localement (`npm run build:static`)
   - Re-uploader les fichiers modifiés

2. **Performance** : Le site statique sera très rapide car :
   - Pas de traitement serveur
   - Fichiers servis directement
   - Cache navigateur optimisé via `.htaccess`

3. **Limitations** :
   - Pas de fonctionnalités dynamiques côté serveur
   - Le formulaire de contact nécessite une solution externe
   - Pas de base de données

## 🔄 Script de Déploiement Automatisé (Optionnel)

Créez un fichier `deploy.sh` pour automatiser le processus :

```bash
#!/bin/bash
echo "🚀 Début du déploiement..."

# Build
echo "📦 Construction du site..."
npm run build:static

# Copie du .htaccess
echo "📋 Copie des fichiers de configuration..."
cp .htaccess out/.htaccess

echo "✅ Build terminé !"
echo "📤 Uploadez maintenant le contenu du dossier 'out/' sur Hostinger"
```

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur pour les erreurs JavaScript
2. Consultez les logs d'erreur dans le panneau Hostinger
3. Contactez le support Hostinger pour les problèmes d'hébergement

---

**Dernière mise à jour** : Janvier 2025