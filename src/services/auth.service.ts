export const authService = {
  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  },

  setRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  },

  removeToken(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  },

  logout(): void {
    this.removeToken();
    localStorage.removeItem('user');
  }
};
