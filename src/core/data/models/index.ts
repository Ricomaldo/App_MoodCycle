import Realm, { Configuration } from 'realm';
import { UserSchema } from './UserSchema';
import { CycleSchema } from './CycleSchema';
import { DailyEntrySchema } from './DailyEntrySchema';
import { ConversationSchema } from './ConversationSchema';
import { MessageSchema } from './MessageSchema';
import { SymptomSchema } from './SymptomSchema';

// Configuration Realm
const realmConfig: Configuration = {
  schema: [
    UserSchema,
    CycleSchema,
    DailyEntrySchema,
    ConversationSchema,
    MessageSchema,
    SymptomSchema,
  ],
  schemaVersion: 1,
};

// Fonction pour obtenir l'instance Realm
export const getRealm = async () => {
  return await Realm.open(realmConfig);
};

// Instance par défaut (peut être utilisée directement dans certains cas)
let realm: Realm;

export const initRealm = async () => {
  realm = await getRealm();
  return realm;
};

export const getRealmInstance = () => {
  if (!realm || realm.isClosed) {
    throw new Error('Realm not initialized. Call initRealm first.');
  }
  return realm;
};
