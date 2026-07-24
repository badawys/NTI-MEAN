# 04 — AI Verification Log

AI can help explain, refactor, test, and document code, but it is not a source of
truth. Every suggested change must be read, understood, run, and checked against
the Codes Training Center requirements.

Do not paste passwords, access tokens, private student data, or other secrets
into an AI tool.

## Prompt framework

A useful coding prompt contains:

1. **Context:** the project and relevant file;
2. **Goal:** the exact improvement or explanation needed;
3. **Constraints:** language, allowed tools, and behavior that must not change;
4. **Expected output:** explanation, code, tests, or checklist; and
5. **Verification request:** assumptions, edge cases, and possible risks.

## Worked example

This is a model record showing the required level of evidence. Replace it with
your own AI-assisted change before submitting Day 2.

### Prompt

> I am building a Codes Training Center registration simulation in plain
> JavaScript. Refactor student validation so names and emails are trimmed and
> emails are lowercase. Do not use a framework or external package, and do not
> change the success/failure workflow. Explain assumptions and suggest tests for
> a valid student, missing name, invalid email, and surrounding whitespace.

### AI suggestion

Create a `validateStudent` function that:

- safely reads optional input values;
- trims the name and email;
- lowercases the email;
- throws meaningful errors for a missing name or email without `@`; and
- returns a new object instead of modifying the input.

### Manual review

| Check | Evidence |
|---|---|
| Matches project scope | Uses plain JavaScript and no package or framework. |
| Behavior understood | Validation either returns normalized data or throws an `Error`; the async registration function catches that error. |
| Assumption identified | Checking for `@` is a lesson-sized rule, not complete production email validation. |
| Privacy checked | The prompt contains fictional data and no secret or personal student record. |
| Unnecessary suggestion rejected | No regular-expression package or validation library was added. |

### Tests run

Command:

```bash
node "Day 2/day-02-advanced-js/02-async-workflow.js"
```

Observed evidence:

- `Mona Ali` with `MONA@EXAMPLE.COM` is accepted and normalized to
  `mona@example.com`.
- A value with surrounding spaces is trimmed.
- `invalid-email` produces `A valid student email is required`.
- A full course and a missing course still produce their original errors.

### Decision

Accepted the small normalization helper because it removes repeated work,
preserves the workflow, and passes the manual scenarios. Kept the intentionally
simple email rule and documented its limitation because production-grade email
validation is outside the Day 2 scope.

## Your verification record

Replace every placeholder below with evidence from your own work.

### Prompt

```text
[Paste the prompt. Remove private data and secrets first.]
```

### Suggested change

[Summarize what the AI proposed. Do not paste an answer you did not understand.]

### What I accepted

[List the specific change you kept and why it matches the requirement.]

### What I changed or rejected

[List incorrect, unnecessary, risky, or out-of-scope suggestions.]

### Assumptions and risks

[Record assumptions made by the AI and any behavior that needs extra checking.]

### Verification evidence

- Command or action used:
- Happy-path result:
- Error-path result 1:
- Error-path result 2:
- Files reviewed:
- Documentation updated:

### Final explanation

[Explain the final code in your own words. If you cannot explain it, do not
submit it.]

## Final checklist

- [ ] I read every AI-assisted line.
- [ ] I can explain the final behavior without the AI answer.
- [ ] I ran the code locally.
- [ ] I tested one happy path and at least two error paths.
- [ ] The change still matches Codes Training Center requirements.
- [ ] I recorded what I accepted, modified, and rejected.
- [ ] I removed private data, passwords, tokens, and secrets.
- [ ] The README matches the real files and commands.
