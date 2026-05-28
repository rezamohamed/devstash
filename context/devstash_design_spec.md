# DevStash Dashboard Design Specification

This document details the premium, developer-first styling system used in the **DevStash Dashboard**. It is designed to be easily copy-pasted or referenced by AI coding systems such as **Claude Code** to ensure visual consistency, harmonious color matching, and a state-of-the-art interactive experience.

---

## Design Theme & Persona

The DevStash aesthetic draws inspiration from modern, developer-centric interfaces like **Linear**, **Raycast**, and **Notion**.

- **Primary Paradigm**: Sleek developer-first dark mode (default) with a highly readable, high-contrast light mode override.
- **Visual Pillars**:
  - **Glassmorphism**: Subtle backgrounds, backdrop blurs, and translucent overlays.
  - **Micro-animations**: Tiny hover offsets, scaling icons, and smooth side-panel drawer slides.
  - **Accent Gradients**: Vibrant linear gradients representing the premium, high-energy developer workflow.

---

## Typography

DevStash leverages a three-tiered typography system to separate content headings, UI controls, and code listings:

### Google Fonts Import

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@500;600;700;800&display=swap');
```

### Font Families

| Token | Font Family Stack | Intended Usage |
| :--- | :--- | :--- |
| `--font-sans` | `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` | Body copy, labels, primary buttons, input fields, tags. |
| `--font-display` | `'Outfit', sans-serif` | App logo, main dashboard headers, collection card titles, section titles. |
| `--font-mono` | `'JetBrains Mono', monospace` | Code snippets, terminal commands, markdown text blocks, keyboard shortcuts (`kbd`). |

### Left Sidebar Element Mappings

Below is the precise typography mapping for each element inside the left sidebar:

| Element | CSS Selector | Font Stack Variable | Size | Weight / Formatting |
| :--- | :--- | :--- | :--- | :--- |
| Brand Logo Text | `.logo-text` | `var(--font-display)` (Outfit) | `18px` | `700` (Bold) |
| Brand Logo Icon | `.logo-icon` | `var(--font-sans)` (Inter) | `16px` | `800` (Extra Bold) |
| Nav Section Titles | `.nav-section-title` | `var(--font-sans)` (Inter) | `10px` | `700` (Bold, uppercase, 0.1em spacing) |
| Normal Nav Item Label | `.nav-item` | `var(--font-sans)` (Inter) | `13px` | `500` (Medium) |
| Active Nav Item Label | `.nav-item.active` | `var(--font-sans)` (Inter) | `13px` | `600` (Semi-Bold) |
| Nav Item Count Badge | `.nav-item-badge` | `var(--font-sans)` (Inter) | `10px` | `600` (Semi-Bold) |
| Profile Name Label | `.profile-name` | `var(--font-sans)` (Inter) | `13px` | `600` (Semi-Bold) |
| Profile Tier Subtext | `.profile-tier` | `var(--font-sans)` (Inter) | `10px` | `700` (Bold, uppercase, 0.05em spacing) |
| Popular Tag Pills | `#sidebar-tags .item-tag` | `var(--font-sans)` (Inter) | `10px` | `500` (Medium) |
| Pro Promo Card Title | `.pro-title` | `var(--font-sans)` (Inter) | `12px` | `700` (Bold) |
| Pro Promo Card Body | `.pro-desc` | `var(--font-sans)` (Inter) | `11px` | `400` (Regular) |
| Pro Promo Button Label | `.pro-btn` | `var(--font-sans)` (Inter) | `11px` | `600` (Semi-Bold) |

---

## Design Tokens & Palette

### Color Palette (Hex)

#### Dark Mode (Default)

A deep, space-slate background with subtle card elevates.

```css
--bg-main: #090b0e;          /* Deep space main canvas */
--bg-sidebar: #101317;       /* Slightly elevated sidebar */
--bg-card: #15191f;          /* Surface card canvas */
--bg-card-hover: #1e242d;    /* Hover card surface */
--bg-overlay: rgba(9, 11, 14, 0.75); /* Dialog backdrop */
--border-color: #1e242e;     /* Low-contrast separator */
--border-hover: #2d3646;     /* Highlighted separator */
```

#### Light Mode (Overrides)

A clean, soft-gray workspace avoiding raw stark-white background glare.

```css
--bg-main: #f9fafb;          /* Soft paper gray canvas */
--bg-sidebar: #f3f4f6;       /* Elevated toolbar gray */
--bg-card: #ffffff;          /* Pure white card surface */
--bg-card-hover: #f3f4f6;    /* Card hover elevation */
--bg-overlay: rgba(249, 250, 251, 0.8);
--border-color: #e5e7eb;     /* Cool gray border */
--border-hover: #d1d5db;     /* Deeper gray hover boundary */
```

---

### Content Specific Accents

DevStash categorizes resource tabs and card edges with specific colored signals:

| Category | Primary Color | Badge Background | Purpose |
| :--- | :--- | :--- | :--- |
| **Snippet** | `#3b82f6` (Vibrant Blue) | `rgba(59, 130, 246, 0.2)` | React hooks, functions, configuration blocks |
| **Prompt** | `#8b5cf6` (Electric Purple) | `rgba(139, 92, 246, 0.2)` | System instructions, LLM context templates |
| **Command** | `#f97316` (Neon Orange) | `rgba(249, 115, 22, 0.2)` | Docker compose, shell scripts, CLI pipelines |
| **Note** | `#fde047` (Bright Yellow) | `rgba(253, 224, 71, 0.2)` | Quick lists, architectural bookmarks |
| **Link** | `#10b981` (Emerald Green) | `rgba(16, 185, 129, 0.2)` | API references, docs bookmarks |
| **Image** | `#ec4899` (Hot Pink) | `rgba(236, 72, 153, 0.2)` | Asset mockups, landing backdrops, SVGs |
| **File** | `#9ca3af` (Muted Gray) | `rgba(156, 163, 175, 0.2)` | Raw file attachments, logs |

---

### Text Hierarchy

| CSS Variable | Dark Value | Light Value | Purpose |
| :--- | :--- | :--- | :--- |
| `--text-primary` | `#f3f4f6` | `#111827` | Headings, active menu labels, focused values |
| `--text-secondary`| `#9ca3af` | `#4b5563` | Descriptions, secondary descriptions, metadata |
| `--text-muted` | `#6b7280` | `#9ca3af` | Subheadings, folder counts, keyboard hints, disabled tabs |
| `--text-accent` | `#3b82f6` | `#2563eb` | Links, primary states, active pills |

---

### Interactive Theme Accents

- **Theme Accent Color**: `#3b82f6` (Dark) / `#2563eb` (Light)
- **Theme Gradient Accent**: `linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)` (Signature purple-blue gradient used on logos, primary call-to-actions, and premium features).
- **Theme Glow Effect**: `rgba(59, 130, 246, 0.15)` (Focus rings, dashboard card active glow outline).
- **Shadows**:
  - `sm`: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
  - `md`: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
  - `lg`: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
  - `glow`: `0 0 20px rgba(59, 130, 246, 0.15)`
- **Glassmorphism Blur**: `blur(12px)`

---

## Layout & Spacing Spec

```
 +-------------------------------------------------------------+
 |                         HEADER (64px)                        |
 +------------+------------------------------------------------+
 |  SIDEBAR  |                                                 |
 |  (260px   |                                                 |
 |  Normal / |               MAIN WORKSPACE                     |
 |   68px    |                                                 |
 | Collapsed)|                                                 |
 |            |                                                 |
 +------------+------------------------------------------------+
```

- **Header Height**: `64px` (`--header-height`)
- **Sidebar Width (Normal)**: `260px` (`--sidebar-width`)
- **Sidebar Width (Collapsed)**: `68px` (`--sidebar-collapsed-width`)
- **Details Drawer Width (Slides from right)**: `480px` (`--drawer-width`)
- **Global Spacing System**:
  - Sidebar Padding: `16px 12px` (Internal spacing), `24px` section gap.
  - Category Cards Grid Gap: `16px`
  - Dashboard Content Padding: `24px` on desktop, `16px` on mobile.

---

## Motion & Transitions

All UI interactive transitions use the same standard cubic-bezier pacing curve (`cubic-bezier(0.4, 0, 0.2, 1)`) to mimic premium native OS window management:

```css
--transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);   /* Simple color, border changes, button hovers */
--transition-normal: 0.25s cubic-bezier(0.4, 0, 0.2, 1); /* Sidebar width transition, light/dark theme switches */
--transition-slow: 0.4s cubic-bezier(0.4, 0, 0.2, 1);    /* Right drawer slide-in panel, search expand overlays */
```

### Motion Presets

**Card Hover Elevation**:

```css
.collection-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

**Active Left Sidebar Indicator**:

An active item gets a left-border ribbon utilizing the accent gradient:

```css
.nav-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    bottom: 6px;
    width: 3px;
    border-radius: 0 4px 4px 0;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
}
```

---

## Tailwind CSS Config Mapping

If you prefer to configure this design system in Tailwind CSS for **Claude Code**, copy-paste this direct config structure:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        devstash: {
          bg: {
            main: 'var(--bg-main)',
            sidebar: 'var(--bg-sidebar)',
            card: 'var(--bg-card)',
            'card-hover': 'var(--bg-card-hover)',
          },
          border: {
            DEFAULT: 'var(--border-color)',
            hover: 'var(--border-hover)',
          },
          text: {
            primary: 'var(--text-primary)',
            secondary: 'var(--text-secondary)',
            muted: 'var(--text-muted)',
            accent: 'var(--text-accent)',
          },
          snippet: '#3b82f6',
          prompt: '#8b5cf6',
          command: '#f97316',
          note: '#fde047',
          link: '#10b981',
          image: '#ec4899',
          file: '#9ca3af',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlackMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
        slow: '400ms',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        sidebar: '260px',
        'sidebar-collapsed': '68px',
        header: '64px',
        drawer: '480px',
      }
    },
  },
  plugins: [],
}
```

---

## Standard CSS Custom Properties Sheet

Below is the complete drop-in CSS code containing the entire design token configuration:

```css
/* devstash-design-tokens.css */
:root {
    /* Fonts Stack */
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --font-display: 'Outfit', sans-serif;

    /* Sizing Elements */
    --sidebar-width: 260px;
    --sidebar-collapsed-width: 68px;
    --header-height: 64px;
    --drawer-width: 480px;

    /* Theme Accents */
    --accent-color: #3b82f6;
    --accent-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    --accent-glow: rgba(59, 130, 246, 0.15);

    /* Category Specific Color Mappings */
    --color-snippet: #3b82f6;
    --color-prompt: #8b5cf6;
    --color-command: #f97316;
    --color-note: #fde047;
    --color-file: #9ca3af;
    --color-image: #ec4899;
    --color-link: #10b981;

    /* Transition System */
    --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    /* Shadows & Effects */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-glow: 0 0 20px rgba(59, 130, 246, 0.15);
    --glass-blur: blur(12px);

    /* Premium Dark Theme Canvas (Default) */
    --bg-main: #090b0e;
    --bg-sidebar: #101317;
    --bg-card: #15191f;
    --bg-card-hover: #1e242d;
    --bg-overlay: rgba(9, 11, 14, 0.75);
    --border-color: #1e242e;
    --border-hover: #2d3646;

    --text-primary: #f3f4f6;
    --text-secondary: #9ca3af;
    --text-muted: #6b7280;
    --text-accent: #3b82f6;
}

/* Light Theme Mode Canvas */
body.light-theme {
    --bg-main: #f9fafb;
    --bg-sidebar: #f3f4f6;
    --bg-card: #ffffff;
    --bg-card-hover: #f3f4f6;
    --bg-overlay: rgba(249, 250, 251, 0.8);
    --border-color: #e5e7eb;
    --border-hover: #d1d5db;

    --text-primary: #111827;
    --text-secondary: #4b5563;
    --text-muted: #9ca3af;
    --text-accent: #2563eb;

    --accent-color: #2563eb;
    --accent-glow: rgba(37, 99, 235, 0.08);

    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02);
}
```
