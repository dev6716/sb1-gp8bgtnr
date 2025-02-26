import { Tabs } from 'expo-router';
import { Chrome as Home, Music, BookOpen, Calendar, User } from 'lucide-react-native';
import { theme } from '../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textLight,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="meditation"
        options={{
          title: 'Meditate',
          tabBarIcon: ({ color, size }) => (
            <Music size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="blogs"
        options={{
          title: 'Blogs',
          tabBarIcon: ({ color, size }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="period"
        options={{
          title: 'Period',
          tabBarIcon: ({ color, size }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}