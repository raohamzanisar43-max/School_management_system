<!DOCTYPE html>
<html lang="en" data-theme="dark" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bright Future School - Unified Portal</title>

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              lime: '#82e612',
              limeHover: '#6cc40e',
              darkBg: '#05070a',
              cardBg: '#0b0f17',
              borderDark: '#182030'
            }
          }
        }
      }
    }
  </script>

  <!-- Google Fonts: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <style>
    :root {
      /* Standard Dark Mode matching reference screenshots */
      --bg-page: #05070b;
      --bg-card: #0b0f17;
      --bg-card-inner: #07090e;
      --border-color: #1a2333;
      --border-subtle: rgba(255, 255, 255, 0.08);

      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-subtle: #64748b;

      --brand-lime: #82e612;
      --brand-lime-glow: rgba(130, 230, 18, 0.15);
      --grid-line: rgba(255, 255, 255, 0.025);
    }

    [data-theme="light"] {
      --bg-page: #f1f5f9;
      --bg-card: #ffffff;
      --bg-card-inner: #f8fafc;
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
      --bg-card-inner: #111111;
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
      background-color: var(--bg-page);
      color: var(--text-main);
      font-family: 'Inter', sans-serif;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    /* Light Theme Comprehensive Component Overrides */
    [data-theme="light"] body {
      background-color: var(--bg-page);
      color: var(--text-main);
    }

    [data-theme="light"] .text-white {
      color: #0f172a !important;
    }

    [data-theme="light"] .text-slate-200,
    [data-theme="light"] .text-slate-300 {
      color: #334155 !important;
    }

    [data-theme="light"] .text-slate-400 {
      color: #475569 !important;
    }

    [data-theme="light"] .text-slate-500 {
      color: #64748b !important;
    }

    [data-theme="light"] .bg-slate-900,
    [data-theme="light"] .bg-slate-950,
    [data-theme="light"] .bg-slate-900\/80,
    [data-theme="light"] .bg-slate-950\/80,
    [data-theme="light"] .bg-slate-950\/60,
    [data-theme="light"] .bg-slate-950\/50,
    [data-theme="light"] .bg-slate-950\/40 {
      background-color: #ffffff !important;
    }

    [data-theme="light"] .border-slate-800,
    [data-theme="light"] .border-slate-800\/80,
    [data-theme="light"] .border-slate-800\/90,
    [data-theme="light"] .border-slate-700\/80,
    [data-theme="light"] .border-slate-700\/60 {
      border-color: #e2e8f0 !important;
    }

    [data-theme="light"] .input-focus {
      background-color: #f8fafc !important;
      border-color: #cbd5e1 !important;
    }

    [data-theme="light"] input, 
    [data-theme="light"] select, 
    [data-theme="light"] textarea {
      color: #0f172a !important;
    }

    [data-theme="light"] input::placeholder, 
    [data-theme="light"] textarea::placeholder {
      color: #94a3b8 !important;
    }

    [data-theme="light"] .role-card-selected {
      border-color: var(--brand-lime) !important;
      background-color: rgba(77, 124, 15, 0.08) !important;
    }

    [data-theme="light"] header button,
    [data-theme="light"] header a {
      background-color: #ffffff !important;
      border-color: #cbd5e1 !important;
      color: #0f172a !important;
    }

    [data-theme="light"] .bg-slate-900\/90 {
      background-color: rgba(255, 255, 255, 0.95) !important;
    }

    [data-theme="light"] select option {
      background-color: #ffffff !important;
      color: #0f172a !important;
    }

    [data-theme="light"] #toastNotification > div {
      background-color: #ffffff !important;
      color: #0f172a !important;
      border-color: #cbd5e1 !important;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    }

    /* Background Grid Pattern */
    .bg-grid-pattern {
      background-image: 
        linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
        linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
      background-size: 32px 32px;
    }

    /* SVG Color Syncing */
    svg.sync-icon {
      color: currentColor;
      fill: none;
      stroke: currentColor;
    }

    /* Input Focus Highlight */
    .input-focus:focus-within {
      border-color: var(--brand-lime);
      box-shadow: 0 0 0 1px var(--brand-lime);
    }

    /* Custom Input Styles */
    input, select, textarea {
      color-scheme: dark;
    }

    [data-theme="light"] input, 
    [data-theme="light"] select, 
    [data-theme="light"] textarea {
      color-scheme: light;
    }

    /* Step Transition Effects */
    .page-section {
      display: none;
      opacity: 0;
      transform: translateY(6px);
      transition: opacity 0.25s ease, transform 0.25s ease;
    }

    .page-section.active {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }

    /* Role Card Active State */
    .role-card-selected {
      border-color: var(--brand-lime) !important;
      background-color: rgba(130, 230, 18, 0.04) !important;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--border-color);
      border-radius: 99px;
    }
  </style>
</head>
<body class="min-h-screen bg-grid-pattern flex flex-col justify-between selection:bg-lime-500/20 selection:text-lime-400">

  <header class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-5 flex items-center justify-between z-20">
    
    <!-- Brand Logo -->
    <a href="#" onclick="navigateTo('home'); return false;" class="flex items-center gap-3 group">
      <div class="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white/5 border border-slate-700/60 dark:border-white/15 flex items-center justify-center p-2 shadow-sm group-hover:border-lime-500/50 transition">
        <svg class="w-6 h-6 text-white sync-icon" viewBox="0 0 24 24" stroke-width="1.8">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/>
        </svg>
      </div>
      <div>
        <div class="font-extrabold text-sm sm:text-base tracking-tight text-white uppercase flex items-center gap-1.5 leading-none">
          <span>BRIGHT FUTURE</span>
          <span style="color: var(--brand-lime)">SCHOOL</span>
        </div>
        <div class="text-[9px] sm:text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">
          THE GLOBAL LEARNING HUB
        </div>
      </div>
    </a>

    <!-- Header Actions -->
    <div class="flex items-center gap-3 sm:gap-4">
      <span id="navQuestionText" class="hidden sm:inline text-xs text-slate-400 font-medium">New here?</span>
      
      <!-- Primary Action Nav Button -->
      <a id="navActionButton" href="#" onclick="handleNavAction(); return false;" 
         class="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-700/80 hover:border-lime-400 text-xs font-bold text-white hover:text-lime-400 transition-all flex items-center gap-2 bg-slate-900/60 hover:bg-lime-500/10">
        <svg id="navActionIcon" class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="8.5" cy="7" r="4"/>
          <line x1="20" y1="8" x2="20" y2="14"/>
          <line x1="17" y1="11" x2="23" y2="11"/>
        </svg>
        <span id="navActionLabel">Create account</span>
      </a>

      <!-- Theme Switcher -->
      <button onclick="toggleNextTheme()" title="Toggle Theme (Dark / Light / OLED)" 
              class="w-9 h-9 rounded-xl border border-slate-700/80 hover:border-slate-500 bg-slate-900/80 flex items-center justify-center text-slate-300 hover:text-white transition">
        <svg id="themeIcon" class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>
    </div>
  </header>

  <!-- Main Container Scope -->
  <main class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-2 sm:py-4 flex-1">

    <section id="page-home" class="page-section active">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[75vh]">
        
        <!-- Left Hero Column -->
        <div class="lg:col-span-5 space-y-6">
          <div class="space-y-3">
            <span style="color: var(--brand-lime)" class="text-xs font-extrabold tracking-widest uppercase block">
              STUDENT SUCCESS, WORLDWIDE
            </span>
            <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.08]">
              Every future <br />
              <span style="color: var(--brand-lime)">starts connected.</span>
            </h1>
            <p class="text-sm text-slate-400 leading-relaxed font-normal pt-2 max-w-md">
              A unified portal to access everything you need. Choose your portal and sign in to continue your learning journey.
            </p>
          </div>

          <!-- Feature Bullets Row -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div class="space-y-1">
              <div class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 mb-2">
                <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                </svg>
              </div>
              <h4 class="text-xs font-bold text-white">Global Community</h4>
              <p class="text-[11px] text-slate-400">Connect worldwide</p>
            </div>

            <div class="space-y-1">
              <div class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 mb-2">
                <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <h4 class="text-xs font-bold text-white">Smart Learning</h4>
              <p class="text-[11px] text-slate-400">Learn. Grow. Succeed.</p>
            </div>

            <div class="space-y-1">
              <div class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 mb-2">
                <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h4 class="text-xs font-bold text-white">Secure & Trusted</h4>
              <p class="text-[11px] text-slate-400">Your data is safe</p>
            </div>

            <div class="space-y-1">
              <div class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 mb-2">
                <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                </svg>
              </div>
              <h4 class="text-xs font-bold text-white">Better Outcomes</h4>
              <p class="text-[11px] text-slate-400">Track your progress</p>
            </div>
          </div>

          <!-- Learners Badge -->
          <div class="pt-2 flex items-center gap-3">
            <div class="flex -space-x-2 overflow-hidden shrink-0">
              <img class="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Student 1" />
              <img class="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Student 2" />
              <img class="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Student 3" />
              <img class="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Student 4" />
            </div>
            <div class="text-xs text-slate-400">
              <span style="color: var(--brand-lime)" class="font-extrabold text-sm">21,500+</span> learners already connected
            </div>
          </div>
        </div>

        <!-- Right Portal Grid Container -->
        <div class="lg:col-span-7">
          <div class="rounded-3xl p-6 sm:p-8 border border-slate-800/90 backdrop-blur-xl shadow-2xl relative" style="background-color: var(--bg-card)">
            
            <div class="mb-6">
              <span style="color: var(--brand-lime)" class="text-[11px] font-extrabold tracking-widest uppercase block mb-1">
                WELCOME BACK
              </span>
              <h2 class="text-2xl font-extrabold text-white">Choose your portal</h2>
              <p class="text-xs text-slate-400 mt-0.5">Select your role to sign in to your account</p>
            </div>

            <!-- 2x2 Portals Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <!-- Student Portal Card -->
              <div class="p-5 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-lime-500/50 transition flex flex-col items-center text-center group">
                <div class="w-12 h-12 rounded-full bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 mb-3 group-hover:scale-105 transition">
                  <svg class="w-6 h-6 sync-icon" viewBox="0 0 24 24" stroke-width="1.8">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/>
                  </svg>
                </div>
                <h3 class="text-sm font-bold text-lime-400 mb-1">Student Portal</h3>
                <p class="text-[11px] text-slate-400 mb-4 leading-relaxed">
                  Access your classes, assignments, results, timetable and more.
                </p>
                <button onclick="selectPortalAndSignIn('Student')" 
                        class="mt-auto w-full py-2 px-4 rounded-xl border border-lime-500/40 hover:border-lime-400 text-xs font-semibold text-lime-400 hover:bg-lime-500/10 transition flex items-center justify-center gap-1.5">
                  Sign in
                  <svg class="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>

              <!-- Admin Portal Card -->
              <div class="p-5 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-blue-500/50 transition flex flex-col items-center text-center group">
                <div class="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-105 transition">
                  <svg class="w-6 h-6 sync-icon" viewBox="0 0 24 24" stroke-width="1.8">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3 class="text-sm font-bold text-blue-400 mb-1">Admin Portal</h3>
                <p class="text-[11px] text-slate-400 mb-4 leading-relaxed">
                  Manage users, academics, reports and system settings.
                </p>
                <button onclick="selectPortalAndSignIn('Admin')" 
                        class="mt-auto w-full py-2 px-4 rounded-xl border border-blue-500/40 hover:border-blue-400 text-xs font-semibold text-blue-400 hover:bg-blue-500/10 transition flex items-center justify-center gap-1.5">
                  Sign in
                  <svg class="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>

              <!-- Teacher Portal Card -->
              <div class="p-5 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-purple-500/50 transition flex flex-col items-center text-center group">
                <div class="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-105 transition">
                  <svg class="w-6 h-6 sync-icon" viewBox="0 0 24 24" stroke-width="1.8">
                    <rect x="2" y="3" width="20" height="12" rx="2"/>
                    <circle cx="12" cy="19" r="2"/>
                    <path d="M12 9v4"/>
                  </svg>
                </div>
                <h3 class="text-sm font-bold text-purple-400 mb-1">Teacher Portal</h3>
                <p class="text-[11px] text-slate-400 mb-4 leading-relaxed">
                  Manage classes, students, assignments and evaluations.
                </p>
                <button onclick="selectPortalAndSignIn('Teacher')" 
                        class="mt-auto w-full py-2 px-4 rounded-xl border border-purple-500/40 hover:border-purple-400 text-xs font-semibold text-purple-400 hover:bg-purple-500/10 transition flex items-center justify-center gap-1.5">
                  Sign in
                  <svg class="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>

              <!-- Parent Portal Card -->
              <div class="p-5 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-amber-500/50 transition flex flex-col items-center text-center group">
                <div class="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition">
                  <svg class="w-6 h-6 sync-icon" viewBox="0 0 24 24" stroke-width="1.8">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 class="text-sm font-bold text-amber-400 mb-1">Parent Portal</h3>
                <p class="text-[11px] text-slate-400 mb-4 leading-relaxed">
                  Track your child's progress, attendance, fees and more.
                </p>
                <button onclick="selectPortalAndSignIn('Parent')" 
                        class="mt-auto w-full py-2 px-4 rounded-xl border border-amber-500/40 hover:border-amber-400 text-xs font-semibold text-amber-400 hover:bg-amber-500/10 transition flex items-center justify-center gap-1.5">
                  Sign in
                  <svg class="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>

            </div>

            <!-- Divider & Create Account Button -->
            <div class="relative my-6 text-center">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-slate-800"></div>
              </div>
              <span class="relative px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase" style="background-color: var(--bg-card)">OR</span>
            </div>

            <button onclick="navigateTo('register-1')" class="w-full py-3 px-4 rounded-xl border border-slate-700/80 hover:border-slate-500 bg-slate-950/60 hover:bg-slate-900 text-xs font-bold text-white transition flex items-center justify-center gap-2">
              <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/>
              </svg>
              Create account
            </button>

            <div class="text-center mt-4 text-xs text-slate-400">
              Don't have an account? 
              <a href="#" onclick="navigateTo('register-1'); return false;" style="color: var(--brand-lime)" class="font-bold hover:underline ml-1">Sign up</a>
            </div>

          </div>
        </div>

      </div>
    </section>

    <section id="page-signin" class="page-section">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[75vh]">
        
        <!-- Left Branding & Graphic Column -->
        <div class="lg:col-span-6 space-y-6">
          <div class="space-y-3">
            <span style="color: var(--brand-lime)" class="text-xs font-extrabold tracking-widest uppercase block">
              WELCOME BACK!
            </span>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
              Sign in to continue <br />
              your <span style="color: var(--brand-lime)">learning journey</span>
            </h1>
            <p class="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed font-normal pt-1">
              Access your classes, assignments, grades and everything you need to succeed.
            </p>
          </div>

          <!-- Vertical Features List -->
          <div class="space-y-4">
            <div class="flex items-start gap-3.5">
              <div class="w-9 h-9 rounded-full border border-slate-800 bg-slate-900/80 flex items-center justify-center shrink-0 text-lime-400 shadow-sm mt-0.5">
                <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <div>
                <h3 class="text-xs font-bold text-white">Smart Learning</h3>
                <p class="text-[11px] text-slate-400">Personalized education for a better future.</p>
              </div>
            </div>

            <div class="flex items-start gap-3.5">
              <div class="w-9 h-9 rounded-full border border-slate-800 bg-slate-900/80 flex items-center justify-center shrink-0 text-lime-400 shadow-sm mt-0.5">
                <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h3 class="text-xs font-bold text-white">Secure & Trusted</h3>
                <p class="text-[11px] text-slate-400">Your data is protected with top security.</p>
              </div>
            </div>

            <div class="flex items-start gap-3.5">
              <div class="w-9 h-9 rounded-full border border-slate-800 bg-slate-900/80 flex items-center justify-center shrink-0 text-lime-400 shadow-sm mt-0.5">
                <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              </div>
              <div>
                <h3 class="text-xs font-bold text-white">Global Community</h3>
                <p class="text-[11px] text-slate-400">Connect, learn and grow together worldwide.</p>
              </div>
            </div>
          </div>

          <!-- Night Campus Graphic -->
          <div class="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex items-end">
            <svg class="w-full h-full absolute inset-0 object-cover pointer-events-none" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#03060c"/>
                  <stop offset="60%" stop-color="#0a1220"/>
                  <stop offset="100%" stop-color="#060c18"/>
                </linearGradient>
                <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#ffea79" stop-opacity="1"/>
                  <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.8"/>
                </radialGradient>
              </defs>
              <rect width="600" height="300" fill="url(#nightSky)"/>
              <circle cx="80" cy="40" r="1" fill="#ffffff" opacity="0.8"/>
              <circle cx="280" cy="35" r="1" fill="#ffffff" opacity="0.9"/>
              <path d="M480 40 A18 18 0 1 0 500 62 A15 15 0 1 1 480 40 Z" fill="#e2e8f0" opacity="0.85"/>
              <g>
                <rect x="250" y="100" width="100" height="150" fill="#070e1b"/>
                <polygon points="250,100 300,50 350,100" fill="#050a14"/>
                <circle cx="300" cy="80" r="8" fill="url(#windowGlow)"/>
                <rect x="150" y="130" width="100" height="120" fill="#08101f"/>
                <rect x="350" y="130" width="100" height="120" fill="#08101f"/>
                <rect x="170" y="150" width="12" height="18" rx="2" fill="url(#windowGlow)"/>
                <rect x="200" y="150" width="12" height="18" rx="2" fill="url(#windowGlow)"/>
                <rect x="370" y="150" width="12" height="18" rx="2" fill="url(#windowGlow)"/>
                <rect x="400" y="150" width="12" height="18" rx="2" fill="url(#windowGlow)"/>
                <path d="M 285 250 L 285 210 A 15 15 0 0 1 315 210 L 315 250 Z" fill="url(#windowGlow)"/>
              </g>
            </svg>
            <div class="relative m-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md flex items-center gap-3 z-10 shadow-lg">
              <div class="flex -space-x-2 overflow-hidden shrink-0">
                <img class="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Student 1" />
                <img class="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Student 2" />
                <img class="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Student 3" />
              </div>
              <div class="text-[11px] text-slate-300">
                <span style="color: var(--brand-lime)" class="font-extrabold">21,500+</span> learners already connected and growing.
              </div>
            </div>
          </div>
        </div>

        <!-- Right Sign In Form Card -->
        <div class="lg:col-span-6 flex justify-center lg:justify-end">
          <div class="w-full max-w-md rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl backdrop-blur-xl" style="background-color: var(--bg-card)">
            
            <div class="flex flex-col items-center text-center mb-6">
              <div class="w-12 h-12 rounded-full bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 mb-2 shadow-inner">
                <svg class="w-6 h-6 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <h2 class="text-2xl font-extrabold text-white">Sign in</h2>
              <p class="text-xs text-slate-400 mt-0.5">Enter your credentials to access your account</p>
            </div>

            <form onsubmit="handleSignInSubmit(event)" class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800 transition">
                  <div class="pl-3.5 text-slate-500">
                    <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <input type="email" id="signInEmail" required placeholder="Enter your email address" 
                         class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
                <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800 transition">
                  <div class="pl-3.5 text-slate-500">
                    <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <input type="password" id="signInPassword" required placeholder="Enter your password" 
                         class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                  <button type="button" onclick="togglePassword('signInPassword', 'signInEyeIcon')" class="pr-3.5 text-slate-500 hover:text-slate-300 transition">
                    <svg id="signInEyeIcon" class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <div class="flex justify-end mt-1.5">
                  <a href="#" onclick="showNotification('Password reset link has been dispatched to your email.'); return false;" style="color: var(--brand-lime)" class="text-[11px] font-semibold hover:underline">Forgot Password?</a>
                </div>
              </div>

              <div class="flex items-center gap-2 pt-0.5">
                <input type="checkbox" id="signInRemember" class="w-4 h-4 rounded border-slate-700 text-lime-500 focus:ring-0 cursor-pointer accent-lime-500" />
                <label for="signInRemember" class="text-xs text-slate-300 font-medium cursor-pointer select-none">Remember me</label>
              </div>

              <button type="submit" style="background-color: var(--brand-lime)" 
                      class="w-full py-3 px-4 rounded-xl text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-md mt-2">
                Sign in
                <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </form>

            <div class="relative my-5 text-center">
              <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-800"></div></div>
              <span class="relative px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase" style="background-color: var(--bg-card)">OR SIGN IN WITH</span>
            </div>

            <div class="space-y-2">
              <button onclick="showNotification('Connecting to Microsoft account...')" class="w-full py-2.5 px-4 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-950/60 hover:bg-slate-900 transition flex items-center justify-center gap-2.5 text-xs font-semibold text-slate-200">
                <svg class="w-4 h-4" viewBox="0 0 21 21"><rect x="1" y="1" width="9" height="9" fill="#f25022"/><rect x="11" y="1" width="9" height="9" fill="#7fba00"/><rect x="1" y="11" width="9" height="9" fill="#00a4ef"/><rect x="11" y="11" width="9" height="9" fill="#ffb900"/></svg>
                Continue with Microsoft
              </button>
              <button onclick="showNotification('Connecting to Apple ID...')" class="w-full py-2.5 px-4 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-950/60 hover:bg-slate-900 transition flex items-center justify-center gap-2.5 text-xs font-semibold text-slate-200">
                <svg class="w-4 h-4 fill-current text-white" viewBox="0 0 170 170"><path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.33.13-9.13-1.9-14.4-6.08-3.81-3.04-7.84-7.85-12.08-14.43-8.01-12.55-14.18-26.23-18.52-41.05-4.34-14.82-6.51-28.84-6.51-42.06 0-16.1 4.13-29.43 12.39-40 8.25-10.57 18.7-15.93 31.34-16.08 6.09 0 12.33 1.5 18.71 4.5 6.38 3 10.74 4.58 13.08 4.75 2.12-.25 6.64-1.84 13.56-4.75 6.93-2.92 13.09-4.29 18.5-4.12 10.08.51 18.61 3.99 25.59 10.43 6.98 6.44 11.45 14.7 13.41 24.78-11.87 7.12-17.7 16.88-17.49 29.28.21 9.84 4.03 18.15 11.45 24.93 7.42 6.78 16.29 10.43 26.61 10.95-2.03 6.02-4.66 12.28-7.88 18.78zm-30.88-106.6c0 6.61-2.42 12.98-7.25 19.11-4.83 6.13-10.87 9.88-18.12 11.25-.42-1.02-.63-2.12-.63-3.3 0-6.78 2.58-13.32 7.75-19.62 5.17-6.3 11.37-9.97 18.6-11.02.21.93.32 2.12.32 3.58z"/></svg>
                Continue with Apple
              </button>
            </div>

            <div class="text-center mt-5 text-xs text-slate-400">
              Don't have an account? 
              <a href="#" onclick="navigateTo('register-1'); return false;" style="color: var(--brand-lime)" class="font-bold hover:underline ml-1">Create Account</a>
            </div>

          </div>
        </div>

      </div>
    </section>

    <section id="registration-shell" class="hidden">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start min-h-[75vh]">
        
        <!-- Shared Registration Left Sidebar -->
        <div class="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
          <a href="#" onclick="navigateTo('home'); return false;" class="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition mb-2">
            <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to home
          </a>

          <div class="space-y-3">
            <span style="color: var(--brand-lime)" class="text-xs font-extrabold tracking-widest uppercase block">
              STUDENT SUCCESS, WORLDWIDE
            </span>
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-[1.12]">
              Every future <br />
              <span style="color: var(--brand-lime)">starts connected.</span>
            </h1>
            <p class="text-xs text-slate-400 leading-relaxed font-normal pt-1">
              Create your account to access everything you need. Choose your role and join our learning community.
            </p>
          </div>

          <!-- Feature Point Icons -->
          <div class="space-y-3.5 pt-2 border-t border-slate-800/80">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div>
                <h4 class="text-xs font-bold text-white">Smart Learning</h4>
                <p class="text-[11px] text-slate-400">Learn. Grow. Succeed.</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h4 class="text-xs font-bold text-white">Secure & Trusted</h4>
                <p class="text-[11px] text-slate-400">Your data is safe with us.</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              </div>
              <div>
                <h4 class="text-xs font-bold text-white">Global Community</h4>
                <p class="text-[11px] text-slate-400">Connect and learn worldwide.</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </div>
              <div>
                <h4 class="text-xs font-bold text-white">Better Outcomes</h4>
                <p class="text-[11px] text-slate-400">Track your progress and achieve more.</p>
              </div>
            </div>
          </div>

          <!-- Proof Badge -->
          <div class="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
            <div class="flex -space-x-2 overflow-hidden shrink-0">
              <img class="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Learner 1" />
              <img class="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Learner 2" />
              <img class="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Learner 3" />
              <img class="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Learner 4" />
            </div>
            <div>
              <div class="text-xs font-bold text-white flex items-center gap-1">
                <span style="color: var(--brand-lime)" class="font-extrabold text-sm">21,500+</span>
              </div>
              <p class="text-[10px] text-slate-400 leading-tight">
                learners already connected
              </p>
            </div>
          </div>

        </div>

        <div class="lg:col-span-8">
          <div class="rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl backdrop-blur-xl" style="background-color: var(--bg-card)">
            
            <!-- Step Card Header -->
            <div class="flex flex-col items-center text-center mb-8">
              <div class="w-12 h-12 rounded-full bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 mb-2">
                <svg class="w-6 h-6 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/>
                </svg>
              </div>
              <h2 class="text-2xl font-extrabold text-white">Create your account</h2>
              <p class="text-xs text-slate-400 mt-0.5">Join Bright Future School and start your journey</p>
            </div>

            <div class="relative mb-8 max-w-xl mx-auto px-2">
              <!-- Connector Line -->
              <div class="absolute top-4 left-6 right-6 h-[2px] bg-slate-800 -z-0"></div>
              
              <div class="flex justify-between items-center relative z-10">
                <!-- Step 1 Badge -->
                <div onclick="navigateTo('register-1')" class="flex flex-col items-center cursor-pointer group">
                  <div id="step-badge-1" class="w-8 h-8 rounded-full border-2 border-lime-500 bg-slate-950 flex items-center justify-center text-xs font-bold text-lime-400 transition">
                    1
                  </div>
                  <span id="step-label-1" class="text-[11px] font-semibold text-lime-400 mt-1.5 transition">Account Info</span>
                </div>

                <!-- Step 2 Badge -->
                <div onclick="navigateTo('register-2')" class="flex flex-col items-center cursor-pointer group">
                  <div id="step-badge-2" class="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-950 flex items-center justify-center text-xs font-bold text-slate-400 transition">
                    2
                  </div>
                  <span id="step-label-2" class="text-[11px] font-semibold text-slate-400 mt-1.5 transition">Personal Info</span>
                </div>

                <!-- Step 3 Badge -->
                <div onclick="navigateTo('register-3')" class="flex flex-col items-center cursor-pointer group">
                  <div id="step-badge-3" class="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-950 flex items-center justify-center text-xs font-bold text-slate-400 transition">
                    3
                  </div>
                  <span id="step-label-3" class="text-[11px] font-semibold text-slate-400 mt-1.5 transition">Contact Info</span>
                </div>

                <!-- Step 4 Badge -->
                <div onclick="navigateTo('register-4')" class="flex flex-col items-center cursor-pointer group">
                  <div id="step-badge-4" class="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-950 flex items-center justify-center text-xs font-bold text-slate-400 transition">
                    4
                  </div>
                  <span id="step-label-4" class="text-[11px] font-semibold text-slate-400 mt-1.5 transition">Review</span>
                </div>
              </div>
            </div>

            <div id="step-content-1" class="step-view">
              <h3 class="text-sm font-bold text-white mb-4">Account Information</h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <div class="pl-3.5 text-slate-500">
                      <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <input type="text" id="regFullName" value="Muhammad Faizan Haider" placeholder="Enter your full name" 
                           class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <div class="pl-3.5 text-slate-500">
                      <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <input type="email" id="regEmail" value="faizan.haider@example.com" placeholder="Enter your email address" 
                           class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Create Password</label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <div class="pl-3.5 text-slate-500">
                      <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <input type="password" id="regPassword" value="Password123!" placeholder="Create a strong password" 
                           class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                    <button type="button" onclick="togglePassword('regPassword', 'regEye1')" class="pr-3.5 text-slate-500 hover:text-slate-300">
                      <svg id="regEye1" class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Confirm Password</label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <div class="pl-3.5 text-slate-500">
                      <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <input type="password" id="regConfirmPassword" value="Password123!" placeholder="Confirm your password" 
                           class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                    <button type="button" onclick="togglePassword('regConfirmPassword', 'regEye2')" class="pr-3.5 text-slate-500 hover:text-slate-300">
                      <svg id="regEye2" class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </div>
                </div>
              </div>

              <p class="text-[11px] text-slate-500 mb-6">Min. 8 characters with letters, numbers & symbols</p>

              <!-- Role Selector Cards Grid -->
              <h3 class="text-xs font-bold text-slate-300 mb-3">Select Your Role</h3>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                
                <!-- Student Card -->
                <div id="role-card-Student" onclick="selectRole('Student')" class="role-card-selected p-3.5 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-slate-600 transition cursor-pointer flex flex-col items-center text-center relative">
                  <div class="absolute top-2.5 right-2.5 w-4 h-4 rounded-full border-2 border-lime-500 flex items-center justify-center">
                    <div id="role-dot-Student" class="w-2 h-2 rounded-full bg-lime-500"></div>
                  </div>
                  <div class="w-9 h-9 rounded-full bg-lime-500/10 text-lime-400 flex items-center justify-center my-1">
                    <svg class="w-5 h-5 sync-icon" viewBox="0 0 24 24" stroke-width="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg>
                  </div>
                  <h4 class="text-xs font-bold text-white mt-1">Student</h4>
                  <p class="text-[10px] text-slate-400 mt-1 leading-tight">Access classes, assignments, results.</p>
                </div>

                <!-- Teacher Card -->
                <div id="role-card-Teacher" onclick="selectRole('Teacher')" class="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-slate-600 transition cursor-pointer flex flex-col items-center text-center relative">
                  <div class="absolute top-2.5 right-2.5 w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center">
                    <div id="role-dot-Teacher" class="w-2 h-2 rounded-full bg-transparent"></div>
                  </div>
                  <div class="w-9 h-9 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center my-1">
                    <svg class="w-5 h-5 sync-icon" viewBox="0 0 24 24" stroke-width="1.8"><rect x="2" y="3" width="20" height="12" rx="2"/><circle cx="12" cy="19" r="2"/><path d="M12 9v4"/></svg>
                  </div>
                  <h4 class="text-xs font-bold text-white mt-1">Teacher</h4>
                  <p class="text-[10px] text-slate-400 mt-1 leading-tight">Manage classes, students, assignments.</p>
                </div>

                <!-- Parent Card -->
                <div id="role-card-Parent" onclick="selectRole('Parent')" class="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-slate-600 transition cursor-pointer flex flex-col items-center text-center relative">
                  <div class="absolute top-2.5 right-2.5 w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center">
                    <div id="role-dot-Parent" class="w-2 h-2 rounded-full bg-transparent"></div>
                  </div>
                  <div class="w-9 h-9 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center my-1">
                    <svg class="w-5 h-5 sync-icon" viewBox="0 0 24 24" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <h4 class="text-xs font-bold text-white mt-1">Parent</h4>
                  <p class="text-[10px] text-slate-400 mt-1 leading-tight">Track attendance, progress & fees.</p>
                </div>

                <!-- Admin Card -->
                <div id="role-card-Admin" onclick="selectRole('Admin')" class="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-slate-600 transition cursor-pointer flex flex-col items-center text-center relative">
                  <div class="absolute top-2.5 right-2.5 w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center">
                    <div id="role-dot-Admin" class="w-2 h-2 rounded-full bg-transparent"></div>
                  </div>
                  <div class="w-9 h-9 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center my-1">
                    <svg class="w-5 h-5 sync-icon" viewBox="0 0 24 24" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <h4 class="text-xs font-bold text-white mt-1">Admin</h4>
                  <p class="text-[10px] text-slate-400 mt-1 leading-tight">Manage users, academics & settings.</p>
                </div>

              </div>

              <!-- Terms Checkbox -->
              <div class="flex items-center gap-2 mb-6">
                <input type="checkbox" id="regTerms" checked class="w-4 h-4 rounded border-slate-700 text-lime-500 focus:ring-0 cursor-pointer accent-lime-500" />
                <label for="regTerms" class="text-xs text-slate-300 font-medium select-none">
                  I agree to the <a href="#" onclick="showNotification('Terms of Service'); return false;" style="color: var(--brand-lime)" class="hover:underline">Terms of Service</a> and <a href="#" onclick="showNotification('Privacy Policy'); return false;" style="color: var(--brand-lime)" class="hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button onclick="navigateTo('register-2')" style="background-color: var(--brand-lime)" class="w-full py-3 px-4 rounded-xl text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-md">
                Next
                <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>

            <div id="step-content-2" class="step-view hidden">
              <h3 class="text-sm font-bold text-white mb-1">Personal Information</h3>
              <p class="text-xs text-slate-400 mb-5">Please provide your personal details.</p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Date of Birth</label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <div class="pl-3.5 text-slate-500">
                      <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <input type="text" id="regDob" value="15 March 2002" placeholder="Select your date of birth" 
                           class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Gender</label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <select id="regGender" class="w-full bg-transparent px-3 py-2.5 text-xs text-white focus:outline-none cursor-pointer">
                      <option value="Male" class="bg-slate-900 text-white" selected>Male</option>
                      <option value="Female" class="bg-slate-900 text-white">Female</option>
                      <option value="Other" class="bg-slate-900 text-white">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Nationality</label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <select id="regNationality" class="w-full bg-transparent px-3 py-2.5 text-xs text-white focus:outline-none cursor-pointer">
                      <option value="Pakistani" class="bg-slate-900 text-white" selected>Pakistani</option>
                      <option value="American" class="bg-slate-900 text-white">American</option>
                      <option value="British" class="bg-slate-900 text-white">British</option>
                      <option value="Canadian" class="bg-slate-900 text-white">Canadian</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Address</label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <div class="pl-3.5 text-slate-500">
                      <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <input type="text" id="regAddress" value="House # 123, Street 5, Sector F-11/2" placeholder="Enter your full address" 
                           class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">City</label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <div class="pl-3.5 text-slate-500">
                      <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="6" x2="9" y2="6"/><line x1="15" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="9" y2="10"/><line x1="15" y1="10" x2="15" y2="10"/></svg>
                    </div>
                    <input type="text" id="regCity" value="Islamabad" placeholder="Enter your city" 
                           class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">State / Province</label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <div class="pl-3.5 text-slate-500">
                      <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-3"/></svg>
                    </div>
                    <input type="text" id="regState" value="ICT" placeholder="Enter state / province" 
                           class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Postal Code</label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <div class="pl-3.5 text-slate-500">
                      <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h12"/></svg>
                    </div>
                    <input type="text" id="regPostalCode" value="44000" placeholder="Enter postal code" 
                           class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                  </div>
                </div>
              </div>

              <!-- Profile Picture Upload Area -->
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">Profile Picture <span class="text-slate-500 font-normal">(Optional)</span></label>
              <div onclick="triggerFileUpload()" class="border-2 border-dashed border-slate-800 hover:border-slate-600 rounded-2xl p-4 bg-slate-950/40 hover:bg-slate-950/80 transition cursor-pointer flex items-center justify-between gap-4 mb-6 group">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-lime-400 transition">
                    <svg class="w-5 h-5 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  </div>
                  <div>
                    <span class="text-xs font-semibold text-white">Click to upload</span>
                    <span class="text-xs text-slate-400"> or drag and drop</span>
                    <p class="text-[10px] text-slate-500 mt-0.5">JPG, PNG or WEBP (Max. 2MB)</p>
                  </div>
                </div>
                <div class="w-10 h-10 rounded-full bg-slate-900 overflow-hidden shrink-0 border border-slate-700 flex items-center justify-center">
                  <img id="profileImagePreview" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Preview" class="w-full h-full object-cover" />
                </div>
                <input type="file" id="profileFileInput" accept="image/*" class="hidden" onchange="handleImageSelected(event)" />
              </div>

              <!-- Step 2 Actions -->
              <div class="flex items-center gap-3">
                <button onclick="navigateTo('register-1')" class="w-1/3 py-3 px-4 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-950/60 text-xs font-bold text-white transition flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                  Back
                </button>
                <button onclick="navigateTo('register-3')" style="background-color: var(--brand-lime)" class="w-2/3 py-3 px-4 rounded-xl text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-md">
                  Next
                  <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>

              <div class="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 mt-4">
                <svg class="w-3.5 h-3.5 text-lime-400 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 12 14 22 4"/></svg>
                Your information is safe with us and will never be shared.
              </div>
            </div>

            <div id="step-content-3" class="step-view hidden">
              <h3 class="text-sm font-bold text-white mb-1">Contact Information</h3>
              <p class="text-xs text-slate-400 mb-5">Please provide your contact details so we can stay in touch with you.</p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <!-- Country Code Badge -->
                    <div class="pl-3 pr-2 py-2 flex items-center gap-1.5 text-xs text-slate-300 border-r border-slate-800 shrink-0">
                      <svg class="w-4 h-3 rounded-sm overflow-hidden" viewBox="0 0 600 400">
                        <rect width="600" height="400" fill="#006600"/>
                        <rect width="150" height="400" fill="#ffffff"/>
                        <circle cx="375" cy="200" r="100" fill="#ffffff"/>
                        <circle cx="400" cy="180" r="90" fill="#006600"/>
                        <polygon points="400,140 408,162 430,162 412,175 418,197 400,183 382,197 388,175 370,162 392,162" fill="#ffffff"/>
                      </svg>
                      <span>+92</span>
                      <svg class="w-3 h-3 text-slate-500 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                    <input type="text" id="regPhone" value="312 3456789" placeholder="Enter your phone number" 
                           class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Alternate Phone <span class="text-slate-500 font-normal">(Optional)</span></label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <div class="pl-3.5 text-slate-500 text-xs font-medium border-r border-slate-800 pr-2">+92</div>
                    <input type="text" id="regAltPhone" value="333 9876543" placeholder="Enter alternate phone number" 
                           class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Emergency Contact Name <span class="text-slate-500 font-normal">(Optional)</span></label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <div class="pl-3.5 text-slate-500">
                      <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <input type="text" id="regEmergName" placeholder="Enter emergency contact name" 
                           class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Emergency Contact Number <span class="text-slate-500 font-normal">(Optional)</span></label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <div class="pl-3.5 text-slate-500 text-xs font-medium border-r border-slate-800 pr-2">+92</div>
                    <input type="text" id="regEmergPhone" placeholder="Enter emergency contact number" 
                           class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <div class="pl-3.5 text-slate-500">
                      <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <input type="email" id="regContactEmail" value="faizan.haider@example.com" placeholder="Confirm your contact email" 
                           class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Alternate Email <span class="text-slate-500 font-normal">(Optional)</span></label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <div class="pl-3.5 text-slate-500">
                      <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <input type="email" id="regAltEmail" placeholder="Enter alternate email address" 
                           class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Communication Method</label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <select id="regPrefComm" class="w-full bg-transparent px-3 py-2.5 text-xs text-white focus:outline-none cursor-pointer">
                      <option value="Email" class="bg-slate-900 text-white" selected>Email</option>
                      <option value="SMS" class="bg-slate-900 text-white">SMS / Phone Call</option>
                      <option value="WhatsApp" class="bg-slate-900 text-white">WhatsApp</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Best Time to Contact You</label>
                  <div class="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                    <select id="regBestTime" class="w-full bg-transparent px-3 py-2.5 text-xs text-white focus:outline-none cursor-pointer">
                      <option value="Evening (6 PM - 9 PM)" class="bg-slate-900 text-white" selected>Evening (6 PM – 9 PM)</option>
                      <option value="Morning (9 AM - 12 PM)" class="bg-slate-900 text-white">Morning (9 AM – 12 PM)</option>
                      <option value="Afternoon (12 PM - 5 PM)" class="bg-slate-900 text-white">Afternoon (12 PM – 5 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Communication Address -->
              <div class="mb-6">
                <label class="block text-xs font-semibold text-slate-300 mb-1.5">Communication Address</label>
                <div class="relative flex items-start input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                  <div class="pl-3.5 pt-3 text-slate-500">
                    <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <textarea id="regCommAddress" rows="2" placeholder="Enter your communication address" 
                            class="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none resize-none">House # 123, Street 5, Sector F-11/2, Islamabad, Pakistan</textarea>
                </div>
              </div>

              <!-- Step 3 Actions -->
              <div class="flex items-center gap-3">
                <button onclick="navigateTo('register-2')" class="w-1/3 py-3 px-4 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-950/60 text-xs font-bold text-white transition flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                  Back
                </button>
                <button onclick="navigateTo('register-4')" style="background-color: var(--brand-lime)" class="w-2/3 py-3 px-4 rounded-xl text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-md">
                  Next
                  <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>

              <div class="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 mt-4">
                <svg class="w-3.5 h-3.5 text-lime-400 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 12 14 22 4"/></svg>
                Your information is safe with us and will never be shared.
              </div>
            </div>

            <div id="step-content-4" class="step-view hidden">
              <h3 class="text-sm font-bold text-white mb-1">Review Your Information</h3>
              <p class="text-xs text-slate-400 mb-5">Please review your details before creating your account.</p>

              <!-- Review Card 1: Account Info -->
              <div class="p-4 rounded-2xl border border-slate-800 bg-slate-950/50 mb-4 relative">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-lg bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400">
                      <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <h4 class="text-xs font-bold text-white">Account Information</h4>
                  </div>
                  <button onclick="navigateTo('register-1')" style="color: var(--brand-lime)" class="text-xs font-bold hover:underline flex items-center gap-1">
                    Edit
                    <svg class="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span class="text-[10px] text-slate-500 block">Full Name</span>
                    <span id="revFullName" class="font-semibold text-white">Muhammad Faizan Haider</span>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-500 block">Email Address</span>
                    <span id="revEmail" class="font-semibold text-white">faizan.haider@example.com</span>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-500 block mb-1">Selected Role</span>
                    <span id="revRoleBadge" class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-bold">
                      <svg class="w-3 h-3 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/></svg>
                      Student
                    </span>
                  </div>
                </div>
              </div>

              <!-- Review Card 2: Personal Info -->
              <div class="p-4 rounded-2xl border border-slate-800 bg-slate-950/50 mb-4 relative">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-lg bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400">
                      <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <h4 class="text-xs font-bold text-white">Personal Information</h4>
                  </div>
                  <button onclick="navigateTo('register-2')" style="color: var(--brand-lime)" class="text-xs font-bold hover:underline flex items-center gap-1">
                    Edit
                    <svg class="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3">
                  <div>
                    <span class="text-[10px] text-slate-500 block">Date of Birth</span>
                    <span id="revDob" class="font-semibold text-white">15 March 2002</span>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-500 block">Gender</span>
                    <span id="revGender" class="font-semibold text-white">Male</span>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-500 block">Nationality</span>
                    <span id="revNationality" class="font-semibold text-white">Pakistani</span>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-500 block">Address</span>
                    <span id="revAddress" class="font-semibold text-white truncate block">House # 123, Street 5, Sector F-11/2</span>
                  </div>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs items-center">
                  <div>
                    <span class="text-[10px] text-slate-500 block">City</span>
                    <span id="revCity" class="font-semibold text-white">Islamabad</span>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-500 block">State / Province</span>
                    <span id="revState" class="font-semibold text-white">ICT</span>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-500 block">Postal Code</span>
                    <span id="revPostalCode" class="font-semibold text-white">44000</span>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-500 block mb-1">Profile Picture</span>
                    <img id="revProfilePic" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Profile" class="w-7 h-7 rounded-full object-cover border border-slate-700" />
                  </div>
                </div>
              </div>

              <!-- Review Card 3: Contact Info -->
              <div class="p-4 rounded-2xl border border-slate-800 bg-slate-950/50 mb-4 relative">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-lg bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400">
                      <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <h4 class="text-xs font-bold text-white">Contact Information</h4>
                  </div>
                  <button onclick="navigateTo('register-3')" style="color: var(--brand-lime)" class="text-xs font-bold hover:underline flex items-center gap-1">
                    Edit
                    <svg class="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3">
                  <div>
                    <span class="text-[10px] text-slate-500 block">Phone Number</span>
                    <span id="revPhone" class="font-semibold text-white">+92 312 3456789</span>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-500 block">Alternate Phone</span>
                    <span id="revAltPhone" class="font-semibold text-white">+92 333 9876543</span>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-500 block">Email Address</span>
                    <span id="revContactEmail" class="font-semibold text-white truncate block">faizan.haider@example.com</span>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-500 block">Best Time to Contact</span>
                    <span id="revBestTime" class="font-semibold text-white">Evening (6 PM – 9 PM)</span>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span class="text-[10px] text-slate-500 block">Preferred Method</span>
                    <span id="revPrefMethod" class="font-semibold text-white">Email</span>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-500 block">Communication Address</span>
                    <span id="revCommAddress" class="font-semibold text-white truncate block">House # 123, Street 5, Sector F-11/2, Islamabad, Pakistan</span>
                  </div>
                </div>
              </div>

              <!-- Security Notice Banner -->
              <div class="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 mb-6">
                <div class="w-7 h-7 rounded-full bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 shrink-0 mt-0.5">
                  <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <div class="text-[11px] text-slate-400 leading-relaxed">
                  <span class="text-white font-semibold block mb-0.5">Your information is safe with us and will never be shared.</span>
                  By creating an account, you agree to our <a href="#" style="color: var(--brand-lime)" class="hover:underline">Terms of Service</a> and <a href="#" style="color: var(--brand-lime)" class="hover:underline">Privacy Policy</a>.
                </div>
              </div>

              <!-- Final Submit Step 4 Actions -->
              <div class="flex items-center gap-3">
                <button onclick="navigateTo('register-3')" class="w-1/3 py-3 px-4 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-950/60 text-xs font-bold text-white transition flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                  Back
                </button>
                <button onclick="handleFinalAccountCreation()" style="background-color: var(--brand-lime)" class="w-2/3 py-3 px-4 rounded-xl text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-md">
                  <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/></svg>
                  Create Account
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>

  </main>

  <footer class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 border-t border-slate-800/40 mt-6 z-10">
    <div>
      © 2025 Bright Future School. All rights reserved.
    </div>

    <div class="flex items-center gap-4 sm:gap-6">
      <a href="#" onclick="showNotification('Privacy Policy Document'); return false;" class="hover:text-slate-200 transition">Privacy Policy</a>
      <span class="text-slate-700">|</span>
      <a href="#" onclick="showNotification('Terms of Service Document'); return false;" class="hover:text-slate-200 transition">Terms of Service</a>
      <span class="text-slate-700">|</span>
      <a href="#" onclick="showNotification('Help Center & Support Desk'); return false;" class="hover:text-slate-200 transition">Help Center</a>
    </div>
  </footer>

  <!-- Notification Toast Modal -->
  <div id="toastNotification" class="fixed bottom-6 right-6 z-50 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none">
    <div class="px-4 py-3 rounded-2xl bg-slate-900/95 border border-lime-500/50 shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs text-white">
      <div class="w-6 h-6 rounded-full bg-lime-500/20 text-lime-400 flex items-center justify-center shrink-0">
        <svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span id="toastText">Action completed successfully.</span>
    </div>
  </div>

  <script>
    let selectedRole = 'Student';
    let currentThemeIndex = 0;
    const themes = ['dark', 'light', 'night'];

    // DOM Elements Mapping
    const pageHome = document.getElementById('page-home');
    const pageSignIn = document.getElementById('page-signin');
    const registrationShell = document.getElementById('registration-shell');

    // Navigation Router
    function navigateTo(pageId) {
      // Hide all main page views
      pageHome.classList.remove('active');
      pageSignIn.classList.remove('active');
      registrationShell.classList.add('hidden');

      const navQuestionText = document.getElementById('navQuestionText');
      const navActionLabel = document.getElementById('navActionLabel');

      if (pageId === 'home') {
        pageHome.classList.add('active');
        navQuestionText.textContent = "Don't have an account?";
        navActionLabel.textContent = "Create account";
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } 
      else if (pageId === 'signin') {
        pageSignIn.classList.add('active');
        navQuestionText.textContent = "Don't have an account?";
        navActionLabel.textContent = "Create account";
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } 
      else if (pageId.startsWith('register')) {
        registrationShell.classList.remove('hidden');
        registrationShell.classList.add('active');
        navQuestionText.textContent = "Already have an account?";
        navActionLabel.textContent = "Sign in";

        // Determine step index
        const stepNum = pageId.split('-')[1] || '1';
        switchRegistrationStep(parseInt(stepNum));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // Portal Click Quick Action
    function selectPortalAndSignIn(roleName) {
      selectRole(roleName);
      navigateTo('signin');
      showNotification(`Redirected to ${roleName} Portal sign in.`);
    }

    // Header Nav Action Logic
    function handleNavAction() {
      const navActionLabel = document.getElementById('navActionLabel').textContent;
      if (navActionLabel.includes('Sign in')) {
        navigateTo('signin');
      } else {
        navigateTo('register-1');
      }
    }

    // Role Selection Logic
    function selectRole(role) {
      selectedRole = role;
      const roles = ['Student', 'Teacher', 'Parent', 'Admin'];

      roles.forEach(r => {
        const card = document.getElementById(`role-card-${r}`);
        const dot = document.getElementById(`role-dot-${r}`);

        if (r === role) {
          card.classList.add('role-card-selected');
          dot.className = "w-2 h-2 rounded-full bg-lime-500";
        } else {
          card.classList.remove('role-card-selected');
          dot.className = "w-2 h-2 rounded-full bg-transparent";
        }
      });
    }

    // Step Wizard Switching Logic
    function switchRegistrationStep(step) {
      // Hide step contents
      for (let i = 1; i <= 4; i++) {
        const content = document.getElementById(`step-content-${i}`);
        const badge = document.getElementById(`step-badge-${i}`);
        const label = document.getElementById(`step-label-${i}`);

        content.classList.add('hidden');

        if (i < step) {
          // Completed step state
          badge.className = "w-8 h-8 rounded-full bg-lime-500/20 border-2 border-lime-500 flex items-center justify-center text-xs font-bold text-lime-400 transition";
          badge.innerHTML = `<svg class="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`;
          label.className = "text-[11px] font-semibold text-lime-400 mt-1.5 transition";
        } else if (i === step) {
          // Current step state
          badge.className = "w-8 h-8 rounded-full border-2 border-lime-500 bg-slate-950 flex items-center justify-center text-xs font-bold text-lime-400 transition";
          badge.textContent = i;
          label.className = "text-[11px] font-semibold text-lime-400 mt-1.5 transition";
        } else {
          // Future step state
          badge.className = "w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-950 flex items-center justify-center text-xs font-bold text-slate-400 transition";
          badge.textContent = i;
          label.className = "text-[11px] font-semibold text-slate-400 mt-1.5 transition";
        }
      }

      // Show active step content
      document.getElementById(`step-content-${step}`).classList.remove('hidden');

      // Populate Step 4 Review Page if navigating to Step 4
      if (step === 4) {
        populateReviewData();
      }
    }

    // Populate Review Data dynamically from input fields
    function populateReviewData() {
      document.getElementById('revFullName').textContent = document.getElementById('regFullName').value || 'Muhammad Faizan Haider';
      document.getElementById('revEmail').textContent = document.getElementById('regEmail').value || 'faizan.haider@example.com';
      document.getElementById('revRoleBadge').innerHTML = `
        <svg class="w-3 h-3 sync-icon" viewBox="0 0 24 24" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/></svg>
        ${selectedRole}
      `;

      document.getElementById('revDob').textContent = document.getElementById('regDob').value || '15 March 2002';
      document.getElementById('revGender').textContent = document.getElementById('regGender').value || 'Male';
      document.getElementById('revNationality').textContent = document.getElementById('regNationality').value || 'Pakistani';
      document.getElementById('revAddress').textContent = document.getElementById('regAddress').value || 'House # 123, Street 5, Sector F-11/2';
      document.getElementById('revCity').textContent = document.getElementById('regCity').value || 'Islamabad';
      document.getElementById('revState').textContent = document.getElementById('regState').value || 'ICT';
      document.getElementById('revPostalCode').textContent = document.getElementById('regPostalCode').value || '44000';

      document.getElementById('revPhone').textContent = '+92 ' + (document.getElementById('regPhone').value || '312 3456789');
      document.getElementById('revAltPhone').textContent = '+92 ' + (document.getElementById('regAltPhone').value || '333 9876543');
      document.getElementById('revContactEmail').textContent = document.getElementById('regContactEmail').value || 'faizan.haider@example.com';
      document.getElementById('revBestTime').textContent = document.getElementById('regBestTime').value || 'Evening (6 PM – 9 PM)';
      document.getElementById('revPrefMethod').textContent = document.getElementById('regPrefComm').value || 'Email';
      document.getElementById('revCommAddress').textContent = document.getElementById('regCommAddress').value || 'House # 123, Street 5, Sector F-11/2, Islamabad, Pakistan';
    }

    // Password Visibility Toggle Utility
    function togglePassword(inputId, eyeIconId) {
      const input = document.getElementById(inputId);
      const eyeIcon = document.getElementById(eyeIconId);

      if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`;
      } else {
        input.type = 'password';
        eyeIcon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
      }
    }

    // Profile Image Upload Helper
    function triggerFileUpload() {
      document.getElementById('profileFileInput').click();
    }

    function handleImageSelected(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById('profileImagePreview').src = e.target.result;
          document.getElementById('revProfilePic').src = e.target.result;
          showNotification('Profile picture updated!');
        };
        reader.readAsDataURL(file);
      }
    }

    // Form Submissions
    function handleSignInSubmit(e) {
      e.preventDefault();
      showNotification('Signed in successfully! Redirecting to your dashboard...');
    }

    function handleFinalAccountCreation() {
      showNotification('Congratulations! Your account has been created successfully.');
      setTimeout(() => {
        navigateTo('home');
      }, 2000);
    }

    // Notification Toast Helper
    function showNotification(msg) {
      const toast = document.getElementById('toastNotification');
      const toastText = document.getElementById('toastText');
      
      toastText.textContent = msg;
      toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');

      setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
      }, 3500);
    }

    // Theme Switcher Engine (Dark -> Light -> Night)
    function toggleNextTheme() {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      const theme = themes[currentThemeIndex];

      document.documentElement.setAttribute('data-theme', theme);
      const themeIcon = document.getElementById('themeIcon');

      function applyTheme(theme) {
    const themeIcon = document.getElementById("themeIcon");

    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "dark") {
        document.documentElement.classList.add("dark");
        themeIcon.innerHTML = `
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        `;
    } 
    else if (theme === "light") {
        document.documentElement.classList.remove("dark");
        themeIcon.innerHTML = `
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        `;
    } 
    else if (theme === "night") {
        document.documentElement.classList.add("dark");
        themeIcon.innerHTML = `
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        `;
    }

    localStorage.setItem("theme", theme);

    if (typeof showNotification === "function") {
        showNotification(`Switched to ${theme.toUpperCase()} mode.`);
    }
}