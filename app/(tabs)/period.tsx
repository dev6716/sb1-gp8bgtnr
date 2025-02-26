import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { theme } from '../constants/theme';
import { supabase } from '../utils/supabase';
import type { Database } from '../types/supabase';

type PeriodLog = Database['public']['Tables']['period_logs']['Row'];

export default function PeriodScreen() {
  const [logs, setLogs] = useState<PeriodLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('period_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogPeriod() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('period_logs')
        .insert({
          user_id: user.id,
          date: selectedDate,
          flow_level: 3,
          mood: 'normal',
          symptoms: [],
        });

      if (error) throw error;
      loadLogs();
    } catch (error: any) {
      setError(error.message);
    }
  }

  const markedDates = logs.reduce((acc, log) => {
    acc[log.date] = {
      marked: true,
      dotColor: theme.colors.primary,
    };
    return acc;
  }, {} as any);

  const symptoms = ['Cramps', 'Headache', 'Fatigue', 'Bloating', 'Mood Swings'];
  const moods = ['😊 Happy', '😐 Normal', '😢 Sad', '😠 Irritated', '😴 Tired'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Period Tracker</Text>
        <Text style={styles.subtitle}>Track your cycle and symptoms</Text>
      </View>

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: theme.colors.white,
          calendarBackground: theme.colors.white,
          textSectionTitleColor: theme.colors.text,
          selectedDayBackgroundColor: theme.colors.primary,
          selectedDayTextColor: theme.colors.white,
          todayTextColor: theme.colors.primary,
          dayTextColor: theme.colors.text,
          textDisabledColor: theme.colors.textLight,
          dotColor: theme.colors.primary,
          monthTextColor: theme.colors.text,
          indicatorColor: theme.colors.primary,
        }}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            marked: markedDates[selectedDate]?.marked,
            dotColor: theme.colors.primary,
          },
        }}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Symptoms</Text>
        <View style={styles.symptomsGrid}>
          {symptoms.map((symptom) => (
            <TouchableOpacity
              key={symptom}
              style={styles.symptomButton}
            >
              <Text style={styles.symptomText}>{symptom}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mood</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.moodList}
        >
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood}
              style={styles.moodButton}
            >
              <Text style={styles.moodText}>{mood}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.logButton}
        onPress={handleLogPeriod}
      >
        <Text style={styles.logButtonText}>Log Period</Text>
      </TouchableOpacity>
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
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    marginTop: theme.spacing.xs,
  },
  calendar: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  symptomButton: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    minWidth: '45%',
  },
  symptomText: {
    ...theme.typography.body,
    color: theme.colors.text,
    textAlign: 'center',
  },
  moodList: {
    flexDirection: 'row',
  },
  moodButton: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
  },
  moodText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  logButton: {
    backgroundColor: theme.colors.primary,
    margin: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
  },
  logButtonText: {
    ...theme.typography.body,
    color: theme.colors.white,
    fontWeight: '600',
  },
  error: {
    ...theme.typography.body,
    color: theme.colors.error,
    textAlign: 'center',
    margin: theme.spacing.lg,
  },
});