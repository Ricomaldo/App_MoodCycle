# 🔄 WORKFLOW - Processus de Travail MoodCycle

*Processus Git, déploiement et collaboration pour Sprint MVP*

## 🌿 Stratégie Branches Git

### **Structure Mono-Repo Validée**
```
MoodCycle/
├── MoodCycleApp/     # React Native (dépôt sync)
├── MoodCycleAPI/     # Node.js (local → push weekend)
└── MoodCycleAdmin/   # Lovable (nouveau weekend)
```

### **Branches Principales**
```bash
main                  # Production stable
├── develop          # Intégration continue
├── feature/admin-mvp # Sprint 1 - Admin Lovable + API endpoints
├── feature/app-notebook # Sprint 2 - Finalisation app
└── hotfix/*         # Corrections urgentes
```

### **Workflow Sprint Actuel**
```bash
# Sprint 1 - Admin MVP Weekend
git checkout -b feature/admin-mvp

# Samedi - API endpoints
cd MoodCycleAPI
git add src/controllers/adminController.js
git commit -m "feat: admin CRUD insights endpoints"

# Samedi soir - Interface Lovable  
cd ../MoodCycleAdmin
git add . 
git commit -m "feat: Lovable admin interface MVP"

# Dimanche - Intégration
git commit -m "feat: connexion Lovable → API Express"
git push origin feature/admin-mvp
```

## 👩‍⚕️ Workflow Jeza (Contenu Thérapeutique)

### **État Actuel**
- ✅ **178 insights génériques** validés et approuvés
- ⏳ **Variantage 5 personas** en attente d'interface admin
- 🎯 **Objectif Sprint 1** : Déblocage complet workflow Jeza

### **Processus Validation Contenu**
```
1. Jeza édite insights via interface admin
   ├── Version Emma (novice curieuse)
   ├── Version Laure (professionnelle)  
   ├── Version Sylvie (transition)
   ├── Version Christine (sage)
   └── Version Clara (analytique)

2. Preview automatique formule rendu
   [intro phase variantée] + [prenom] + [insight varianté] + [closing varianté]

3. Sauvegarde automatique API
   POST /api/admin/insights

4. Mise à disposition app
   GET /api/insights (avec fallback local)
```

### **Workflow Jeza Post-Admin**
```bash
# Jeza accède via admin.irimwebforge.com
# Auth simple : login/password partagé

1. Login interface admin Lovable
2. Sélection insight de base (1-178)
3. Édition 5 variants personas
4. Preview rendu final app
5. Validation + Sauvegarde API
6. Répéter pour 178 insights → 890 variants
```

### **Timeline Jeza (Post Sprint 1)**
- **Semaine 1** : Prise en main interface + 20 premiers insights
- **Semaine 2-3** : Variantage accéléré (50 insights/semaine)
- **Semaine 4** : Finalisation + validation cohérence globale

## 🚀 Processus de Déploiement

### **Environnements**
```
Développement Local:
├── App: Expo Go + simulateur iOS
├── API: localhost:4000 (npm run dev)
└── Admin: localhost:3000 (Lovable)

Production Weekend:
├── App: Reste local (pas de déploiement)
├── API: VPS Hostinger (npm start)  
└── Admin: admin.irimwebforge.com
```

### **Déploiement API Production**
```bash
# VPS Hostinger - Configuration
ssh user@vps-hostinger
cd /var/www/moodcycle-api

# Deploy API après Sprint 1
git pull origin feature/admin-mvp
npm install
pm2 restart moodcycle-api

# Variables environnement production
CLAUDE_API_KEY=sk-ant-api03-***
PORT=4000
NODE_ENV=production
```

### **Déploiement Admin Lovable**
```bash
# Lovable → Production automatique
# URL générée: admin.irimwebforge.com
# Configuration API endpoint: 
# https://api.irimwebforge.com/api/admin
```

### **App React Native (Sprint 2)**
```bash
# Configuration API production
cd MoodCycleApp
echo "REACT_APP_API_URL=https://api.irimwebforge.com" > .env.production

# Build test
npx expo build:ios --release-channel production-test
```

## 🧪 Tests et Validation

### **Tests Sprint 1 - Admin MVP**
```bash
# Tests API endpoints
curl -X GET http://localhost:4000/api/admin/insights
curl -X POST http://localhost:4000/api/admin/insights \
  -H "Authorization: Bearer test-token" \
  -d '{"insight": "test", "persona": "emma"}'

# Tests interface Lovable
# Test manuel: création/édition insight
# Test workflow: 1 insight complet → 5 variants
```

### **Tests Sprint 2 - App Finalisée**  
```bash
# Tests bout-en-bout
cd MoodCycleApp

# Test connexion API insights
npm run test:insights

# Test écran Carnet
npm run test:notebook

# Test personas + insights personnalisés
npm run test:personalization
```

### **Validation Utilisatrices (Sprint 3)**
```
Groupe test enthousiaste (pré-identifié):
├── 5-8 femmes volontaires  
├── Test via TestFlight iOS
├── Feedback questionnaire structuré
├── Session observation UX (optionnel)
└── Itérations selon retours
```

### **Critères de Validation MVP**
- [ ] Jeza peut créer 890 insights via admin (5 × 178)
- [ ] App récupère insights personnalisés API + fallback
- [ ] Écran Carnet fonctionnel + sauvegarde AsyncStorage
- [ ] Test utilisatrices concluant (satisfaction > 4/5)
- [ ] Prêt soumission App Store (guidelines Apple respectées)

## 📊 Métriques & Suivi

### **Sprint 1 - Admin MVP**
```
Objectifs mesurables:
├── API endpoints opérationnels (4/4)
├── Interface admin fonctionnelle (100%)
├── Workflow Jeza testé (1 insight complet)
└── Temps total ≤ 9h (6h samedi + 3h dimanche)
```

### **Sprint 2 - App MVP**
```
Objectifs mesurables:
├── Écran Carnet implémenté
├── 890 insights disponibles via API
├── Tests bout-en-bout validés  
└── Performance app maintenue
```

### **Sprint 3 - Tests & Production**
```
Objectifs mesurables:
├── Groupe test recruté (5+ utilisatrices)
├── Feedback positif (≥4/5 satisfaction)
├── Guidelines Apple respectées
└── Soumission App Store réalisée
```

## 🔧 Outils & Commandes

### **Commandes Essentielles**
```bash
# Démarrage développement complet
cd MoodCycle
npm run dev:all  # Lance API + App + Admin en parallèle

# Tests rapides
npm run test:api     # Tests API endpoints
npm run test:app     # Tests app React Native
npm run test:admin   # Tests interface admin

# Déploiement
npm run deploy:api   # Deploy API sur VPS
npm run deploy:admin # Deploy Admin via Lovable
```

### **Debug & Monitoring**
```bash
# Logs API production
ssh vps-hostinger "pm2 logs moodcycle-api"

# Debug app locale
cd MoodCycleApp && npx expo start --debug

# Monitoring admin
# Interface Lovable analytics intégrées
```

---

*Workflow optimisé pour Sprint MVP weekend - Admin Lovable + API Express + Déblocage Jeza*