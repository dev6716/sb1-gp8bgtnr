import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { theme } from '../constants/theme';
import { supabase } from '../utils/supabase';
import type { Database } from '../types/supabase';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export default function BlogsScreen() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const categories = ['All', 'Mindfulness', 'Health', 'Fitness', 'Nutrition'];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wellness Blog</Text>
        <Text style={styles.subtitle}>Insights for mind and body</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      {loading ? (
        <Text style={styles.loading}>Loading articles...</Text>
      ) : (
        <View style={styles.blogList}>
          {filteredPosts.map((post) => (
            <TouchableOpacity key={post.id} style={styles.blogCard}>
              <Image
                source={{ uri: post.image_url }}
                style={styles.blogImage}
              />
              <View style={styles.blogContent}>
                <Text style={styles.blogCategory}>{post.category}</Text>
                <Text style={styles.blogTitle}>{post.title}</Text>
                <Text style={styles.blogExcerpt}>
                  {post.content.substring(0, 100)}...
                </Text>
              </View>
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
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  categoryTextActive: {
    color: theme.colors.white,
  },
  blogList: {
    padding: theme.spacing.lg,
  },
  blogCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    overflow: 'hidden',
  },
  blogImage: {
    width: '100%',
    height: 200,
  },
  blogContent: {
    padding: theme.spacing.lg,
  },
  blogCategory: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.xs,
  },
  blogTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  blogExcerpt: {
    ...theme.typography.body,
    color: theme.colors.textLight,
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