import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  GraduationCap,
  Monitor,
  Presentation,
  Users,
  Globe,
  BookOpen,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  UserPlus,
  Moon,
} from "lucide-react";

const palette = {
  bg: "#09090b",
  panelBg: "#111114",
  panelBorder: "#232327",
  cardBg: "#0d0d10",
  green: "#a3e635",
  blue: "#60a5fa",
  purple: "#a78bfa",
  gold: "#fbbf24",
  textGray: "#9a9aa4",
  textFaint: "#6b6b73",
  divider: "#1c1c20",
};

const features = [
  { icon: Globe, title: "Global Community", subtitle: "Connect worldwide" },
  { icon: BookOpen, title: "Smart Learning", subtitle: "Learn. Grow. Succeed." },
  { icon: ShieldCheck, title: "Secure & Trusted", subtitle: "Your data is safe" },
  { icon: TrendingUp, title: "Better Outcomes", subtitle: "Track your progress" },
];

const portals = [
  {
    key: "student",
    title: "Student Portal",
    desc: "Access your classes, assignments, results, timetable and more.",
    icon: GraduationCap,
    color: palette.green,
  },
  {
    key: "admin",
    title: "Admin Portal",
    desc: "Manage users, academics, reports and system settings.",
    icon: Monitor,
    color: palette.blue,
  },
  {
    key: "teacher",
    title: "Teacher Portal",
    desc: "Manage classes, students, assignments and evaluations.",
    icon: Presentation,
    color: palette.purple,
  },
  {
    key: "parent",
    title: "Parent Portal",
    desc: "Track your child's progress, attendance, fees and more.",
    icon: Users,
    color: palette.gold,
  },
];

const avatarColors = ["#f59e0b", "#f472b6", "#60a5fa", "#a78bfa"];

function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const AdminIcon = ({ color }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="20" height="14" rx="1.5" stroke={color} strokeWidth="2" />
    <line x1="9" y1="19" x2="9" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="17" y1="19" x2="17" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="22" x2="18" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="13" cy="9.5" r="2" stroke={color} strokeWidth="1.5" />
    <path d="M10 12.5C10 11.7 10.7 11 11.5 11H14.5C15.3 11 16 11.7 16 12.5V13C16 13.3 15.8 13.5 15.5 13.5H10.5C10.2 13.5 10 13.3 10 13V12.5Z" stroke={color} strokeWidth="1.5" fill="none" />
  </svg>
);

const TeacherIcon = ({ color }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Monitor/Screen background */}
    <rect x="8" y="3" width="15" height="12" rx="2" stroke={color} strokeWidth="2" fill="none" />
    
    {/* Person head */}
    <circle cx="6" cy="6" r="2.5" fill={color} />
    
    {/* Person body */}
    <rect x="4" y="9" width="4" height="5" rx="1.5" fill={color} />
    
    {/* Person pointing arm */}
    <path d="M 8 10 Q 12 8 15 6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    
    {/* Person legs */}
    <line x1="5" y1="14" x2="5" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="7" y1="14" x2="7" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ParentIcon = ({ color }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="6" r="2.5" fill={color} />
    <circle cx="17" cy="7" r="2.5" fill={color} />
    <path d="M6 10C6 9.44772 6.44772 9 7 9H11C11.5523 9 12 9.44772 12 10V15C12 15.5523 11.5523 16 11 16H7C6.44772 16 6 15.5523 6 15V10Z" fill={color} />
    <path d="M14 11C14 10.4477 14.4477 10 15 10H19C19.5523 10 20 10.4477 20 11V16C20 16.5523 19.5523 17 19 17H15C14.4477 17 14 16.5523 14 16V11Z" fill={color} />
  </svg>
);

function PortalCard({ portal, onSelect }) {
  const Icon = portal.icon;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={() => onSelect(portal.key)}
      className="rounded-xl p-6 flex flex-col text-left transition-all hover:scale-105"
      style={{
        background: palette.cardBg,
        border: `1px solid ${hexToRgba(portal.color, isHovered ? 0.5 : 0.25)}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
        style={{ background: hexToRgba(portal.color, 0.15) }}
      >
        {portal.key === "admin" ? (
          <AdminIcon color={portal.color} />
        ) : portal.key === "teacher" ? (
          <TeacherIcon color={portal.color} />
        ) : portal.key === "parent" ? (
          <ParentIcon color={portal.color} />
        ) : (
          <Icon size={26} color={portal.color} strokeWidth={1.8} />
        )}
      </div>
      <h3 className="font-semibold text-lg mb-2" style={{ color: portal.color }}>
        {portal.title}
      </h3>
      <p className="text-sm mb-6 flex-1 leading-relaxed" style={{ color: palette.textGray }}>
        {portal.desc}
      </p>
      <div className="w-full rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-medium"
        style={{
          border: `1px solid ${portal.color}`,
          color: portal.color,
          background: isHovered ? hexToRgba(portal.color, 0.08) : "transparent",
          transition: "all 0.2s ease",
        }}>
        Sign in <ArrowRight size={16} />
      </div>
    </button>
  );
}

export default function LoginPage() {
  const { switchRole } = useAuth();

  const handlePortalSelect = (key) => {
    switchRole(key.toUpperCase());
  };

  return (
    <div style={{ background: palette.bg, minHeight: "100vh" }} className="w-full font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 sm:px-10 py-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center">
            <GraduationCap size={22} color={palette.bg} strokeWidth={2} />
          </div>
          <span className="text-white font-bold tracking-wide text-sm sm:text-base">
            BRIGHT FUTURE SCHOOL
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm hidden sm:inline" style={{ color: palette.textGray }}>
            New here?
          </span>
          <button className="bg-white text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            Create account
          </button>
          <button
            className="w-12 h-6 rounded-full flex items-center px-1 relative"
            style={{ background: "#1c1c20" }}
            aria-label="Toggle theme"
          >
            <Moon size={11} color="#6b6b73" className="absolute left-1.5" />
            <div
              className="w-4 h-4 rounded-full ml-auto"
              style={{ background: palette.green }}
            />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="grid lg:grid-cols-2 gap-12 px-6 sm:px-10 pb-16 pt-8 max-w-7xl mx-auto">
        {/* Left column */}
        <div className="flex flex-col justify-center">
          <span
            className="text-xs font-semibold tracking-[0.25em] mb-5"
            style={{ color: palette.green }}
          >
            STUDENT SUCCESS, WORLDWIDE
          </span>

          <h1 className="text-white font-extrabold text-5xl sm:text-6xl leading-[1.05] tracking-tight">
            Every future
          </h1>
          <h1
            className="font-extrabold text-5xl sm:text-6xl leading-[1.05] tracking-tight mb-6"
            style={{ color: palette.green }}
          >
            starts connected.
          </h1>

          <p className="text-base sm:text-lg mb-10 max-w-md leading-relaxed" style={{ color: palette.textGray }}>
            A unified portal to access everything you need. Choose your portal
            and sign in to continue your learning journey.
          </p>

          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-8 mb-8"
            style={{ borderBottom: `1px solid ${palette.divider}` }}
          >
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex flex-col gap-2">
                  <Icon size={22} color="#e4e4e7" strokeWidth={1.5} />
                  <div className="text-white text-sm font-semibold">{f.title}</div>
                  <div className="text-xs" style={{ color: palette.textFaint }}>
                    {f.subtitle}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mb-12">
            <div className="flex -space-x-3">
              {avatarColors.map((c, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2"
                  style={{ background: c, borderColor: palette.bg }}
                />
              ))}
            </div>
            <span className="text-sm" style={{ color: palette.textGray }}>
              <span className="font-semibold" style={{ color: palette.green }}>
                21,500+
              </span>{" "}
              learners already connected
            </span>
          </div>

          <div className="text-sm flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4" style={{ color: palette.textFaint }}>
            <span>© 2025 All rights reserved.</span>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Help Center</a>
          </div>
        </div>

        {/* Right column - portal selection panel */}
        <div
          className="rounded-2xl p-6 sm:p-10 h-fit"
          style={{ background: palette.panelBg, border: `1px solid ${palette.panelBorder}` }}
        >
          <span
            className="text-xs font-semibold tracking-[0.25em]"
            style={{ color: palette.green }}
          >
            WELCOME BACK
          </span>
          <h2 className="text-white font-bold text-3xl mt-3 mb-2">Choose your portal</h2>
          <p className="text-sm mb-8" style={{ color: palette.textGray }}>
            Select your role to sign in to your account
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {portals.map((p) => (
              <PortalCard key={p.key} portal={p} onSelect={handlePortalSelect} />
            ))}
          </div>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: palette.divider }} />
            <span className="text-xs" style={{ color: palette.textFaint }}>
              OR
            </span>
            <div className="flex-1 h-px" style={{ background: palette.divider }} />
          </div>

          <button
            className="w-full rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-medium text-white transition-colors"
            style={{ border: `1px solid ${palette.panelBorder}` }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <UserPlus size={16} />
            Create account
          </button>

          <p className="text-center text-sm mt-6" style={{ color: palette.textGray }}>
            Don&apos;t have an account?{" "}
            <a href="#" className="font-medium" style={{ color: palette.green }}>
              Sign up
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
