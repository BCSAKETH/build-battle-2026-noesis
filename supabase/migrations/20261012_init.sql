-- ==============================================================================
-- InsightFlow / Noesis v4.8 — Production Multi-Tenant Declarative Schema
-- Database: Supabase PostgreSQL with Strict Row Level Security (RLS)
-- Migration: 20261012_init.sql
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. Table: public.user_datasets
-- Stores uploaded CSV datasets, inferred Groq schema mappings, and metadata
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.user_datasets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL DEFAULT auth.uid(),
    filename TEXT NOT NULL,
    record_count INTEGER NOT NULL DEFAULT 0,
    column_mapping JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for tenant isolation and fast retrieval
CREATE INDEX IF NOT EXISTS idx_user_datasets_user_id ON public.user_datasets(user_id);
CREATE INDEX IF NOT EXISTS idx_user_datasets_created_at ON public.user_datasets(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.user_datasets ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Multi-tenant isolation with global demo/judge access
DROP POLICY IF EXISTS "user_datasets_tenant_select" ON public.user_datasets;
CREATE POLICY "user_datasets_tenant_select" ON public.user_datasets
    FOR SELECT USING (
        user_id = (SELECT auth.uid()) 
        OR user_id = '00000000-0000-0000-0000-000000000001'::uuid
    );

DROP POLICY IF EXISTS "user_datasets_tenant_insert" ON public.user_datasets;
CREATE POLICY "user_datasets_tenant_insert" ON public.user_datasets
    FOR INSERT WITH CHECK (
        user_id = (SELECT auth.uid()) 
        OR user_id = '00000000-0000-0000-0000-000000000001'::uuid
    );

DROP POLICY IF EXISTS "user_datasets_tenant_update" ON public.user_datasets;
CREATE POLICY "user_datasets_tenant_update" ON public.user_datasets
    FOR UPDATE USING (
        user_id = (SELECT auth.uid()) 
        OR user_id = '00000000-0000-0000-0000-000000000001'::uuid
    );

DROP POLICY IF EXISTS "user_datasets_tenant_delete" ON public.user_datasets;
CREATE POLICY "user_datasets_tenant_delete" ON public.user_datasets
    FOR DELETE USING (
        user_id = (SELECT auth.uid()) 
        OR user_id = '00000000-0000-0000-0000-000000000001'::uuid
    );


-- ==============================================================================
-- 3. Table: public.issues
-- Stores Kanban tickets, 4-stage lifecycle tracker states, and voice memos
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.issues (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL DEFAULT auth.uid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General Feedback',
    status TEXT NOT NULL DEFAULT 'Reported',
    priority TEXT NOT NULL DEFAULT 'Medium',
    impact TEXT NOT NULL DEFAULT 'Medium',
    assigned_to TEXT NOT NULL DEFAULT 'Operations Team',
    description TEXT,
    source_feedback_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    resolution_log JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for status filtering and tenant lookup
CREATE INDEX IF NOT EXISTS idx_issues_user_id ON public.issues(user_id);
CREATE INDEX IF NOT EXISTS idx_issues_status ON public.issues(status);
CREATE INDEX IF NOT EXISTS idx_issues_priority ON public.issues(priority);
CREATE INDEX IF NOT EXISTS idx_issues_created_at ON public.issues(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Multi-tenant isolation with global demo/judge access
DROP POLICY IF EXISTS "issues_tenant_select" ON public.issues;
CREATE POLICY "issues_tenant_select" ON public.issues
    FOR SELECT USING (
        user_id = (SELECT auth.uid()) 
        OR user_id = '00000000-0000-0000-0000-000000000001'::uuid
    );

DROP POLICY IF EXISTS "issues_tenant_insert" ON public.issues;
CREATE POLICY "issues_tenant_insert" ON public.issues
    FOR INSERT WITH CHECK (
        user_id = (SELECT auth.uid()) 
        OR user_id = '00000000-0000-0000-0000-000000000001'::uuid
    );

DROP POLICY IF EXISTS "issues_tenant_update" ON public.issues;
CREATE POLICY "issues_tenant_update" ON public.issues
    FOR UPDATE USING (
        user_id = (SELECT auth.uid()) 
        OR user_id = '00000000-0000-0000-0000-000000000001'::uuid
    );

DROP POLICY IF EXISTS "issues_tenant_delete" ON public.issues;
CREATE POLICY "issues_tenant_delete" ON public.issues
    FOR DELETE USING (
        user_id = (SELECT auth.uid()) 
        OR user_id = '00000000-0000-0000-0000-000000000001'::uuid
    );


-- ==============================================================================
-- 4. Table: public.executive_reports
-- Stores generated executive decision memos, ROI estimates, and audit trail
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.executive_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL DEFAULT auth.uid(),
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    metrics JSONB NOT NULL DEFAULT '{}'::jsonb,
    recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
    roi_estimate JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for tenant isolation
CREATE INDEX IF NOT EXISTS idx_executive_reports_user_id ON public.executive_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_executive_reports_created_at ON public.executive_reports(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.executive_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Multi-tenant isolation with global demo/judge access
DROP POLICY IF EXISTS "reports_tenant_select" ON public.executive_reports;
CREATE POLICY "reports_tenant_select" ON public.executive_reports
    FOR SELECT USING (
        user_id = (SELECT auth.uid()) 
        OR user_id = '00000000-0000-0000-0000-000000000001'::uuid
    );

DROP POLICY IF EXISTS "reports_tenant_insert" ON public.executive_reports;
CREATE POLICY "reports_tenant_insert" ON public.executive_reports
    FOR INSERT WITH CHECK (
        user_id = (SELECT auth.uid()) 
        OR user_id = '00000000-0000-0000-0000-000000000001'::uuid
    );

DROP POLICY IF EXISTS "reports_tenant_update" ON public.executive_reports;
CREATE POLICY "reports_tenant_update" ON public.executive_reports
    FOR UPDATE USING (
        user_id = (SELECT auth.uid()) 
        OR user_id = '00000000-0000-0000-0000-000000000001'::uuid
    );

DROP POLICY IF EXISTS "reports_tenant_delete" ON public.executive_reports;
CREATE POLICY "reports_tenant_delete" ON public.executive_reports
    FOR DELETE USING (
        user_id = (SELECT auth.uid()) 
        OR user_id = '00000000-0000-0000-0000-000000000001'::uuid
    );


-- ==============================================================================
-- 5. Seed Data: Default Enterprise Issues for Demo Tenant
-- ==============================================================================
INSERT INTO public.issues (id, user_id, title, category, status, priority, impact, assigned_to, description, source_feedback_ids)
VALUES
    (
        'ISS-101',
        '00000000-0000-0000-0000-000000000001'::uuid,
        'Investigate surge in Fraud & Counterfeit seller complaints',
        'Fraud and Scam',
        'Resolved',
        'Critical',
        'High (Customer Trust & Financial Loss)',
        'Trust & Safety Team',
        'Multiple reviews indicate unverified sellers demanding outside payments or sending counterfeit items.',
        '[4, 8, 17, 21]'::jsonb
    ),
    (
        'ISS-102',
        '00000000-0000-0000-0000-000000000001'::uuid,
        'Address Customer Support responsiveness SLA',
        'Customer Service',
        'Open',
        'High',
        'Medium (Customer Churn)',
        'Support Ops',
        'Dissatisfaction reported on response wait times during escalation inquiries.',
        '[3, 16, 28]'::jsonb
    ),
    (
        'ISS-103',
        '00000000-0000-0000-0000-000000000001'::uuid,
        'Carrier notification transparency for delivery delays',
        'Operational Issues',
        'Resolved',
        'Medium',
        'Low (Manageable via automated SMS)',
        'Logistics Engineering',
        'Customers expressed appreciation when delays were proactively communicated; roll out automated tracking updates.',
        '[5, 18, 30]'::jsonb
    )
ON CONFLICT (id) DO NOTHING;
