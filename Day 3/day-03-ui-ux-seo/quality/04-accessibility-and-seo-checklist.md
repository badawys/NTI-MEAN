# 04 — Accessibility and SEO Checklist

## Accessibility implementation

### Structure

- [ ] Use `header`, `nav`, `main`, `section`, `aside`, and `footer` where their
  meaning matches the content.
- [ ] Provide one descriptive `h1` for the page topic.
- [ ] Nest `h2` and `h3` headings without skipping levels.
- [ ] Use links for navigation and buttons for actions.
- [ ] Use lists and tables only when the content relationship requires them.
- [ ] Provide a skip link for repeated navigation.

### Forms and feedback

- [ ] Connect every input to a visible `<label>`.
- [ ] Explain required format before submission where possible.
- [ ] Associate field errors with `aria-describedby`.
- [ ] Do not remove entered data after validation failure.
- [ ] Show error, success, warning, loading, and empty states with text.
- [ ] Disable repeat submission while a request is pending.
- [ ] Move focus or announce feedback when an important async result appears.

### Keyboard and focus

- [ ] Reach every interactive control using `Tab`.
- [ ] Keep focus order consistent with reading order.
- [ ] Show a clear `:focus-visible` indicator.
- [ ] Make dialogs retain focus while open and return it when closed.
- [ ] Support `Escape` for dismissible dialogs/menus where expected.
- [ ] Avoid positive `tabindex` values.

### Visual and content quality

- [ ] Meet WCAG AA contrast for normal text and meaningful UI boundaries.
- [ ] Do not communicate status using color alone.
- [ ] Use comfortable line height and readable line length.
- [ ] Keep touch targets approximately 44×44 CSS pixels.
- [ ] Add useful alt text when an image communicates course information.
- [ ] Use empty alt text for purely decorative images.
- [ ] Respect `prefers-reduced-motion`.
- [ ] Test at 200% zoom without losing content or actions.

### Main registration keyboard path

1. Skip to main content.
2. Navigate to Courses.
3. Focus search, then level filter.
4. Focus the selected course’s Details link.
5. Read the course heading and facts.
6. Focus Sign in/Register.
7. Complete labeled authentication fields.
8. Return to course context and submit.
9. Hear/see the success message.
10. Navigate to My Registrations and read the text status.

## SEO implementation

### Metadata

- [ ] Give every important public route a unique `<title>`.
- [ ] Write a useful meta description that matches visible content.
- [ ] Add a canonical URL for indexable pages.
- [ ] Add Open Graph title, description, type, URL, and image.
- [ ] Add Twitter/X card metadata where sharing matters.
- [ ] Use `robots` intentionally; do not index private account/admin pages.

### Content hierarchy

- [ ] Use one visible `h1` matching the page topic.
- [ ] Organize major sections with descriptive `h2` headings.
- [ ] Write headings for meaning, not visual size.
- [ ] Put course level, value, duration, and availability in readable text.
- [ ] Avoid keyword stuffing and duplicate copied descriptions.

### URLs and internal links

- [ ] Prefer readable URLs such as `/courses/angular-foundations`.
- [ ] Link Home → Courses → Course details through crawlable anchors.
- [ ] Use descriptive link text instead of repeated “click here.”
- [ ] Use breadcrumbs only when they improve orientation.
- [ ] Redirect or canonicalize accidental duplicate routes.

### Technical and performance

- [ ] Serve meaningful HTML for important public content.
- [ ] Plan route-specific metadata in Angular.
- [ ] Set image width/height to reduce layout shift.
- [ ] Compress course images and use modern formats when appropriate.
- [ ] Lazy-load below-the-fold media.
- [ ] Avoid unnecessary scripts and blocking assets.
- [ ] Provide useful loading, empty, and error content.
- [ ] Measure performance and accessibility instead of guessing.

## Metadata plan

| Page | Title | Description direction | Robots |
|---|---|---|---|
| Home | `Codes Training Center | Practical Web Courses` | Browse practical courses and track registration online | `index,follow` |
| Courses | `Available Courses | Codes Training Center` | Compare level, duration, and available seats | `index,follow` |
| Course detail | `{Course} — {Level} | Codes Training Center` | Course-specific value, duration, and registration availability | `index,follow` |
| Login/register | Task-specific title | Clear account task description | `noindex,follow` |
| Profile/student/admin | Task-specific title | Private application screen | `noindex,nofollow` |

## Course metadata template

```html
<title>Angular Foundations — Beginner | Codes Training Center</title>
<meta
  name="description"
  content="Learn Angular fundamentals in a practical 18-hour beginner course. Check remaining seats and register with Codes Training Center."
/>
<link
  rel="canonical"
  href="https://codes-training.example/courses/angular-foundations"
/>
```

## Known limitations and improvement plan

- The Day 3 pages use fictional URLs and content; production URLs must replace
  them before deployment.
- Tailwind’s browser build is for classroom prototypes, not production.
- Angular SPA metadata needs route-aware implementation and crawl testing later.
- Final contrast must be checked against the production palette.
- Real course images require verified ownership, useful alt text, compression,
  and explicit dimensions.
