import { describe, it, expect } from 'vitest';
import { markdownToHtml } from '@/utils/markdownToHtml';

describe('markdownToHtml links', () => {
  it('renders safe http(s) links', () => {
    const html = markdownToHtml('[x](https://example.com/path)');
    expect(html).toContain('href="https://example.com/path"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it('renders same-origin relative links', () => {
    const html = markdownToHtml('[home](/privacy)');
    expect(html).toContain('href="/privacy"');
  });

  it('does not emit javascript: URLs', () => {
    const html = markdownToHtml('[bad](javascript:alert(1))');
    expect(html).not.toContain('javascript:');
    expect(html).toContain('href="#"');
  });
});
