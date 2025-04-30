# Contraintes Techniques - Projet MoodCycle

## 1. Limites des Appareils Mobiles

### 1.1 Performances matérielles

#### 1.1.1 Diversité des appareils
L'application MoodCycle cible une large gamme d'appareils mobiles, incluant des modèles d'entrée à milieu de gamme. Cela impose des contraintes significatives sur les performances attendues :

| Catégorie d'appareil | RAM disponible | Processeur | Stockage disponible | Implications |
|----------------------|----------------|------------|---------------------|-------------|
| Entrée de gamme (2022+) | 2-3 Go | Processeurs 8 cœurs entrée de gamme | 16-32 Go | Limiter les animations complexes, optimiser la taille de l'application |
| Milieu de gamme | 4-6 Go | Processeurs 8 cœurs milieu de gamme | 64-128 Go | Expérience fluide avec optimisations |
| Haut de gamme | 8-12 Go | Processeurs haut de gamme | 128-512 Go | Expérience complète sans restrictions majeures |

#### 1.1.2 Autonomie de batterie
L'utilisation de l'API Claude et les fonctionnalités de l'application peuvent avoir un impact significatif sur l'autonomie :

- Chaque appel API consomme en moyenne 1-2% de batterie sur un appareil milieu de gamme
- L'utilisation intensive de l'application (30 minutes) ne doit pas dépasser 5% de consommation de batterie
- Les tâches en arrière-plan doivent être strictement limitées pour préserver l'autonomie

#### 1.1.3 Thermalisation
Les processus intensifs peuvent provoquer une surchauffe des appareils mobiles :

- Limiter les opérations CPU intensives à des intervalles courts (max 10 secondes consécutives)
- Surveiller la température de l'appareil et réduire dynamiquement la charge si nécessaire
- Éviter les boucles de calcul prolongées, particulièrement lors de l'analyse des données cycliques

### 1.2 Contraintes d'interface

#### 1.2.1 Tailles d'écran
L'application doit s'adapter à différentes tailles d'écran :

| Type d'appareil | Dimensions typiques | Densité de pixels | Adaptations requises |
|-----------------|---------------------|-------------------|----------------------|
| Smartphones compacts | 5.0"-5.7" | 300-450 DPI | Interface simplifiée, éléments plus grands |
| Smartphones standards | 5.8"-6.5" | 400-500 DPI | Design de référence |
| Grands smartphones | 6.6"+ | 400-550 DPI | Meilleure utilisation de l'espace |

Contraintes spécifiques :
- La roue du cycle doit rester lisible même sur les plus petits écrans (min 4.7")
- Les éléments interactifs doivent respecter une taille minimale de 44×44 dp pour garantir l'accessibilité
- La navigation doit s'adapter aux écrans avec encoche ou caméra perforée

#### 1.2.2 Méthodes d'entrée
Les interactions avec l'application doivent considérer :

- Interactions tactiles imprécises (doigts mouillés, gants, etc.)
- Compatibilité avec les fonctionnalités d'accessibilité (VoiceOver, TalkBack)
- Utilisation potentielle avec une seule main (position de la barre de navigation)

#### 1.2.3 Contraintes d'affichage
Les limites liées à l'affichage incluent :

- Variations de luminosité et contraste selon les conditions d'utilisation
- Modes sombre/clair et impact sur la lisibilité
- Taux de rafraîchissement variables (60Hz, 90Hz, 120Hz) et implications sur les animations

### 1.3 Contraintes de connectivité

#### 1.3.1 Variabilité de la connexion
L'application sera utilisée dans diverses conditions réseau :

| Type de connexion | Débit descendant | Latence | Stabilité | Implications |
|-------------------|-------------------|---------|-----------|-------------|
| Wi-Fi domestique | 10-100+ Mbps | 10-50ms | Stable | Expérience optimale |
| 4G urbaine | 5-50 Mbps | 50-100ms | Variable | Latence perceptible pour les réponses Claude |
| 4G rurale | 1-10 Mbps | 100-300ms | Instable | Dégradation notable, activer le mode économie de données |
| 3G | 0.5-2 Mbps | 300-500ms | Très instable | Expérience minimale, priorité au mode hors-ligne |
| Hors-ligne | N/A | N/A | N/A | Fonctionnalités limitées, contenu pré-téléchargé |

Ces variations de connectivité imposent une architecture adaptative :

- Mise en cache agressive des données fréquemment consultées
- Stratégies de chargement progressif pour les contenus moins critiques
- Fonctionnalités dégradées mais fonctionnelles en connectivité limitée
- Synchronisation intelligente lors du retour en ligne

#### 1.3.2 Consommation de données
La utilisation des données mobiles doit être optimisée :

- Appel API Claude standard : ~10-15 KB par requête (hors contexte historique)
- Appel API Claude avec historique : ~30-100 KB par requête
- Budget quotidien recommandé : < 5 MB pour l'utilisation normale
- Mode économie de données limitant les appels API non essentiels

#### 1.3.3 Interruptions de connexion
L'application doit gérer élégamment les pertes de connexion :

- Sauvegarde automatique des saisies utilisatrice en cours
- File d'attente pour les actions à synchroniser lors du retour en ligne
- Mécanisme de reprise pour les téléchargements/envois interrompus
- Indicateurs clairs de l'état de connexion pour l'utilisatrice

## 2. Contraintes de Performances

### 2.1 Temps de réponse

#### 2.1.1 Objectifs de performance
Pour garantir une expérience utilisatrice fluide, les objectifs suivants doivent être respectés :

| Action | Temps de réponse cible | Temps maximum acceptable | Impact utilisatrice |
|--------|------------------------|--------------------------|---------------------|
| Ouverture de l'application | < 2 secondes | 4 secondes | Première impression critique |
| Navigation entre écrans | < 300ms | 500ms | Sensation de fluidité |
| Affichage de la roue du cycle | < 500ms | 1 seconde | Élément central |
| Saisie de données quotidiennes | < 200ms | 400ms | Interaction fréquente |
| Réponse initiale de Melune | < 1 seconde | 2 secondes | Première réponse (même partielle) |
| Réponse complète de Melune | < 3 secondes | 8 secondes | Expérience conversationnelle |
| Génération de Carte Sagesse | < 2 secondes | 4 secondes | Contenu créatif |

#### 2.1.2 Stratégies d'optimisation
Pour atteindre ces objectifs, les stratégies suivantes seront implémentées :

- **Chargement différé** : Priorité aux éléments visibles, chargement en arrière-plan du reste
- **Caching intelligent** : Mise en cache hiérarchique (mémoire, stockage local, cloud)
- **Précalcul** : Analyse prédictive du cycle effectuée en arrière-plan
- **Streaming de réponses** : Affichage progressif des réponses de Melune
- **Optimisation des assets** : Compression adaptative des images, SVG pour les icônes

#### 2.1.3 Perception utilisatrice
L'expérience perçue est souvent plus importante que les performances réelles :

- Squelettes de chargement (skeleton screens) pour donner une impression de rapidité
- Animations de transition pour masquer les temps de chargement
- Retours visuels immédiats, même si le traitement est encore en cours
- Messages contextuels pendant les opérations longues pour réduire l'anxiété

### 2.2 Utilisation des ressources

#### 2.2.1 Empreinte mémoire
La consommation mémoire doit être strictement contrôlée :

- Utilisation RAM maximale : < 200 MB en utilisation active
- Utilisation RAM en arrière-plan : < 50 MB
- Prévention des fuites mémoire par des tests rigoureux
- Libération proactive des ressources non utilisées

#### 2.2.2 Stockage local
L'occupation du stockage doit rester raisonnable :

- Taille de l'application installée : < 50 MB
- Données utilisatrice typiques (1 an) : < 20 MB
- Cache maximum : 100 MB avec politique d'expiration
- Capacité d'archivage/export pour libérer de l'espace

#### 2.2.3 Consommation CPU/GPU
Pour préserver la batterie et éviter la surchauffe :

- Utilisation CPU moyenne : < 10% en utilisation normale
- Pics CPU : < 40% pendant < 3 secondes
- Utilisation GPU : Limitée aux animations essentielles
- Réduction automatique des effets visuels sur les appareils moins puissants

### 2.3 Optimisation multithreading

#### 2.3.1 Architecture parallèle
Distribution des tâches entre threads pour une meilleure réactivité :

- Thread UI : Interface utilisateur exclusivement
- Thread réseau : Toutes les communications avec l'API
- Thread de calcul : Analyse des données du cycle, prédictions
- Thread de cache : Gestion du cache et stockage local

#### 2.3.2 Gestion des tâches asynchrones
Implementation d'un système de files d'attente pour les opérations :

- Priorité haute : Interactions utilisatrice directes
- Priorité moyenne : Chargement de données visibles
- Priorité basse : Précalculs, synchronisation en arrière-plan
- Surveillance des délais d'exécution avec abandon contrôlé si nécessaire

## 3. Limitations de l'API Claude

### 3.1 Quotas et limites de l'API

#### 3.1.1 Limites de requêtes
L'API Claude impose des restrictions qui doivent être gérées :

| Type de limite | Valeur | Impact | Stratégie d'atténuation |
|----------------|--------|--------|-------------------------|
| Requêtes par minute (RPM) | 100 RPM | Limite le nombre d'utilisatrices simultanées | File d'attente avec backoff exponentiel |
| Tokens par minute (TPM) | 100,000 TPM | Limite le volume de texte | Optimisation des prompts, compression du contexte |
| Taille maximale du contexte | 200,000 tokens | Limite l'historique de conversation | Résumé périodique des conversations longues |
| Taille maximale de réponse | 4,096 tokens | Limite la longueur des réponses | Troncature intelligente, réponses en plusieurs parties |

#### 3.1.2 Coûts d'utilisation
Les coûts API doivent être optimisés pour la viabilité économique :

- Coût par 1,000 tokens d'entrée : $0.0025 (claude-3-7-sonnet)
- Coût par 1,000 tokens de sortie : $0.0125 (claude-3-7-sonnet)
- Budget mensuel recommandé : Maximum $1 par utilisatrice active
- Stratégies de réduction : Compression du contexte, réutilisation des réponses similaires

#### 3.1.3 Gestion des restrictions
Pour éviter les interruptions de service :

- Système de quotas par utilisatrice (limites journalières/mensuelles)
- Monitoring en temps réel de la consommation API
- Niveaux de service adaptés au statut d'abonnement
- Mécanismes de dégradation gracieuse en cas d'approche des limites

### 3.2 Fiabilité et disponibilité

#### 3.2.1 Disponibilité du service
Les LLMs comme Claude peuvent connaître des périodes d'indisponibilité :

- Disponibilité moyenne de l'API : ~99.5% (sur les 6 derniers mois)
- Maintenance planifiée : 1-2 fois par trimestre
- Pics de charge : Ralentissements possibles aux heures de pointe
- Stratégie : Implémentation de circuits-breakers et modes dégradés

#### 3.2.2 Qualité variable des réponses
La qualité des réponses peut fluctuer :

- Variabilité due au paramètre de température
- Incohérences potentielles sur des sujets complexes
- Risque de "hallucinations" (informations incorrectes présentées avec confiance)
- Besoin de filtres pour la sécurité et la pertinence

#### 3.2.3 Indétermination des mises à jour
Les modèles évoluent sans préavis détaillé :

- Mises à jour potentielles du modèle Claude sans notification préalable
- Variations subtiles de comportement après mises à jour
- Nécessité de tests réguliers pour détecter les dérives
- Système de feedback pour signaler les anomalies

### 3.3 Complexité d'intégration

#### 3.3.1 Gestion du contexte
L'intégration avec Claude nécessite une gestion fine du contexte :

- Fenêtre contextuelle limitée (200K tokens) à utiliser efficacement
- Équilibre entre contexte utilisatrice et connaissances sur le cycle
- Compression sémantique pour maximiser l'information dans le contexte
- Stratégies de "sliding window" pour les conversations longues

#### 3.3.2 Formulation des prompts
L'efficacité de Claude dépend fortement de la qualité des prompts :

- Sensibilité à la formulation précise des instructions
- Besoin d'exemples clairs pour obtenir le format de réponse désiré
- Evolution constante des meilleures pratiques de prompt engineering
- Tests A/B nécessaires pour optimiser les prompts

#### 3.3.3 Latence et asynchronicité
La nature asynchrone des API LLM impose des contraintes :

- Temps de réponse variables (1-8 secondes) selon la complexité
- Nécessité d'une architecture asynchrone robuste
- Gestion des timeouts et retries
- Streaming des réponses pour améliorer l'expérience perçue

## 4. Considérations de Sécurité

### 4.1 Protection des données sensibles

#### 4.1.1 Classification des données
Les données de MoodCycle doivent être classifiées selon leur sensibilité :

| Catégorie | Exemples | Niveau de protection | Mesures de sécurité |
|-----------|----------|----------------------|---------------------|
| Identifiantes | Nom, email, téléphone | Très élevé | Chiffrement fort, accès minimal |
| Santé générale | Dates des cycles, durée | Élevé | Chiffrement, anonymisation pour analyses |
| Symptômes | Douleurs, humeur, énergie | Élevé | Chiffrement, accès contrôlé |
| Conversations | Échanges avec Melune | Élevé | Chiffrement, rétention limitée |
| Préférences | Paramètres d'interface | Modéré | Synchronisation sécurisée |
| Statistiques anonymes | Métriques d'usage | Faible | Agrégation, dé-identification |

#### 4.1.2 Minimisation des données
Principe de collecte minimale des informations :

- Collecte uniquement des données strictement nécessaires
- Justification documentée pour chaque champ de données
- Durées de conservation définies et appliquées
- Options de suppression à la demande de l'utilisatrice

#### 4.1.3 Chiffrement et stockage
Stratégies de protection des données au repos et en transit :

- Chiffrement en transit : TLS 1.3 minimum avec Perfect Forward Secrecy
- Chiffrement au repos : AES-256 pour toutes les données sensibles
- Stockage local : Secure Enclave / Keystore quand disponible
- Stockage cloud : Chiffrement côté client pour les données hautement sensibles

### 4.2 Authentification et autorisation

#### 4.2.1 Méthodes d'authentification
Options sécurisées pour l'accès à l'application :

- Authentification sans mot de passe (email magic link)
- Intégration biométrique (TouchID/FaceID, empreinte)
- OAuth avec fournisseurs sélectionnés (Apple, Google)
- PIN local optionnel pour accès rapide

#### 4.2.2 Sessions et tokens
Gestion sécurisée des sessions :

- JWT avec durée de validité limitée (max 7 jours)
- Rotation régulière des tokens (refresh token avec max 30 jours)
- Révocation immédiate en cas de comportement suspect
- Validation côté serveur des autorisations pour chaque action

#### 4.2.3 Contrôle d'accès
Protection contre les accès non autorisés :

- Verrouillage automatique après inactivité (configurable)
- Option "écran de confidentialité" pour masquer le contenu sensible
- Journalisation des tentatives d'accès suspectes
- Alertes en cas de connexion depuis un nouvel appareil

### 4.3 Vulnérabilités spécifiques

#### 4.3.1 Injection de prompts
Protection contre la manipulation de l'IA :

- Sanitisation stricte des entrées utilisatrice
- Délimitation claire du contenu utilisatrice dans les prompts
- Détection de tentatives de jailbreak ou d'instructions malveillantes
- Validation des réponses avant affichage

#### 4.3.2 Attaques sur les données sensibles
Protection contre l'extraction non autorisée :

- Détection des motifs de données sensibles dans les requêtes (regex)
- Filtrage des informations personnelles envoyées à Claude
- Prévention de l'envoi accidentel de données médicales détaillées
- Audits réguliers des échanges API

#### 4.3.3 Sécurité mobile spécifique
Adresser les risques propres aux plateformes mobiles :

- Protection contre le screen scraping (Android)
- Prévention du copy/paste non autorisé de contenu sensible
- Détection des appareils rootés/jailbreakés
- Obfuscation du code pour limiter la rétro-ingénierie

## 5. Contraintes de Compatibilité

### 5.1 Compatibilité des plateformes

#### 5.1.1 iOS
Support des appareils et versions iOS :

- Versions supportées : iOS 14.0 et ultérieur
- Appareils : iPhone 8/SE 2e génération et plus récents
- Adaptations pour les différents modèles (notch, Dynamic Island)
- Respect des guidelines Human Interface Design

#### 5.1.2 Android
Support des appareils et versions Android :

- Versions supportées : Android 8.0 (API 26) et ultérieur
- Fragmentation : Tests sur au moins 5 configurations représentatives
- Adaptations pour les surcouches constructeurs (Samsung OneUI, MIUI, etc.)
- Respect des guidelines Material Design

### 5.2 Contraintes de développement

#### 5.2.1 Framework de développement
Limitations de l'approche cross-platform :

- Framework : React Native avec TypeScript
- Conséquences sur les performances natives
- Compromis UX vs efficacité de développement
- Composants natifs requis pour certaines fonctionnalités

#### 5.2.2 Architecture technique
Contraintes imposées par l'architecture choisie :

- Séparation claire UI/logique métier (Clean Architecture)
- Gestion d'état centralisée (Redux/MobX)
- Pattern Observer pour les mises à jour de cycle
- API interne stable pour l'évolution future

#### 5.2.3 Dépendances externes
Gestion des bibliothèques tierces :

- Limitation du nombre de dépendances (< 20 majeures)
- Audit régulier des vulnérabilités de sécurité
- Stratégie de mise à jour des dépendances
- Alternatives prévues pour les dépendances critiques

### 5.3 Accessibilité

#### 5.3.1 Standards d'accessibilité
Conformité aux normes d'accessibilité :

- WCAG 2.1 niveau AA comme objectif minimum
- Compatibilité avec VoiceOver et TalkBack
- Support des fonctionnalités d'accessibilité du système (texte dynamique, contraste, etc.)
- Test avec des utilisatrices ayant des besoins spécifiques

#### 5.3.2 Adaptations requises
Modifications nécessaires pour l'accessibilité :

- Textes alternatifs pour la roue du cycle et les visualisations
- Navigation clavier/switch complète
- Absence de contenus clignotants rapides
- Alternatives textuelles pour les informations basées sur la couleur

## 6. Contraintes Réglementaires

### 6.1 Conformité RGPD/CCPA

#### 6.1.1 Consentement explicite
Mécanismes de recueil du consentement :

- Consentement granulaire par catégorie de données
- Possibilité de modifier les préférences à tout moment
- Conservation des preuves de consentement
- Processus de re-consentement pour les changements significatifs

#### 6.1.2 Droits des utilisatrices
Implémentation des droits garantis :

- Accès : Export complet des données sous format lisible
- Rectification : Modification simplifiée des données personnelles
- Effacement : Suppression complète avec confirmation
- Portabilité : Export dans un format standard
- Opposition : Désactivation sélective des traitements

#### 6.1.3 Documentation et processus
Obligations documentaires :

- Registre des traitements détaillé
- Analyses d'impact pour les données sensibles
- Procédures de notification en cas de violation
- Formation de l'équipe aux obligations légales

### 6.2 Données de santé

#### 6.2.1 Classification légale
Statut juridique des données collectées :

- Données de cycle : Considérées comme données de santé
- Symptômes : Données de santé nécessitant protection renforcée
- Conversations : Potentiellement considérées comme données de santé selon le contenu
- Implications HIPAA pour le marché américain

#### 6.2.2 Mesures spécifiques
Protections supplémentaires pour les données santé :

- Anonymisation pour les analyses globales
- Séparation des données identifiantes et de santé
- Chiffrement de bout en bout pour les données hautement sensibles
- Audit trail complet des accès aux données de santé

#### 6.2.3 Limitations d'usage
Restrictions d'utilisation des données de santé :

- Interdiction d'usage à des fins commerciales directes
- Limitation stricte du partage avec des tiers
- Agrégation obligatoire pour les rapports internes
- Consentement spécifique pour la recherche

## 7. Conclusion : Impact sur le Développement

### 7.1 Priorisation des contraintes

En considérant l'ensemble des contraintes identifiées, voici une hiérarchisation des priorités pour le développement :

1. **Sécurité et confidentialité des données** - Fondamental et non négociable
2. **Expérience utilisatrice optimisée** - Critique pour l'adoption et la rétention
3. **Gestion intelligente du mode hors-ligne** - Essentiel pour l'utilisation quotidienne
4. **Optimisation des coûts API** - Important pour la viabilité économique
5. **Compatibilité étendue** - À prioriser progressivement

### 7.2 Compromis nécessaires

Cette analyse met en lumière plusieurs compromis stratégiques :

- **Performance vs Fonctionnalités** : Sur les appareils d'entrée de gamme, certaines animations et visualisations complexes devront être simplifiées
- **Richesse de contenu vs Disponibilité** : Un équilibre entre contenu dynamique (API) et contenu pré-téléchargé sera nécessaire
- **Sécurité vs Facilité d'usage** : Certaines mesures de sécurité ajouteront des étapes supplémentaires pour l'utilisatrice
- **Coût vs Qualité des réponses** : L'optimisation des coûts API pourra parfois réduire la richesse des réponses de Melune

### 7.3 Recommandations techniques

Sur la base de cette analyse des contraintes, les recommandations suivantes sont formulées :

1. **Architecture progressive** : Concevoir l'application avec des niveaux de fonctionnalités adaptés aux capacités de l'appareil
2. **Stratégie de cache avancée** : Implémenter une hiérarchie de cache (mémoire, stockage local, cloud) avec priorisation intelligente
3. **Mode hors-ligne robuste** : Développer en priorité un mode hors-ligne complet dès la première version
4. **Monitoring proactif** : Mettre en place une télémétrie fine pour identifier les problèmes de performance avant qu'ils n'impactent l'expérience
5. **Tests automatisés étendus** : Développer une suite de tests couvrant les différentes configurations matérielles, états de connectivité et scénarios d'utilisation

Ces recommandations permettront de développer une application qui offre la meilleure expérience possible tout en respectant les nombreuses contraintes identifiées.
---

Document approuvé le: 29/04/2025
Version: 1.0
