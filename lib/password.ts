import { randomBytes, pbkdf2Sync } from 'crypto';

const ITERATIONS = 100_000;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';

/**
 * Hash a password using PBKDF2 with a random salt.
 * Returns a string in the format: salt:hash (both hex-encoded).
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify a password against a stored PBKDF2 hash.
 * Accepts both "salt:hash" format and legacy plaintext values for backward compatibility.
 */
export function verifyPassword(password: string, stored: string): boolean {
  // If stored value contains a colon, treat as salt:hash format
  if (stored.includes(':')) {
    const [salt, hash] = stored.split(':');
    const verify = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
    return verify === hash;
  }
  // Legacy plaintext comparison (for accounts created before hashing was added)
  return stored === password;
}
