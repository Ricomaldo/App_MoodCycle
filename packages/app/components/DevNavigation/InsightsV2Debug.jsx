import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { theme } from '../../config/theme';
import { getPersonalizedInsightV2, getInsightStats } from '../../data/insights-personalized-v2';

const InsightsV2Debug = () => {
  const [selectedPersona, setSelectedPersona] = useState('emma');
  const [selectedPhase, setSelectedPhase] = useState('menstrual');
  const [usedInsights, setUsedInsights] = useState([]);
  const [lastResult, setLastResult] = useState(null);

  const personas = ['emma', 'laure', 'sylvie', 'christine', 'clara'];
  const phases = ['menstrual', 'follicular', 'ovulatory', 'luteal'];

  const testUserPreferences = {
    symptoms: 5,
    moods: 3,
    phyto: 2,
    phases: 4,
    lithotherapy: 1,
    rituals: 3
  };

  const testMeluneConfig = {
    communicationTone: 'friendly'
  };

  const testInsight = () => {
    const result = getPersonalizedInsightV2(
      selectedPhase,
      selectedPersona,
      testUserPreferences,
      testMeluneConfig,
      usedInsights
    );

    setLastResult(result);
    
    if (result.id && !usedInsights.includes(result.id)) {
      setUsedInsights([...usedInsights, result.id]);
    }
  };

  const resetUsedInsights = () => {
    setUsedInsights([]);
    Alert.alert('Reset', 'Liste des insights utilisés remise à zéro');
  };

  const getStats = () => {
    return getInsightStats(selectedPhase, selectedPersona);
  };

  const stats = getStats();

  const getPersonaEmoji = (persona) => {
    const emojis = {
      emma: '🌸',
      laure: '💪',
      sylvie: '🦋',
      christine: '🔮',
      clara: '🧠'
    };
    return emojis[persona] || '👤';
  };

  const getPhaseEmoji = (phase) => {
    const emojis = {
      menstrual: '🌑',
      follicular: '🌱',
      ovulatory: '☀️',
      luteal: '🌙'
    };
    return emojis[phase] || '📅';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧪 Insights V2 Debug</Text>
      
      {/* Sélecteurs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sélection Persona</Text>
        <View style={styles.buttonRow}>
          {personas.map(persona => (
            <TouchableOpacity
              key={persona}
              style={[
                styles.selectorButton,
                selectedPersona === persona && styles.selectedButton
              ]}
              onPress={() => setSelectedPersona(persona)}
            >
              <Text style={[
                styles.selectorText,
                selectedPersona === persona && styles.selectedText
              ]}>
                {getPersonaEmoji(persona)} {persona}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sélection Phase</Text>
        <View style={styles.buttonRow}>
          {phases.map(phase => (
            <TouchableOpacity
              key={phase}
              style={[
                styles.selectorButton,
                selectedPhase === phase && styles.selectedButton
              ]}
              onPress={() => setSelectedPhase(phase)}
            >
              <Text style={[
                styles.selectorText,
                selectedPhase === phase && styles.selectedText
              ]}>
                {getPhaseEmoji(phase)} {phase}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Statistiques</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.personaTargeted}</Text>
            <Text style={styles.statLabel}>Ciblés</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.hasVariants}</Text>
            <Text style={styles.statLabel}>Variants</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.enriched}</Text>
            <Text style={styles.statLabel}>Enrichis</Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.testButton} onPress={testInsight}>
          <Text style={styles.testButtonText}>🎯 Tester Insight</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.resetButton} onPress={resetUsedInsights}>
          <Text style={styles.resetButtonText}>🔄 Reset ({usedInsights.length} utilisés)</Text>
        </TouchableOpacity>
      </View>

      {/* Résultat */}
      {lastResult && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Dernier Résultat</Text>
          
          <View style={styles.resultCard}>
            <Text style={styles.resultContent}>{lastResult.content}</Text>
            
            <View style={styles.resultMeta}>
              <Text style={styles.metaText}>ID: {lastResult.id || 'null'}</Text>
              <Text style={styles.metaText}>Score: {lastResult.relevanceScore || 'N/A'}</Text>
              <Text style={styles.metaText}>Source: {lastResult.source}</Text>
              <Text style={styles.metaText}>
                Persona variant: {lastResult.debug?.hasPersonaVariant ? '✅' : '❌'}
              </Text>
              {lastResult.resetNeeded && (
                <Text style={styles.resetIndicator}>🔄 Reset effectué</Text>
              )}
            </View>

            {lastResult.debug && (
              <View style={styles.debugInfo}>
                <Text style={styles.debugTitle}>Debug Info:</Text>
                <Text style={styles.debugText}>
                  Disponibles: {lastResult.debug.unusedCount}/{lastResult.debug.totalAvailable}
                </Text>
                <Text style={styles.debugText}>
                  Vus: {lastResult.debug.seenPercentage}%
                </Text>
                <Text style={styles.debugText}>
                  Target: [{lastResult.debug.targetPersonas?.join(', ') || 'none'}]
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Légende */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📖 Légende</Text>
        <Text style={styles.legendText}>
          • <Text style={styles.bold}>Score de pertinence</Text>: Persona match (+100) + Préférences (+10) + Qualité (+5) + Enrichi (+20)
        </Text>
        <Text style={styles.legendText}>
          • <Text style={styles.bold}>Persona variant ✅</Text>: L'insight a un contenu spécifique pour ce persona
        </Text>
        <Text style={styles.legendText}>
          • <Text style={styles.bold}>Reset 🔄</Text>: Déclenché à 80% d'insights vus
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: theme.colors.background.secondary,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectorButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedButton: {
    backgroundColor: theme.colors.primary.main,
  },
  selectorText: {
    color: theme.colors.text.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedText: {
    color: 'white',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary.main,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginTop: 4,
  },
  testButton: {
    backgroundColor: theme.colors.primary.main,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  testButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: theme.colors.background.tertiary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: theme.colors.text.secondary,
    fontSize: 14,
  },
  resultCard: {
    backgroundColor: theme.colors.background.tertiary,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary.main,
  },
  resultContent: {
    fontSize: 16,
    color: theme.colors.text.primary,
    marginBottom: 12,
    lineHeight: 24,
  },
  resultMeta: {
    marginBottom: 12,
  },
  metaText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: 2,
  },
  resetIndicator: {
    fontSize: 12,
    color: theme.colors.primary.main,
    fontWeight: 'bold',
  },
  debugInfo: {
    backgroundColor: theme.colors.background.primary,
    padding: 12,
    borderRadius: 8,
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  debugText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: 2,
  },
  legendText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: 4,
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
});

export default InsightsV2Debug; 