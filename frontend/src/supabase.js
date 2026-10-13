import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ydxarnhuezpckpwieynv.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkeGFybmh1ZXpwY2twd2lleW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2ODczMDQsImV4cCI6MjEwNzI2MzMwNH0.p2hf5fU32Zz0fXZpHTM1ax0GLjLliR26kJ2tTidXw1A';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Get active Supabase auth user
 */
export async function getCurrentAuthUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user || null;
  } catch (err) {
    return null;
  }
}

/**
 * Fetch issues scoped to current authenticated user + shared system baseline issues
 */
export async function fetchIssuesFromCloud() {
  try {
    const user = await getCurrentAuthUser();
    let query = supabase.from('issues').select('*').order('created_at', { ascending: false });
    
    if (user?.id) {
      // Scoped: User's own tickets + baseline demo tickets (user_id IS NULL)
      query = query.or(`user_id.eq.${user.id},user_id.is.null`);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    if (data && data.length > 0) {
      localStorage.setItem('insightflow_issues_cache', JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn('Supabase fetch failed, utilizing cached issues:', err);
  }

  // Fallback to cache or defaults
  const cached = localStorage.getItem('insightflow_issues_cache');
  if (cached) {
    try { return JSON.parse(cached); } catch (e) {}
  }
  return [
    {
      id: 'ISS-101',
      title: 'Investigate surge in Fraud & Counterfeit seller complaints',
      category: 'Fraud and Scam',
      status: 'In Progress',
      priority: 'Critical',
      impact: 'High (Customer Trust & Financial Loss)',
      assigned_to: 'Trust & Safety Team',
      description: 'Multiple reviews indicate unverified sellers demanding outside payments or sending counterfeit items.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ISS-102',
      title: 'Address Customer Support responsiveness SLA',
      category: 'Customer Service',
      status: 'Open',
      priority: 'High',
      impact: 'Medium (Customer Churn)',
      assigned_to: 'Support Ops',
      description: 'Dissatisfaction reported on response wait times during escalation inquiries.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ISS-103',
      title: 'Carrier notification transparency for delivery delays',
      category: 'Operational Issues',
      status: 'Resolved',
      priority: 'Medium',
      impact: 'Low (Manageable via automated SMS)',
      assigned_to: 'Logistics Engineering',
      description: 'Customers expressed appreciation when delays were proactively communicated.',
      created_at: new Date().toISOString()
    }
  ];
}

/**
 * Persist new issue to Supabase tagged with current authenticated user_id
 */
export async function createIssueInCloud(issue) {
  try {
    const user = await getCurrentAuthUser();
    const payload = {
      ...issue,
      user_id: user?.id || null
    };

    const { data, error } = await supabase
      .from('issues')
      .insert([payload])
      .select();
    if (!error && data && data.length > 0) {
      return data[0];
    }
  } catch (err) {
    console.warn('Supabase insert issue fallback to local:', err);
  }
  return issue;
}

/**
 * Update issue in Supabase
 */
export async function updateIssueInCloud(id, updates) {
  try {
    const { data, error } = await supabase
      .from('issues')
      .update(updates)
      .eq('id', id)
      .select();
    if (!error && data && data.length > 0) {
      return data[0];
    }
  } catch (err) {
    console.warn('Supabase update issue fallback to local:', err);
  }
  return null;
}

/**
 * Persist executive decision report to Supabase tagged with user_id
 */
export async function saveReportToCloud(report) {
  try {
    const user = await getCurrentAuthUser();
    const payload = {
      ...report,
      user_id: user?.id || null
    };

    const { data, error } = await supabase
      .from('saved_reports')
      .insert([payload])
      .select();
    if (!error && data && data.length > 0) {
      return data[0];
    }
  } catch (err) {
    console.warn('Supabase save report fallback to local:', err);
  }
  return report;
}

/**
 * Persist uploaded CSV dataset metadata to Supabase public.user_datasets per user
 */
export async function saveUserDatasetToCloud({ filename, recordCount, columnMapping, sampleRecords = [] }) {
  try {
    const user = await getCurrentAuthUser();
    const payload = {
      user_id: user?.id || null,
      dataset_name: filename,
      total_records: recordCount,
      column_mapping: columnMapping,
      records: sampleRecords.slice(0, 50)
    };

    const { data, error } = await supabase
      .from('user_datasets')
      .insert([payload])
      .select();

    if (!error && data && data.length > 0) {
      return data[0];
    }
  } catch (err) {
    console.warn('Supabase save dataset notice:', err);
  }
  return null;
}
