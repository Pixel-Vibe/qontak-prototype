export default defineNuxtRouteMiddleware((to) => {
  // Skip on server — no localStorage
  if (import.meta.server) return;

  const isLoggedIn = !!localStorage.getItem("qontak-prototype-auth");

  // Not logged in and not going to /login → redirect to /login
  if (!isLoggedIn && to.path !== "/login") {
    return navigateTo("/login");
  }

  // Already logged in and going to /login → redirect to home
  if (isLoggedIn && to.path === "/login") {
    return navigateTo("/home");
  }
});
