# ercancicek.com

My personal portfolio and blog. Built with Gatsby, styled with Tailwind, deployed on Netlify. Bilingual (EN/DE), accessible, and with an AI chatbot that answers questions on my behalf.

This is where I showcase my work, write about things I find interesting, and give people a quick way to get to know me and what I do - without the usual corporate website vibes.

## What's inside

**Portfolio** - Selected projects from 10+ years of frontend development and UI/UX design. From enterprise platforms to Shopify stores to my own iOS app.

**Blog** - Articles on web development, design principles, accessibility, and whatever else I feel like writing about.

**AI Chatbot** - An AI trained with context about me that answers questions on my behalf. Built with a Netlify serverless function that talks to the Claude API. The system prompt lives in a GitHub Gist so I can update it without redeploying.

**Mouse Chat Bubble** - A little easter egg. Hover over different elements on the homepage and a chat bubble follows your cursor with contextual messages. Just because I could.

## Tech stack

- **Gatsby 5** / React 18
- **Tailwind CSS 3** with a custom theme (custom colors, fonts, layout utilities)
- **gatsby-plugin-intl** for i18n (English & German)
- **Netlify** for hosting and serverless functions
- **Claude API** (Haiku 4.5) for the chatbot backend
- **Markdown** for blog posts
- **Figma** for design (not in this repo, obviously)

## Project structure

```
src/
  pages/            # index, about-me, portfolio, blog, legal pages, 404
  templates/        # Dynamic portfolio project pages
  components/       # React components (layout, SEO, chatbot, icons, ...)
  data/             # JSON data (portfolio projects, skills, social links)
  intl/             # Translation files (en.json, de.json)
  blogposts/        # Markdown blog posts
  images/           # All image assets
  styles/           # Global CSS with Tailwind
  fonts/            # Custom font "an-regular"
netlify/
  functions/        # Serverless function for chatbot API calls
```

## Some things I'm proud of

- **Accessibility first** - Semantic HTML, aria attributes, keyboard navigation, focus management, screen reader support. This isn't an afterthought, it's how I build things.
- **No cookies, no tracking** - No analytics, no cookie banners, no creepy stuff. Just a website.
- **Bilingual from the ground up** - Not a half-baked translation layer. Every page, every meta tag, every aria label exists in both English and German.
- **The chatbot actually works** - It knows about my career, my projects, my skills. Ask it something and it responds like I would - casual but professional.

## About me

I'm Ercan - a frontend developer and UX designer based in Dusseldorf with 10+ years of experience. I specialize in Vue, React, Tailwind, Figma, and accessibility (WCAG/EAA). I like bridging the gap between design and development and I believe that good interfaces should work for everyone.

More at [ercancicek.com](https://www.ercancicek.com) or hit me up on [LinkedIn](https://linkedin.com/in/ercancicek).
