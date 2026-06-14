import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'batup_outils_email_unlocked_v1';

interface PendingContext {
  toolSlug: string;
  toolLabel: string;
  resultPreview?: string;
}

interface EmailGateContextValue {
  unlocked: boolean;
  pending: PendingContext | null;
  openGate: (ctx: PendingContext) => void;
  closeGate: () => void;
  markUnlocked: () => void;
}

const EmailGateContext = createContext<EmailGateContextValue | null>(null);

function readStoredFlag(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function EmailGateProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean>(() => readStoredFlag());
  const [pending, setPending] = useState<PendingContext | null>(null);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setUnlocked(e.newValue === '1');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const openGate = useCallback((ctx: PendingContext) => {
    setPending(ctx);
  }, []);

  const closeGate = useCallback(() => {
    setPending(null);
  }, []);

  const markUnlocked = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore (private browsing)
    }
    setUnlocked(true);
    setPending(null);
  }, []);

  const value = useMemo<EmailGateContextValue>(
    () => ({ unlocked, pending, openGate, closeGate, markUnlocked }),
    [unlocked, pending, openGate, closeGate, markUnlocked],
  );

  return <EmailGateContext.Provider value={value}>{children}</EmailGateContext.Provider>;
}

export function useEmailGate(): EmailGateContextValue {
  const ctx = useContext(EmailGateContext);
  if (!ctx) {
    throw new Error('useEmailGate must be used inside <EmailGateProvider>');
  }
  return ctx;
}
