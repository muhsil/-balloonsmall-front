# Testing BalloonsMall Authentication

## Overview
The auth system uses WooCommerce Customer API with custom PBKDF2 password hashing stored in customer meta_data.

## Setup
1. Run `npm run dev` from the repo root
2. App available at http://localhost:3000
3. Requires `.env.local` with `NEXT_PUBLIC_WP_URL`, `WC_CONSUMER_KEY`, `WC_CONSUMER_SECRET`

## Devin Secrets Needed
- `WC_CONSUMER_KEY` — WooCommerce REST API consumer key
- `WC_CONSUMER_SECRET` — WooCommerce REST API consumer secret

## Key Test Flows

### Register → Login → Checkout Pre-fill
1. Navigate to `/account/register`, fill form, click Create Account
2. Verify redirect to `/account` with welcome message and navbar name
3. Verify password hash via WooCommerce API: `GET /wp-json/wc/v3/customers?email=<email>` — check `balloonsmall_password` meta key matches PBKDF2 regex `^[0-9a-f]{32}:[0-9a-f]{128}$`
4. Click Logout, navigate to `/account/login`, enter credentials, click Sign In
5. Verify redirect to `/account` with welcome message
6. Navigate to `/checkout` — verify form fields pre-filled (First Name, Email, Phone)

### Duplicate Registration Detection
1. Try registering with an already-used email
2. API should return 409 with "An account with this email already exists"
3. Note: The error message may not display visually in the UI (frontend UX gap) — verify via server logs or curl

## Known Gotchas

### WooCommerce REST API + Axios URL Encoding
- Axios URL-encodes `@` to `%40` in query params
- WooCommerce's `email` filter does NOT decode `%40`, silently returning 0 results
- **Fix**: Use `search` param instead of `email` param, plus exact email filtering on results
- This affects both login (customer lookup) and register (duplicate detection)
- To verify the fix is working: if login returns "No account found" for a known-existing account, this encoding bug may have regressed

### WooCommerce Meta Key Prefix
- Meta keys prefixed with `_` (underscore) are hidden from WooCommerce REST API GET responses
- The password hash is stored under `balloonsmall_password` (no underscore prefix) so it's readable via API
- If login fails with "Please use the password you registered with", the meta key may have been changed back to `_balloonsmall_password`

### Zustand Hydration Timing
- `authCustomer` from Zustand persist middleware is `null` on initial render
- Checkout form uses `useEffect` watching `authCustomer` to backfill fields after hydration
- If checkout fields are empty when logged in, the `useEffect` dependency on `authCustomer` may be broken

### PBKDF2 Password Hashing
- Uses Node.js built-in `crypto` module (no external packages)
- 100,000 iterations, SHA-512, 16-byte random salt, 64-byte hash
- Stored format: `<32-char hex salt>:<128-char hex hash>`
- Regex validation: `/^[0-9a-f]{32}:[0-9a-f]{128}$/`
- Comparison uses `crypto.timingSafeEqual` to prevent timing attacks
- Legacy plaintext passwords are supported for backward compatibility

## Verifying Password Hash via CLI
```bash
curl -s -u "$WC_CONSUMER_KEY:$WC_CONSUMER_SECRET" \
  "https://cms.balloonsmall.com/wp-json/wc/v3/customers?email=<email>&per_page=1" | \
  python3 -c "import sys,json,re; d=json.load(sys.stdin); m={x['key']:x['value'] for x in d[0].get('meta_data',[])}; pw=m.get('balloonsmall_password','NOT FOUND'); print('PASS' if re.match(r'^[0-9a-f]{32}:[0-9a-f]{128}$',pw) else 'FAIL:', pw[:40])"
```
