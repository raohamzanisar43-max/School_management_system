// Per-role accent tokens shared by the dashboard layout/ui components
// (Admin/Teacher/Student/Parent) so each role's chrome is themed consistently.
export const ACCENTS = {
  STUDENT: {
    text: 'text-lime-400',
    softBg: 'bg-lime-500/10',
    softBorder: 'border-lime-500/30',
    solid: 'bg-lime-500 hover:bg-lime-400 text-slate-950',
    ring: 'ring-lime-500/40',
    dot: 'bg-lime-400',
    activeBg: 'bg-lime-500/15',
    barColor: '#a3e635',
  },
  ADMIN: {
    text: 'text-blue-400',
    softBg: 'bg-blue-500/10',
    softBorder: 'border-blue-500/30',
    solid: 'bg-blue-500 hover:bg-blue-400 text-white',
    ring: 'ring-blue-500/40',
    dot: 'bg-blue-400',
    activeBg: 'bg-blue-500/15',
    barColor: '#60a5fa',
  },
  TEACHER: {
    text: 'text-purple-400',
    softBg: 'bg-purple-500/10',
    softBorder: 'border-purple-500/30',
    solid: 'bg-purple-500 hover:bg-purple-400 text-white',
    ring: 'ring-purple-500/40',
    dot: 'bg-purple-400',
    activeBg: 'bg-purple-500/15',
    barColor: '#c084fc',
  },
  PARENT: {
    text: 'text-violet-400',
    softBg: 'bg-violet-500/10',
    softBorder: 'border-violet-500/30',
    solid: 'bg-violet-500 hover:bg-violet-400 text-white',
    ring: 'ring-violet-500/40',
    dot: 'bg-violet-400',
    activeBg: 'bg-violet-500/15',
    barColor: '#a78bfa',
  },
};
