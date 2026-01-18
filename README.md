# NEXORIA DIGITAL - Site Web Professionnel

Site web professionnel pour une entreprise de services digitaux avec panneau d'administration.

## 🚀 Fonctionnalités

### Site Principal (`index.html`)
- **Design moderne et professionnel** avec logo hexagon 3D animé
- **Responsive mobile-first** optimisé pour tous les appareils
- **Sections complètes** : Hero, Services, Offres, Commande, À propos, Contact
- **Formulaire de commande interactif** avec validation en temps réel
- **Bouton WhatsApp flottant** pour contact direct
- **Animations fluides** et effets visuels professionnels
- **Compatibilité Edge** avec tous les préfixes CSS nécessaires

### Panneau Administrateur (`admin.html`)
- **Authentification sécurisée** (localStorage)
- **Tableau de bord** avec statistiques en temps réel
- **Gestion des commandes** : voir, modifier le statut, supprimer
- **Export CSV** des commandes
- **Interface moderne** et intuitive

## 📁 Structure des fichiers

```
├── index.html          # Site principal
├── admin.html          # Panneau administrateur
├── styles.css          # Styles du site principal
├── admin.css           # Styles du panneau admin
├── script.js           # JavaScript du site principal
├── admin.js            # JavaScript du panneau admin
└── README.md           # Ce fichier
```

## 🔐 Accès Administrateur

**URL** : `admin.html`

**Identifiants par défaut** :
- **Nom d'utilisateur** : `admin`
- **Mot de passe** : `nexoria2024`

⚠️ **IMPORTANT** : Changez le mot de passe dans `admin.js` (ligne 4) pour la sécurité !

## 🎨 Caractéristiques du Design

### Couleurs Professionnelles
- Fond sombre moderne (#010409, #0d1117)
- Bleu électrique (#00d4ff) pour les accents
- Bleu métallique (#4a90e2) pour le texte
- Ombres et effets de glow professionnels

### Logo
- Hexagone 3D avec design interne stylisé en "N"
- Effets de glow animés
- Couleurs dégradées bleu électrique

### Détails Visuels
- Cartes avec effets hover 3D
- Ombres portées professionnelles
- Gradients subtils
- Transitions fluides
- Scrollbar personnalisée

## 📱 Responsive Design

Le site est entièrement responsive et optimisé pour :
- 📱 Mobile (< 480px)
- 📱 Tablette (768px)
- 💻 Desktop (> 1200px)

## 🔧 Utilisation

1. **Ouvrir le site principal** : Double-cliquez sur `index.html` ou ouvrez-le dans Edge
2. **Accéder à l'admin** : Ouvrez `admin.html` dans votre navigateur
3. **Se connecter** : Utilisez les identifiants par défaut
4. **Gérer les commandes** : Les commandes du formulaire principal apparaissent automatiquement dans l'admin

## 📊 Fonctionnalités Admin

- **Statistiques** : Nombre total de commandes, en attente, terminées, revenus
- **Tableau des commandes** : Liste complète avec filtres
- **Détails** : Voir toutes les informations d'une commande
- **Statuts** : Modifier le statut (En attente, En cours, Terminée)
- **Export** : Télécharger les commandes en CSV

## 🎯 Services Proposés

1. **Création de Sites Web**
   - Sites vitrine
   - Landing pages
   - E-commerce

2. **Branding & Identité Visuelle**
   - Création de logo
   - Charte graphique
   - Identité visuelle complète

3. **Storyline & Storytelling**
   - Développement de storyline
   - Contenus narratifs
   - Stratégie de storytelling

## 💡 Personnalisation

### Changer le mot de passe admin
Éditez `admin.js` ligne 4 :
```javascript
password: 'votre_nouveau_mot_de_passe'
```

### Modifier les couleurs
Éditez `styles.css` dans la section `:root` (lignes 8-21)

### Modifier les offres
Éditez la section "Offres" dans `index.html`

## 🌐 Compatibilité

- ✅ Microsoft Edge (toutes versions récentes)
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 📝 Notes

- Les commandes sont stockées dans le localStorage du navigateur
- Pour un environnement de production, connectez-vous à une base de données
- Le système admin est protégé par authentification simple (améliorez pour la production)

## 🎨 Crédits

Design et développement pour NEXORIA DIGITAL
Logo : Hexagone 3D avec design interne stylisé

---

**NEXORIA DIGITAL** - Le meilleur du digital
