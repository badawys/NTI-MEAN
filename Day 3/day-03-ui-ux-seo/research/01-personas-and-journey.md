# 01 — Personas and Student Journey

## Terms used in Day 3

- **Client:** the person or organization paying for the solution.
- **User:** a person who actually interacts with the application.
- **Persona:** a realistic summary representing one important user type.
- **Goal:** the result a user wants to achieve.
- **Pain point:** something that currently makes the user’s work difficult.
- **User journey:** the complete experience before, during, and after app use.
- **User flow:** the exact screen-by-screen path inside the app.

Personas guide decisions; they are not stereotypes and should not pretend to
represent every individual.

## Persona 1 — Mona, prospective student

| Attribute | Detail |
|---|---|
| Profile | 21-year-old computer-science student |
| Device/context | Mostly uses a phone between university classes |
| Primary goal | Find and register for a practical Angular course quickly |
| Pain point | Course information is scattered across social posts and messages |
| Information needed | Level, duration, dates, full capacity, remaining seats, and what she will learn |
| Behavior | Compares two or three courses, then checks whether seats remain |
| Accessibility considerations | Clear headings, readable text, large touch targets, visible errors |
| Success measure | Registers from mobile without calling the center and later understands her status |

### Job to be done

> When I want to improve my frontend skills, I want to compare available
> courses and register from my phone, so I can make a confident decision without
> contacting the center for missing information.

### Risks to design against

- A vague course card forces Mona to open every course.
- “Register” appears before she understands price/date/level.
- A form error removes what she already typed.
- “Pending” is shown without explaining what happens next.

## Persona 2 — Heba, training coordinator

| Attribute | Detail |
|---|---|
| Profile | Training administrator coordinating courses and enrollment requests |
| Device/context | Uses a laptop during busy office hours |
| Primary goal | Publish courses and review enrollments with fewer mistakes |
| Pain point | Requests arrive through messages and spreadsheets |
| Information needed | Student identity, course, request date, status, and safe actions |
| Behavior | Filters pending work, reviews one request, then confirms or cancels it |
| Accessibility considerations | Predictable keyboard order, clear table headings, non-color status labels |
| Success measure | Completes routine reviews quickly without approving the wrong request |

### Job to be done

> When new requests arrive, I want one reliable review queue with clear status
> controls, so I can make decisions without copying data between tools.

### Risks to design against

- Destructive and safe actions look identical.
- Status changes happen without confirmation or feedback.
- A wide table cannot be used on a small laptop.
- Archived courses are confused with published courses.

## Manager context

The manager uses the same operational dashboard and enrollment table but has
read-only access. The UI must hide or disable mutation controls and clearly
explain that the view is read-only.

## Main journey — Mona registers for Angular Foundations

| Stage | User action | Thought/feeling | Touchpoint | UX opportunity |
|---|---|---|---|---|
| Need | Decides to learn Angular for career growth | Motivated but unsure where to begin | Search/social link | Use a clear page title and useful snippet |
| Discovery | Opens Codes Training Center | “Is this relevant to me?” | Home page | State the value and one primary next step |
| Browse | Searches and filters the catalog | Curious, comparing choices | Course list | Show level, duration, availability, and one Details action |
| Decide | Reads Angular course details | “Can I attend, and are seats left?” | Course detail | Put key facts before the registration action |
| Account | Signs in or creates an account | Slight friction | Login/register | Keep forms short, labeled, and error-safe |
| Register | Submits the enrollment request | Hopeful | Course detail action | Show loading, prevent double submit, confirm receipt |
| Follow-up | Opens My Registrations | Wants certainty | Student status list | Explain pending/confirmed/cancelled statuses |

## Journey success criteria

- A phone user can reach course details within two clear actions.
- Course detail answers the main decision questions before registration.
- Validation explains how to fix each issue and preserves entered data.
- Submission feedback confirms that admin review is still required.
- Enrollment status uses text as well as color.

## Open client questions

- Are price and start date required in the MVP data model?
- Is a pending request allowed when only one seat remains?
- Can students cancel their own requests?
- What wording should explain `cancelled` versus `rejected`?
- Does the manager need downloadable reports, or only on-screen summaries?
- Which course images are available, and who owns their usage rights?
