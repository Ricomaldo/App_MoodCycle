import React, { ReactNode } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useTheme } from '@core/ui/theme';

interface ScreenContainerProps {
  children: ReactNode;
  padding?: number;
  withScrollView?: boolean;
  backgroundColor?: string;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  padding = 16,
  withScrollView = false,
  backgroundColor,
}) => {
  const theme = useTheme();
  const bgColor = backgroundColor || theme.colors.neutral[100];

  const Content = () => <View style={[styles.content, { padding }]}>{children}</View>;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar backgroundColor={bgColor} barStyle="dark-content" />
      {withScrollView ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Content />
        </ScrollView>
      ) : (
        <Content />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default ScreenContainer;
