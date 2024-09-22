import { useAccountStore } from './account.store';
import { useAuthStore } from './auth.store';
import { useLinkStore } from './link.store';

export * from './account.store';
export * from './auth.store';
export * from './link.store';
export * from './notif.store';

export function ClearStateAndStorage() {
  const { ReplaceAccount } = useAccountStore();
  const { EmptyingAuth } = useAuthStore();
  const { SetLink, ReplaceLinks } = useLinkStore();
  
  ReplaceAccount();
  EmptyingAuth();
  SetLink();
  ReplaceLinks();
}