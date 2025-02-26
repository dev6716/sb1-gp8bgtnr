/*
  # Initial Schema Setup for Female Wellness App

  1. Tables
    - period_logs: Store menstrual cycle data
    - meditation_tracks: Store meditation audio content
    - blog_posts: Store wellness blog content

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create period_logs table
CREATE TABLE IF NOT EXISTS period_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  date date NOT NULL,
  symptoms text[] DEFAULT '{}',
  mood text,
  flow_level integer CHECK (flow_level BETWEEN 1 AND 5),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create meditation_tracks table
CREATE TABLE IF NOT EXISTS meditation_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  duration integer NOT NULL,
  category text NOT NULL,
  audio_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE period_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE meditation_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own period logs"
  ON period_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own period logs"
  ON period_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own period logs"
  ON period_logs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view all meditation tracks"
  ON meditation_tracks
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view all blog posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);