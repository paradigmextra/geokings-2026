-- Geoking Consultancy: fresh Turso/libSQL database schema
-- This file creates structure only. Create the administrator separately with:
-- npm run admin:create

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client')),
    account_type TEXT NOT NULL DEFAULT 'buyer' CHECK (account_type IN ('buyer', 'seller')),
    kyc_status TEXT NOT NULL DEFAULT 'not_submitted' CHECK (kyc_status IN ('not_submitted', 'pending', 'approved', 'rejected')),
    kyc_id_number TEXT,
    kyc_phone TEXT,
    kyc_address TEXT,
    kyc_document_key TEXT,
    kyc_document_type TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    expires INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_expires ON sessions(expires);

CREATE TABLE IF NOT EXISTS properties (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('House', 'Land', 'Commercial')),
    description TEXT NOT NULL,
    price INTEGER NOT NULL CHECK (price > 0),
    image TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'draft', 'sold')),
    owner_user_id TEXT,
    approval_status TEXT NOT NULL DEFAULT 'approved' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS properties_owner_user_id ON properties(owner_user_id);
CREATE INDEX IF NOT EXISTS properties_visibility ON properties(approval_status, status, created_at);

CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    property_id TEXT NOT NULL,
    title TEXT NOT NULL,
    amount INTEGER NOT NULL CHECK (amount > 0),
    currency TEXT NOT NULL DEFAULT 'MWK',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
    checkout_url TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS property_active_payment
ON payments(property_id)
WHERE status IN ('pending', 'paid');

CREATE INDEX IF NOT EXISTS payments_user_id ON payments(user_id);

CREATE TABLE IF NOT EXISTS saved_properties (
    user_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    PRIMARY KEY (user_id, property_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rate_limits (
    key TEXT PRIMARY KEY,
    count INTEGER NOT NULL,
    reset INTEGER NOT NULL
);
