const DUMMY_EMAIL = "prototype@qontak.com";
const DUMMY_PASSWORD = "qontakuhuy";
const AUTH_KEY = "qontak-prototype-auth";

export function useAuth() {
  const isLoggedIn = (): boolean => {
    if (import.meta.client) {
      return !!localStorage.getItem(AUTH_KEY);
    }
    return false;
  };

  const login = (email: string, password: string): boolean => {
    if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "1");
      return true;
    }
    return false;
  };

  const logout = (): void => {
    if (import.meta.client) {
      localStorage.removeItem(AUTH_KEY);
    }
    navigateTo("/login");
  };

  return { isLoggedIn, login, logout };
}
