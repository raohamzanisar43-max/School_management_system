import React from 'react';

export default function ThemeStyles() {
  return (
    <style>{`
      :root {
        --bg-page: #05070a;
        --bg-card: #0b101d;
        --bg-card-inner: #05070b;
        --border-color: #182030;
        --border-subtle: rgba(24, 32, 48, 0.6);

        --text-main: #ffffff;
        --text-muted: #94a3b8;
        --text-subtle: #64748b;

        --brand-lime: #82e612;
        --brand-lime-glow: rgba(130, 230, 18, 0.15);
        --grid-line: rgba(255, 255, 255, 0.025);
      }

      [data-theme="light"] {
        --bg-page: #f8fafc;
        --bg-card: #ffffff;
        --bg-card-inner: #ffffff;
        --border-color: #e2e8f0;
        --border-subtle: rgba(15, 23, 42, 0.08);

        --text-main: #0f172a;
        --text-muted: #475569;
        --text-subtle: #64748b;

        --brand-lime: #4d7c0f;
        --brand-lime-hover: #3f6212;
        --brand-lime-glow: rgba(77, 124, 15, 0.15);
        --grid-line: rgba(15, 23, 42, 0.04);
      }

      [data-theme="night"] {
        --bg-page: #000000;
        --bg-card: #080808;
        --bg-card-inner: #050505;
        --border-color: #222222;
        --border-subtle: rgba(255, 255, 255, 0.1);

        --text-main: #ffffff;
        --text-muted: #a1a1aa;
        --text-subtle: #52525b;

        --brand-lime: #82e612;
        --brand-lime-glow: rgba(130, 230, 18, 0.2);
        --grid-line: rgba(255, 255, 255, 0.035);
      }

      body {
        background-color: var(--bg-page) !important;
        color: var(--text-main) !important;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      .text-theme-main {
        color: var(--text-main);
      }

      .text-theme-muted {
        color: var(--text-muted);
      }

      .border-theme {
        border-color: var(--border-color);
      }

      .bg-theme-card-inner {
        background-color: var(--bg-card-inner);
      }

      .bg-grid-pattern {
        background-image:
          linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
          linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
        background-size: 32px 32px;
      }

      svg.sync-icon {
        color: currentColor;
        fill: none;
        stroke: currentColor;
      }
    `}</style>
  );
}
