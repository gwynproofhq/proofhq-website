# PROOF Blog — Weekly Publish Checklist

## New post (5 minutes)

1. **Copy** `TEMPLATE.html` → `your-slug-here.html` in `/blog/`
2. **Find-replace** these strings:
   - `YOUR TITLE HERE` → your headline (appears 4 times)
   - `YOUR-SLUG-HERE` → your URL slug (appears 3 times)
   - `YOUR DESCRIPTION HERE` → meta description (appears 2 times)
   - `2026-XX-XX` → publish date in ISO format
3. **Edit** the tag, date, title, subtitle in the article header
4. **Write** your post between the `✏️ WRITE` and `✏️ END` comments
5. **Pick 2-3** related posts for the bottom links

## Update blog index (2 minutes)

Open `blog/index.html` and add a new card **at the top** of `<div class="blog-grid">`:

```html
<a href="/blog/your-slug-here" class="blog-card">
  <div class="blog-card-inner">
    <div class="blog-meta"><span class="blog-tag">Topic Tag</span><span class="blog-date">DD Mon 2026</span></div>
    <h2 class="blog-card-title">Your Title Here</h2>
    <p class="blog-card-excerpt">One-line excerpt for the card.</p>
    <span class="blog-read-more">Read article →</span>
  </div>
</a>
```

## Update sitemap (30 seconds)

Add to `sitemap.xml`:
```xml
<url><loc>https://www.proofhq.io/blog/your-slug-here</loc><lastmod>2026-XX-XX</lastmod><priority>0.7</priority></url>
```

## Deploy

```bash
git add . && git commit -m "Blog: Your Title Here" && git push
```

Vercel auto-deploys. Live in ~30 seconds.

---

## Available HTML elements in posts

| Element | Code |
|---------|------|
| Paragraph | `<p>Text</p>` |
| Section heading | `<h2>Heading</h2>` |
| Sub-heading | `<h3>Heading</h3>` |
| Bold | `<strong>bold text</strong>` |
| Pull quote | `<blockquote><p>Quote</p></blockquote>` |
| Bullet list | `<ul><li>Item</li></ul>` |
| Internal link | `<a href="/blog/slug" style="color: var(--accent); font-weight: 700;">text</a>` |
| External link | `<a href="https://..." target="_blank" rel="noopener">text</a>` |

## Tag conventions

- Series posts: `Part N · Topic` (e.g. `Part 5 · Forecasting`)
- Standalone: `Topic` (e.g. `Revenue Operations`, `Sales Leadership`)
