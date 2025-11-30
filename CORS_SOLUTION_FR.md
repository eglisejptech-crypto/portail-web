# Solution au Problème CORS

## Le Problème

Vous rencontriez l'erreur CORS suivante:
```
Access to XMLHttpRequest has been blocked by CORS policy: 
The value of the 'Access-Control-Allow-Credentials' header in the response 
is '' which must be 'true' when the request's credentials mode is 'include'.
```

## Explication

Cette erreur se produit à cause d'un conflit entre deux configurations:

1. **Frontend**: Utilisait `withCredentials: true` dans Axios
2. **Backend**: Utilisait `allowedOrigins: ["*"]` (wildcard)

**Pourquoi c'est incompatible?**

Pour des raisons de sécurité, les navigateurs n'autorisent PAS la combinaison:
- `Access-Control-Allow-Origin: *` (wildcard)
- `Access-Control-Allow-Credentials: true` (credentials activées)

Quand le frontend envoie des requêtes avec `credentials: true`, le backend DOIT:
- Spécifier l'origine exacte (pas de wildcard)
- ET retourner `Access-Control-Allow-Credentials: true`

## La Solution

Puisque vous utilisez l'authentification par **JWT Bearer Token** (pas de cookies), vous n'avez PAS besoin de `withCredentials: true`.

### Ce qui a été modifié

**Dans `src/services/api.client.ts`:**

```typescript
// ❌ AVANT (causait l'erreur CORS)
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,  // ← Problème ici
});

// ✅ APRÈS (résout le problème)
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials supprimé - on utilise Bearer tokens
});
```

### Pourquoi ça fonctionne maintenant?

1. **Sans `withCredentials`**: Le navigateur n'exige plus de vérifications CORS strictes
2. **Avec JWT Bearer**: Le token est envoyé via le header `Authorization: Bearer <token>`
3. **Backend avec wildcard**: Votre configuration `allowedOrigins: ["*"]` fonctionne parfaitement

## Configuration Backend

Votre configuration actuelle devrait fonctionner:

```java
configuration.setAllowedOrigins(List.of("*"));
configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
configuration.setAllowedHeaders(List.of("Content-Type", "Authorization"));
configuration.setMaxAge(3600L);
```

## Options pour la Production

### Option 1: Garder le wildcard (actuel)
```java
configuration.setAllowedOrigins(List.of("*"));
```
**Avantages**: Simple, fonctionne de partout
**Inconvénients**: Moins sécurisé

### Option 2: Origines spécifiques (recommandé)
```java
configuration.setAllowedOrigins(List.of(
    "http://localhost:5173",              // Développement local
    "https://votre-app.netlify.app",      // Production
    "https://votre-domaine.com"           // Domaine custom
));
```
**Avantages**: Plus sécurisé
**Inconvénients**: Doit être mis à jour pour chaque nouveau domaine

### Option 3: Pattern-based (Spring Boot 2.4+)
```java
configuration.setAllowedOriginPatterns(List.of("*"));
configuration.setAllowCredentials(true);  // Possible avec patterns
```
**Avantages**: Flexible et peut utiliser credentials si nécessaire
**Inconvénients**: Nécessite Spring Boot 2.4+

## Comment Tester

1. **Démarrer le frontend**:
```bash
npm run dev
```

2. **Aller sur** `http://localhost:5173/login`

3. **Se connecter** avec vos identifiants

4. **Vérifier** que:
   - Le login fonctionne
   - Le token est stocké
   - Les ministères s'affichent sur `/dashboard/ministries`

5. **Dans la console du navigateur** (F12), vous devriez voir:
```
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

## Résumé

✅ **Frontend**: `withCredentials` supprimé
✅ **Backend**: Configuration `allowedOrigins: ["*"]` fonctionne
✅ **Authentification**: Via JWT Bearer Token dans le header Authorization
✅ **CORS**: Plus d'erreurs!

## Questions Fréquentes

**Q: Pourquoi ne pas utiliser `withCredentials: true`?**
R: C'est nécessaire UNIQUEMENT si vous utilisez des cookies pour l'authentification. Avec JWT, c'est inutile et cause des problèmes CORS.

**Q: Le token est-il sécurisé?**
R: Oui, le token JWT est envoyé dans le header `Authorization` via HTTPS en production.

**Q: Dois-je changer quelque chose côté backend?**
R: Non, votre configuration actuelle avec `allowedOrigins: ["*"]` fonctionne maintenant parfaitement.

**Q: Et pour la production?**
R: Considérez l'Option 2 (origines spécifiques) pour plus de sécurité, mais le wildcard fonctionne aussi.
