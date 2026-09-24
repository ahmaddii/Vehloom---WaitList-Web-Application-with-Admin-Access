// Type definitions for Vehloom responses

export interface HelpCenterQuery {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: 'new' | 'in-progress' | 'resolved' | 'closed';
  priority?: 'low' | 'medium' | 'high';
  created_at?: string;
  updated_at?: string;
  admin_notes?: string;
  response_sent?: boolean;
}

export interface ProblemReport {
  id?: string;
  name: string;
  email: string;
  category: 'bug' | 'feature' | 'performance' | 'crash' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  steps_to_reproduce?: string;
  status?: 'new' | 'in-progress' | 'fixed' | 'wontfix' | 'duplicate';
  created_at?: string;
  updated_at?: string;
  admin_notes?: string;
  file_url?: string;
  user_resolution_status?: 'pending' | 'notified' | 'resolved';
}

export interface DashboardStats {
  category: string;
  total: number;
  new_count: number;
  in_progress_count: number;
  resolved_count: number;
}
