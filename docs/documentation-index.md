# Documentation MoodCycle - Index

## 1. Conception

- `spec-wireframes-v1.pdf` : Spécifications initiales des wireframes
- `spec-design-system-v1.md` : Système de design pour l'application
- `spec-personas.md` : Personas utilisatrices
- `spec-priorisation-mvp.md` : Priorisation MoSCoW pour le MVP
- `guide-transition-developpement.md` : Guide de transition vers le développement

## 2. Spécifications Techniques

- `spec-architecture-moodcycle.md` : Architecture technique complète
- `spec-contraintes-techniques.md` : Contraintes techniques du projet
- `spec-specifications-ecrans-flux.md` : Spécifications détaillées des écrans et flux utilisateur
- `spec-integration-claude.md` : Intégration de l'API Claude
- `spec-melune.md` : Spécifications complètes de l'assistant IA Melune
- `spec-criteres-succes.md` : Métriques et critères de succès du MVP
- `spec-integrations.md` : Spécifications des intégrations nécessaires
- `spec-theme-system.md` : Documentation du système de thème et des composants UI

## 3. Modèles de Données

- `modele-donnees-utilisateur.md` : Structure des données utilisateur
- `modele-calcul-cycle.md` : Modèle de calcul du cycle menstruel

## 4. Confidentialité et Sécurité

- `privacy-confidentialite.md` : Spécifications de confidentialité et protection des données

## 5. Développement

- `dev-planning-developpement.md` : Planning de développement et jalons
- `dev-guide-compilation.md` : Guide complet de compilation et déploiement de l'application

## 6. Ressources

- `ressource-guide-developpement.md` : Guide complet pour les développeurs
- `ressource-conventions-code.md` : Conventions de codage et bonnes pratiques
- `ressource-configuration-environnement.md` : Configuration de l'environnement de développement
- `documentation-structure.md` : Guide d'organisation de la documentation

## 7. Archives

- `archive-documents-initiaux/` : Dossier contenant les versions initiales des documents
  - Copies des documents avant fusion
  - Versions historiques importantes
- `archive-versions-anciennes/` : Versions précédentes des documents du projet

## Dernière mise à jour

Date : 15/05/2025
Version : MVP 1.2

## Notes

- Nomenclature mise à jour pour améliorer la clarté
- Ajout des sections Ressources et Archives
- Documents organisés par type et fonction
- Susceptibles d'évolutions et de mises à jour ultérieures

## Recommandations pour la Documentation

### A. Formats optimaux

1. **Utiliser des tableaux structurés** pour :

   - Les métriques et KPIs
   - Les états des composants UI
   - Les mappings entre données et visualisations
   - Les paramètres API

2. **Utiliser des diagrammes** pour :

   - Les flux utilisateurs
   - L'architecture technique
   - Les relations entre entités

3. **Utiliser du texte narratif concis** pour :

   - Les explications de principes
   - Les justifications des choix techniques

4. **Utiliser des listes à puces** pour :
   - Les exigences fonctionnelles
   - Les contraintes techniques
   - Les règles métier

### B. Structure et nomenclature

1. **Nomenclature standardisée** :

   - Préfixe pour le type de document (`spec-`, `guide-`, `modele-`, etc.)
   - Version dans le nom (`v1`, `v2`, etc.) uniquement pour les documents qui évoluent
   - Suppression des termes comme "initial", "en-cours" dans les noms définitifs

2. **Structure interne** :

   - Table des matières systématique pour les documents > 500 lignes
   - Sections numérotées pour faciliter les références croisées
   - Tags ou identifiants pour les éléments référencés dans d'autres documents

3. **Système de références croisées** :
   - Utiliser un format standard, par exemple `[REF:document-id#section]`
   - Créer un document d'index central listant tous les documents et leurs contenus principaux
   - Limiter la duplication d'information en favorisant les références

**Note** : Les documents suivants ont été fusionnés et archivés :

- `spec-architecture-modulaire.md` et `spec-choix-technologies.md` ont été fusionnés en `spec-architecture-moodcycle.md`
- Les versions originales sont conservées dans le dossier `7-Archives`

Dernière mise à jour : 29/04/2025
