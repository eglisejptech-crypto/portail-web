# API Integration Guide

## Base URL Configuration

The application is configured to use the production API:
- **Base URL**: `https://prodige-impact-f291a7e81489.herokuapp.com/api/v1`

Configuration is set in `.env` file:
```
VITE_API_URL=https://prodige-impact-f291a7e81489.herokuapp.com/api/v1
VITE_API_URL_PROD=https://prodige-impact-f291a7e81489.herokuapp.com/api/v1
```

## Authentication

### Login Endpoint
- **URL**: `/auth/login`
- **Method**: POST
- **Body**: 
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

### Response Structure
```json
{
  "success": true,
  "statusCode": {
    "code": 200,
    "description": "Authentification réussie"
  },
  "data": {
    "token": "JWT_TOKEN",
    "refreshToken": "REFRESH_TOKEN",
    "exp": 1764538720,
    "roles": ["COORDINATOR", "MEMBER"],
    "userId": 34,
    "email": "user@example.com",
    "firstName": "FirstName",
    "lastName": "LastName",
    "ministryIds": [16],
    "coordinatorMinistryIds": [16]
  }
}
```

### Token Management
- Access token is stored in `localStorage` as `authToken`
- Refresh token is stored in `localStorage` as `refreshToken`
- Token is automatically added to all API requests via Bearer authentication
- Token is added to `Authorization` header as `Bearer {token}`

## API Client Configuration

The API client (`src/services/api.client.ts`) is configured with:
- **Base URL**: From environment variable
- **Headers**: `Content-Type: application/json`
- **Authentication**: Bearer token automatically injected via interceptor

**Note**: `withCredentials` is NOT used because we use JWT Bearer tokens instead of cookies. This allows the backend to use `allowedOrigins: ["*"]` for CORS without conflicts.

### Request Interceptor
- Skips token injection for `/auth/login` endpoint
- Adds `Authorization: Bearer {token}` header to all other requests

### Response Interceptor
- Handles 401 errors by logging out the user
- Handles 403 errors by logging to console
- Logs other API errors

## Ministry Service

### Get All Ministries
- **Endpoint**: `/ministries`
- **Method**: GET
- **Authentication**: Not required (public endpoint)
- **Query Params**: 
  - `page` (default: 0)
  - `size` (default: 20)

### Get Ministry by ID
- **Endpoint**: `/ministries/{id}`
- **Method**: GET
- **Authentication**: Required

### Create Ministry
- **Endpoint**: `/ministries`
- **Method**: POST
- **Authentication**: Required

### Update Ministry
- **Endpoint**: `/ministries/{id}`
- **Method**: PUT
- **Authentication**: Required

### Delete Ministry
- **Endpoint**: `/ministries/{id}`
- **Method**: DELETE
- **Authentication**: Required

## Role-Based Access Control

### Roles
- **COORDINATOR**: Has access to dashboard and admin features
- **MEMBER**: Standard user access

### Guards
- `ProtectedRoute`: Requires authentication
- `AdminGuard`: Requires authentication + COORDINATOR role

## Type Definitions

All API types are defined in `src/types/index.ts`:
- `ApiResponse<T>`: Standard API response wrapper
- `LoginResponse`: Login endpoint response data
- `User`: User data structure
- `Ministry`: Ministry data structure
- `PaginatedResponse<T>`: Paginated list response

## Testing the Integration

To test the API integration:

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `/login`

3. Login with valid credentials

4. After successful login, navigate to `/dashboard/ministries`

5. You should see the list of ministries loaded from the API

## Error Handling

- Network errors are caught and displayed to users
- 401 errors automatically log out the user
- Loading states are shown during API calls
- Error messages are displayed in red alert boxes

## CORS Configuration

### Problem
The error `CORS policy: credentials flag is 'true', but Access-Control-Allow-Credentials header is ''` occurs when:
- Frontend uses `withCredentials: true`
- Backend uses `allowedOrigins: ["*"]`

These two settings are incompatible because browsers don't allow wildcard origins with credentials for security reasons.

### Solution
Since we use **JWT Bearer tokens** (not cookies), we don't need `withCredentials: true`.

**Frontend Configuration** (already applied):
```typescript
// src/services/api.client.ts
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials is removed - we use Bearer tokens instead
});
```

**Backend Configuration** (your current setup works):
```java
configuration.setAllowedOrigins(List.of("*"));
```

### Alternative Backend Configurations

If you want to be more restrictive, you can specify exact origins:

```java
// Option 1: Specific origins (recommended for production)
configuration.setAllowedOrigins(List.of(
    "http://localhost:5173",           // Local dev
    "https://your-production-url.com"  // Production
));

// Option 2: All origins with wildcard (current setup)
configuration.setAllowedOrigins(List.of("*"));

// Option 3: Pattern-based (Spring Boot 2.4+)
configuration.setAllowedOriginPatterns(List.of("*"));
```

### Required CORS Headers

Your backend should include these headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 3600
```
