import { createContext, useContext, type ReactNode } from 'react';

/**
 * True when a calculator is rendered inside the /embed/<slug> shell (iframe
 * used by the main Batup app in a modal). In embed mode we drop the email
 * opt-in and the mobile sticky bar so the tool blends into the host app.
 */
const EmbedContext = createContext(false);

export function EmbedProvider({ children }: { children: ReactNode }) {
  return <EmbedContext.Provider value={true}>{children}</EmbedContext.Provider>;
}

export function useEmbedded(): boolean {
  return useContext(EmbedContext);
}
