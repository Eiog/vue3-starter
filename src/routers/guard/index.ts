import { Router } from 'vue-router';
import { useNProgress, useChangeTitle } from './_methods';
export function createGuard(router: Router) {
  const { start, done } = useNProgress();
  router.beforeEach((to, from, next) => {
    start();
    next();
  });
  router.afterEach((to, from) => {
    useChangeTitle(to);
    done();
  });
}
