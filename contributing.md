# Contribuer

Tout d'abord, merci ! Nous apprécions que vous souhaitiez contribuer à Access Hub.

## Issues

N'ouvrez pas d'issue concernant la mise à jour des dépendances à moins qu'un bug n'ait été identifié et que vous puissiez démontrer qu'il affecte cette bibliothèque.

**Aidez-nous à vous aider**

N'oubliez pas que nous sommes là pour aider, mais pas pour deviner ce dont vous avez besoin :

- Quel que soit le bug ou le problème que vous rencontrez, supposez qu'il ne sera pas aussi évident pour les mainteneurs qu'il l'est pour vous.
- Expliquez-le complètement. Gardez à l'esprit que les mainteneurs doivent penser à _tous les cas d'utilisation potentiels_ d'une bibliothèque.
  Il est important que vous expliquiez comment vous utilisez une bibliothèque afin que les mainteneurs puissent faire le lien et résoudre le problème.

_Il ne peut pas être sous-estimé à quel point il peut être frustrant et épuisant pour les mainteneurs de devoir poser des questions de clarification sur les choses les plus élémentaires, avant même qu'il soit possible de commencer le débogage. Veuillez essayer de faire le meilleur usage possible du temps de tous les intervenants, y compris vous-même, en fournissant ces informations en amont._

## Configuration du dépôt

Le gestionnaire de paquets utilisé pour installer et lier les dépendances doit être npm v7 ou plus récent.

1. Clonez le dépôt
1. `npm run watch` démarre l'application electron en mode surveillance.
1. `npm run compile` construit l'application mais uniquement pour le débogage local.
1. `npm run lint` vérifie la qualité de votre code.
1. `npm run typecheck` Exécute la vérification TypeScript.
1. `npm run test` Exécute les tests de l'application.
1. `npm run format` Reformate toute la base de code selon le style de code du projet.
