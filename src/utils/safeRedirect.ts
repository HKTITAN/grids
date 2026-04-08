/**
 * Validates `redirect` query values so post-login navigation cannot be hijacked
 * to an external origin (open redirect). Only same-origin relative paths are allowed.
 */
export function sanitizeRedirectPath(raw: string | null | undefined): string | null {
  if (raw == null || typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (trimmed.length === 0) return null;

  let path = trimmed;
  try {
    path = decodeURIComponent(trimmed);
  } catch {
    return null;
  }

  if (!path.startsWith('/')) return null;
  // Protocol-relative URLs (including after decodeURIComponent) or odd parses
  if (path.startsWith('//') || path.startsWith('/\\')) return null;
  // Reject scheme-like paths (e.g. /http:evil.com)
  if (/^\/[a-zA-Z][a-zA-Z0-9+.-]*:/i.test(path)) return null;

  return trimmed;
}
