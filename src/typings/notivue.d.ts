import type {
  Push
} from 'notivue';
declare global {
  interface Window {
    $notivue: Push;
  }
}
