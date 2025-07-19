/*
  # Create newsletter subscriptions table

  1. New Tables
    - `newsletter_subscriptions`
      - `email` (text, primary key) - subscriber email address

  2. Security
    - Enable RLS on `newsletter_subscriptions` table
    - Add policy for public to insert email subscriptions
    - Add policy for authenticated users to read subscriptions
*/

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  email text PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read subscriptions"
  ON newsletter_subscriptions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS newsletter_subscriptions_created_at_idx 
  ON newsletter_subscriptions (created_at DESC);