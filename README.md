# MoodCycle Monorepo 🌙

> Écosystème complet MoodCycle - App mobile, API et interface admin

## Vue d'ensemble

MoodCycle est une application de suivi du cycle menstruel avec intelligence artificielle, développée en monorepo pour une meilleure cohérence et gestion des versions.

## Structure du projet

```
MoodCycle/
├── packages/
│   ├── app/           # 📱 Application mobile (React Native/Expo)
│   ├── api/           # 🔧 API Backend (Node.js/Express)
│   └── admin/         # 🖥️ Interface admin (React/Lovable)
├── docs/              # 📚 Documentation
├── archive/           # 📦 Projets archivés
└── package.json       # ⚙️ Configuration monorepo
```

## Packages

### 📱 App (packages/app)
- **Tech**: React Native, Expo, TypeScript
- **Features**: Suivi cycle, IA conversationnelle, insights personnalisés
- **Run**: `npm start`

### 🔧 API (packages/api)  
- **Tech**: Node.js, Express, Anthropic AI
- **Features**: Endpoints RESTful, authentification, IA backend
- **Run**: `npm run start:api`

### 🖥️ Admin (packages/admin)
- **Tech**: React, Tailwind CSS, Vite, TypeScript (Lovable)
- **Features**: Dashboard, gestion utilisateurs, édition insights
- **Run**: `npm run start:admin`

## Quick Start

```bash
# Installation complète
npm install

# Démarrer l'API et Admin simultanément
npm run start:all

# Démarrer l'app mobile
npm start

# Build tous les packages
npm run build
```

## Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm start` | Lance l'app mobile |
| `npm run start:api` | Lance l'API en mode dev |
| `npm run start:admin` | Lance l'interface admin |
| `npm run start:all` | Lance API + Admin |
| `npm run build` | Build tous les packages |
| `npm run test` | Tests de tous les packages |

## Développement

### Workflow Git

```bash
# Branches principales
main                    # 🚀 Production
develop                 # 🔄 Intégration
feature/admin-mvp       # 🎯 Sprint actuel
feature/app-notebook    # 📝 Développement app
```

### Structure de développement

1. **Sprint Admin** (current): Génération Lovable + API endpoints
2. **Sprint App**: Finalisation notebook et intégrations
3. **Sprint Intégration**: Tests e2e et déploiement

### Commandes de développement

```bash
# App Mobile
cd packages/app && npm start

# API Backend
cd packages/api && npm run dev

# Admin Interface (après génération Lovable)
cd packages/admin && npm run dev
```

## 🚀 Déploiement Production

### Infrastructure VPS
- **Serveur**: 69.62.107.136 (Hostinger)
- **Domaine**: moodcycle.irimwebforge.com
- **SSL**: Let's Encrypt automatique
- **Process Manager**: PM2 pour l'API Node.js

### Architecture Production
```
moodcycle.irimwebforge.com/
├── /                  # Interface Admin (Lovable statique)
├── /api/              # API Node.js (proxy vers localhost:4000)
└── SSL automatique    # HTTPS obligatoire
```

### Déploiement API (Node.js + PM2)
```bash
# Sur le serveur VPS
cd /srv/www/internal/moodcycle/api/current
npm install --production
pm2 start src/server.js --name moodcycle-api
pm2 save && pm2 startup
```

### Déploiement Admin (Statique)
```bash
# Build local
cd packages/admin && npm run build

# Deploy vers VPS (CI/CD via Git hooks)
git push production main
```

### Configuration Nginx
```nginx
server {
    server_name moodcycle.irimwebforge.com;
    
    # Admin Interface (Statique)
    location / {
        root /srv/www/internal/moodcycle/admin/current;
        try_files $uri $uri.html $uri/ /index.html;
    }
    
    # API Proxy (Node.js + PM2)
    location /api/ {
        proxy_pass http://localhost:4000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Documentation

- 📋 [Tasks](docs/TASKS.md) - Source de vérité du projet
- 🏗️ [Technical](docs/TECHNICAL.md) - Architecture technique  
- 🔄 [Workflow](docs/WORKFLOW.md) - Processus Git et CI/CD
- 📊 [Admin Sprint](docs/admin_sprint_specs.md) - Spécifications admin

## Technologies

- **Frontend**: React Native (App), React (Admin)
- **Backend**: Node.js, Express
- **AI**: Anthropic Claude
- **Tools**: Expo, Vite, Lovable
- **Languages**: TypeScript, JavaScript
- **Infrastructure**: VPS Hostinger, Nginx, PM2, Let's Encrypt

## Contribution

1. Clone le monorepo
2. `npm install` depuis la racine
3. Créer une branch `feature/nom-feature`
4. Développer dans le package approprié
5. Tests et commit
6. PR vers `develop`

---

**🚀 Made with ❤️ by IrimWebForge**

*Monorepo structure optimized for rapid development and deployment* 