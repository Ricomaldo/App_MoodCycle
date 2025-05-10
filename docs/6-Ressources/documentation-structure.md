# Guide d'Organisation de la Documentation MoodCycle

Ce guide définit comment structurer et maintenir la documentation technique pour le projet MoodCycle.

## 1. Structure des Documents

### 1.1 Organisation par Catégories

| Catégorie | Préfixe | Description | Exemples |
|-----------|---------|-------------|----------|
| **Spécifications** | `spec-` | Définit comment une fonctionnalité doit fonctionner | `spec-architecture-moodcycle.md`, `spec-melune.md` |
| **Modèles** | `modele-` | Définit les structures de données | `modele-donnees-utilisateur.md`, `modele-calcul-cycle.md` |
| **Ressources** | `ressource-` | Informations utiles pour le développement | `ressource-conventions-code.md` |
| **Guides** | `guide-` | Instructions pratiques | `guide-transition-developpement.md` |
| **Conception** | `conception-` | Documents de design initial | `conception-personas.md` |

### 1.2 Hiérarchie des Documents

1. **Documents Primaires** - Documents fondamentaux, référencés par d'autres
   - Architecture technique (`spec-architecture-moodcycle.md`)
   - Modèle de données (`modele-donnees-utilisateur.md`)
   - Priorisation des fonctionnalités (`conception-priorisation-mvp.md`)

2. **Documents Secondaires** - Spécifications détaillées des composants
   - Interface utilisateur (`spec-specifications-ecrans-flux.md`)
   - Composants spécifiques (`spec-melune.md`)
   - Intégrations (`spec-integration-claude.md`)

3. **Documents Tertiaires** - Documents de support
   - Conventions (`ressource-conventions-code.md`)
   - Guides pratiques (`ressource-guide-developpement.md`)
   - Configuration (`ressource-configuration-environnement.md`)

## 2. Format des Documents

### 2.1 Structure Standard

Chaque document doit suivre cette structure:

```markdown
# Titre du Document

## 1. Introduction
Contexte et objectif du document.

## 2. [Section Principale 1]
Contenu principal organisé.

## 3. [Section Principale 2]
Suite du contenu principal.

...

## N. [Dernière Section]
Dernière partie du contenu.

---

Document approuvé le: [DATE]
Version: [VERSION]
```

### 2.2 Éléments Spécifiques par Type de Document

| Type de Document | Éléments Requis | Éléments Recommandés |
|------------------|-----------------|----------------------|
| **Spécification** | Objectif, Contraintes, Règles métier | Diagrammes, Exemples, Cas limites |
| **Modèle** | Structure de données, Relations, Validation | Diagrammes ER, Exemples JSON |
| **Guide** | Instructions étape par étape, Prérequis | Captures d'écran, Exemples |
| **Ressource** | Référence pratique, Contexte d'utilisation | Exemples, Références externes |

## 3. Bonnes Pratiques

### 3.1 Formatage Optimal par Type d'Information

| Type d'Information | Format Recommandé | Exemple |
|-------------------|-------------------|---------|
| **Processus séquentiels** | Listes numérotées | Étapes d'implémentation |
| **Options/Alternatives** | Listes à puces | Fonctionnalités possibles |
| **Relations structurées** | Tableaux | Mapping API/Modèle |
| **Métriques** | Tableaux avec colonnes alignées | KPIs, objectifs de performance |
| **Architecture** | Diagrammes + texte explicatif | Structure des modules |
| **Flux utilisateur** | Diagrammes de flux + scénarios | Parcours d'onboarding |
| **Code** | Blocs de code avec langage spécifié | Exemples d'implémentation |

### 3.2 Conventions de Nommage

- Fichiers: kebab-case avec préfixe de type (`spec-melune.md`)
- Sections internes: PascalCase pour les titres
- Variables code: camelCase dans les exemples
- IDs références croisées: kebab-case

### 3.3 Système de Référencement

Pour référencer d'autres documents:
- Entre documents: `[REF:nom-document#section]`
- Vers sections: `[REF:#nom-section]`

Exemple:
```markdown
Comme défini dans [REF:modele-donnees-utilisateur#2-donnees-physiologiques], 
les données de cycle...
```

## 4. Gestion des Versions

### 4.1 Nomenclature des Versions

| Type de Version | Format | Exemple | Usage |
|-----------------|--------|---------|-------|
| **Majeure** | `N.0.0` | `1.0.0` | Changements significatifs |
| **Mineure** | `N.M.0` | `1.2.0` | Ajouts de contenu |
| **Correctif** | `N.M.P` | `1.2.1` | Corrections/Clarifications |

### 4.2 Historique des Modifications

Chaque document doit maintenir un historique de version:

```markdown
## Historique des modifications

| Version | Date | Auteur | Description |
|---------|------|--------|-------------|
| 1.0.0 | 29/04/2025 | J. Smith | Version initiale |
| 1.0.1 | 02/05/2025 | E. Dupont | Corrections mineures |
```

## 5. Diagrammes et Visuels

### 5.1 Types de Diagrammes Recommandés

| Type | Utilisation | Outil Recommandé |
|------|-------------|------------------|
| Architecture | Structure système | PlantUML/draw.io |
| Flux | Parcours utilisateur | Mermaid |
| Séquence | Interactions système | Mermaid/PlantUML |
| ER | Relations de données | draw.io/Mermaid |
| États | Transitions d'états | Mermaid |

### 5.2 Standards de Présentation

- Inclure une légende pour les symboles non standards
- Utiliser des couleurs consistantes avec le design system
- Fournir une version textuelle alternative pour l'accessibilité
- Limiter la complexité (max 15-20 éléments par diagramme)

## 6. Processus de Mise à Jour

### 6.1 Étapes de Mise à Jour

1. Identifier le document à modifier
2. Créer une branche dédiée si en contrôle de version
3. Effectuer les modifications
4. Incrémenter le numéro de version
5. Mettre à jour les références croisées impactées
6. Mettre à jour la date de modification
7. Soumettre pour revue
8. Intégrer après approbation

### 6.2 Processus de Revue

- Vérifier la cohérence avec les autres documents
- Confirmer la précision technique
- Valider la clarté et la lisibilité
- S'assurer que toutes les sections requises sont présentes
- Vérifier les références croisées

## 7. Exemples

### 7.1 Exemple de Spécification

```markdown
# Spécification de la Roue des Phases

## 1. Introduction
Ce document spécifie l'implémentation technique du composant Roue des Phases, 
élément central de l'interface utilisateur de MoodCycle.

## 2. Objectifs et Contraintes
### 2.1 Objectifs
- Visualiser le cycle menstruel de façon intuitive
- Permettre la navigation interactive entre les phases
- Adapter l'affichage selon l'état du cycle

### 2.2 Contraintes
- Performance: rendu fluide sur appareils d'entrée de gamme
- Accessibilité: WCAG 2.1 niveau AA
- Taille adaptative: 40-80% de la largeur de l'écran

## 3. Spécification Technique
...
```

### 7.2 Exemple de Modèle de Données

```markdown
# Modèle de Données - Cycle Menstruel

## 1. Introduction
Ce document définit la structure des données pour le suivi du cycle menstruel.

## 2. Entités Principales

### 2.1 Cycle
| Attribut | Type | Description | Validation |
|----------|------|-------------|------------|
| id | UUID | Identifiant unique | Généré automatiquement |
| startDate | Date | Premier jour des règles | Format ISO 8601 |
| endDate | Date | Dernier jour avant nouveau cycle | Calculé ou saisi |
| length | Integer | Durée en jours | > 0 |

### 2.2 Phase
...
```

## 8. Checklist de Validation

Utilisez cette checklist avant de soumettre un document:

- [ ] Structure conforme au modèle standard
- [ ] Sections obligatoires présentes et complètes
- [ ] Tables des matières pour documents > 500 lignes
- [ ] Références croisées vérifiées et fonctionnelles
- [ ] Formatage optimal selon type d'information
- [ ] Diagrammes clairs avec légendes si nécessaire
- [ ] Version et date de modification à jour
- [ ] Orthographe et grammaire vérifiées
- [ ] Cohérence terminologique avec autres documents
- [ ] Explication des acronymes à leur première occurrence

---

Document approuvé le: 29/04/2025
Version: 1.0
