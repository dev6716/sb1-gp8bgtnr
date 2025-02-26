import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Play, Pause } from 'lucide-react-native';
import { Audio } from 'expo-av';
import { theme } from '../constants/theme';
import { supabase } from '../utils/supabase';
import type { Database } from '../types/supabase';

type MeditationTrack = Database['public']['Tables']['meditation_tracks']['Row'];

export default function MeditationScreen() {
  const [tracks, setTracks] = useState<MeditationTrack[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    loadTracks();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  async function loadTracks() {
    try {
      const { data, error } = await supabase
        .from('meditation_tracks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTracks(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handlePlayPause(track: MeditationTrack) {
    try {
      if (sound && currentTrackId === track.id) {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } else {
        if (sound) {
          await sound.unloadAsync();
        }
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: track.audio_url },
          { shouldPlay: true }
        );
        setSound(newSound);
        setCurrentTrackId(track.id);
        setIsPlaying(true);

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
            setCurrentTrackId(null);
          }
        });
      }
    } catch (error: any) {
      setError(error.message);
    }
  }

  const categories = ['All', 'Sleep', 'Focus', 'Relax', 'Anxiety'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meditation</Text>
        <Text style={styles.subtitle}>Find peace in every moment</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      {loading ? (
        <Text style={styles.loading}>Loading meditations...</Text>
      ) : (
        <View style={styles.trackList}>
          {tracks.map((track) => (
            <TouchableOpacity
              key={track.id}
              style={styles.trackCard}
              onPress={() => handlePlayPause(track)}
            >
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=300' }}
                style={styles.trackImage}
              />
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{track.title}</Text>
                <Text style={styles.trackDuration}>{track.duration} min</Text>
              </View>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => handlePlayPause(track)}
              >
                {isPlaying && currentTrackId === track.id ? (
                  <Pause color={theme.colors.primary} size={24} />
                ) : (
                  <Play color={theme.colors.primary} size={24} />
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
  categories: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  categoryButton: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
  },
  categoryText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  trackList: {
    padding: theme.spacing.lg,
  },
  trackCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  trackImage: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
  },
  trackInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  trackTitle: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  trackDuration: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
    marginTop: theme.spacing.xs,
  },
  playButton: {
    padding: theme.spacing.sm,
  },
  error: {
    ...theme.typography.body,
    color: theme.colors.error,
    textAlign: 'center',
    margin: theme.spacing.lg,
  },
  loading: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    textAlign: 'center',
    margin: theme.spacing.lg,
  },
});