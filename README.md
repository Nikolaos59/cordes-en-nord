# Cordes en Nord — V0.1

Application web de suivi pédagogique pour les cours de guitare. Cette première étape met en place le socle Next.js et transforme la maquette en interface à routes réelles.

## Démarrer en local

Prérequis : Node.js 20.9 ou plus récent.

```bash
npm install
npm run dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000).

## Écrans disponibles

- `/` : page publique de présentation.
- `/professeur` : tableau de bord professeur de démonstration.
- `/eleves` : liste des élèves et ajout de profils de démonstration.
- `/bibliotheque` et `/programmes` : pages de destination pour les prochaines étapes.

Les profils sont fictifs et conservés en mémoire uniquement pendant la session de navigation. Aucune donnée réelle d’élève ne doit être ajoutée : la connexion, les permissions et le stockage sécurisé ne sont pas encore en place. L’espace professeur de démonstration n’est pas encore protégé par une connexion.

## Structure

- `src/app/` : routes Next.js App Router et styles globaux.
- `src/components/` : navigation, tableau de bord, élèves et composants partagés.
- `prototype/` : maquette HTML/CSS/JavaScript d’origine, conservée comme référence visuelle.

Le déploiement Cloudflare, l’authentification et la base Supabase restent à configurer dans les prochaines étapes.
