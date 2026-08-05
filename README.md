# BraCovoit — Covoiturage inter-quartiers, Brazzaville

Bienvenue dans notre startup. Ce dépôt est le **squelette** de l'application : un mini-site de 9 pages pour organiser le covoiturage entre habitants des quartiers de Brazzaville. La structure est déjà en place.

## Cloner le repository dans un dossier en local

```bash
git clone "https://github.com/KazeHolloway/s8-united-stack-group-covoiturage.git"
```

## Lancer le projet en local

**1. Démarrer l'API (un seul terminal, à laisser ouvert)**

```bash
cd backend
pip install -r requirements.txt
python app.py
```

L'API tourne sur `http://localhost:5000`. Laissez ce terminal ouvert tout le temps où vous travaillez.

**2. Ouvrir le site**

**Si vous utilisez VS Code, l'extension Live Server fonctionne aussi très bien (clic droit sur le fichier HTML → "Open with Live Server").**

**C'est tout : un seul terminal pour l'API, et vous ouvrez vos pages HTML directement.** Tant que `python app.py` tourne, n'importe quelle page du site peut appeler l'API normalement.

### Si une page ne s'affiche pas comme attendu

- **Une carte ou une section reste vide** : c'est normal si la fonction

Python ou JavaScript correspondante n'est pas encore codée. Les autres   sections de la page continuent de s'afficher normalement — seule la   section concernée reste vide en attendant votre code.

- **Un message d'erreur apparaît sur la page** : lisez-le, il indique

quelle fonction regarder. Le détail technique complet (traceback   Python) est toujours visible dans le terminal où tourne `python app.py`.

- **Rien ne s'affiche du tout** : vérifiez d'abord que le terminal de

l'API est bien ouvert et actif (pas d'erreur affichée dedans). Si vous   venez de modifier `main.js` ou `functions.js`, faites un rafraîchissement   forcé de la page (Ctrl+Maj+R ou Cmd+Maj+R) — le navigateur met parfois   en cache l'ancienne version du fichier.

## Qui fait quoi

| Parcours | Effectif | Vous complétez | Vous ne touchez PAS |
| --- | --- | --- | --- |
| **Data Science** | 3 personnes | `backend/logic.py` (17 fonctions) | `app.py`, `controllers.py` |
| **Full Stack** | 6 personnes | *voir répartition ci-dessous* | `main.js` |

**Le nommage des champs est déjà fixé dans le code** (docstrings de `logic.py`, structure de `data/trajets.json`, IDs des éléments HTML). Vous n'avez pas à deviner ces noms — regardez les docstrings et le jeu de données pour comprendre le contrat technique attendu.

## Répartition Full Stack

Chaque page est dans son propre sous-dossier avec son fichier CSS dédié. L'essentiel de votre note porte sur vos **pages HTML/CSS** (structure sémantique, box model, Flexbox/Grid, responsive mobile/tablette/desktop). Chacun complète aussi **2 fonctions JS** dans `frontend/functions.js`.

| Qui | Dossier & page | Fonctions JS |
| --- | --- | --- |
| Dev FS1 | `frontend/accueil/index.html` + `accueil.css` — page d'accueil, hero + indicateurs clés | `compterTrajetsAujourdhui`, `formaterQuartierPrincipal` |
| Dev FS2 | `frontend/recherche/recherche.html` + `recherche.css` — recherche et filtres | `filtrerParQuartierDepart`, `rechercherParMotCle` |
| Dev FS3 | `frontend/trajet/trajet.html` + `trajet.css` — détail d'un trajet + réservation | `formaterPrix`, `formaterHeure` |
| Dev FS4 | `frontend/proposer/proposer.html` + `proposer.css` — formulaire conducteur | `validerFormulaireProposer`, `formaterMessageConfirmation` |
| Dev FS5 | `frontend/mes-trajets/mes-trajets.html` + `mes-trajets.css` — historique passager | `filtrerReservationsParStatut`, `calculerTotalDepenseParPassager` |
| Dev FS6 | `frontend/dashboard/dashboard.html` + `dashboard.css` **ET** `frontend/confirmation/confirmation.html` + `confirmation.css` | `calculerPourcentageOccupation`, `getBadgeDisponibilite` |
| Dev FS7 | `frontend/inscription/inscription.html` + `inscription.css` **ET** `frontend/login/login.html` + `login.css` | `validerFormulaireInscription`, `validerFormulaireLogin` |

Chaque page contient des commentaires `<!-- TODO -->` indiquant le travail attendu, avec le layout, les éléments à construire et les classes CSS que `main.js` utilise déjà pour injecter le contenu dynamique. **Les éléments marqués "NE PAS MODIFIER" (IDs, scripts, formulaires) sont le câblage vers le backend — ne les changez pas, sinon les données ne s'afficheront plus.**

## Équipe Data Science — workflow

```bash
cd backend
pip install -r requirements.txt
python -m pytest -v        # au départ : quelques tests verts, la majorité rouges
```

Ouvrez `backend/logic.py` : la première fonction (`filtrer*trajets*disponibles`) est déjà résolue et commentée — regardez-la pour comprendre le style de code et le niveau de détail attendu, avant de compléter les 16 autres. Complétez-les (4 zones, à répartir selon votre effectif), relancez les tests jusqu'au **VERT**.

Pour vérifier vos résultats via l'API une fois les tests au vert, lancez `python app.py` (voir "Lancer le projet en local" ci-dessus) puis testez dans le navigateur :

```
http://localhost:5000/api/trajets
http://localhost:5000/api/trajets/1
http://localhost:5000/api/dashboard
http://localhost:5000/api/quartiers
http://localhost:5000/api/reservations/067111222
```

L'inscription et le login se testent en POST (par exemple avec `curl` ou un client HTTP) :

```
POST http://localhost:5000/api/inscription   {"nom": "...", "telephone": "...", "mot_de_passe": "..."}
POST http://localhost:5000/api/login          {"telephone": "...", "mot_de_passe": "..."}
```

## Équipe Full Stack — workflow

1. Ouvrez `frontend/functions.test.html` dans le navigateur → la majorité

des tests sont rouges au départ (27 tests, 2 par personne).

1. Complétez vos 2 fonctions dans `frontend/functions.js`.
2. Construisez vos pages HTML/CSS dans votre sous-dossier.
3. Pour voir le rendu de votre page connectée aux vraies données, suivez

la section "Lancer le projet en local" ci-dessus (backend démarré,    puis ouvrez simplement votre fichier HTML).

## La règle d'or (JS)

Fonctions **pures** : des paramètres entrent, une valeur sort (`return`). Pas de DOM, pas de `fetch` — tout est déjà branché dans `main.js`.

## Le jeu de données

`backend/data/trajets.json` contient 8 quartiers, 8 conducteurs, 15 trajets et 20 réservations couvrant avril à juillet 2026. Ne modifiez pas ce fichier — vos calculs doivent fonctionner avec ces données telles quelles.

## Contexte du produit

BraCovoit met en relation des habitants de Brazzaville qui font le même trajet au même moment : un conducteur qui a des places libres dans sa voiture, et des passagers qui cherchent un trajet moins cher et plus flexible qu'un taxi. Le site couvre 8 quartiers de Brazzaville (Bacongo, Poto-Poto, Moungali, Talangaï, Mfilou, Makélékélé, Ouenzé, Kintélé), avec des trajets essentiellement concentrés sur les créneaux du matin (7h-9h) et du soir (17h-19h).

# Organisation du Groupe 3

**United Stack Group**

| Rôle | Nom |
|---|---|
| **Lead du groupe** | Jonathan Moïse ESAÏE COSTA |
| **Repo Admin** | Christophe Darly MASSAMBA BOUESSO |
| **Product Owner** | Gloire Emmanuel BALONGANA MASSENGO |
| **Lead Fullstack** | Salem Kongolo |
| **Lead Data** | Davis Junior M'BIELO-LIBEAU |
| **Lead Business Analyst** | Robert Phillipe Najibe IBOVI IKAMA |
| **Lead Marketing & Communication** | Charletta Verda KOUBOMBA |

Les autres membres :
  · **Product Manager** : Divin PENZAMOY (chargé de la Discovery) 
  · **Business Analyst** : Hevy TSOUMOU 
  · **Data Scientists** : Theresia Surya NGOUBALI, Pejuce Pedrich NDINGA 
  · **Développeurs Fullstack** : Messi Soleil Elenga, Samuel Dorval De Francis NDINGA, Loïc Divin Céleste MILANDOU

## Répartition des tâches et avancement de l'équipe technique

### Équipe Data Science

| Data Scientist | Zone | Statut |
|---|---|---|
| Davis Junior M'BIELO-LIBEAU | Recherche & disponibilité, Comptes & authentification | ✅ Fait |
| Pejuce Pedrich NDINGA | Statistiques & Tableau de bord | ✅ Fait |
| Theresia Surya NGOUBALI | Réservations & suivi | ✅ Fait |

#### Toutes les fonctionnalités prévues pour la partie Data Science ont été réalisées.

- 17 fonctions implémentées dans `backend/logic.py`
- 33 / 33 tests `pytest` validés ✅

### Équipe Full Stack

| Dev | Page(s) | Fonctions JS | Statut |
|---|---|---|---|
| Messi Soleil Elenga | Accueil | `compterTrajetsAujourdhui`, `formaterQuartierPrincipal` | ✅ Fait |
| Salem Kongolo | Recherche, Mes trajets, Inscription, Login | `filtrerParQuartierDepart`, `rechercherParMotCle`, `filtrerReservationsParStatut`, `calculerTotalDepenseParPassager`, `validerFormulaireInscription`, `validerFormulaireLogin` | ✅ Fait |
| Loïc Divin Céleste MILANDOU | Trajet, Confirmation | `formaterPrix`, `formaterHeure` | ✅ Fait |
| Christophe Darly MASSAMBA BOUESSO | Proposer | `validerFormulaireProposer`, `formaterMessageConfirmation` | ✅ Fait |
| Jonathan Moïse ESAÏE COSTA | Dashboard | `calculerPourcentageOccupation`, `getBadgeDisponibilite` | ✅ Fait |
| Samuel Dorval De Francis NDINGA | — | — | ❌ |

Les 27 fonctions de `frontend/functions.js` sont complètes - 27 tests réussis / 0 échoués (27 au total).

#### Toutes les fonctionnalités prévues pour la partie Frontend ont été réalisées.

- 27 fonctions JavaScript implémentées dans `frontend/functions.js`
- 27 tests réussis / 0 échoués (27 au total)
- Toutes les pages HTML/CSS réalisées et intégrées ✅

## Résultats du projet

À la fin du Sprint, le projet BraCovoit comprend :

- une séparation Frontend / Backend ;
- un frontend composé de 9 pages responsive ;
- une API Flask fonctionnelle ;
- 33 tests Python validés ;
- 27 tests JavaScript validés ;
- une démonstration complète présentée devant les Coordinateurs Pédagogiques d'Akieni Academy.

### Liens

- Repository : https://github.com/KazeHolloway/s8-united-stack-group-covoiturage
- README : https://kazeholloway.github.io/s8-united-stack-group-covoiturage/
