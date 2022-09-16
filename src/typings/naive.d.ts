import type {
  MessageProviderInst,
  NotificationProviderInst,
  DialogProviderInst,
  LoadingBarProviderInst,
} from 'naive-ui';
declare global {
  interface Window {
    $message: MessageProviderInst;
    $notification: NotificationProviderInst;
    $dialog: DialogProviderInst;
    $loadingBar: LoadingBarProviderInst;
  }
}
