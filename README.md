Sure! Here's the English version in clean and clear **Markdown format**:

---

# 🎯 Template Functionality

### ✅ Core Features:

- **Hero Section:** Title, subtitle, and a "Start" button to begin the build process.
- **Builder Section:** Multiple steps (blocks), each allowing the selection of one product.
- **Checkout Bar (Sticky Panel):** Displays selected item count and enables/disables the Checkout button accordingly.

### ⚙️ Scripts:

- Handles product selection logic.
- Dynamically updates the item counter.
- Locks other buttons within the same step once a selection is made.
- Smooth scrolling between steps.
- Checkout: adds selected items to the cart via AJAX.

---

# 🔧 Structure & Functionality

## 1. Hero Section

- Contains:
  - Title
  - Subtitle
  - **Start** button
- The button smoothly scrolls to the first Builder step.

## 2. Builder Section

- Consists of multiple **step blocks**.
- Each block includes:
  - Title
  - Subtitle
  - Background image (editable in the theme editor)
  - Product choices (only one can be selected)
- After a product is selected:
  - The step is considered completed.
  - Other options in the same block are disabled.

## 3. Checkout Bar

- Fixed at the top of the screen.
- Always visible while scrolling.
- Displays the number of selected items out of the total steps.
- **Checkout Button**:
  - Becomes active only after all steps are completed.
  - Sends selected products to the cart using the **Cart AJAX API**.
  - Redirects the user to the checkout page.

---

# 📦 Technical Implementation

- Built with **pure HTML, Liquid, CSS, JavaScript**.
- All styles are extracted into a single `base.css` file.
- **Roboto** font loaded via Google Fonts.
- SEO meta fields:
  - `title`, `description`, `keywords`, `favicon`, `theme-color` — configured via `settings_schema.json`.
- Logo connected via `settings.logo`.

