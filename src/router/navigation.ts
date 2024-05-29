import { Router } from 'vue-router';

export function goToLogin(router: Router, component: { tab: string }) {
  component.tab = 'login';
  router.push('/login');
}

export function goToRegister(router: Router, component: { tab: string }) {
  component.tab = 'register';
  router.push('/register');
}

export function goToHome(router: Router, component: { tab: string }) {
  component.tab = 'home';
  router.push('/home');
}

export function goToBlank(router: Router, component: { tab: string }) {
  component.tab = '/';
  router.push('/');
}

export function goToForgotPw(router: Router, component: { tab: string }) {
  component.tab = 'forgot-password';
  router.push('/forgot-password');
}

export function goToProfileCompletion(
  router: Router,
  component: { tab: string }
) {
  component.tab = 'profile-completion';
  router.push('/profile-completion');
}
