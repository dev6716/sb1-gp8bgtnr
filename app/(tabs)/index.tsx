import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { theme } from '../constants/theme';
import { router } from 'expo-router';

export default function HomeScreen() {
  const dailyAffirmation = "You are strong, capable, and worthy of all good things.";
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning,</Text>
        <Text style={styles.name}>Sarah</Text>
      </View>

      <View style={styles.affirmationCard}>
        <Text style={styles.affirmationTitle}>Daily Affirmation</Text>
        <Text style={styles.affirmationText}>{dailyAffirmation}</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/meditation')}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=300' }}
            style={styles.actionImage}
          />
          <Text style={styles.actionTitle}>Meditate</Text>
          <Text style={styles.actionSubtitle}>5 min breathing</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/period')}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300' }}
            style={styles.actionImage}
          />
          <Text style={styles.actionTitle}>Track Period</Text>
          <Text style={styles.actionSubtitle}>Log today</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.recommendationCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300' }}
              style={styles.recommendationImage}
            />
            <Text style={styles.recommendationTitle}>Morning Yoga</Text>
            <Text style={styles.recommendationDuration}>15 min</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.recommendationCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=300' }}
              style={styles.recommendationImage}
            />
            <Text style={styles.recommendationTitle}>Sleep Meditation</Text>
            <Text style={styles.recommendationDuration}>10 min</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    paddingTop: 60,
  },
  greeting: {
    ...theme.typography.body,
    color: theme.colors.textLight,
  },
  name: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  affirmationCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
  },
  affirmationTitle: {
    ...theme.typography.caption,
    color: theme.colors.white,
    marginBottom: theme.spacing.sm,
  },
  affirmationText: {
    ...theme.typography.h3,
    color: theme.colors.white,
  },
  quickActions: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  actionCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  actionImage: {
    width: '100%',
    height: 100,
  },
  actionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    padding: theme.spacing.sm,
  },
  actionSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
    paddingHorizontal: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  recommendationCard: {
    width: 200,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
    overflow: 'hidden',
  },
  recommendationImage: {
    width: '100%',
    height: 120,
  },
  recommendationTitle: {
    ...theme.typography.body,
    color: theme.colors.text,
    padding: theme.spacing.sm,
  },
  recommendationDuration: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
    paddingHorizontal: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
});