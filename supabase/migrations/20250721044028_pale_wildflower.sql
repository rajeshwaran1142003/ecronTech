/*
  # Update demo applications table

  1. Changes
    - Add preferred_date column to demo_applications table
    - Update existing data structure to support date selection

  2. Security
    - Maintain existing RLS policies
    - No changes to security model
*/

-- Add preferred_date column to demo_applications table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'demo_applications' AND column_name = 'preferred_date'
  ) THEN
    ALTER TABLE demo_applications ADD COLUMN preferred_date text;
  END IF;
END $$;