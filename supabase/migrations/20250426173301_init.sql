-- Create devday schema
CREATE SCHEMA IF NOT EXISTS devday;

-- Create enum types in the devday schema
CREATE TYPE devday.goal_type AS ENUM ('yearly', 'quarterly', 'monthly', 'weekly', 'daily');
CREATE TYPE devday.goal_status AS ENUM ('active', 'completed', 'abandoned');
CREATE TYPE devday.day_status AS ENUM ('started', 'in_progress', 'completed');
CREATE TYPE devday.activity_type AS ENUM ('task', 'meeting', 'learning', 'feedback', 'reflection');
CREATE TYPE devday.activity_status AS ENUM ('planned', 'in_progress', 'completed', 'blocked');
CREATE TYPE devday.priority_level AS ENUM ('low', 'medium', 'high');
CREATE TYPE devday.plan_item_status AS ENUM ('scheduled', 'in_progress', 'completed', 'skipped');

-- Create goals table
CREATE TABLE devday.goals
(
    id          UUID PRIMARY KEY                                           DEFAULT uuid_generate_v4(),
    user_id     UUID REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL,
    description TEXT,
    type        devday.goal_type                                  NOT NULL,
    status      devday.goal_status                                NOT NULL DEFAULT 'active',
    start_date  DATE                                              NOT NULL,
    end_date    DATE,
    created_at  TIMESTAMP WITH TIME ZONE                                   DEFAULT NOW(),
    updated_at  TIMESTAMP WITH TIME ZONE                                   DEFAULT NOW(),
    CONSTRAINT valid_date_range CHECK (end_date IS NULL OR end_date >= start_date)
);

-- Create days table
CREATE TABLE devday.days
(
    id         UUID PRIMARY KEY                                           DEFAULT uuid_generate_v4(),
    user_id    UUID REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL,
    date       DATE                                              NOT NULL,
    status     devday.day_status                                 NOT NULL DEFAULT 'started',
    start_time TIMESTAMP WITH TIME ZONE                                   DEFAULT now(),
    end_time   TIMESTAMP WITH TIME ZONE,
    notes      TEXT,
    created_at TIMESTAMP WITH TIME ZONE                                   DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE                                   DEFAULT NOW(),
    UNIQUE (user_id, date),
    CONSTRAINT valid_time_range CHECK (end_time IS NULL OR end_time >= start_time)
);

-- Create ai_plans table
CREATE TABLE devday.ai_plans
(
    id         UUID PRIMARY KEY         DEFAULT uuid_generate_v4(),
    day_id     UUID REFERENCES devday.days (id) ON DELETE CASCADE NOT NULL,
    user_id    UUID REFERENCES auth.users (id) ON DELETE CASCADE  NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create plan_items table for structured AI plan items
CREATE TABLE devday.plan_items
(
    id          UUID PRIMARY KEY                                                DEFAULT uuid_generate_v4(),
    plan_id     UUID REFERENCES devday.ai_plans (id) ON DELETE CASCADE NOT NULL,
    title       TEXT                                                   NOT NULL,
    description TEXT,
    priority    devday.priority_level                                  NOT NULL DEFAULT 'medium',
    start_time  TIME                                                   NOT NULL,
    end_time    TIME                                                   NOT NULL,
    status      devday.plan_item_status                                NOT NULL DEFAULT 'scheduled',
    created_at  TIMESTAMP WITH TIME ZONE                                        DEFAULT NOW(),
    updated_at  TIMESTAMP WITH TIME ZONE                                        DEFAULT NOW(),
    CONSTRAINT valid_time_range CHECK (end_time > start_time)
);

-- Create activities table
CREATE TABLE devday.activities
(
    id              UUID PRIMARY KEY                                            DEFAULT uuid_generate_v4(),
    day_id          UUID REFERENCES devday.days (id) ON DELETE CASCADE NOT NULL,
    user_id         UUID REFERENCES auth.users (id) ON DELETE CASCADE  NOT NULL,
    type            devday.activity_type                               NOT NULL,
    description     TEXT,
    related_goal_id UUID                                               REFERENCES devday.goals (id) ON DELETE SET NULL,
    status          devday.activity_status                             NOT NULL DEFAULT 'planned',
    created_at      TIMESTAMP WITH TIME ZONE                                    DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE                                    DEFAULT NOW()
);

-- Set up RLS (Row Level Security)
ALTER TABLE devday.goals
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE devday.days
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE devday.ai_plans
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE devday.plan_items
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE devday.activities
    ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can only see their own goals"
    ON devday.goals FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals"
    ON devday.goals FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
    ON devday.goals FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals"
    ON devday.goals FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for days, ai_plans & activities
CREATE POLICY "Users can only see their own day entries"
    ON devday.days FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own day entries"
    ON devday.days FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own day entries"
    ON devday.days FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own day entries"
    ON devday.days FOR DELETE USING (auth.uid() = user_id);


CREATE POLICY "Users can only see their own activities"
    ON devday.activities FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activities"
    ON devday.activities FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own activities"
    ON devday.activities FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own activities"
    ON devday.activities FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for ai_plans
CREATE POLICY "Users can only see their own AI plans"
    ON devday.ai_plans FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI plans"
    ON devday.ai_plans FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI plans"
    ON devday.ai_plans FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own AI plans"
    ON devday.ai_plans FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for plan_items
CREATE POLICY "Users can only see their own plan items"
    ON devday.plan_items FOR SELECT 
    USING ((SELECT user_id FROM devday.ai_plans WHERE id = plan_id) = auth.uid());

CREATE POLICY "Users can insert their own plan items"
    ON devday.plan_items FOR INSERT 
    WITH CHECK ((SELECT user_id FROM devday.ai_plans WHERE id = plan_id) = auth.uid());

CREATE POLICY "Users can update their own plan items"
    ON devday.plan_items FOR UPDATE 
    USING ((SELECT user_id FROM devday.ai_plans WHERE id = plan_id) = auth.uid());

CREATE POLICY "Users can delete their own plan items"
    ON devday.plan_items FOR DELETE 
    USING ((SELECT user_id FROM devday.ai_plans WHERE id = plan_id) = auth.uid());