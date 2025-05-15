import React, { createContext, useContext } from 'react';
import { RealmProvider } from '@realm/react';
import { realmConfig } from '../models/realmModels';

// Création du contexte Realm
export const RealmContext = createContext<Realm | null>(null);

// Hook personnalisé pour utiliser Realm
export const useRealm = () => {
  const realm = useContext(RealmContext);
  if (!realm) {
    throw new Error("useRealm doit être utilisé à l'intérieur d'un RealmProvider");
  }
  return realm;
};

// Provider Realm pour l'application
export const RealmAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RealmProvider {...realmConfig}>{children}</RealmProvider>;
};
