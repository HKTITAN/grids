import { describe, it, expect } from 'vitest';
import { sanitizeRedirectPath } from '@/utils/safeRedirect';

describe('sanitizeRedirectPath', () => {
  it('allows normal app paths', () => {
    expect(sanitizeRedirectPath('/dashboard')).toBe('/dashboard');
    expect(sanitizeRedirectPath('/grid/abc-123')).toBe('/grid/abc-123');
  });

  it('returns null for empty or whitespace', () => {
    expect(sanitizeRedirectPath('')).toBeNull();
    expect(sanitizeRedirectPath('   ')).toBeNull();
    expect(sanitizeRedirectPath(null)).toBeNull();
    expect(sanitizeRedirectPath(undefined)).toBeNull();
  });

  it('blocks open redirects and external URLs', () => {
    expect(sanitizeRedirectPath('//evil.com')).toBeNull();
    expect(sanitizeRedirectPath('https://evil.com')).toBeNull();
    expect(sanitizeRedirectPath('http://evil.com')).toBeNull();
    expect(sanitizeRedirectPath('/\\evil.com')).toBeNull();
    expect(sanitizeRedirectPath('/http:evil.com')).toBeNull();
  });

  it('blocks protocol-relative paths after decode', () => {
    expect(sanitizeRedirectPath('%2f%2fevil.com')).toBeNull();
  });
});
