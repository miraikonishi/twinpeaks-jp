# Implementation Plan - Twin Peaks Archive Redesign

This plan outlines the steps to transform the current `twinpeaks.jp` site from a static commentary blog into a React-based archive, preserving the original design while enhancing navigation and adding a "Daily Quote" feature.

## Goal Description
- **Objective**: Move from a "real-time commentary" focus to a "permanent archive" focus.
- **Key Changes**:
    - Reorganize content into `Episodes`, `Library`, and `Black Lodge` sections.
    - Implement a "Daily Quote" feature on the homepage.
    - Maintain the existing visual design (assets, CSS).
    - Migrate technology stack to React (Vite) for better component management and routing.

## User Review Required
> [!NOTE]
> This plan assumes converting the existing Vanilla JS project to React. This allows for cleaner state management (for the Daily Quote) and routing (SPA feel).

## Proposed Changes

### Tech Stack & Configuration
#### [NEW] [package.json](file:///Users/miraikonishi/Developer/twinpeaks.jp/package.json)
- Add dependencies: `react`, `react-dom`, `react-router-dom`.
- Update build scripts.

#### [NEW] [vite.config.js](file:///Users/miraikonishi/Developer/twinpeaks.jp/vite.config.js)
- Configure React plugin.

### Source Code
#### [NEW] [src/App.jsx](file:///Users/miraikonishi/Developer/twinpeaks.jp/src/App.jsx)
- Main entry component.
- Set up React Router with routes:
    - `/`: Home (The Red Room)
    - `/episodes`: Archive Episodes Index
    - `/library`: Archive Library Index
    - `/black-lodge`: Archive Black Lodge Index
    - `/article/:id`: Generic Article Viewer (reusing existing layout style)

#### [NEW] [src/components/DailyQuote.jsx](file:///Users/miraikonishi/Developer/twinpeaks.jp/src/components/DailyQuote.jsx)
- New component for the homepage.
- Fetches a random quote from a new data source or array.

#### [NEW] [src/pages/Home.jsx](file:///Users/miraikonishi/Developer/twinpeaks.jp/src/pages/Home.jsx)
- Re-implements the current `index.html` structure as a React component.
- Integrates `DailyQuote`.
- Updates navigation links to new Archive sections.

#### [MODIFY] [src/data.js](file:///Users/miraikonishi/Developer/twinpeaks.jp/src/data.js)
- Will remain as the primary data source but may need a utility to map old categories (`studies` -> `episodes`, etc.) to new section props.

#### [DELETE] [index.html](file:///Users/miraikonishi/Developer/twinpeaks.jp/index.html)
- Standard Vanilla HTML will be replaced by Vite's React entry point template (moved and modified).

## Verification Plan

### Automated Tests
- **Build Check**: Run `npm run build` to ensure the React app builds successfully without errors.
- **Lint Check**: Manual visual inspection of console for React warnings.

### Manual Verification
1.  **Navigation Flow**:
    - Click "Entrance" on Home -> Go to Index pages.
    - Verify all 3 sections (Episodes, Library, Black Lodge) are accessible.
2.  **Daily Quote**:
    - Refresh the Home page 5 times.
    - Confirm the quote text changes (or at least cycles) and is displayed correctly in the design.
3.  **Design Fidelity**:
    - Compare the new React Home page with the original `index.html` screenshot/backup.
    - Ensure fonts, colors, and layout remain "Twin Peaks" style.
