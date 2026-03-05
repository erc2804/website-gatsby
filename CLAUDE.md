# Ercan Cicek - Portfolio & Blog (Gatsby)

## Tech Stack
- **Gatsby 5** (React 18) - Static Site Generator
- **Tailwind CSS 3** - Styling
- **gatsby-plugin-intl** - i18n (EN/DE), Default: EN
- **Netlify** - Hosting, Serverless Functions
- **Claude API** (claude-haiku-4-5-20251001) - AI Chatbot

## Commands
```bash
npm run develop     # Dev server (localhost:8000)
npm run build       # Production build
npm run clean       # Clear cache
npx netlify dev     # Dev with Netlify Functions (localhost:8888)
```

## Project Structure
```
src/
  pages/              # Seiten (index, about-me, portfolio, blog, imprint, privacy, 404)
  templates/          # portfolioTemplate.js - dynamische Portfolio-Seiten
  components/         # React-Komponenten
    chat/             # Chatbot UI (chatEntry, avatarBubble, typingAnimation)
    icons/            # SVG Icon-Komponenten
    layout.js         # Layout-Wrapper (Header, Footer, SEO)
    seo.js            # Meta-Tags, OpenGraph, hreflang
    aiChatbot.js      # Chatbot-Frontend
    mouseChatBubble.js # Kontextabhängige Chat-Bubble am Mauszeiger
  data/               # JSON: portfolioData, skillsData, socialMediaData
  intl/               # Übersetzungen: en.json, de.json
  images/             # Bilder (index/, about-me/, portfolio/)
  blogposts/          # Markdown-Blogposts (YYYY-MM-DD_title.md)
  styles/             # global.css (Tailwind, Fonts, Utilities)
  fonts/              # Custom Font "an-regular"
  hooks/              # use-site-metadata.js
netlify/
  functions/
    makeApiCall.js    # Chatbot-Backend: Gist -> Claude API
```

## Environment Variables (.env)
```
GITHUB_GIST_FILENAME    # Name der Gist-Datei mit System-Prompt
GITHUB_GIST_ID          # GitHub Gist ID
GITHUB_TOKEN            # GitHub PAT (Scope: gist)
ANTHROPIC_API_KEY       # Anthropic API Key
```

## Architektur-Patterns

### Seiten-Pattern
Jede Seite nutzt Layout mit SEO-Info und injectIntl:
```jsx
const seoInfo = {
  title: intl.formatMessage({ id: "page.meta.title" }),
  description: intl.formatMessage({ id: "page.meta.description" }),
  pathname: "/page-path",
  image: imageImport
}
<Layout seo={seoInfo} currentLocale={intl.locale}>
  {/* Inhalt */}
</Layout>
```

### Chatbot-Architektur
1. Frontend (`aiChatbot.js`): Messages in sessionStorage, POST an `/.netlify/functions/makeApiCall`
2. Backend (`makeApiCall.js`): System-Prompt aus GitHub Gist holen, an Claude API senden
3. Response: `data.content[0].text`

### i18n
- Alle Texte in `src/intl/en.json` und `de.json`
- Keys: dot-notation (`index.meta.title`, `about-me.ec-description.part-before-skills-list`)
- Zweisprachige Inhalte in Daten-JSONs: `label` + `labelDe`
- Pattern: `intl.locale === "de" && item.labelDe ? item.labelDe : item.label`

### Portfolio
- Daten in `src/data/portfolioData.json`
- Dynamische Seiten via `gatsby-node.js` (createPages)
- Template: `src/templates/portfolioTemplate.js`
- Typen: WEB, APP, SHOP, OTHER

### Blog
- Markdown in `src/blogposts/` mit Frontmatter (id, date, title, imageUrl)
- Aktuell nur auf Englisch

### Bilder
- `StaticImage` für statische Imports (Build-Zeit)
- `GatsbyImage` für dynamische Bilder (GraphQL)

## Tailwind Custom Theme
- **Brand Colors**: `brand-green-medium-lvl` (#5CDB95), `brand-blue` (#05386B), `brand-sand` (#EDF5E1), `brand-purple` (#46237A)
- **Grays**: `gray-max-lvl` (schwarz) bis `gray-min-lvl` (weiß)
- **Typo**: `typo-high-lvl` bis `typo-min-lvl`
- **Font**: "an-regular" (custom)
- **Layout-Klassen**: `.ec-layout-visual-content` (max 1200px), `.ec-layout-text-content` (max 800px)
- **Font-Klassen**: `.ec-font-base`, `.ec-font-heading-1`, `.ec-font-heading-2`, `.ec-font-subheading`, `.ec-font-caption`

## Conventions
- Komponenten: PascalCase (`AiChatbot.js`)
- Pages: kebab-case (`about-me.js`)
- CSS: ec- Prefix für Custom-Utilities
- Legal-Seiten (Imprint, Privacy): `noindex: true`
- Accessibility: Semantic HTML, aria-labels, sr-only, focus-visible
- `data-chat` Attribut auf Elementen für MouseChatBubble-Kontext

## SEO
- Meta-Tags & OpenGraph pro Seite und Sprache
- hreflang-Tags (de, en, x-default)
- Canonical URLs
- Sitemap: `/sitemap-index.xml`
- robots.txt vorhanden
- Domain: https://www.ercancicek.com
