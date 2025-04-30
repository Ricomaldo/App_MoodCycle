# Types de données utilisatrice - MoodCycle

## 1. Données personnelles de base

### 1.1 Informations d'identification
- Identifiant utilisatrice (généré automatiquement)
- Adresse email (pour authentification)
- Mot de passe (haché et sécurisé)
- Date de création du compte

### 1.2 Informations de profil
- Prénom (optionnel)
- Âge ou date de naissance (pour personnalisation des conseils)
- Préférences de langue
- Type d'avatar Melune choisi

## 2. Données physiologiques

### 2.1 Paramètres du cycle
- Date des dernières règles
- Durée moyenne du cycle (en jours)
- Durée moyenne des règles (en jours)
- Historique des cycles précédents (dates de début et fin)
- Utilisation de contraception hormonale (oui/non et type)

### 2.2 Symptômes physiques
- Types de symptômes (douleurs, fatigue, maux de tête, etc.)
- Intensité des symptômes (échelle 1-5)
- Date et heure d'enregistrement
- Notes textuelles associées

### 2.3 État émotionnel
- Types d'émotions (joie, tristesse, irritabilité, etc.)
- Intensité des émotions (échelle 1-5)
- Date et heure d'enregistrement
- Notes textuelles associées

### 2.4 Conditions médicales
- Conditions déclarées (SOPK, endométriose, etc.)
- Statut particulier (grossesse, ménopause, allaitement)
- Autres informations médicales pertinentes (optionnel)

## 3. Données d'engagement et de personnalisation

### 3.1 Préférences de contenu
- Approches préférées (médical, psychologique, spirituel, etc.) et leur pondération
- Niveau de détail préféré (basique, standard, approfondi)
- Ton de communication préféré (formel, amical, motivant)
- Thématiques d'intérêt

### 3.2 Données de sauvegarde
- Insights enregistrés (contenu, date de sauvegarde)
- Conseils sauvegardés (contenu, catégorie, date de sauvegarde)
- Cartes de sagesse créées (contenu, style, date de création)
- Notes personnelles associées

### 3.3 Rituels personnalisés
- Noms et descriptions des rituels
- Phase du cycle associée
- État d'activation (actif/inactif)
- Paramètres de rappel (jours, heures)

### 3.4 Historique d'interaction
- Conversations avec Melune (requêtes et réponses)
- Fréquence d'utilisation des fonctionnalités
- Dernière date de connexion
- Suivi des objectifs (si applicable)

## 4. Données techniques et d'utilisation

### 4.1 Données appareil
- Type d'appareil et système d'exploitation
- Version de l'application
- Préférences de notification
- Paramètres de synchronisation

### 4.2 Données de session
- Horodatages de connexion/déconnexion
- Actions réalisées durant la session
- Erreurs rencontrées
- Performance de l'application

## 5. Considérations RGPD et sécurité des données

### 5.1 Base légale de traitement
- Consentement explicite (collecté lors de l'inscription)
- Nécessité contractuelle (pour fournir le service)
- Intérêt légitime (pour améliorer l'application)

### 5.2 Catégorisation des données
- Données standards (profil, préférences)
- Données sensibles (santé, état émotionnel)
- Données temporaires vs données persistantes

### 5.3 Droits des utilisatrices
- Droit d'accès à leurs données
- Droit de rectification
- Droit à l'effacement ("droit à l'oubli")
- Droit à la portabilité des données
- Droit d'opposition au traitement

### 5.4 Mesures de protection des données
- Chiffrement des données sensibles
- Anonymisation pour l'analyse
- Durée de conservation limitée pour certaines catégories
- Accès restreint aux données sensibles

### 5.5 Partage et transferts de données
- Données partagées avec des tiers (hébergeur, services analytiques)
- Transferts hors UE (le cas échéant)
- Garanties mises en place pour les transferts

## 6. Conservation et suppression

### 6.1 Politique de rétention
- Durée de conservation par type de données
- Procédure d'archivage
- Suppression automatique des données temporaires

### 6.2 Procédure de suppression de compte
- Données supprimées immédiatement
- Données anonymisées et conservées
- Période de "grâce" avant suppression définitive

## 7. Implémentation technique

### 7.1 Modèles de données
- Structure des tables/collections
- Relations entre les entités
- Indexation et optimisation

### 7.2 Stratégie de mise à jour
- Gestion des migrations de schéma
- Versionnement des modèles de données
- Compatibilité ascendante/descendante
---

Document approuvé le: 29/04/2025
Version: 1.0
