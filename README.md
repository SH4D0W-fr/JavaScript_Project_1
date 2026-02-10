<div align="center">

# Synergy

Site vitrine interactif réalisé en Première NSI mêlant expérience futuriste et mini-outils pédagogiques.

</div>

## Aperçu

- **Accueil** : landing page minimaliste avec effet *Matrix rain* (voir [script/matrix.js](script/matrix.js)) et rappel des auteurs.
- **Convertisseur** : formulaire réactif capable de convertir simultanément en bases 2, 10 et 16 ([convertisseur.html](convertisseur.html), [script/convertisseur.js](script/convertisseur.js)).
- **QCM** : questionnaire de 20 questions couvrant algorithmes, réseaux et Python avec correction visuelle immédiate ([qcm.html](qcm.html), [script/qcm.js](script/qcm.js)).

## Structure du dépôt

- [index.html](index.html) – page d'accueil et navigation principale.
- [convertisseur.html](convertisseur.html) – outil de conversions de bases.
- [qcm.html](qcm.html) – questionnaire à choix multiples.
- [style.css](style.css) – design global (thème sombre, responsive, animations).
- [script/matrix.js](script/matrix.js) – animation de fond et chargement dynamique de la police JetBrains Mono.
- [script/convertisseur.js](script/convertisseur.js) – convertit automatiquement les valeurs entre les trois bases.
- [script/qcm.js](script/qcm.js) – gestion du score, des corrections et des états visuels du QCM.
- [assets/](assets) – images (logo) et polices embarquées.

## Fonctionnalités clés

1. **Effet graphique immersif** : canevas plein écran avec découpe diagonale pour rappeler la direction artistique.
2. **Navigation rapide** : boutons persistants pour basculer entre Accueil, QCM et Convertisseur.
3. **Convertisseur synchronisé** : chaque champ (`decimal`, `binary`, `hexadecimal`) met à jour les autres en temps réel.
4. **QCM pédagogique** : réponses correctes, erreurs et rappels s'affichent avec codes couleur, score résumé sur 20.
5. **Accessibilité de base** : focus initial sur le champ décimal, live region (`aria-live="polite"`) pour les retours du convertisseur, labels explicites.

## Prise en main

1. **Cloner ou copier** ce dossier sur votre machine.
2. **Ouvrir** l'un des fichiers HTML (ex. [index.html](index.html)) dans un navigateur moderne.
3. (Optionnel) Utiliser une extension type *Live Server* pour bénéficier du rechargement automatique pendant vos modifications.

Aucune dépendance ni compilation n'est requise : tout est en HTML/CSS/JS natif.

## Personnalisation

- Modifier les couleurs, polices et marges directement dans [style.css](style.css) via les variables CSS définies dans `:root`.
- Ajuster ou compléter les questions/réponses du QCM en éditant les blocs `.question` dans [qcm.html](qcm.html) et la table `answers` dans [script/qcm.js](script/qcm.js).
- Étendre le convertisseur à d'autres bases en ajoutant les fonctions nécessaires dans [script/convertisseur.js](script/convertisseur.js) et de nouveaux champs dans [convertisseur.html](convertisseur.html).
- Remplacer le logo ou les assets depuis [assets/images](assets/images) et [assets/fonts](assets/fonts).

## Crédits

Projet réalisé par **Axel Liebenguth**, **Ethan Augereau**, **Wayan Lamotte** et **Juliette Lorentz** (Première NSI, 2026).
