# Security and Limitations

## Implemented teaching controls

- Passwords are hashed with bcrypt (cost 12); hashes are excluded from normal Mongoose queries.
- JWTs expire after one day and contain only user ID and role.
- Express authentication and role middleware protect data at the API boundary.
- Angular guards improve navigation UX but are never treated as the security boundary.
- Zod validates request bodies; Mongoose validates stored documents.
- Helmet sets defensive HTTP headers; CORS allows only the configured Angular origin.
- API rate limiting reduces simple request abuse.
- Public course queries hide drafts and archives.
- Student enrollment queries always scope by the authenticated user ID.

## Production hardening still required

- Replace the development JWT secret and manage it through a secrets service.
- Prefer short-lived access tokens plus rotating, HttpOnly, Secure, SameSite refresh cookies.
- Add CSRF controls if cookie authentication is introduced.
- Add verified email, password reset, account lockout/backoff, audit logs, and staff account management.
- Add automated dependency, static analysis, integration, and authorization tests.
- Use TLS, a private database network, MongoDB authentication, backups, monitoring, and sanitized logs.
- Make course capacity enforcement atomic under concurrency.
- Define retention/deletion policies for personal data.

Never expose MongoDB port `27017` to the public internet. Never commit `.env`.
