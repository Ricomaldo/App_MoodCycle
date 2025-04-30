### Spécifications Détaillées des Écrans & Flux - MoodCycle

#### Table des matières

1.  Introduction et principes généraux
2.  Écrans d'onboarding
3.  Écran d'accueil
4.  Écran de conversation avec Melune
5.  Écran du cycle
6.  Bibliothèque de conseils
7.  Carnet de sagesse
8.  Cartes de sagesse
9.  Profil et paramètres
10. Rituels personnalisés
11. Mode hors-ligne
12. États système et composants transversaux
13. Spécifications techniques d'intégration

---

#### 1. Introduction et principes généraux

Ce document détaille les spécifications fonctionnelles et techniques de chaque écran de l'application MoodCycle. Il sert de référence principale pour l'équipe de développement et assure la cohérence entre le design et l'implémentation technique. Cette version (V3) intègre les priorités validées lors de la réunion de priorisation MoSCoW. Il inclut également une vue d'ensemble des flux utilisateur clés et des scénarios associés.

##### 1.1 Vue d'ensemble des flux

L'application est structurée autour de plusieurs **flux utilisateur principaux** :
*   Onboarding (Identifiant technique : FLOW_ONBOARDING, Préfixe des composants : OnB)
*   Utilisation quotidienne (Identifiant technique : FLOW_DAILY, Préfixe des composants : Daily)
*   Interaction Melune (Identifiant technique : FLOW_CONVERSE, Préfixe des composants : Conv)
*   Carnet de Sagesse (Identifiant technique : FLOW_WISDOM, Préfixe des composants : Wis)
*   Cartes de Sagesse (Identifiant technique : FLOW_CARDS, Préfixe des composants : Card)
*   Rituels Personnalisés (Identifiant technique : FLOW_RITUALS, Préfixe des composants : Ritual)

Des diagrammes globaux des interactions et des principales boucles d'utilisation existent pour visualiser ces flux.

##### 1.2 Principes d'interface communs

*   **Navigation principale** : Barre inférieure avec 4 onglets (Accueil, Cycle, Conversation, Conseils)
*   **Navigation secondaire** : Bouton retour, titre d'écran, actions contextuelles
*   **Structure des écrans** : En-tête, contenu principal, zone d'action (si nécessaire)
*   **Interactions de base** : Tap, swipe, scroll, long press

##### 1.3 Système de design

*   **Respect des composants définis** dans le design system.
*   **Palette de couleurs** :
    *   Couleur principale : Framboise Chaleureuse (#E91E63)
    *   Couleur secondaire : Citron Vert Velouté (#CDDC39)
    *   Couleurs des phases du cycle : Menstruelle (Grenat Doux #F44336), Folliculaire (Miel Doré #FFC107), Ovulatoire (Lagune Calme #00BCD4), Lutéale (Lavande Mystique #673AB7). *Note : Les couleurs sont en cours de validation finale*.
*   **Typographie** : Hiérarchie définie avec Quintessential et Quicksand. *Note : Une alternative pour Quintessential Bold est à l'étude*.

##### 1.4 Principes de viralité éthique

*   Création de valeur avant incitation au partage
*   Contenu partageable conservant son intégrité et sa profondeur
*   Mécanismes d'invitation basés sur l'aide mutuelle
*   Respect de l'intimité des utilisatrices

---

#### 2. Écrans d'onboarding

Le flux d'onboarding et de configuration initiale (FLOW_ONBOARDING) guide l'utilisatrice à travers plusieurs écrans principaux et transitions.

##### 2.1 Écran de bienvenue

**Objectif** : Premier contact de l'utilisatrice avec l'application, créer une première impression positive, présenter le concept de sagesse cyclique, offrir des options de connexion ou de création de compte.
**Composants** :
*   Logo MoodCycle (centré, taille: 120dp × 120dp)
*   Titre de bienvenue (Text/Heading-1)
*   Sous-titre (Text/Body)
*   Bouton "Commencer" (Button/Primary/Large)
**Interactions** :
*   Tap sur "Commencer" → Transition vers l'écran d'introduction à Melune
**Règles métier** :
*   Apparaît uniquement lors de la première utilisation ou après réinitialisation des données
*   Temps d'affichage minimum: 2 secondes (animation d'entrée)

##### 2.2 Introduction à Melune

**Objectif** : Présenter Melune et son rôle de guide personnel, expliquer son rôle et sa personnalité.
**Composants** :
*   Illustration de Melune (animée, taille: 200dp × 200dp)
*   Titre de présentation (Text/Heading-2)
*   Description du rôle de Melune (Text/Body)
*   Indicateurs de pagination (Page-Indicator, état actuel: 1/3)
*   Bouton "Suivant" (Button/Primary/Medium)
*   Lien "Passer l'introduction" (Link/Text, en bas)
**Interactions** :
*   Tap sur "Suivant" → Transition vers l'explication du cycle
*   Tap sur "Passer" → Transition vers la collecte des données (si première utilisation) ou l'écran d'accueil (si retour utilisatrice)
*   Swipe horizontal → Navigation entre les écrans d'introduction
**Règles métier** :
*   L'animation de Melune doit montrer son caractère bienveillant et accueillant
*   Le texte doit clairement expliquer que Melune est un guide IA personnalisé

##### 2.3 Explication du cycle

**Objectif** : Introduire le concept des 4 phases du cycle, présenter les avantages de la compréhension cyclique. Vue simplifiée des phases du cycle menstruel.
**Composants** :
*   Visualisation simplifiée de la roue des phases (taille: 250dp × 250dp)
*   Titre explicatif (Text/Heading-2)
*   Description des 4 phases (Text/Body)
*   Indicateurs de pagination (Page-Indicator, état actuel: 2/3)
*   Bouton "Suivant" (Button/Primary/Medium)
*   Lien "Passer l'introduction" (Link/Text, en bas)
**Interactions** :
*   Identiques à l'écran précédent
**Règles métier** :
*   Chaque phase doit être représentée avec sa couleur distinctive
*   Le texte doit souligner l'approche holistique (médicale, psychologique, spirituelle)

##### 2.4 Collection des données initiales

**Objectif** : Recueillir les informations essentielles sur le cycle de l'utilisatrice, telles que la date des dernières règles, la durée moyenne du cycle et des règles, et des informations sur la contraception.
**Composants** :
*   Formulaire de saisie avec:
    *   Sélecteur de date pour "Date des dernières règles" (DatePicker)
    *   Sélecteur numérique pour "Durée moyenne du cycle" (NumberPicker, 21-35 jours)
    *   Sélecteur numérique pour "Durée moyenne des règles" (NumberPicker, 2-10 jours)
    *   Commutateur pour "Contraception hormonale" (Toggle)
*   Bouton "Continuer" (Button/Primary/Medium)
*   Bouton "Revenir plus tard" (Button/Secondary/Medium)
**Interactions** :
*   Tap sur "Continuer" → Transition vers la personnalisation de Melune
*   Tap sur "Revenir plus tard" → Dialogue de confirmation, puis écran d'accueil avec fonctionnalités limitées
**Règles métier** :
*   Toutes les données sont obligatoires sauf le toggle Contraception
*   Validation de cohérence : La date des dernières règles ne peut pas être dans le futur. Alerte si la durée du cycle est inférieure à 21 ou supérieure à 35 jours.
*   Ces données servent au calcul initial des phases

##### 2.5 Personnalisation de Melune

**Objectif** : Permettre le choix de l'apparence de l'avatar Melune, définir les préférences de ton et style d'interaction pour personnaliser l'expérience.
**Règles métier** :
*   Minimum 3 options d'avatar différentes
*   Option de modification ultérieure mentionnée dans l'écran
*   L'avatar choisi détermine l'apparence de Melune dans toute l'application

##### 2.6 Présentation de l'abonnement

**Objectif** : Présenter les options d'abonnement (mensuel/annuel), présenter les fonctionnalités premium, et permettre l'accès à la période d'essai.
**Composants** :
*   Titre "Accédez à votre sagesse cyclique" (Text/Heading-2)
*   Liste des fonctionnalités incluses (List/Checkmark)
*   Options d'abonnement (Card/Subscription) : Mensuel avec prix, Annuel avec prix et économie en pourcentage
*   Bouton "Essai gratuit de 7 jours" (Button/Primary/Large)
*   Bouton "Restaurer les achats" (Button/Text)
*   Texte légal sur l'abonnement (Text/Caption)
**Interactions** :
*   Tap sur "Essai gratuit" → Processus d'achat intégré puis transition vers l'écran d'accueil
*   Tap sur "Restaurer les achats" → Vérification des achats antérieurs
**Règles métier** :
*   Affichage transparent des conditions (renouvellement automatique, annulation)
*   Essai gratuit nécessite l'enregistrement d'un moyen de paiement
*   Prix affichés selon la région de l'utilisatrice

##### 2.7 États spécifiques et chemins alternatifs de l'onboarding

*   **Utilisatrice indécise sur les données** : Possibilité de renseigner les données plus tard avec expérience limitée
*   **Utilisatrice sans abonnement** : Accès à des fonctionnalités de base avec invitation à l'abonnement
*   **Retour d'une utilisatrice** : Possibilité de se connecter directement et sauter l'onboarding
*   **Utilisatrice avec contraception hormonale** : Adaptation des prédictions de cycle

---

#### 3. Écran d'accueil

L'écran d'accueil est le point central de l'utilisation quotidienne (FLOW_DAILY).

##### 3.1 Spécifications générales

**Objectif** : Fournir une vue d'ensemble du jour actuel et un accès rapide aux fonctionnalités principales. Il affiche l'avatar Melune au centre, l'insight du jour contextualisé, la visualisation de la roue du cycle, des informations sur la phase actuelle, et des accès rapides.
**Composants** :
*   En-tête avec : Bouton Menu (Icon/Menu), Titre "MoodCycle" (Text/Logo), Icône de notifications (Icon/Bell)
*   Avatar Melune (animé, taille: 120dp × 120dp)
*   Message de bienvenue personnalisé (Text/Heading-3)
*   Information sur la phase actuelle (Text/Body-Emphasis)
*   Roue du cycle avec position actuelle (Component/CycleWheel), visualisation simplifiée
*   Indicateur de prochaines règles (Text/Body)
*   Carte "Insight du jour" (Card/Insight) contenant : Titre "INSIGHT DU JOUR" (Text/Caption-Bold), Contenu de l'insight (Text/Body), Bouton de sauvegarde (Icon/Star), Bouton de partage (Icon/Share)
*   Bouton "Comment vous sentez-vous aujourd'hui?" (Button/Primary/Medium)
*   Bouton "Discuter avec Melune" (Button/Secondary/Medium)
*   Barre de navigation inférieure (NavBar/Primary)
**Interactions** :
*   Tap sur Menu → Ouvre le menu latéral
*   Tap sur Notifications → Ouvre le centre de notifications
*   Tap sur Melune → Animation de réaction et message aléatoire
*   Tap sur la roue → Navigation vers l'écran du cycle
*   Tap sur l'étoile de l'insight → Sauvegarde dans le Carnet de Sagesse
*   Tap sur le partage de l'insight → Ouvre les options de partage
*   Tap sur "Comment vous sentez-vous" → Ouvre l'écran de saisie des symptômes
*   Tap sur "Discuter avec Melune" → Navigation vers l'écran de conversation
*   Tap sur les onglets de navigation → Navigation vers les écrans correspondants

##### 3.2 États spécifiques de l'écran d'accueil

*   **Premier jour d'utilisation** : Message de bienvenue spécial, tutoriel discret (Tooltips) indiquant les fonctionnalités principales, invitation à saisir son ressenti mise en évidence
*   **Changement de phase** : Animation spéciale de la roue des phases, message de Melune soulignant la transition, insight spécifique au changement de phase
*   **Veille des règles** : Notification visuelle discrète, message de préparation par Melune, conseils spécifiques mis en avant

##### 3.3 Éléments dynamiques et personnalisation (Utilisation Quotidienne)

Le FLOW_DAILY est enrichi par des éléments dynamiques :
*   **Insight du jour** : Généré spécifiquement pour la phase et les préférences
*   **Suggestions contextuelles** : Basées sur l'historique et le jour du cycle
*   **Rappels adaptés** : Notifications personnalisées selon configuration
*   **Interface réactive** : Adaptée à la phase actuelle (couleurs, ton)

##### 3.4 Scénario : Utilisation quotidienne matinale

Emma ouvre l'application au réveil pour voir son insight du jour. Elle note qu'elle se sent énergique aujourd'hui. Elle rapporte un léger mal de tête dans le formulaire de symptômes. Elle consulte la roue pour voir combien de temps reste dans sa phase. Elle lit les conseils pour la phase folliculaire. Elle sauvegarde l'insight qui résonne particulièrement avec elle. Une notification est programmée pour lui rappeler son rituel du soir.

---

#### 4. Écran de conversation avec Melune

Cet écran gère l'interaction avec Melune (FLOW_CONVERSE).

##### 4.1 Spécifications générales

**Objectif** : Permettre une interaction conversationnelle avec Melune via une interface chat avec bulles de dialogue pour obtenir des conseils personnalisés. L'avatar Melune y est animé et expressif.
**Composants** :
*   En-tête avec : Bouton Retour (Icon/Back), Titre "Melune" (Text/Heading-3), Bouton Info (Icon/Info)
*   Zone de conversation (ScrollView) contenant : Bulles de message Melune (Component/ChatBubble/Melune), Bulles de message Utilisatrice (Component/ChatBubble/User), Indicateurs de temps (Text/Caption), Bouton de sauvegarde sur messages Melune (Icon/Star)
*   Zone de suggestions (Component/SuggestionChips)
*   Zone de saisie (Component/ChatInput) avec : Champ de texte (InputField/Chat), Bouton d'envoi (Icon/Send)
*   Barre de navigation inférieure (NavBar/Primary)
**Interactions** :
*   Tap sur Retour → Navigation vers l'écran précédent
*   Tap sur Info → Affichage modal d'informations sur la conversation avec Melune
*   Tap sur une bulle de message → Aucune action / Animation subtile
*   Long press sur une bulle de message → Options contextuelles (copier, etc.)
*   Tap sur étoile → Sauvegarde le conseil dans le Carnet de Sagesse
*   Tap sur une suggestion → Envoie automatiquement le message suggéré
*   Saisie de texte → Active le bouton d'envoi
*   Tap sur Envoi → Transmet le message et déclenche la réponse de Melune
**Règles métier** :
*   Réponses de Melune générées via API Claude avec : Contexte de la phase actuelle, Historique récent des conversations, Préférences et données de l'utilisatrice. L'intégration de l'IA utilise l'API Claude pour générer les réponses, avec un contexte enrichi et une personnalisation du ton/style.
*   Sauvegarde des conseils : Uniquement possible sur les messages de Melune, confirmation visuelle de sauvegarde. Les options de sauvegarde des conseils sont disponibles.
*   Suggestions contextuelles : Maximum 3 suggestions à la fois, basées sur la phase actuelle et l'historique, mises à jour après chaque réponse de Melune. La zone de saisie propose des suggestions.
*   Limitation hors-ligne : Accès aux réponses pré-enregistrées uniquement, notification discrète du mode limité.
*   Traitement spécifique des sujets médicaux/sensibles est intégré.

##### 4.2 États particuliers de conversation

*   **Première conversation** : Message d'accueil spécial de Melune, suggestions de sujets d'introduction, explication brève du fonctionnement.
*   **Détection de préoccupation médicale** : Message de clarification sur les limites de conseil médical, suggestion de consulter un professionnel de santé, offre d'informations générales non médicales.
*   **Mode hors-ligne** : Interface visuelle légèrement modifiée (indicateur discret), suggestions limitées aux réponses disponibles hors-ligne, message expliquant les limitations.

##### 4.3 Gestion du contexte conversationnel

L'intégration de l'IA utilise la gestion du contexte conversationnel :
*   **Mémoire à court terme** : Derniers échanges de la conversation.
*   **Mémoire à long terme** : Sujets abordés et préférences.
*   **Contexte cyclique** : Phase actuelle et informations associées.
*   **Connaissance utilisatrice** : Symptômes, habitudes et préférences.

##### 4.4 Intégration API Claude

**Objectif** : Définir les paramètres d'intégration avec l'API Claude pour la conversation.
**Paramètres de l'API** : ID du modèle (claude-3-7-sonnet-20250219), Température (0.7 pour conversations), Longueur maximale (2000 tokens pour réponses Melune), Système de prompt (Contexte utilisatrice + phase cyclique + persona Melune), Gestion de l'historique (Conservation des 10 derniers échanges).
**Structure du contexte** : Informations utilisatrice, Phase actuelle du cycle, Consignes de ton et style, Instructions pour sujets sensibles.
**Règles de modération** : Refus de conseils médicaux prescriptifs, Orientation vers professionnels de santé, Validation des informations scientifiques, Avertissements pour approches alternatives.

---

#### 5. Écran du cycle

Cet écran permet la visualisation du cycle et la saisie des données.

##### 5.1 Vue principale du cycle

**Objectif** : Visualiser le cycle menstruel et naviguer entre les phases. L'écran affiche la roue interactive des phases et des détails sur la phase actuelle.
**Composants** :
*   En-tête avec : Bouton Retour (si nécessaire), Titre "Mon Cycle", Bouton Statistiques.
*   Roue des phases (Component/CycleWheel/Large) avec : Segments colorés, Marqueur de position actuelle, Jours numérotés.
*   Information sur la phase actuelle (Component/PhaseInfo) avec : Nom de la phase, Jours de la phase, Dates calendaires.
*   Caractéristiques de la phase (Component/PhaseCharacteristics) : Energie, Créativité, Social, Productivité.
*   Onglets de navigation secondaire : "Ma phase", "Symptômes", "Historique".
*   Bouton "Explorer les conseils pour cette phase" (Button/Secondary/Medium).
*   Barre de navigation inférieure.
**Interactions** :
*   Tap sur les segments de la roue → Affiche les informations de la phase sélectionnée.
*   Rotation/Drag sur la roue → Navigation entre les phases.
*   Double tap sur la roue → Retour à la phase actuelle.
*   Tap sur les onglets → Change le contenu affiché sous la roue.
*   Tap sur "Explorer les conseils" → Navigation vers la Bibliothèque filtrée.
*   Pinch sur la roue → Zoom in/out.
**Règles métier** :
*   La phase actuelle est calculée en fonction : Date dernières règles, Durée moyenne cycle, Ajustements manuels.
*   Chaque phase a ses caractéristiques : Valeurs par défaut ajustées selon données saisies.
*   Accès aux phases futures possible mais indiqué comme prévisionnel.

##### 5.2 Vue des symptômes

**Objectif** : Saisir et visualiser les symptômes liés au cycle via un formulaire adapté à la phase.
**Composants** :
*   En-tête identique à la vue principale.
*   Roue des phases réduite (Component/CycleWheel/Medium).
*   Date du jour mise en évidence.
*   Formulaire de saisie des symptômes (Form/Symptoms) avec : Section "Symptômes physiques" (Checklist, option "Autres"), Section "État émotionnel" (Checklist, option "Autres"), Zone de notes libres.
*   Bouton "Enregistrer" (Button/Primary/Medium).
*   Onglets de navigation secondaire (avec "Symptômes" actif).
*   Barre de navigation inférieure.
**Interactions** :
*   Tap sur les checkboxes → Sélection/désélection.
*   Tap sur section repliable → Expansion/repli.
*   Tap sur "Enregistrer" → Sauvegarde et confirmation.
**Règles métier** :
*   Maximum 5 symptômes physiques et 5 états émotionnels sélectionnables.
*   Données sauvegardées pour : Analyse tendances, Personnalisation conseils, Prédictions affinées.
*   Option de modification des données jusqu'à minuit.

##### 5.3 Vue de l'historique

**Objectif** : Visualiser les cycles précédents et les tendances. L'écran affiche l'historique des cycles précédents, les prédictions et les tendances.
**Composants** :
*   En-tête identique à la vue principale.
*   Sélecteur de cycle (Dropdown/Cycle).
*   Calendrier des 3 derniers mois (Component/Calendar/Month).
*   Légende des couleurs et symboles (Component/Legend).
*   Statistiques simples (Component/CycleStats) : Longueur moyenne cycles, Longueur moyenne règles, Variation longueur.
*   Onglets de navigation secondaire (avec "Historique" actif).
*   Barre de navigation inférieure.

##### 5.4 Spécifications techniques de la Roue du Cycle

*   Composant : Vue personnalisée dérivée de View (Android) ou UIView (iOS).
*   Rendu : Canvas/Path drawing avec antialiasing.
*   Animations : Rotation fluide, Highlight au toucher, Transition entre phases.
*   Accessibilité : Description vocale, Navigation alternative.
*   Calcul des proportions : Ajustement dynamique en fonction des données utilisatrice.

---

#### 6. Bibliothèque de conseils

La bibliothèque offre un accès à des conseils (partie du FLOW_DAILY).

##### 6.1 Vue principale de la bibliothèque

**Objectif** : Permettre l'exploration et la recherche de conseils adaptés.
**Composants** :
*   En-tête avec : Bouton Retour, Titre "Conseils", Bouton Recherche.
*   Barre de filtres (Component/FilterBar) avec : Filtre par approche (ToggleButton/Group), Filtre par phase (SegmentedControl).
*   Section "Pour votre phase actuelle" (Section/Header).
*   Liste de cartes de conseil (RecyclerView/Vertical) avec : Cartes de conseil (Component/AdviceCard).
*   Section "Guides thématiques" (Section/Header).
*   Liste horizontale de guides (RecyclerView/Horizontal) avec : Cartes de guide (Component/GuideCard).
*   Barre de navigation inférieure.
**Interactions** :
*   Tap sur les filtres → Application du filtre.
*   Tap sur une carte de conseil → Ouverture du détail.
*   Tap sur l'étoile → Sauvegarde dans le Carnet de Sagesse.
*   Tap sur une carte de guide → Ouverture du guide.
*   Tap sur Recherche → Affichage interface recherche.
*   Scroll vertical → Navigation dans la liste.
**Règles métier** :
*   Conseils affichés par défaut : Priorité à la phase actuelle, Recommandations personnalisées, Maximum 10 visibles avec option "Voir plus".
*   Filtres : Combinables, Conservés entre sessions.
*   Guides thématiques : Collections de conseils, Minimum 3 au lancement, Nouveaux ajoutés régulièrement.

##### 6.2 Détail d'un conseil

**Objectif** : Présenter le contenu complet d'un conseil.
**Composants** :
*   En-tête avec : Bouton Retour, Titre du conseil, Bouton de sauvegarde.
*   Badge d'approche et Badge de phase.
*   Contenu principal (Component/AdviceContent).
*   Section "À savoir" et "Sources".
*   Boutons d'action : "Parler à Melune", "Créer une carte", "Partager".
**Interactions** :
*   Tap sur Retour → Retour à la bibliothèque.
*   Tap sur Sauvegarde → Ajout/retrait du Carnet.
*   Tap sur "Parler à Melune" → Navigation vers conversation.
*   Tap sur "Créer une carte" → Ouverture éditeur.
*   Tap sur "Partager" → Options de partage.
**Règles métier** :
*   Contenu du conseil : Validé par experts, Sources citées, Avertissements.
*   Personnalisation : Variantes selon contraception/conditions médicales.
*   Accès hors-ligne : Consultés récemment ou téléchargés.

##### 6.3 Guide thématique

**Objectif** : Présenter une collection structurée de conseils sur un thème.
**Composants** :
*   En-tête avec : Bouton Retour, Titre du guide, Bouton de sauvegarde.
*   Image d'illustration, Introduction au thème.
*   Table des matières interactive, Sections de contenu.
*   Navigation de section, Bouton "Sauvegarder tout le guide".
**Interactions** :
*   Tap sur table des matières → Navigation vers section.
*   Tap sur liens de conseils → Ouverture conseil en modal.
*   Tap sur navigation de section → Passage section.
*   Tap sur "Sauvegarder tout" → Ajoute guide au Carnet.
**Règles métier** :
*   Structure du guide : 4-7 sections.
*   Éléments interactifs : Liens entre sections/guides.
*   Sauvegarde : Option de sauvegarder sections individuelles, Organisation automatique.

##### 6.4 Scénario : Recherche d'informations spécifiques

Sylvie ressent des bouffées de chaleur plus intenses que d'habitude. Elle utilise la recherche dans la bibliothèque pour trouver des conseils. Elle filtre les résultats par approche naturopathique. Elle consulte en détail plusieurs articles sur les remèdes naturels. Elle discute avec Melune des options les plus adaptées. Elle sauvegarde les conseils les plus pertinents. Elle crée un rituel personnalisé incorporant ces conseils.

---

#### 7. Carnet de sagesse

Cet écran gère le Carnet de Sagesse (FLOW_WISDOM).

##### 7.1 Vue principale du carnet

**Objectif** : Centraliser et organiser les conseils et insights sauvegardés. La vue principale présente une liste des éléments sauvegardés avec des options de filtrage et d'organisation.
**Composants** :
*   En-tête avec : Titre "Carnet de Sagesse", Bouton Recherche, Bouton Options.
*   Onglets de filtrage : "Tous", "Insights", "Conseils", "Mes cartes".
*   Liste des éléments sauvegardés (RecyclerView/Vertical) avec : Cartes d'élément (Component/SavedItemCard).
*   Message si vide (Component/EmptyState).
*   Bouton flottant "Créer une carte" (FAB/Create).
**Interactions** :
*   Tap sur les onglets → Filtre le contenu.
*   Tap sur une carte → Ouverture du détail.
*   Tap sur bouton d'actions → Menu contextuel (Créer carte, Partager, Supprimer).
*   Tap sur "Créer une carte" → Navigation vers l'éditeur.
*   Long press sur une carte → Mode sélection multiple.
*   Swipe sur une carte → Option suppression rapide.
**Règles métier** :
*   Organisation : Par défaut triée par date, option de tri multiple, pas de limite de stockage.
*   Synchronisation : Sauvegarde cloud, disponible hors-ligne après sync.
*   Recherche : Par mot-clé, par phase ou catégorie. Les fonctionnalités de recherche et filtrage permettent la recherche textuelle, des filtres par phase, par type et par date.

##### 7.2 Options d'organisation

**Objectif** : Permettre la personnalisation de l'organisation du carnet.
**Composants** :
*   Modal d'options (Modal/Options) avec : Titre, Options de tri, Options d'affichage.
*   Bouton "Appliquer" et "Annuler".
**Interactions** :
*   Tap sur options de tri → Sélection exclusive.
*   Tap sur options d'affichage → Sélection multiple.
*   Tap sur "Appliquer" → Sauvegarde et applique les paramètres.
*   Tap sur "Annuler" → Annule et ferme.
**Règles métier** :
*   Préférences sauvegardées : Persistantes, Liées au compte.
*   Transitions fluides : Animation lors du changement de tri.

##### 7.3 Vue détaillée d'un élément sauvegardé

**Objectif** : Consulter et interagir avec un élément sauvegardé dans le carnet. La vue détaillée affiche le contenu complet avec des informations contextuelles et une zone de notes personnelles.
**Composants** :
*   En-tête avec : Bouton Retour, Titre de l'élément, Bouton Options.
*   Badge de type et Badge de phase.
*   Date de sauvegarde.
*   Contenu de l'élément (Component/SavedContent).
*   Actions disponibles : "Modifier les annotations", "Créer une carte", "Partager".
*   Section annotations personnelles et Conseils associés.
**Interactions** :
*   Tap sur Retour → Retour à la liste.
*   Tap sur Options → Menu contextuel.
*   Tap sur "Modifier les annotations" → Ouverture éditeur.
*   Tap sur "Créer une carte" → Navigation vers l'éditeur.
*   Tap sur "Partager" → Options de partage.
**Règles métier** :
*   Contenu affiché : Version complète, Conservation mise en forme, Horodatage.
*   Notes personnelles : Maximum 500 caractères, Formatage basique.
*   Conseils associés : Suggestions basées sur contenu/phase, Maximum 3.

---

#### 8. Cartes de sagesse

La création et le partage de cartes font partie du flux Cartes de Sagesse (FLOW_CARDS).

##### 8.1 Éditeur de carte

**Objectif** : Créer et personnaliser des cartes de sagesse à partir d'insights ou conseils. L'interface de création propose un éditeur visuel avec options de template et personnalisation.
**Composants** :
*   En-tête avec : Bouton Annuler, Titre "Créer une carte", Bouton Suivant.
*   Prévisualisation de la carte (Component/CardPreview).
*   Section contenu source (Component/SourceContent).
*   Section personnalisation (Component/CardCustomization) : Choix du modèle, fond, couleurs, style texte, éléments décoratifs.
*   Aperçu en plein écran (Modal/Preview).
**Interactions** :
*   Tap sur Annuler → Confirmation d'abandon.
*   Tap sur Suivant → Passage à l'écran finalisation.
*   Tap sur les sélecteurs → Changement dans prévisualisation.
*   Tap sur édition texte → Interface édition.
*   Pinch sur prévisualisation → Zoom.
*   Tap sur prévisualisation → Aperçu plein écran.
**Règles métier** :
*   Contenu éditable : Limité à 300 caractères, Attribution de source obligatoire.
*   Options de personnalisation : Minimum 5 modèles, Palettes harmonisées, Éléments thématiques.
*   Prévisualisation : Mise à jour en temps réel, Rendu fidèle.

##### 8.2 Finalisation et partage

**Objectif** : Finaliser et partager la carte créée. Les options incluent l'export et l'intégration avec les plateformes sociales.
**Composants** :
*   En-tête avec : Bouton Retour, Titre "Finaliser la carte", Bouton Terminer.
*   Prévisualisation finale (Component/CardFinalPreview).
*   Options de partage : Sauvegarde carnet, Exportation image, Partage réseaux sociaux.
*   Options avancées : Qualité image, Inclusion logo, Texte accompagnement.
*   Bouton "Créer et partager" (Button/Primary/Large).
**Interactions** :
*   Tap sur Retour → Retour éditeur.
*   Tap sur Terminer → Finalisation sans partage.
*   Tap sur options partage → Sélection options.
*   Tap sur "Créer et partager" → Génération et partage.
**Règles métier** :
*   Formats de partage : Image PNG haute qualité, Dans l'application, Plateformes sociales.
*   Attribution : Logo MoodCycle subtil (désactivable), Conservation crédits.
*   Protection : Filigrane invisible, Respect droits d'auteur.
*   Une approche de viralité éthique est privilégiée, basée sur un contenu de valeur et un partage authentique.

##### 8.3 Bibliothèque de modèles de cartes

**Objectif** : Proposer une variété de modèles pour les cartes.
**Composants** :
*   En-tête avec : Bouton Retour, Titre "Modèles de cartes".
*   Filtres de modèles (Par phase, Par style).
*   Grille de modèles (GridView) avec : Vignettes de modèle.
*   Section "Modèles récents".
*   Bouton "Créer modèle personnalisé".
**Interactions** :
*   Tap sur les filtres → Filtre les modèles.
*   Tap sur un modèle → Sélection et retour éditeur.
*   Long press sur un modèle → Aperçu plein écran.
*   Tap sur "Créer modèle personnalisé" → Interface édition avancée.
**Règles métier** :
*   Organisation des modèles : Par phase, Par style visuel, Par popularité.
*   Modèles personnalisés : Sauvegarde, Partage communautaire (futur).
*   Mises à jour : Nouveaux modèles ajoutés régulièrement, Modèles saisonniers.

##### 8.4 Scénario : Création de sa première carte

Emma reçoit un insight sur la créativité en phase folliculaire. Elle clique sur "Créer une carte" depuis l'insight. L'éditeur s'ouvre avec le contenu pré-rempli. Elle explore les modèles et choisit un design lumineux. Elle personnalise légèrement le texte. Elle ajoute un cristal de quartz rose comme élément décoratif. Elle enregistre sa création dans son carnet pour y revenir plus tard.

##### 8.5 Scénario : Partage intergénérationnel

Christine crée une carte à partir d'un conseil sur la transition ménopausique. Elle la personnalise en y ajoutant sa propre expérience. Elle choisit un modèle élégant. Elle ajoute une note personnelle. Elle l'exporte et l'envoie à sa fille. Elle sauvegarde également la carte dans son carnet. Cela initie une conversation enrichissante entre les générations.

---

#### 9. Profil et paramètres

##### 9.1 Écran de profil

**Objectif** : Accéder aux informations personnelles et aux paramètres de l'application.
**Composants** :
*   En-tête avec : Titre "Profil", Bouton Éditer.
*   Section utilisatrice (Component/UserProfile) : Avatar Melune, Nom, Statut abonnement.
*   Statistiques rapides (Component/QuickStats) : Cycles enregistrés, Durée moyenne cycle, Date prochain cycle.
*   Liste de sections : Carnet Sagesse, Paramètres cycle, Notifications, Préférences contenu, Abonnement, Aide et support, À propos.
*   Bouton "Déconnexion".
**Interactions** :
*   Tap sur Éditer → Mode édition.
*   Tap sur une section → Navigation.
*   Tap sur l'avatar → Options personnalisation Melune.
*   Tap sur "Déconnexion" → Confirmation.
**Règles métier** :
*   Informations affichées : Nom modifiable, Stats mises à jour, Statut abonnement.
*   Navigation : Organisation hiérarchique.
*   Sécurité : Option protection par mot de passe/biométrie, Confirmation actions sensibles.

##### 9.2 Paramètres du cycle

**Objectif** : Configurer et ajuster les paramètres liés au suivi du cycle.
**Composants** :
*   En-tête avec : Bouton Retour, Titre "Paramètres du cycle".
*   Données de base : Durée moyenne cycle/règles, Date dernières règles.
*   Options avancées : Contraception hormonale (Toggle + Dropdown type), Conditions médicales (MultiSelect), Grossesse/allaitement/ménopause (RadioGroup).
*   Gestion des données : Exportation des données, Suppression de l'historique.
*   Bouton "Enregistrer".
**Interactions** :
*   Interaction avec contrôles → Modification valeurs.
*   Tap sur "Enregistrer" → Sauvegarde et recalcul cycle.
*   Tap sur "Exportation" → Génération fichier CSV/PDF.
*   Tap sur "Suppression" → Confirmation.
**Règles métier** :
*   Validation des données : Durée cycle/règles (alertes hors plage), Date futures impossibles.
*   Recalcul : Ajustement automatique prédictions, Conservation historique.
*   Conditions médicales : Adaptation conseils, Avertissements.

##### 9.3 Préférences de contenu

**Objectif** : Personnaliser le type de contenu et les approches présentées.
**Composants** :
*   En-tête avec : Bouton Retour, Titre "Préférences de contenu".
*   Approches préférées (Sliders pour Médical, Psychologique, Spirituel, Naturopathie, Phytothérapie, Lithothérapie).
*   Paramètres de personnalisation : Niveau de détail, Ton de communication, Préférences thématiques.
*   Options de langue : Langue application, Traduction automatique.
*   Bouton "Appliquer".
**Interactions** :
*   Interaction avec sliders → Ajustement préférences.
*   Sélection options → Modification préférences.
*   Tap sur "Appliquer" → Sauvegarde et application immédiate.
**Règles métier** :
*   Préférences d'approche : Échelle 0-5, Influence mix contenu, Au moins une > 0.
*   Personnalisation : Niveau de détail affecte longueur/complexité, Ton influence style Melune, Préférences thématiques orientent suggestions.
*   Langue : Changement immédiat, Traduction automatique si besoin.

##### 9.4 Personnalisation de Melune

**Objectif** : Permettre à l'utilisatrice de personnaliser son avatar Melune. Cet écran permet le choix de l'apparence de l'avatar.
**Composants** :
*   En-tête avec : Bouton Retour, Titre "Personnaliser Melune".
*   Prévisualisation de l'avatar (Component/AvatarPreview).
*   Options de personnalisation : Apparence, Couleur dominante, Style visuel.
*   Options de comportement : Expressivité, Fréquence interaction, Style communication.
*   Bouton "Essayer" et "Appliquer".
**Interactions** :
*   Modifications options → Mise à jour prévisualisation.
*   Tap sur "Essayer" → Animation démonstrative.
*   Tap sur l'avatar → Réponse animée.
*   Tap sur "Appliquer" → Sauvegarde et application.
**Règles métier** :
*   Options disponibles : Minimum 5 apparences, Palette harmonisée, 3 styles visuels.
*   Comportement : Expressivité affecte animations, Fréquence détermine interventions spontanées, Style influence ton/longueur messages.
*   Sauvegarde : Profil lié au compte, Conservation préférences.

##### 9.5 Scénario : Configuration avancée

Laure installe l'application. Elle fournit des données précises sur son cycle. Elle indique qu'elle utilise une contraception hormonale. Elle choisit un avatar Melune au style sobre et professionnel. Elle s'abonne directement au plan annuel. Elle configure en détail ses préférences de contenu. Elle explore immédiatement les fonctionnalités avancées.

##### 9.6 Scénario : Partage avec son médecin

Sylvie prépare une consultation médicale importante. Elle consulte son historique de symptômes dans l'application. Elle utilise la fonction d'export pour générer un rapport. Elle personnalise ce rapport. Elle l'envoie par email à son médecin. Pendant la consultation, elle utilise l'application pour montrer des tendances. Elle note ensuite les recommandations médicales dans l'application.

##### 9.7 Scénario : Utilisation post-ménopause

Christine configure l'application en indiquant qu'elle est ménopausée. L'interface s'adapte pour présenter un contenu pertinent. Elle explore les rituels de bien-être recommandés. Elle personnalise son expérience pour se concentrer sur l'équilibre hormonal. Elle consulte la bibliothèque pour des conseils de santé générale. Elle programme des rituels quotidiens d'ancrage et de méditation. Elle apprécie particulièrement les insights sur la sagesse cyclique.

---

#### 10. Rituels personnalisés

Cet écran gère les Rituels Personnalisés (FLOW_RITUALS).

##### 10.1 Liste des rituels

**Objectif** : Présenter et gérer les rituels personnalisés selon les phases. L'écran affiche une liste des rituels recommandés et personnels.
**Composants** :
*   En-tête avec : Titre "Mes Rituels", Bouton Ajouter.
*   Filtres par phase (TabBar/Phase).
*   Liste des rituels (RecyclerView/Vertical) avec : Cartes de rituel (Component/RitualCard) contenant Titre, Description, Badge phase, Toggle activation.
*   Message si vide (Component/EmptyState).
*   Suggestion "Rituels recommandés" (Component/RecommendedRituals).
**Interactions** :
*   Tap sur onglets phase → Filtre les rituels.
*   Tap sur une carte → Ouverture détail.
*   Tap sur toggle → Active/désactive.
*   Tap sur "Ajouter" → Navigation vers création.
*   Tap sur suggestion → Ajout rapide.
**Règles métier** :
*   Organisation : Regroupement par phase, Priorité aux activés, Suggestions basées sur préférences/phase.
*   Limites : Maximum 5 rituels actifs par phase (MVP).
*   Synchronisation : Disponible hors-ligne, Rappels intégrés aux notifications.

##### 10.2 Détail d'un rituel

**Objectif** : Consulter et modifier les détails d'un rituel spécifique.
**Composants** :
*   En-tête avec : Bouton Retour, Titre du rituel, Toggle activation.
*   Badge de phase, Description complète.
*   Section "Quand le pratiquer" (Jours recommandés, Moment journée, Fréquence).
*   Section "Comment pratiquer" (Instructions étape par étape, Durée estimée, Niveau difficulté).
*   Section "Bienfaits" (Liste, Lien vers sources).
*   Options de rappel (Activation toggle + Configuration).
*   Boutons d'action : "Modifier", "Supprimer".
**Interactions** :
*   Tap sur Toggle → Active/désactive.
*   Tap sur "Modifier" → Mode édition.
*   Tap sur "Supprimer" → Confirmation.
*   Tap sur configuration rappel → Ajustement.
*   Tap sur lien externe → Ouverture navigateur.
**Règles métier** :
*   Contenu : Instructions claires, Sources validées pour bienfaits, Adaptations suggérées.
*   Rappels : Intégration notifications, Option reports, Désactivation automatique si non confirmés.
*   Personnalisation : Modification complète pour rituels personnels, Limitée pour prédéfinis.

##### 10.3 Création d'un rituel personnalisé

**Objectif** : Permettre à l'utilisatrice de créer ses propres rituels.
**Composants** :
*   En-tête avec : Bouton Annuler, Titre "Nouveau rituel", Bouton Sauvegarder.
*   Formulaire de création : Nom, Sélecteur phase, Description, Instructions, Durée estimée, Bienfaits attendus, Options rappel.
*   Suggestions d'éléments (Phrases pré-écrites, Idées bienfaits, Modèles instructions).
**Interactions** :
*   Saisie champs → Validation temps réel.
*   Tap suggestions → Insertion dans champ.
*   Tap "Sauvegarder" → Validation et création.
*   Tap "Annuler" → Confirmation si données, puis abandon.
**Règles métier** :
*   Validation : Nom/phase obligatoires, Description/Instructions minimum caractères.
*   Suggestions : Adaptées phase/préférences, Option personnalisation complète.
*   Sauvegarde : Ajout liste rituels, Option activation automatique, Possibilité partage futur.

##### 10.4 Scénario : Création d'un rituel personnalisé

Christine crée un rituel de sagesse basé sur son expérience. Elle le structure en étapes précises et accessibles. Elle y intègre des éléments de méditation et de réflexion. Elle le configure pour être pratiqué une fois par semaine. Elle programme des rappels subtils. Elle commence à suivre ce rituel régulièrement. Elle note l'évolution de son bien-être dans l'application.

---

#### 11. Mode hors-ligne

##### 11.1 Fonctionnalités disponibles hors-ligne

**Objectif** : Définir le comportement de l'application sans connexion internet.
**Fonctionnalités pleinement accessibles** : Consultation cycle/phases, Visualisation données saisies, Saisie symptômes/ressenti, Consultation conseils/insights enregistrés, Accès Carnet Sagesse, Visualisation Cartes Sagesse créées, Suivi rituels configurés.
**Fonctionnalités partiellement disponibles** : Conversation avec Melune (réponses limitées, pré-téléchargées), Bibliothèque de conseils (uniquement contenus mis en cache), Création de Cartes de Sagesse (modèles disponibles hors-ligne).
**Fonctionnalités indisponibles** : Recherche bibliothèque complète, Partage réseaux sociaux, Mise à jour prédictions avancées, Téléchargement nouveaux contenus.

##### 11.2 Gestion de la synchronisation

**Objectif** : Assurer la continuité de l'expérience entre sessions en ligne et hors-ligne.
**Comportement** : Détection auto connexion, Notification mode hors-ligne, Stockage local modifications, Synchronisation auto au retour connexion.
**Règles métier** : Données prioritaires pour sync, Résolution conflits (priorité récent, notification si modification parallèle), Limitations stockage local (100MB max, alerte insuffisance, nettoyage manuel).

##### 11.3 Téléchargement proactif

**Objectif** : Permettre l'utilisation prolongée en mode hors-ligne.
**Composants** :
*   En-tête avec : Bouton Retour, Titre "Contenu hors-ligne".
*   Statut du stockage (Espace utilisé/disponible, Dernière synchronisation).
*   Options de téléchargement : Essentiels phase actuelle/suivante, Guides thématiques, Modèles Cartes Sagesse.
*   Gestion du contenu : "Nettoyer le cache", "Actualiser le contenu".
*   Bouton "Télécharger la sélection".
**Interactions** : Sélection options → Calcul espace requis, Tap "Télécharger" → Démarrage téléchargement, Tap "Nettoyer cache" → Options suppression, Tap "Actualiser" → Vérification/mise à jour.
**Règles métier** : Téléchargement intelligent (Priorisation, Compression, Wi-Fi par défaut), Gestion obsolescence (Marquage périmé, Suggestion rafraîchissement, Suppression auto ancien), Synchronisation périodique (Option programmée, Notification avant expiration, Auto update critiques).

---

#### 12. États système et composants transversaux

##### 12.1 États de chargement

**Objectif** : Fournir un feedback visuel pendant les opérations nécessitant un traitement.
**Types** : Chargement initial (Splash screen), Chargement page (Skeleton loading), Actions ponctuelles (Indicateur inline), Envoi/réception données (Indicateur discret).
**Comportement** : Initial (Logo animé, Transition fluide, Max 3s), Page (Squelettes, Animation pulsation, Transition progressive), Ponctuelles (Spinner/barre, Message contextuel, Option annulation), Envoi/réception (Indicateur en-tête, Non bloquant, Notification succès/échec).

##### 12.2 États d'erreur

*(Contenu non détaillé dans les sources fournies)*

##### 12.3 Notifications

*(Contenu non détaillé dans les sources fournies)*

##### 12.4 Navigation et transitions

**Objectif** : Assurer une expérience de navigation fluide et intuitive.
**Patterns** : Navigation primaire (barre inférieure), Navigation secondaire (bouton retour, fil d'Ariane, gestes, raccourcis). Des diagrammes de flux existent pour illustrer les transitions entre les écrans principaux.
**Animations et transitions** : Entre écrans (Slide horizontal/vertical, Fade, Scale), Micro-animations fonctionnelles (Feedback toucher, Indication états, Transitions états, Animations guidage).
**Règles métier** : Performance (Durée 200-300ms, Courbes ease-in-out, Optimisation, Option réduction animations), Cohérence (Patterns constants, Conventions respectées, Transitions prévisibles), Accessibilité (Alternative aux gestes, Support clavier, Compatibilité lecteurs d'écran).

---

#### 13. Spécifications techniques d'intégration

##### 13.1 Intégration API Claude

**Objectif** : Définir les spécifications techniques pour l'intégration avec l'API Claude.
**Endpoints principaux** : `/v1/messages` (Conversations Melune), `/v1/completions` (Insights/Conseils).
**Paramètres de requête essentiels** : `model` ("claude-3-7-sonnet-20250219"), `max_tokens` (2000/500), `temperature` (0.7/0.5), `messages` (structure complète avec prompt système + contexte).
**Système de prompt principal**. L'intégration technique de Melune utilise une couche d'abstraction sur l'API Claude 3.7 Sonnet qui enrichit les prompts, filtre les réponses et gère la personnalité/contexte.