# GitHub Pages Deployment Guide

This guide explains how to publish the TECH460 static companion site to GitHub Pages.

## Prerequisites

- Repository pushed to GitHub
- Access to repository Settings

## Publishing Steps

### Option 1: Branch-Based Publishing (Recommended)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Select the **main** branch
5. Select the **/docs** folder
6. Click **Save**
7. Wait for GitHub to build your site (usually 1-2 minutes)

Your site will be available at:
```
https://drvicki.github.io/tech460-interactice-lessons/
```

### Option 2: GitHub Actions (Advanced)

If you prefer automated deployments, you can add a GitHub Actions workflow. However, this requires the `workflows` permission on your push credential.

## Validation

Before publishing, run the validation script to ensure all files are present:

```bash
pnpm pages:check
```

This checks:
- `docs/index.html` exists
- `docs/404.html` exists
- `docs/.nojekyll` exists
- All CSS and JS assets use relative paths
- The site links to the live course platform

## File Structure

```
docs/
├── index.html          # Main landing page
├── certificate.html    # GCA Certificate generator
├── 404.html            # Error page
├── .nojekyll           # Disable Jekyll processing
├── DEPLOYMENT.md       # This file
└── assets/
    ├── css/
    │   └── styles.css  # All styles
    ├── js/
    │   └── site.js     # Course data and interactions
    └── img/
        └── devry-logo.png  # DeVry University logo
```

## Features

### Interactive Curriculum Checklist
- Students can click checkboxes to track module completion
- Progress is saved in browser localStorage
- Visual progress bar shows completion percentage
- Completed modules are highlighted in green

### GCA Certificate Generator
- Dedicated page at `certificate.html`
- Input fields for student name, CodeSignal score link, and completion date
- Live preview of certificate
- PDF download functionality
- Professional design with DeVry branding

## Important Notes

- This is a **static companion site** only
- Interactive features (progress tracking, certificates, notes) require the live application
- Always link to the live course platform for full functionality
- Use relative paths (`assets/...`) not root-relative paths (`/assets/...`)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Site shows README instead of homepage | Set Pages source to `/docs` folder |
| Assets not loading | Check that paths are relative, not root-relative |
| 404 errors on refresh | Ensure `404.html` exists in `/docs` |
| Styles not applying | Verify `.nojekyll` file exists |

## Live Course Platform

For the full interactive experience, visit:
https://tech460les1-haxrjpha.manus.space
