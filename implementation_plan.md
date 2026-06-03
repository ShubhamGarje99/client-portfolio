# Implementation Plan - Redesign Process ("How we build") Section

We will redesign the Process section to wrap the timeline stage descriptions in modern glassmorphic cards that sit neatly to the right of the scroll-driven SVG connecting line.

## Proposed Changes

### [Process.tsx](file:///e:/dev/portfolio/client-portfolio/src/components/Process.tsx)

#### 1. Container Width Alignment
- Expand the container from `max-w-5xl` to `max-w-6xl` to achieve perfect vertical alignment with the header and Services sections.

#### 2. Redesign Process Row layout
- Separate the row layout into two channels:
  - **Left Channel (`w-6`)**: Holds the timeline dot. The center aligns exactly with the scroll-driven vertical SVG connector line (`left-[11px]`).
  - **Right Channel (`flex-1`)**: Holds the content wrapped in a premium, glassmorphic card:
    - Dark background (`bg-[#0a0a0a]/30`) and hairline border (`border border-[#141414]`).
    - Large Roman Numeral watermark in the card background (`I`, `II`, `III`, `IV`) that shifts opacity on hover.
    - Title on the left, description on the right.
    - Hover states: glows teal (`#14c7c0`), shifts card background (`bg-[#0c0c0c]/80`), and expands the timeline dot.

---

## Verification Plan

### Manual Verification
- View the Process section in the browser.
- Scroll down and verify that the vertical line draws correctly through the pulsing dots.
- Hover over each card to check hover states (teal text glow, watermark accent, circle scale shift).
- Run `npm run build` to confirm compilation.
