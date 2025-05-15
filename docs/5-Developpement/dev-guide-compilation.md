# Guide de Compilation MoodCycle

## Table des matières

1. [Environnement de développement](#environnement-de-développement)
2. [Compilation avec Expo Go](#compilation-avec-expo-go)
3. [Compilation pour iOS](#compilation-pour-ios)
4. [Compilation pour Android](#compilation-pour-android)
5. [Dépannage](#dépannage)

## Environnement de développement

### Prérequis

- Node.js v18.20.8 ou supérieur
- npm ou yarn
- Xcode (pour iOS)
- Android Studio (pour Android)
- Expo CLI (installé localement)

### Installation des dépendances

```bash
npm install --legacy-peer-deps
```

## Compilation avec Expo Go

### Démarrage rapide

1. Lancer l'application :

```bash
npm start
```

2. Scanner le QR code avec l'application Expo Go sur votre téléphone
3. Ou appuyer sur :
   - `i` pour iOS
   - `a` pour Android

### Commandes utiles

- Nettoyer le cache : `npx expo start -c`
- Redémarrer le bundler : `r`
- Ouvrir dans le navigateur : `w`

## Compilation pour iOS

### Préparation

1. Installer Xcode
2. Installer les outils de ligne de commande :

```bash
xcode-select --install
```

### Étapes de compilation

1. Générer les fichiers natifs :

```bash
npx expo prebuild
```

2. Ouvrir le projet dans Xcode :

   - Méthode 1 (recommandée) :

   ```bash
   npx expo run:ios
   ```

   - Méthode 2 (alternative) :

   ```bash
   cd ios
   open MoodCycle.xcworkspace
   ```

   - Méthode 3 (si vous avez déjà le projet ouvert) :

   ```bash
   npx expo run:ios --no-build
   ```

3. Dans Xcode :
   - Sélectionner votre équipe de développement
   - Configurer le bundle identifier
   - Gérer les certificats de signature

### Commandes utiles

- Nettoyer le build : `npx expo run:ios --no-build-cache`
- Build en mode release : `npx expo run:ios --configuration Release`

## Compilation pour Android

### Préparation

1. Installer Android Studio
2. Configurer les variables d'environnement :
   - ANDROID_HOME
   - JAVA_HOME

### Étapes de compilation

1. Générer les fichiers natifs :

```bash
npx expo prebuild
```

2. Lancer le build :

```bash
npx expo run:android
```

### Commandes utiles

- Nettoyer le build : `npx expo run:android --no-build-cache`
- Build en mode release : `npx expo run:android --variant release`

## Dépannage

### Problèmes courants

#### Erreur "ExpoMetroConfig.loadAsync is not a function"

Solution :

1. Désinstaller expo-cli global :

```bash
npm uninstall -g expo-cli
```

2. Utiliser la version locale :

```bash
npx expo start
```

#### Problèmes de cache

Solutions :

1. Nettoyer le cache Metro :

```bash
npx expo start -c
```

2. Supprimer le dossier .expo :

```bash
rm -rf .expo
```

#### Problèmes de dépendances

Solutions :

1. Réinstaller les dépendances :

```bash
npm install --legacy-peer-deps
```

2. Nettoyer le cache npm :

```bash
npm cache clean --force
```

### Ressources utiles

- [Documentation Expo](https://docs.expo.dev)
- [Guide de déploiement iOS](https://docs.expo.dev/distribution/app-stores/)
- [Guide de déploiement Android](https://docs.expo.dev/distribution/android-builds/)

## Mise à jour

Dernière mise à jour : 15/05/2025
Version : 1.0
