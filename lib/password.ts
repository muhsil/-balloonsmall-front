import { randomBytes, pbkdf2Sync, timingSafeEqual } from 'crypto';

const ITERATIONS = 100_000;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';

// PBKDF2 stored format: 32 hex chars (16-byte salt) + ":" + 128 hex chars (64-byte hash)
const PBKDF2_PATTERN = /^[0-9a-f]{32}:[0-9a-f]{128}$/;

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
  // Match exact PBKDF2 format to avoid misidentifying legacy plaintext passwords containing colons
  if (PBKDF2_PATTERN.test(stored)) {
    const [salt, hash] = stored.split(':');
    const verify = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST);
    const storedBuf = Buffer.from(hash, 'hex');
    if (verify.length !== storedBuf.length) return false;
    return timingSafeEqual(verify, storedBuf);
  }
  // Legacy plaintext comparison (for accounts created before hashing was added)
  return stored === password;
}
