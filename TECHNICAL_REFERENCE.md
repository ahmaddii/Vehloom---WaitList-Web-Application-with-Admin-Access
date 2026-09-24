# Vehloom Admin Dashboard - Technical Reference

## 📁 Project Structure

```
src/
├── routes/
│   ├── admin.tsx                    # Admin Dashboard (protected)
│   ├── help-center.tsx              # Help Center with queries form
│   ├── report-problem.tsx           # Problem reporting form
│   ├── terms.tsx                    # Terms & Conditions
│   ├── privacy.tsx                  # Privacy Policy
│   └── index.tsx                    # Homepage
├── types/
│   └── responses.ts                 # Type definitions
├── lib/
│   └── supabase.ts                  # Supabase client
└── components/
    └── vehloom/
        ├── Footer.tsx               # Footer with links
        ├── Nav.tsx                  # Navigation
        └── ... (other components)

Database/
├── supabase-setup.sql               # Database migration
├── ADMIN_SETUP_GUIDE.md            # Setup instructions
├── TECHNICAL_REFERENCE.md          # This file
└── setup.sh                        # Quick setup script
```

---

## 🗄️ Database Schema Details

### help_center_queries Table

```sql
CREATE TABLE help_center_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',              -- new, in-progress, resolved, closed
  priority VARCHAR(50) DEFAULT 'medium',         -- low, medium, high
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  admin_notes TEXT,
  response_sent BOOLEAN DEFAULT FALSE
);

-- Indexes
CREATE INDEX idx_help_queries_email ON help_center_queries(email);
CREATE INDEX idx_help_queries_status ON help_center_queries(status);
CREATE INDEX idx_help_queries_created_at ON help_center_queries(created_at DESC);
```

### problem_reports Table

```sql
CREATE TABLE problem_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,                -- bug, feature, performance, crash, other
  severity VARCHAR(50) NOT NULL,                 -- low, medium, high, critical
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  steps_to_reproduce TEXT,
  status VARCHAR(50) DEFAULT 'new',              -- new, in-progress, fixed, wontfix, duplicate
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  admin_notes TEXT,
  file_url VARCHAR(500),
  user_resolution_status VARCHAR(50) DEFAULT 'pending'  -- pending, notified, resolved
);

-- Indexes
CREATE INDEX idx_problem_reports_email ON problem_reports(email);
CREATE INDEX idx_problem_reports_status ON problem_reports(status);
CREATE INDEX idx_problem_reports_severity ON problem_reports(severity);
CREATE INDEX idx_problem_reports_category ON problem_reports(category);
CREATE INDEX idx_problem_reports_created_at ON problem_reports(created_at DESC);
```

---

## 🔌 API Integration

### Submitting Help Center Query

```typescript
const submitHelpQuery = async (data: HelpCenterQuery) => {
  const { error } = await supabase
    .from("help_center_queries")
    .insert([data]);
  
  if (error) throw error;
  return true;
};
```

### Submitting Problem Report

```typescript
const submitProblemReport = async (data: ProblemReport) => {
  const { error } = await supabase
    .from("problem_reports")
    .insert([data]);
  
  if (error) throw error;
  return true;
};
```

### Fetching All Queries

```typescript
const fetchQueries = async () => {
  const { data, error } = await supabase
    .from("help_center_queries")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) throw error;
  return data;
};
```

### Updating Query Status

```typescript
const updateQueryStatus = async (id: string, status: string) => {
  const { error } = await supabase
    .from("help_center_queries")
    .update({ status })
    .eq("id", id);
  
  if (error) throw error;
  return true;
};
```

### Uploading File

```typescript
const uploadFile = async (file: File) => {
  const fileName = `reports/${Date.now()}_${file.name}`;
  
  const { error, data } = await supabase.storage
    .from("problem-reports")
    .upload(fileName, file);
  
  if (error) throw error;
  
  const { data: publicUrl } = supabase.storage
    .from("problem-reports")
    .getPublicUrl(fileName);
  
  return publicUrl.publicUrl;
};
```

---

## 🎨 Component Architecture

### Help Center (`src/routes/help-center.tsx`)

```
HelpCenter
├── Hero Section
├── Search Bar
├── FAQ Accordion
│   └── [FAQItem] × 6
└── Contact Section
    ├── Contact Info
    │   ├── Email
    │   ├── Live Chat
    │   └── Response Time
    └── Contact Form
        ├── Name Input
        ├── Email Input
        ├── Subject Input
        ├── Message Textarea
        ├── Error Message (conditional)
        ├── Success Message (conditional)
        └── Submit Button
```

### Report Problem (`src/routes/report-problem.tsx`)

```
ReportProblem
├── Hero Section
└── Form Section
    ├── Name Input
    ├── Email Input
    ├── Category Dropdown
    ├── Severity Dropdown
    ├── Title Input
    ├── Description Textarea
    ├── Steps Textarea
    ├── File Upload
    ├── Error Message (conditional)
    ├── Success Message (conditional)
    └── Submit Button
```

### Admin Dashboard (`src/routes/admin.tsx`)

```
AdminPage
├── Login Form (if !authenticated)
│   └── Password Input
└── Dashboard (if authenticated)
    ├── Header
    │   ├── Title & Description
    │   └── Sign Out Button
    ├── Stats Cards
    │   ├── Waitlist Count
    │   ├── Help Queries Count
    │   ├── New Queries Count
    │   └── Problem Reports Count
    ├── Tab Navigation
    │   ├── Waitlist Tab
    │   ├── Help Queries Tab
    │   └── Problem Reports Tab
    └── [TabContent]
        ├── WaitlistTab
        │   └── Email Table
        ├── HelpQueriesTab
        │   └── Query Cards
        │       ├── Subject & Status
        │       ├── Message
        │       ├── Status Dropdown
        │       └── Delete Button
        └── ProblemReportsTab
            └── Report Cards
                ├── Title & Severity & Status
                ├── Description & Steps
                ├── Status Dropdown
                └── Delete Button
```

---

## 🔐 Security & Authentication

### Admin Password

```typescript
const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || "vehloom2026";

// On form submit:
if (password === correctPassword) {
  setAuthenticated(true);
  fetchAllData();
} else {
  setError("Incorrect password");
}
```

### Row Level Security (RLS)

All tables have RLS enabled with policies:
- Anyone can submit (INSERT)
- Admins can read/update all (SELECT, UPDATE)
- Public read access for view purposes

---

## 📊 Database Queries Reference

### Get Statistics

```sql
SELECT
  'help_queries' as category,
  COUNT(*) as total,
  COUNT(CASE WHEN status = 'new' THEN 1 END) as new_count

FROM help_center_queries
UNION ALL
SELECT
  'problem_reports' as category,
  COUNT(*) as total,
  COUNT(CASE WHEN status = 'new' THEN 1 END) as new_count

FROM problem_reports;
```

### Get Critical Issues

```sql
SELECT * FROM problem_reports
WHERE severity = 'critical' AND status IN ('new', 'in-progress')
ORDER BY created_at DESC;
```

### Get New Help Queries

```sql
SELECT * FROM help_center_queries
WHERE status = 'new'
ORDER BY created_at DESC;
```

### Get Unresolved Reports by Category

```sql
SELECT 
  category,
  COUNT(*) as count
FROM problem_reports
WHERE status != 'fixed' AND status != 'wontfix'
GROUP BY category
ORDER BY count DESC;
```

---

## 🚀 Performance Optimization

### Indexes
- `idx_help_queries_email` - For searching by email
- `idx_help_queries_status` - For filtering by status
- `idx_help_queries_created_at` - For sorting by date
- `idx_problem_reports_severity` - For filtering by severity level
- `idx_problem_reports_category` - For filtering by category

### Pagination (Future Enhancement)

```typescript
const fetchQueriesWithPagination = async (page = 1, limit = 20) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("help_center_queries")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  return { data, error };
};
```

---

## 🐛 Error Handling

All forms include comprehensive error handling:

```typescript
try {
  // Validate input
  if (!formData.name || !formData.email || !formData.message) {
    setError("Please fill in all fields");
    return;
  }

  // Submit to database
  const { error: supabaseError } = await supabase
    .from("table_name")
    .insert([data]);

  if (supabaseError) {
    setError("Failed to submit. Please try again.");
    return;
  }

  // Success
  setSubmitted(true);
} catch (err) {
  setError("An unexpected error occurred.");
} finally {
  setLoading(false);
}
```

---

## 📱 Responsive Design

- **Mobile**: Single column layout
- **Tablet**: 2-column grid for forms
- **Desktop**: Full-width tables and cards

---

## 🌐 Environment Variables

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Admin Authentication
VITE_ADMIN_PASSWORD=your_secure_password_here
```

**⚠️ Never commit `.env` file to version control!**

---

## 📚 Available Type Definitions

Located in `src/types/responses.ts`:

```typescript
interface HelpCenterQuery { ... }
interface ProblemReport { ... }
interface DashboardStats { ... }
```

---

## 🔄 Data Flow

### Help Center Form Submission

```
User Input
   ↓
Form Validation
   ↓
Save to Supabase (help_center_queries)
   ↓
Show Success Message
   ↓
Display in Admin Dashboard
   ↓
Admin Updates Status
```

### Problem Report Submission

```
User Input
   ↓
Form Validation
   ↓
Upload File (if provided)
   ↓
Save to Supabase (problem_reports)
   ↓
Show Success Message
   ↓
Display in Admin Dashboard
   ↓
Admin Reviews & Updates Status
```

---

## 🧪 Testing

### Unit Test Example (Jest + Vitest)

```typescript
import { describe, it, expect } from "vitest";
import { supabase } from "@/lib/supabase";

describe("Help Center Queries", () => {
  it("should submit a help query", async () => {
    const data = {
      name: "Test User",
      email: "test@example.com",
      subject: "Test subject",
      message: "Test message",
    };

    const { error } = await supabase
      .from("help_center_queries")
      .insert([data]);

    expect(error).toBeNull();
  });
});
```

---

## 📞 Support & Maintenance

### Regular Maintenance Tasks

1. **Weekly**: Check for new submissions in admin dashboard
2. **Bi-weekly**: Archive resolved/closed queries
3. **Monthly**: Review statistics and trends
4. **Quarterly**: Backup database
5. **Annually**: Update admin password

### Monitoring Alerts

- High volume of critical bug reports
- Spike in help center queries
- Unresponded queries over 48 hours
- File upload failures

---

**Last Updated**: September 2026  
**Maintained By**: Vehloom Development Team  
**Version**: 1.0
