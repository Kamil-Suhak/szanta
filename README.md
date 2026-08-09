# Szanta – Modern Commercial Web Application

A high-performance, responsive commercial web application built for a landscape architecture and gardening company (**Szanta**). Built with **Svelte 5 (Runes)** and **SvelteKit 2**, deployed serverless on **Cloudflare Pages / Workers**.

---

## Tech Stack

- **Framework**: [Svelte 5](https://svelte.dev/) (Runes mode: `$state`, `$derived`, `$effect`, `$props`, `{#snippet}`) + [SvelteKit 2](https://kit.svelte.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`), custom CSS keyframes, CSS variable tokens, glassmorphism
- **Image Optimization**: `@sveltejs/enhanced-img` + `sharp` (AVIF/WebP generation, responsive srcset)
- **Deployment & Runtime**: Cloudflare Pages / Workers via `@sveltejs/adapter-cloudflare` (`nodejs_compat`)
- **Backend / Email**: SvelteKit Form Actions + [Brevo (Sendinblue) REST API](https://www.brevo.com/)
- **Icons**: `lucide-svelte`

---

## Technical Highlights & Architecture

### 1. Dynamic Image Optimization Pipeline
- **Problem**: `@sveltejs/enhanced-img` natively optimizes static image imports at build time, but cannot resolve dynamic paths stored in data manifests (`projects-manifest.json`).
- **Solution**: Implemented a custom [`EnhancedImage.svelte`](src/lib/components/ui/EnhancedImage.svelte) wrapper using Vite's `import.meta.glob` eager dictionary. At build time, all assets in `src/lib/assets/images` are transformed into modern formats (AVIF/WebP). At runtime, dynamic paths are matched against the pre-compiled dictionary with case-insensitive fallback.

### 2. Interactive UI Components & Custom Gestures
- **Before/After Split Comparison** ([`Comparison.svelte`](src/lib/components/sections/Comparison.svelte)): Pointer and touch-drag image comparison slider using CSS `clip-path` masks and ARIA accessibility attributes (keyboard navigable via Arrow keys).
- **Rotary Testimonial Carousel** ([`Reviews.svelte`](src/lib/components/sections/Reviews.svelte)): Trigonometrically positioned avatar wheel (`--angle`, `--radius`) on desktop with a synchronized `requestAnimationFrame` SVG progress indicator ring, pause-on-hover/tab-blur, and touch-swipe gestures on mobile.
- **Dynamic Portfolio with Touch Drawer** ([`Projects.svelte`](src/lib/components/sections/Projects.svelte)): Paginated, category-filtered project gallery. Features a responsive slide-over modal on desktop and a swipeable bottom sheet drawer with threshold-based drag-to-dismiss gesture on mobile.
- **Catalog Navigation** ([`Shop.svelte`](src/lib/components/sections/Shop.svelte)): Responsive categorized product browser with per-card image carousels and smooth slide transitions.

### 3. Server-Side Form Handling & Anti-Spam Pipeline
- **Progressive Enhancement**: SvelteKit `use:enhance` integration for zero-page-reload submission with animated loading states and validation error feedback.
- **Spam & Bot Mitigation**:
  - **Honeypot Trap**: Invisible field (`b_phone`) detecting automated submissions and returning a mock success response to avoid bot retries.
  - **Heuristic Content Filter**: Regex-based string anomaly detection (e.g. unbroken words $>50$ characters).
- **Transactional Delivery**: Direct dispatch via Brevo REST API (`/v3/smtp/email`) with dev-mode fallback (local logging and simulated latency when API keys are absent).

### 4. Custom Inline Micro-Markup Parser
- Built a lightweight tokenizer and component renderer ([`FormattedText.svelte`](src/lib/components/ui/FormattedText.svelte), [`config-formatter.ts`](src/lib/utils/config-formatter.ts)) to parse delimited string tokens (`[[...]]`, `{{...}}`, `!!...!!`, `**...**`) and inject inline icons (`*` $\to$ Lucide Star) without pulling heavy markdown runtime dependencies.

### 5. Data & Asset Automation
- Node.js build-time utility scripts in [`local_scripts/`](local_scripts/) for batch image resizing (`sharp`), OpenGraph cover generation, and data restructuring from raw assets into structured JSON/TypeScript schemas.

---

## Project Structure

```text
szanta/
├── local_scripts/          # Node/Sharp automation scripts (image processing, manifest generation)
├── src/
│   ├── lib/
│   │   ├── assets/         # Source imagery, icons, and fonts
│   │   ├── components/
│   │   │   ├── layout/     # Navbar, Footer
│   │   │   ├── sections/   # Hero, Services, Projects, Comparison, Reviews, Shop, Contact
│   │   │   └── ui/         # EnhancedImage, Button, ImageModal, FormattedText
│   │   ├── data/           # Structured JSON manifests (projects, before/after data)
│   │   ├── lang/pl/        # Localized content dictionaries
│   │   └── utils/          # Formatting helpers, regex generator
│   └── routes/
│       ├── +layout.svelte  # Global layout, typography, OpenGraph / meta tags
│       ├── +page.server.ts # Server actions (contact form validation & email delivery)
│       ├── +page.svelte    # Landing page composition
│       ├── o-nas/          # About page route
│       └── sklep/          # Store catalog route
├── svelte.config.js        # Svelte 5 compiler runes config & Cloudflare adapter setup
├── vite.config.ts          # Vite plugin pipeline (@tailwindcss/vite, enhanced-img, sveltekit)
└── wrangler.toml           # Cloudflare Pages runtime & environment configuration
```

---

## Environment Configuration

Create a `.env` file based on `.env.example`:

```env
BREVO_API_KEY=your_brevo_api_key   # Optional in development (falls back to console mock)
ADMIN_EMAIL=admin@example.com
RECIPIENT_EMAIL=contact@example.com
SENDER_EMAIL=noreply@example.com
TEST_MODE=false
```

---

## Development

```sh
# Install dependencies
npm install

# Start local development server
npm run dev

# Type check & lint
npm run check
npm run lint

# Build for production (Cloudflare Pages)
npm run build
```
