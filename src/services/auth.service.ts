const TOKEN_EXP_KEY = 'authTokenExp';

export const authService = {
  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  },

  setTokenExp(exp: number): void {
    localStorage.setItem(TOKEN_EXP_KEY, String(exp));
  },

  getTokenExp(): number | null {
    const exp = localStorage.getItem(TOKEN_EXP_KEY);
    return exp != null ? Number(exp) : null;
  },

  isTokenExpired(): boolean {
    const exp = this.getTokenExp();
    if (exp == null) return true;
    const nowSeconds = Math.floor(Date.now() / 1000);
    const marginSeconds = 60;
    return nowSeconds >= exp - marginSeconds;
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
    localStorage.removeItem(TOKEN_EXP_KEY);
  },

  logout(): void {
    this.removeToken();
    localStorage.removeItem('user');
  }
};
