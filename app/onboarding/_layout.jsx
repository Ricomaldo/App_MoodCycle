import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="100-promesse" />
      <Stack.Screen name="200-rencontre" />
      <Stack.Screen name="300-confiance" />
      <Stack.Screen name="400-cycle" />
      <Stack.Screen name="500-preferences" />
      <Stack.Screen name="600-avatar" />
      <Stack.Screen name="700-cadeau" />
    </Stack>
  );
} 