# 🚀 Démarrage Rapide - Impact Prodige

## ✅ Le problème CORS est résolu!

### Ce qui a été corrigé:
- ❌ Suppression de `withCredentials: true` dans Axios
- ✅ Utilisation de JWT Bearer tokens uniquement
- ✅ Compatible avec votre backend `allowedOrigins: ["*"]`

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build pour la production
npm run build
```

## 🔧 Configuration

L'URL de l'API est déjà configurée dans `.env`:
```
VITE_API_URL=https://prodige-impact-f291a7e81489.herokuapp.com/api/v1
```

## 🎯 Fonctionnalités Implémentées

### ✅ Authentification
- Login avec email/password
- JWT Bearer token automatique
- Gestion des rôles (COORDINATOR, MEMBER)
- Auto-logout sur erreur 401

### ✅ Gestion des Ministères
- Liste des ministères avec images
- Recherche en temps réel
- Détails complets de chaque ministère
- Statistiques (membres, coordinateurs)

### ✅ Interface Utilisateur
- Design responsive (mobile, tablette, desktop)
- Multi-langue (Français/Anglais)
- Navigation fluide avec React Router
- Composants Material-UI

## 🔐 Comment Tester

1. **Démarrer l'application**
```bash
npm run dev
```

2. **Ouvrir** http://localhost:5173

3. **Se connecter** avec vos identifiants

4. **Explorer**:
   - `/login` - Page de connexion
   - `/dashboard` - Tableau de bord
   - `/dashboard/ministries` - Liste des ministères
   - `/dashboard/ministries/:id` - Détails d'un ministère

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header.tsx      # Navigation
│   ├── Footer.tsx      # Pied de page
│   ├── ProtectedRoute.tsx
│   └── AdminGuard.tsx
├── pages/              # Pages de l'application
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   └── dashboard/
│       └── ministries/ # Pages des ministères
├── services/           # Services API
│   ├── api.client.ts   # Client Axios configuré
│   ├── auth.service.ts # Gestion des tokens
│   └── ministry.service.ts
├── contexts/           # Contexts React
│   └── AuthProvider.tsx
├── types/              # Types TypeScript
│   └── index.ts
└── locales/            # Traductions
    ├── en/
    └── fr/
```

## 🔑 Points Clés

### Authentification JWT
```typescript
// Le token est automatiquement ajouté à chaque requête
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

### Pas de Cookies
```typescript
// ❌ withCredentials: true  (causait l'erreur CORS)
// ✅ Bearer token uniquement
```

### Rôles
- **COORDINATOR**: Accès au dashboard complet
- **MEMBER**: Accès standard

## 🐛 Débogage

### Voir les requêtes API
Ouvrez la console du navigateur (F12) → Onglet Network

### Voir le token
```javascript
localStorage.getItem('authToken')
```

### Voir l'utilisateur connecté
```javascript
localStorage.getItem('user')
```

## 📚 Documentation Complète

- **API_INTEGRATION.md** - Guide complet d'intégration API
- **CORS_SOLUTION_FR.md** - Explication détaillée du problème CORS

## ⚙️ Scripts Disponibles

```bash
npm run dev        # Démarrage développement
npm run build      # Build production
npm run preview    # Prévisualiser le build
npm run lint       # Vérifier le code
npm run typecheck  # Vérifier les types TypeScript
```

## 🌐 Déploiement

Le projet peut être déployé sur:
- **Netlify** (recommandé)
- **Vercel**
- **GitHub Pages**
- Tout hébergeur de sites statiques

Commande de build:
```bash
npm run build
```

Le dossier `dist/` contient les fichiers à déployer.

## 💡 Prochaines Étapes

1. **Tester le login** avec vos identifiants réels
2. **Vérifier** que les ministères s'affichent correctement
3. **Implémenter** les autres sections (Users, Events, etc.)
4. **Personnaliser** les couleurs et le style si nécessaire
5. **Déployer** en production

## 🆘 Support

En cas de problème:
1. Vérifier la console du navigateur (F12)
2. Vérifier que le backend est accessible
3. Vérifier les variables d'environnement dans `.env`
4. Consulter les documentations dans le projet

---

**L'application est prête à l'emploi! 🎉**
