# Règles Cursor pour le Projet MoodCycle

## 1. Nomenclature des Fichiers

### Préfixes Standards
- `spec-` : Spécifications techniques et fonctionnelles
- `guide-` : Guides et documentation
- `modele-` : Modèles de données
- `conf-` : Configuration et confidentialité
- `dev-` : Documents de développement

### Conventions de Nommage
- Utiliser des minuscules avec des traits d'union
- Ajouter la version (`v1`, `v2`) UNIQUEMENT pour les documents évolutifs
- Strictement éviter les termes "initial", "en-cours", "draft"

### Exemples
- ✓ `spec-architecture-moodcycle.md`
- ✓ `modele-donnees-utilisateur-v2.md`
- ✗ `architecture-initial.md`
- ✗ `donnees-en-cours.md`

## 2. Structure des Documents

### Format et Organisation
1. **En-tête obligatoire**
   - Titre du document
   - Date de dernière mise à jour
   - Version (si applicable)
   - Auteur(s)

2. **Table des matières**
   - Obligatoire pour les documents > 500 lignes
   - Sections numérotées (1.1, 1.2, 2.1, etc.)
   - Liens internes actifs

3. **Système de Référencement**
   - Format : `[REF:document-id#section]`
   - Exemple : `[REF:spec-architecture#composants-ia]`

## 3. Types de Contenu

### Utilisation des Formats
1. **Tableaux**
   - Métriques et KPIs
   - Structure des données
   - Mappings API
   - Paramètres techniques

2. **Diagrammes**
   - Flux utilisateurs
   - Architecture système
   - Relations entre entités

3. **Texte Narratif**
   - Justifications des choix techniques
   - Explications de principes
   - Rédaction concise et directe

4. **Listes à Puces**
   - Exigences fonctionnelles
   - Contraintes techniques
   - Règles métier

## 4. Gestion des Versions et Références

### Politique de Versionnage
- Incrémenter le numéro de version lors de modifications significatives
- Conserver les versions précédentes dans un dossier d'archives dédié
- Fusionner les documents redondants en un document principal

### Système de Références Croisées
- Utiliser systématiquement le format `[REF:document-id#section]`
- Créer et maintenir un document d'index central
- Privilégier les références aux duplications

## 5. Processus de Documentation

### Workflow de Mise à Jour
1. Proposer des modifications
2. Révision par l'équipe
3. Validation
4. Mise à jour du document
5. Archivage de la version précédente
6. Mise à jour de l'index central

## 6. Bonnes Pratiques

### Principes Généraux
- Clarté et concision
- Langage technique précis
- Éviter le jargon non explicité
- Illustrer avec des exemples
- Expliquer le "pourquoi" pas seulement le "comment"

## Annexes

### Historique des Modifications
- 29/04/2025 : Création du document de règles Cursor
- Prochaine révision : 30/06/2025

## Contact
Responsable de la documentation : Zuber Eric