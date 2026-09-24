# Vehloom Admin Dashboard & Response Management System

## 📋 Setup Instructions

This guide will help you set up the complete response management system for your Vehloom app (Help Center queries, Problem Reports, and Admin Dashboard).

---

## 1️⃣ Supabase Database Setup

### Step 1: Execute SQL Migration

1. Go to your **Supabase Dashboard** → **SQL Editor**
2. Create a new query and copy the entire content from `supabase-setup.sql`
3. Run the SQL script to create the necessary tables:
   - `help_center_queries` - Stores help center form submissions
   - `problem_reports` - Stores problem/bug reports
   - Associated indexes for performance

### Step 2: Create Storage Bucket (Optional)

For file uploads in problem reports:

1. Go to **Supabase Dashboard** → **Storage**
2. Create a new bucket named `problem-reports`
3. Set it to **Public** so attachments can be accessed

---

## 2️⃣ Environment Variables

Make sure your `.env` file includes:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Dashboard Password
VITE_ADMIN_PASSWORD=your_secure_admin_password
```

---

## 3️⃣ Application Features

### 📝 Help Center (`/help-center`)

**Features:**
- FAQs with expandable answers
- Search functionality
- Contact form that captures:
  - Name, Email, Subject, Message
  - Automatically saves to Supabase
  - Status tracking (new, in-progress, resolved, closed)

**Form Data Saved:**
- `name` - User's name
- `email` - User's email
- `subject` - Query subject
- `message` - Query message
- `status` - Default: "new"
- `priority` - Default: "medium"
- `created_at` - Timestamp

### 🐛 Report Problem (`/report-problem`)

**Features:**
- Category selection (Bug, Feature, Performance, Crash, Other)
- Severity level selection (Low, Medium, High, Critical)
- File upload for screenshots/attachments
- Steps to reproduce field

**Form Data Saved:**
- `name` - User's name
- `email` - User's email
- `category` - Issue category
- `severity` - Issue severity
- `title` - Problem title
- `description` - Detailed description
- `steps_to_reproduce` - Steps to reproduce
- `file_url` - Uploaded file URL (if provided)
- `status` - Default: "new"
- `created_at` - Timestamp

### 📊 Admin Dashboard (`/admin`)

**Access:**
- Protected by admin password
- URL: `http://yoursite.com/admin`
- Default password: "vehloom2026" (change in .env)

**Features:**

1. **Dashboard Overview**
   - Total waitlist count
   - Total help queries count
   - New queries count
   - Problem reports count

2. **Tabs:**

   **a) Waitlist Tab**
   - View all waitlist signups
   - Email address and join date
   - Sort by date

   **b) Help Queries Tab**
   - View all help center submissions
   - Filter by status: New, In Progress, Resolved, Closed
   - Update status with dropdown
   - Delete queries
   - See sender information and timestamps

   **c) Problem Reports Tab**
   - View all bug/problem reports
   - Color-coded severity badges (Critical, High, Medium, Low)
   - Filter by status: New, In Progress, Fixed, Won't Fix, Duplicate
   - Update status with dropdown
   - View attached files (if any)
   - Delete reports
   - See category tags

---

## 4️⃣ Database Schema

### help_center_queries Table

```sql
- id: UUID (Primary Key)
- name: VARCHAR(255) - User's name
- email: VARCHAR(255) - User's email
- subject: VARCHAR(500) - Query subject
- message: TEXT - Query message
- status: VARCHAR(50) - new | in-progress | resolved | closed
- priority: VARCHAR(50) - low | medium | high
- created_at: TIMESTAMP - Auto-generated
- updated_at: TIMESTAMP - Auto-generated
- admin_notes: TEXT - Private notes for admins
- response_sent: BOOLEAN - Track if response was sent
```

### problem_reports Table

```sql
- id: UUID (Primary Key)
- name: VARCHAR(255) - User's name
- email: VARCHAR(255) - User's email
- category: VARCHAR(100) - bug | feature | performance | crash | other
- severity: VARCHAR(50) - low | medium | high | critical
- title: VARCHAR(500) - Problem title
- description: TEXT - Detailed description
- steps_to_reproduce: TEXT - Steps to reproduce issue
- status: VARCHAR(50) - new | in-progress | fixed | wontfix | duplicate
- created_at: TIMESTAMP - Auto-generated
- updated_at: TIMESTAMP - Auto-generated
- admin_notes: TEXT - Private notes for admins
- file_url: VARCHAR(500) - URL to uploaded file
- user_resolution_status: VARCHAR(50) - pending | notified | resolved
```

---

## 5️⃣ Key Features & Workflow

### User Workflow

1. **User submits help query** → Stored in database with status "new"
2. **User reports problem** → Stored in database with status "new", can upload file
3. **Admin reviews** → Admin logs in to `/admin` dashboard
4. **Admin updates status** → Status changes in real-time
5. **Auto notifications** → (Optional: Can add email notifications via Supabase functions)

### Admin Workflow

1. **Login** to `/admin` with password
2. **View dashboard stats** - Get overview of all submissions
3. **Switch tabs** - Toggle between Waitlist, Help Queries, and Problem Reports
4. **Update status** - Change status of queries/reports
5. **Delete entries** - Remove irrelevant submissions
6. **Sign out** - Secure logout

---

## 6️⃣ Type Definitions

The system uses TypeScript types for type safety:

```typescript
// File: src/types/responses.ts

interface HelpCenterQuery {
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

interface ProblemReport {
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
```

---

## 7️⃣ API Endpoints (via Supabase)

All data is managed through Supabase REST API. These are handled automatically:

**Help Center Queries:**
- `GET /rest/v1/help_center_queries` - Fetch all queries
- `POST /rest/v1/help_center_queries` - Create new query
- `PATCH /rest/v1/help_center_queries` - Update query
- `DELETE /rest/v1/help_center_queries` - Delete query

**Problem Reports:**
- `GET /rest/v1/problem_reports` - Fetch all reports
- `POST /rest/v1/problem_reports` - Create new report
- `PATCH /rest/v1/problem_reports` - Update report
- `DELETE /rest/v1/problem_reports` - Delete report

---

## 8️⃣ Security & Best Practices

### 🔒 Security Measures

1. **RLS Policies** - Row Level Security configured in Supabase
2. **Admin Authentication** - Password-protected dashboard
3. **File Upload Restrictions** - Allowed formats: PNG, JPG, PDF, TXT, LOG
4. **Data Validation** - All fields validated on client side

### ✅ Best Practices

1. **Backup regularly** - Export Supabase data periodically
2. **Monitor submissions** - Check admin dashboard daily
3. **Respond promptly** - Update status to keep users informed
4. **Archive old data** - Delete resolved/closed queries after 90 days
5. **Change admin password** - Update VITE_ADMIN_PASSWORD regularly

---

## 9️⃣ Testing Checklist

Before deploying to production:

- [ ] Database tables created successfully
- [ ] Environment variables configured
- [ ] Help Center form submits data to Supabase
- [ ] Problem Report form submits data to Supabase
- [ ] File uploads work correctly (if enabled)
- [ ] Admin login works with correct password
- [ ] Dashboard displays all data correctly
- [ ] Status updates work in real-time
- [ ] Delete functionality works
- [ ] No console errors in browser

---

## 🔟 Troubleshooting

### Issue: "Failed to fetch data in admin"
**Solution:** Check Supabase credentials in .env file

### Issue: Forms not submitting
**Solution:** 
- Check browser console for errors
- Verify Supabase RLS policies are correct
- Ensure internet connection is active

### Issue: Admin password not working
**Solution:** 
- Verify VITE_ADMIN_PASSWORD in .env
- Rebuild the app after changing env variables
- Clear browser cache

### Issue: File upload failing
**Solution:**
- Create `problem-reports` bucket in Supabase Storage
- Set bucket to Public
- Check file size (should be < 10MB)

---

## 📞 Support

For issues or questions:
1. Check the FAQ in Help Center
2. Report problems at `/report-problem`
3. Contact: support@vehloom.com

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [TanStack Router Documentation](https://tanstack.com/router)
- [React Documentation](https://react.dev)

---

**Last Updated:** September 2026
**Version:** 1.0
