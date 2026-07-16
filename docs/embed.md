# Intégrer un calculateur dans l'app Batup (iframe)

Les calculateurs d'outils.batup.fr sont réutilisables **tels quels** dans l'app
principale (app.batup.fr) via une `<iframe>`, sans dupliquer le code. Une seule
source de vérité : toute correction sur outils.batup.fr est répercutée
instantanément dans l'app.

## URL d'embed

Chaque outil est disponible en version « nue » (sans nav, hero, footer, FAQ, ni
capture email) à :

```
https://outils.batup.fr/embed/<slug>
```

Le `<slug>` est l'identifiant de l'outil (le même que l'URL publique sans le `/`),
par exemple :

- `https://outils.batup.fr/embed/calculateur-beton`
- `https://outils.batup.fr/embed/calculateur-taux-horaire-btp`
- `https://outils.batup.fr/embed/calculateur-surface`

La liste complète des slugs correspond aux `path` de `src/seo-manifest.ts`.

## Auto-dimensionnement

L'embed renvoie sa hauteur de contenu à la fenêtre parente à chaque changement
(via `ResizeObserver`) par `postMessage` :

```js
{ type: 'batup-embed-height', slug: 'calculateur-beton', height: 812 }
```

Le parent écoute ce message et ajuste la hauteur de l'iframe. **Vérifiez toujours
`event.origin`** avant de traiter le message.

## Composant React (modale)

```tsx
import { useEffect, useRef, useState } from 'react';

const EMBED_ORIGIN = 'https://outils.batup.fr';

export function CalculatorModal({ slug, onClose }: { slug: string; onClose: () => void }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(480);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== EMBED_ORIGIN) return; // sécurité : n'accepter que notre domaine
      const data = e.data;
      if (data?.type === 'batup-embed-height' && data.slug === slug) {
        setHeight(data.height);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [slug]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Fermer">×</button>
        <iframe
          ref={iframeRef}
          src={`${EMBED_ORIGIN}/embed/${slug}`}
          title="Calculateur Batup"
          style={{ width: '100%', height, border: 0 }}
          loading="lazy"
        />
      </div>
    </div>
  );
}
```

Usage : `<CalculatorModal slug="calculateur-beton" onClose={...} />`.

## Notes

- Les pages `/embed/*` sont en `noindex` et hors sitemap (pas de SEO).
- En mode embed, la capture email et la barre de résultat mobile fixe sont
  désactivées (l'utilisateur est déjà authentifié dans l'app).
- Le bouton « Essayer Batup gratuitement » reste présent dans le résultat : si
  vous le voulez masqué dans l'app, on peut l'exclure en mode embed (ajout d'un
  drapeau à faire côté outils.batup.fr).
- **Récupérer le résultat dans l'app** (renvoyer le nombre calculé au parent par
  `postMessage`) n'est pas encore branché — c'est un ajout simple si besoin :
  chaque calculateur émettrait un message `batup-embed-result` avec sa valeur.
```
