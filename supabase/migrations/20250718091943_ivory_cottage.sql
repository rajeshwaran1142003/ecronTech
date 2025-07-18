/*
  # Create demo applications table

  1. New Tables
    - `demo_applications`
      - `id` (uuid, primary key)
      - `name` (text)
      - `phone` (text)
      - `email` (text)
      - `course_for_demo` (text)
      - `available_time` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `demo_applications` table
    - Add policy for public to insert demo applications
    - Add policy for admin users to read all demo applications
*/

CREATE TABLE IF NOT EXISTS demo_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  course_for_demo text NOT NULL,
  available_time text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE demo_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit demo applications"
  ON demo_applications
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin users can read all demo applications"
  ON demo_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.email = 'admin@ecrontechnologies.com'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS demo_applications_created_at_idx ON demo_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS demo_applications_email_idx ON demo_applications (email);
CREATE INDEX IF NOT EXISTS demo_applications_course_idx ON demo_applications (course_for_demo);