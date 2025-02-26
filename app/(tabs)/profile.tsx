import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Settings, Bell, Heart, Shield, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';
import { theme } from '../constants/theme';
import { supabase } from '../utils/supabase';

export default function ProfileScreen() {
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace('/sign-in');
    } catch (error: any) {
      console.error('Error signing out:', error.message);
    }
  };

  const menuItems = [
    {
      icon: Settings,
      title: 'Account Settings',
      subtitle: 'Manage your account details',
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Configure your notifications',
    },
    {
      icon: Heart,
      title: 'Wellness Goals',
      subtitle: 'Set and track your goals',
    },
    {
      icon: Shield,
      title: 'Privacy',
      subtitle: 'Manage your privacy settings',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Sarah Johnson</Text>
        <Text style={styles.email}>sarah.johnson@example.com</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>28</Text>
          <Text style={styles.statLabel}>Meditations</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Articles</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>6</Text>
          <Text style={styles.statLabel}>Cycles</Text>
        </View>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <item.icon size={24} color={theme.colors.primary} />
            <View style={styles.menuItemText}>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
              <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <LogOut size={24} color={theme.colors.error} />
        <Text style={styles.signOutText}>Sign Out</Text>
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
    alignItems: 'center',
    padding: theme.spacing.xl,
    paddingTop: 60,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: theme.spacing.md,
  },
  name: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  email: {
    ...theme.typography.body,
    color: theme.colors.textLight,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...theme.typography.h2,
    color: theme.colors.primary,
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
  },
  menu: {
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
  },
  menuItemText: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  menuItemTitle: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  menuItemSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.xl,
    marginHorizontal: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
  },
  signOutText: {
    ...theme.typography.body,
    color: theme.colors.error,
    marginLeft: theme.spacing.sm,
    fontWeight: '600',
  },
});