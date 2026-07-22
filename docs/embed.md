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
- En mode embed, la capture email, la barre de résultat mobile fixe et le
  bouton « Essayer Batup gratuitement » sont désactivés (l'utilisateur est
  déjà authentifié dans l'app).
- Sur les 20 outils métré, le CTA est remplacé par « Utiliser dans le devis »
  qui renvoie les quantités calculées au parent — voir ci-dessous.

## Canal résultat — `batup-embed-result` (v1, contrat FIGÉ)

Les calculateurs **métré** peuvent renvoyer leurs quantités à l'app hôte pour
les transformer en lignes de devis. Quand le résultat contient au moins une
ligne valide, l'embed affiche un bouton « Utiliser dans le devis » ; le clic
émet vers `window.parent` :

```js
{
  type: 'batup-embed-result',
  slug: 'calculateur-peinture',   // slug de l'outil embarqué
  version: 1,                     // version du contrat — à vérifier côté hôte
  payload: {
    lines: [
      {
        lineKey: 'peinture.litres',       // identifiant STABLE — à mapper sur un article
        label: 'Peinture (2 couches)',    // libellé d'affichage français
        qty: 8.4,                          // quantité, toujours finie et > 0
        unit: 'L',                         // unité normalisée (voir ci-dessous)
        hint: 'rendement 10 m²/L, perte +5 %', // optionnel : détail dosage/rendement/perte
      },
    ],
    meta: { surface: 40, couches: 2, rendement: 10, perte: 5 }, // optionnel :
    // entrées du calculateur pour traçabilité (string | number | boolean uniquement)
  }
}
```

Sémantique des champs :

| Champ | Type | Sémantique |
| --- | --- | --- |
| `slug` | `string` | Slug de l'outil (celui de l'URL `/embed/<slug>`). |
| `version` | `number` | Version du contrat. Vaut `1`. Toute évolution incompatible incrémentera ce numéro — l'hôte doit ignorer les versions inconnues. |
| `payload.lines[].lineKey` | `string` | Identifiant stable `<domaine>.<quantite>` (snake_case après le point, regex `^[a-z_]+\.[a-z0-9_]+$`). C'est la clé de mapping vers la bibliothèque d'articles de l'hôte — elle ne changera jamais en v1. |
| `payload.lines[].label` | `string` | Libellé français prêt à afficher (peut servir de désignation par défaut si le `lineKey` n'est pas mappé). |
| `payload.lines[].qty` | `number` | Quantité, garantie finie et strictement positive (les lignes nulles sont filtrées côté embed). |
| `payload.lines[].unit` | `string` | Une valeur de `'m2' \| 'm3' \| 'ml' \| 'u' \| 'kg' \| 'L' \| 'sac' \| 'paquet' \| 'h'`. |
| `payload.lines[].hint` | `string?` | Détail de calcul (dosage, rendement, perte) — informatif uniquement. |
| `payload.meta` | `object?` | Entrées du calculateur (traçabilité). Valeurs `string \| number \| boolean`. |

Code source du contrat : `src/lib/embed-result.ts` (types + émission) et
`src/lib/embed-payloads.ts` (un builder pur par outil).

### lineKeys par outil (v1)

Seuls les 20 outils métré émettent des résultats. Les outils pricing / paie /
fiscal / assurances n'ont pas de lignes de devis naturelles et n'affichent
rien en embed (v1).

| Slug | lineKeys (unité) |
| --- | --- |
| `calculateur-beton` | `beton.volume` (m3), `beton.ciment_sacs35` (sac), `beton.sable` (kg), `beton.gravier` (kg) |
| `calculateur-mortier` | `mortier.volume` (m3), `mortier.ciment_sacs35` (sac), `mortier.sable` (kg) |
| `calculateur-chape` | `chape.volume` (m3), `chape.ciment_sacs35` (sac), `chape.sable` (kg) |
| `calculateur-carrelage` | `carrelage.surface` (m2), `carrelage.carreaux` (u), `carrelage.colle` (kg), `carrelage.joint` (kg) |
| `calculateur-parquet` | `parquet.surface` (m2), `parquet.paquets` (paquet), `parquet.sous_couche` (m2) |
| `calculateur-placo` | `placo.surface` (m2), `placo.plaques` (u), `placo.vis` (u), `placo.bande_joint` (ml), `placo.enduit_joint` (kg) |
| `calculateur-peinture` | `peinture.surface` (m2), `peinture.litres` (L), `peinture.pots_2_5l` (u) |
| `calculateur-enduit-facade` | `enduit_facade.surface` (m2), `enduit_facade.enduit` (kg), `enduit_facade.sacs25` (sac) |
| `calculateur-papier-peint` | `papier_peint.surface` (m2), `papier_peint.rouleaux` (u) |
| `calculateur-parpaings` | `parpaings.surface` (m2), `parpaings.blocs` (u), `parpaings.mortier` (kg) |
| `calculateur-briques` | `briques.surface` (m2), `briques.briques` (u) |
| `calculateur-isolant` | `isolant.surface` (m2), `isolant.rouleaux` (u) |
| `calculateur-terrasse` | `terrasse.surface` (m2), `terrasse.lames` (u), `terrasse.lambourdes` (ml), `terrasse.vis` (u), `terrasse.plots` (u) |
| `calculateur-tuiles` | `tuiles.surface` (m2), `tuiles.tuiles` (u) |
| `calculateur-escalier` | `escalier.marches` (u) |
| `calculateur-pente-toiture` | `pente_toiture.rampant` (ml) — émis uniquement en mode « dimensions » (le rampant n'est pas calculable depuis une pente seule) |
| `calculateur-surface` | `surface.totale` (m2) |
| `calculateur-volume` | `volume.total` (m3) |
| `calculateur-gravier-sable` | `gravier_sable.volume` (m3), `gravier_sable.tonnage` (kg), `gravier_sable.big_bags` (u) |
| `calculateur-consommation-materiaux` | `consommation.quantite` (kg, L ou sac selon l'unité choisie), `consommation.surface` (m2) |

### Côté hôte (app.batup.fr)

```ts
window.addEventListener('message', (e) => {
  if (e.origin !== 'https://outils.batup.fr') return; // 1. TOUJOURS vérifier l'origine
  const data = e.data;
  if (data?.type !== 'batup-embed-result') return;
  if (data.version !== 1) return;                     // 2. ignorer les versions inconnues
  // 3. Re-valider le schéma (zod) : ne jamais faire confiance au payload brut.
  // 4. Clamp des quantités (ex. 0 < qty <= 1 000 000) avant création des lignes.
  // 5. Mapper chaque lineKey sur un article de la bibliothèque ; à défaut,
  //    créer une ligne libre avec label + qty + unit.
});
```

Recommandations hôte :

- **Vérifier `event.origin === 'https://outils.batup.fr'`** — c'est la seule
  authentification du canal (l'embed poste en `targetOrigin: '*'`).
- **Valider le schéma** (zod) et **clamper `qty`** : le message traverse une
  frontière de confiance, traiter comme une entrée utilisateur.
- Ignorer silencieusement `version !== 1` et les `lineKey` inconnus (forward
  compatibility : de nouvelles lignes pourront s'ajouter sans bump de version).
- `hint` et `meta` sont informatifs : les stocker en traçabilité, ne pas les
  parser.

## Pré-remplissage (app → outil) — v1 FIGÉ

En mode embed **uniquement**, l'app hôte peut pré-remplir certains champs via
des query params sur l'URL d'embed :

```
https://outils.batup.fr/embed/calculateur-carrelage?surface=34
https://outils.batup.fr/embed/calculateur-prix-chantier-btp?taux=45&marge=25
https://outils.batup.fr/embed/calculateur-tva?tva=10
```

Règles :

- **Embed only** : ces paramètres sont ignorés sur les pages publiques, même
  si quelqu'un les ajoute à une URL publique.
- Param absent, non numérique (NaN/Infinity) ou hors bornes = **ignoré
  silencieusement**, le défaut de l'outil est conservé.
- Le pré-remplissage ne s'applique qu'à l'**état initial** : l'utilisateur
  reste libre de modifier la valeur ensuite.
- Virgule décimale acceptée (`surface=12,5` ≡ `surface=12.5`).

| Param | Type | Bornes | Champ pré-rempli | Outils supportés |
| --- | --- | --- | --- | --- |
| `surface` | nombre (m²) | 0,1 – 100 000 | l'entrée « surface » directe | `calculateur-carrelage`, `calculateur-parquet`, `calculateur-placo`, `calculateur-peinture`, `calculateur-enduit-facade`, `calculateur-isolant`, `calculateur-tuiles`, `calculateur-terrasse`, `calculateur-gravier-sable`, `calculateur-consommation-materiaux`, `calculateur-chape`, `calculateur-mortier` |
| `tva` | taux % | 0 – 100 | taux de TVA (20/10/5,5/2,1 sélectionnent le bouton, sinon champ « autre ») | `calculateur-tva` |
| `marge` | % marge nette | 0 – 99 | marge nette cible (bascule le mode « marge » sur l'outil marge/coefficient) | `calculateur-marge-nette-coefficient-btp`, `calculateur-prix-chantier-btp` |
| `taux` | €/h | 1 – 500 | taux horaire facturé | `calculateur-prix-chantier-btp` |

Outils **non** pré-remplissables par `surface` (leur entrée n'est pas une
surface en m²) : `calculateur-surface`, `calculateur-papier-peint`,
`calculateur-briques`, `calculateur-parpaings` (dimensions L×l/h),
`calculateur-beton`, `calculateur-volume` (formes/dimensions). Le
`calculateur-taux-horaire-btp` n'a pas de champ taux horaire en entrée (c'est
sa sortie) ni le `calculateur-tva-autoliquidation-btp` de champ taux (c'est un
questionnaire).

Code source : `src/lib/embed-prefill.ts` (parsing pur, testé) et
`useEmbedPrefill` dans `src/lib/embed-context.tsx`.
