export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      period_logs: {
        Row: {
          id: string
          user_id: string
          date: string
          symptoms: string[]
          mood: string
          flow_level: number
          notes: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          symptoms?: string[]
          mood?: string
          flow_level?: number
          notes?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          symptoms?: string[]
          mood?: string
          flow_level?: number
          notes?: string
          created_at?: string
        }
      }
      meditation_tracks: {
        Row: {
          id: string
          title: string
          description: string
          duration: number
          category: string
          audio_url: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          duration: number
          category: string
          audio_url: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          duration?: number
          category?: string
          audio_url?: string
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          category: string
          image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          category: string
          image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          category?: string
          image_url?: string
          created_at?: string
        }
      }
    }
  }
}