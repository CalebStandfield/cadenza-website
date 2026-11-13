import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { siteFiles } from './plugins/site-files.ts'

/** CSP for the built site. Inline styles stay allowed, components set CSS variables through style={{}}. */
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

/** Response headers for any host. frame-ancestors only works as a header, a meta CSP ignores it. */
const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': `${CSP}; frame-ancestors 'none'`,
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
}

/**
 * Build only: puts the CSP in a meta tag and writes dist/_headers (Netlify and
 * Cloudflare Pages format) from SECURITY_HEADERS. Skipped in dev, where vite
 * injects inline scripts and an HMR websocket.
 */
function securityHeaders(): Plugin {
  return {
    name: 'security-headers',
    apply: 'build',
    transformIndexHtml: () => [
      { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP }, injectTo: 'head-prepend' },
    ],
    generateBundle() {
      const lines = Object.entries(SECURITY_HEADERS).map(([name, value]) => `  ${name}: ${value}`)
      this.emitFile({ type: 'asset', fileName: '_headers', source: ['/*', ...lines, ''].join('\n') })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), securityHeaders(), siteFiles()],
  server: { host: 'localhost', strictPort: true },
  preview: { host: 'localhost', strictPort: true, headers: SECURITY_HEADERS },
})
