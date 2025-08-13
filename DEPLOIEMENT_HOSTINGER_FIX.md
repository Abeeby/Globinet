# 🔧 Guide de Résolution - Erreur 403 sur Hostinger

## Problème : Erreur 403 Forbidden

Cette erreur indique un problème de permissions sur le serveur Hostinger.

## Solutions à appliquer :

### 1. ✅ Fichiers déjà corrigés dans le dossier `out/` :

- **`.htaccess`** - Version optimisée pour Hostinger avec permissions correctes
- **`index.php`** - Fichier de fallback PHP pour contourner les restrictions
- **`.user.ini`** - Configuration PHP personnalisée

### 2. 📤 Re-déployer les fichiers :

1. **Supprimez TOUS les fichiers** dans `public_html` sur Hostinger
2. **Uploadez à nouveau** tout le contenu du dossier `out/`
3. **Vérifiez que ces fichiers sont bien présents** :
   - `.htaccess` (fichier caché, activez l'affichage des fichiers cachés)
   - `index.html`
   - `index.php`
   - `.user.ini`
   - Dossier `_next/` avec tous les assets

### 3. 🔐 Vérifier les permissions dans Hostinger :

Via le gestionnaire de fichiers Hostinger ou FTP :

1. **Permissions des dossiers** : `755` (drwxr-xr-x)
   ```
   public_html : 755
   _next : 755
   Tous les sous-dossiers : 755
   ```

2. **Permissions des fichiers** : `644` (-rw-r--r--)
   ```
   .htaccess : 644
   index.html : 644
   index.php : 644
   Tous les fichiers .js, .css, .html : 644
   ```

### 4. 🛠️ Si l'erreur persiste :

#### Option A : Utiliser le File Manager de Hostinger

1. Connectez-vous au panneau Hostinger
2. Allez dans **File Manager**
3. Cliquez droit sur `public_html`
4. Sélectionnez **Change Permissions**
5. Mettez `755` et cochez **Apply to all subdirectories and files**

#### Option B : Créer un fichier de test

Créez `public_html/test.html` avec :
```html
<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body><h1>Test OK</h1></body>
</html>
```

Si `globiweb.com/test.html` fonctionne mais pas la page d'accueil, c'est un problème de configuration.

#### Option C : Contacter le support Hostinger

Si rien ne fonctionne, contactez le support avec ces informations :
- Erreur 403 sur site Next.js exporté en statique
- Fichier `.htaccess` présent avec règles de réécriture
- Besoin d'activer `mod_rewrite` et `AllowOverride All`

### 5. 🔄 Configuration alternative (si nécessaire) :

Si Hostinger ne supporte pas bien les règles de réécriture, utilisez cette configuration minimaliste :

**`.htaccess` minimal :**
```apache
Options -Indexes
DirectoryIndex index.html index.php

# Permissions
Require all granted

# Erreurs
ErrorDocument 403 /index.html
ErrorDocument 404 /404.html
```

### 6. 📝 Checklist de vérification :

- [ ] Le domaine pointe bien vers le bon dossier
- [ ] Le fichier `.htaccess` est présent dans `public_html`
- [ ] Le fichier `index.html` existe dans `public_html`
- [ ] Les permissions sont correctes (755 pour dossiers, 644 pour fichiers)
- [ ] Le module `mod_rewrite` est activé (généralement par défaut)
- [ ] Pas d'autre `.htaccess` dans les dossiers parents

### 7. 🚀 Solution rapide :

Si vous voulez une solution rapide qui fonctionne à coup sûr :

1. Renommez `index.html` en `index.php` dans le dossier `out`
2. Uploadez tout sur Hostinger
3. Le site devrait fonctionner (PHP est toujours activé sur Hostinger)

## Support

Si le problème persiste après toutes ces étapes, le problème vient probablement de la configuration du serveur Hostinger. Dans ce cas :

1. Vérifiez votre plan d'hébergement (certains plans basiques ont des restrictions)
2. Contactez le support Hostinger en leur montrant l'erreur
3. Demandez-leur d'activer `AllowOverride All` pour votre domaine

---

**Note** : L'erreur 403 est généralement facile à résoudre. Dans 90% des cas, c'est un problème de permissions ou de fichier `.htaccess` mal configuré.
