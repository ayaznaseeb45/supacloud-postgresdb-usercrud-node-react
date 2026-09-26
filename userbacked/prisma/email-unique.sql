-- Enforce the same email identity for case and surrounding-space variations.
-- Keep this index in addition to Prisma's email @unique constraint.
-- Existing duplicates must be resolved manually before applying this index.
CREATE UNIQUE INDEX IF NOT EXISTS users_email_normalized_key
ON users (lower(btrim(email)));
