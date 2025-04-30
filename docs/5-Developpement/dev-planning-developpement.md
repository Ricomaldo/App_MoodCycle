# Planning de Développement — MoodCycle

## Vue d’ensemble

Ce document présente un aperçu structuré du développement de l'application **MoodCycle**, selon une approche Agile en binôme (Eric — développement / Jezabel — contenu & design).
La priorisation suit la grille **MoSCoW** : Must, Should, Could, Won’t.

- **Méthodologie** : Agile (sprints de 2 semaines)
- **Organisation** : Répartition par fonctions (« chapeaux »), non par rôles fixes
- **Objectif** : Développer et lancer un MVP abouti en 4 mois, avec évolutions prévues post-lancement

---

## Jalons Clés

| Jalon           | Date cible | Objectif principal                                         | Livrables principaux                              |
|-----------------|-------------|------------------------------------------------------------|---------------------------------------------------|
| Vision initiale | Terminé     | Cadrage produit, wireframes et priorisation validée       | Concept produit, grille MoSCoW                    |
| MVP Alpha       | J+60        | Version interne fonctionnelle pour premiers tests         | App avec features "Must"                          |
| MVP Beta        | J+90        | Test externe contrôlé                                     | App enrichie (Must + Should critiques)           |
| Release MVP     | J+120       | Lancement public (App Store & Play Store)                 | App complète, stable, documentée                  |
| Version 1.1     | J+150       | Mise à jour post-lancement                                | Correctifs + intégration de features "Could"      |

---

## Phases de Développement

### Phase 1 — Préparation (J-15 à J0)
Mise en place des outils, architecture technique, backlog initial.

### Phase 2 — MVP Alpha (J1 à J60)
- Fondations techniques et visuelles (navigation, UI, design system)
- Visualisation du cycle et premiers contenus (insights, roue)
- Intégration IA (Melune), carnet de sagesse, mode hors-ligne
- Profil utilisateur, rituels personnalisés
- Tests internes (alpha) + onboarding

### Phase 3 — MVP Beta (J61 à J90)
- Avatar Melune, multilinguisme
- Retours Alpha intégrés
- Optimisations UX/UI, tests externes (beta)

### Phase 4 — Lancement Public (J91 à J126)
- Correctifs et stabilisation
- Finalisation contenus et outils de support
- Publication App Store / Google Play

### Phase 5 — Post-Lancement (J127 à J140)
- Monitoring, correctifs critiques
- Analyse des usages
- Planification de la v1.1 (animations, enrichissements, nouvelles features)

---

## Technologies Clés

- **Frontend** : React Native (TypeScript)
- **Backend (optionnel)** : Node.js / Firebase
- **Base de données** : SQLite (local), Firebase (cloud)
- **IA** : Intégration Claude (Anthropic)
- **CI/CD** : GitHub Actions
- **Suivi projet** : Notion / ClickUp
- **Design** : Figma
- **Documentation** : Markdown

---

## Rituels d’équipe

| Rituel                  | Fréquence       | Objectif principal                     |
|-------------------------|-----------------|----------------------------------------|
| Stand-up                | Quotidien       | Suivi, obstacles, priorités            |
| Revue & Planification   | Chaque sprint   | Démo, réajustement, découpage         |
| Rétrospective           | Fin de sprint   | Amélioration continue                  |
| Session design/dev      | Hebdomadaire    | Co-conception UI/UX                    |
| Débrief personnel/pro   | Fin de journée  | Transition et recentrage               |

---

## Risques Principaux et Plans de Contingence

| Risque                           | Mitigation prévue                                           |
|----------------------------------|-------------------------------------------------------------|
| Complexité UI (roue des phases)  | Prototypage rapide, fallback visuel simplifié              |
| Stabilité synchronisation        | Tests approfondis, désactivation conditionnelle            |
| Charge de travail en binôme      | Scope ajustable, itérations modulables                     |
| Retards App Store/Play Store     | Préparation anticipée, validation de conformité proactive   |

---

## Suivi & Évaluation

| Indicateur                        | Cible       | Outil de suivi          |
|----------------------------------|-------------|--------------------------|
| Vélocité d’équipe                | >80% prévu  | Tableaux d’itération     |
| Taux de bugs critiques           | <3 / sprint | Issue tracker GitHub     |
| Délai moyen de correction        | <48h        | GitHub / Alertes         |
| Couverture de tests              | >70%        | Jest                     |
| Satisfaction Beta testeurs       | >4/5        | Formulaire interne       |

---

> Ce planning est un **document évolutif** qui sera ajusté en fonction de l'avancement réel, des feedbacks utilisateurs, et de la charge projet.
---

Document approuvé le: 29/04/2025
Version: 1.0
