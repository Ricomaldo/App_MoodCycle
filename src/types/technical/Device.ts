export interface DeviceInfo {
  id: string;
  userId: string;
  platform: 'ios' | 'android';
  osVersion: string;
  appVersion: string;
  deviceModel: string;
  lastSync: Date;
  settings: DeviceSettings;
}

export interface DeviceSettings {
  notifications: {
    enabled: boolean;
    sound: boolean;
    vibration: boolean;
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
  sync: {
    autoSync: boolean;
    syncFrequency: 'hourly' | 'daily' | 'weekly';
    lastSyncDate?: Date;
    syncStatus: 'success' | 'failed' | 'pending';
  };
  storage: {
    usedSpace: number;
    totalSpace: number;
    lastCleanup: Date;
  };
  performance: {
    batteryOptimization: boolean;
    dataSaver: boolean;
    offlineMode: boolean;
  };
}

export interface SessionData {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  deviceInfo: DeviceInfo;
  actions: SessionAction[];
  errors: SessionError[];
  performance: SessionPerformance;
}

export interface SessionAction {
  type: string;
  timestamp: Date;
  details: Record<string, any>;
}

export interface SessionError {
  code: string;
  message: string;
  timestamp: Date;
  stack?: string;
}

export interface SessionPerformance {
  memoryUsage: number;
  cpuUsage: number;
  responseTime: number;
  networkRequests: number;
  errors: number;
} 