/*
  # Create course applications table

  1. New Tables
    - `course_applications`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `course_name` (text)
      - `experience_level` (text)
      - `interest_message` (text)
      - `user_id` (uuid, foreign key to auth.users)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `course_applications` table
    - Add policy for users to read their own applications
    - Add policy for admin users to read all applications
    - Add policy for anyone to insert applications
*/

CREATE TABLE IF NOT EXISTS course_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  course_name text NOT NULL,
  experience_level text NOT NULL,
  interest_message text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE course_applications ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own applications
CREATE POLICY "Users can read own applications"
  ON course_applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for admin users to read all applications
CREATE POLICY "Admin users can read all applications"
  ON course_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'admin@ecrontechnologies.com'
    )
  );

-- Policy for anyone to submit applications
CREATE POLICY "Anyone can submit applications"
  ON course_applications
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX course_applications_email_idx ON course_applications(email);
CREATE INDEX course_applications_course_name_idx ON course_applications(course_name);
CREATE INDEX course_applications_created_at_idx ON course_applications(created_at DESC);