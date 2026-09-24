-- Supabase SQL Migration Script for Vehloom User Responses
-- Execute this SQL in your Supabase SQL Editor

-- 1. Create help_center_queries table
CREATE TABLE IF NOT EXISTS help_center_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new', -- new, in-progress, resolved, closed
  priority VARCHAR(50) DEFAULT 'medium', -- low, medium, high
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  admin_notes TEXT,
  response_sent BOOLEAN DEFAULT FALSE
);

-- 2. Create problem_reports table
CREATE TABLE IF NOT EXISTS problem_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL, -- bug, feature, performance, crash, other
  severity VARCHAR(50) NOT NULL, -- low, medium, high, critical
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  steps_to_reproduce TEXT,
  status VARCHAR(50) DEFAULT 'new', -- new, in-progress, fixed, wontfix, duplicate
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  admin_notes TEXT,
  file_url VARCHAR(500),
  user_resolution_status VARCHAR(50) DEFAULT 'pending' -- pending, notified, resolved
);

-- 3. Create indexes for better query performance
CREATE INDEX idx_help_queries_email ON help_center_queries(email);
CREATE INDEX idx_help_queries_status ON help_center_queries(status);
CREATE INDEX idx_help_queries_created_at ON help_center_queries(created_at DESC);

CREATE INDEX idx_problem_reports_email ON problem_reports(email);
CREATE INDEX idx_problem_reports_status ON problem_reports(status);
CREATE INDEX idx_problem_reports_severity ON problem_reports(severity);
CREATE INDEX idx_problem_reports_category ON problem_reports(category);
CREATE INDEX idx_problem_reports_created_at ON problem_reports(created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE help_center_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE problem_reports ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies for admin access
-- Allow admins to read all queries and reports
CREATE POLICY "Admin can read all help queries" ON help_center_queries
  FOR SELECT USING (true); -- You can make this more restrictive with auth checks

CREATE POLICY "Admin can update help queries" ON help_center_queries
  FOR UPDATE USING (true);

CREATE POLICY "Admin can read all problem reports" ON problem_reports
  FOR SELECT USING (true);

CREATE POLICY "Admin can update problem reports" ON problem_reports
  FOR UPDATE USING (true);

-- 6. Allow public insert (for form submissions)
CREATE POLICY "Anyone can submit help query" ON help_center_queries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can submit problem report" ON problem_reports
  FOR INSERT WITH CHECK (true);

-- 7. Create a view for admin dashboard statistics
CREATE VIEW admin_dashboard_stats AS
SELECT
  'help_queries' as category,
  COUNT(*) as total,
  COUNT(CASE WHEN status = 'new' THEN 1 END) as new_count,
  COUNT(CASE WHEN status = 'in-progress' THEN 1 END) as in_progress_count,
  COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved_count
FROM help_center_queries
UNION ALL
SELECT
  'problem_reports' as category,
  COUNT(*) as total,
  COUNT(CASE WHEN status = 'new' THEN 1 END) as new_count,
  COUNT(CASE WHEN status = 'in-progress' THEN 1 END) as in_progress_count,
  COUNT(CASE WHEN status = 'fixed' THEN 1 END) as resolved_count
FROM problem_reports;
