CREATE TABLE devday.waitlist
(
    id         UUID PRIMARY KEY         DEFAULT uuid_generate_v4(),
    email      text NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);