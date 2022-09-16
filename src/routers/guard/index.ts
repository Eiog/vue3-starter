import { Router } from 'vue-router';
import { useNProgress, useChangeTitle } from './helps';
const useGuard = (router: Router) => {
  const { start, done } = useNProgress();
  router.beforeEach((to, from, next) => {
    start();
    next();
  });
  router.afterEach((to, from) => {
    useChangeTitle(to);
    done();
  });
};
export default useGuard;
