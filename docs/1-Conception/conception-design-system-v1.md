# Design System Initial MoodCycle - Version MVP

# Design System Initial MoodCycle - Version MVP

## 1. Essentiels du Design System MoodCycle

Ce document présente les éléments fondamentaux du design system de MoodCycle, une application féminine et féerique dédiée au suivi du cycle menstruel et à la sagesse cyclique. Il servira de référence initiale pour la phase de développement du MVP.

**Version**: 1.0 (MVP)
**Date**: 29 avril 2025

## 2. Fondations visuelles

### Palette de couleurs

#### Couleurs principales

* **Couleur principale**: Framboise Chaleureuse (`#E91E63`) - Tendresse, passion contenue
* **Couleur secondaire**: Citron Vert Velouté (`#CDDC39`) - Fraîcheur, lumière naturelle

#### Couleurs des phases du cycle

* **Phase menstruelle**: Grenat Doux (`#F44336`) - Vitalité douce, action
* **Phase folliculaire**: Miel Doré (`#FFC107`) - Joie, lumière solaire
* **Phase ovulatoire**: Lagune Calme (`#00BCD4`) - Fluidité, clarté
* **Phase lutéale**: Lavande Mystique (`#673AB7`) - Intuition, mystère doux

#### Couleurs complémentaires

* **Fond principal**: Brume d'Aube (`#FAFAFA`) - Fond neutre doux et léger
* **Accent énergétique**: Mandarine Vibrante (`#FF5722`) - Énergie créative, dynamisme
* **Accent apaisant**: Émeraude Océane (`#009688`) - Profondeur apaisante, fluidité
* **Accent terre**: Brun Terre d'Automne (`#795548`) - Stabilité, ancrage naturel
* **Accent fraîcheur**: Bleu Azur Franc (`#2196F3`) - Ouverture, respiration
* **Accent équilibre**: Vert Sauge Profond (`#4CAF50`) - Calme, équilibre, nature

*Note: Les couleurs sont en cours de validation finale*

### Typographie

#### Hiérarchie typographique

* **Titre H1**: Quintessential 24px - Pour les grands titres de section
* **Titre H2**: Quintessential 20px - Pour les sous-titres importants
* **Titre H3**: Quicksand Bold 16px - Pour les titres de cartes et composants
* **Body**: Quicksand Regular 14px - Pour le texte courant
* **Small**: Quicksand Regular 10px - Pour les annotations et légendes

*Note: Quintessential ne dispose pas de variante Bold. Une alternative est à l'étude, ou un jeu sur le contraste pourrait être employé.*

## 3. Composants clés

### Boutons

Les boutons suivent un système de dégradé avec des coins très arrondis pour renforcer l'aspect féerique de l'application.

#### Types et états

* **Primaire**: Dégradé de Framboise Chaleureuse (400-600)
* **Secondaire**: Dégradé de Citron Vert Velouté (400-600)
* **Tertiaire/Texte**: Texte coloré sans fond
* **Outline**: Contour coloré avec fond transparent

#### États

* **Default**: Couleur standard avec ombre légère
* **Pressed**: Version plus foncée (600-800) avec ombre réduite
* **Disabled**: Version claire (100-300) à 70% d'opacité

#### Dimensions

* **Large**: H: 56px, Padding: 24px/16px, Radius: 28px
* **Medium**: H: 48px, Padding: 20px/12px, Radius: 24px
* **Small**: H: 40px, Padding: 16px/8px, Radius: 20px

### Cartes et conteneurs

Les cartes utilisent des coins très arrondis et des ombres douces pour maintenir l'esthétique féerique.

* **Coins arrondis standard**: 20px
* **Ombre standard**: 0px 2px 10px rgba(0,0,0,0.1)
* **Padding interne**: 16px

### Composant spécifique: Roue des phases

La roue des phases est l'élément central de l'application, représentant visuellement le cycle menstruel.

* **Forme**: Cercle divisé en quatre quartiers colorés
* **Couleurs**: Correspondant aux quatre phases du cycle
* **Indicateur**: Marqueur de la phase actuelle
* **Dimensions de base**: 160×160px (adaptable)

## 4. Wireframes réalisés

Les wireframes suivants ont été finalisés:

* Écran d'accueil avec aperçu du jour (insight)
* Écran de conversation avec Melune
* Visualisation basique de la roue des phases
* Interface de saisie des symptômes
* Bibliothèque de conseils (version simplifiée)

## 5. Mini-guide d'implémentation

### Règles essentielles

1. Respecter les rayons de courbure et ombres pour maintenir l'esthétique féerique
2. Utiliser le système de dégradés pour tous les éléments principaux
3. Maintenir l'accessibilité malgré la palette colorée (contraste suffisant)
4. Assurer la flexibilité des composants pour différentes tailles d'écran
5. Prévoir des transitions douces entre les écrans

### Conventions de nommage

* Couleurs:`color-[nom]-[variante]`(ex:`color-framboise-500`)
* Typographie:`text-[niveau]`(ex:`text-h1`,`text-body`)
* Composants:`mc-[composant]-[variante]`(ex:`mc-button-primary-large`)

## 6. Éléments à compléter

Ce document initial devra être enrichi avec:

* **Précisions sur les couleurs**: Validation finale des couleurs et création des variantes Material Design (50-900)
* **Typographie**: Décision finale sur l'alternative à Quintessential pour les titres si nécessaire
* **Composants manquants**:
  * Design du Carnet de Sagesse
  * Design des Cartes de Sagesse personnalisables
  * Écran de profil utilisatrice
  * Interface des rituels personnalisés
* **Patterns d'interaction**: Documentation des interactions spécifiques et animations
* **Ressources techniques**: Préparation des assets pour l'exportation vers le développement
* **Wireframes des fonctionnalités Must Have**: Finalisation des wireframes identifiés comme prioritaires dans l'analyse MoSCoW

***

*Document préparé pour faciliter la transition vers la phase de développement - Version 1.0*
---

Document approuvé le: 29/04/2025
Version: 1.0
