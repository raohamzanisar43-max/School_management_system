const SPECS_BY_ROLE = {
  STUDENT: {
    accentText: 'text-lime-400',
    accentBg: 'bg-lime-500',
    borderFocus: 'focus:border-lime-500/80 focus:ring-lime-500/20',
    btnBg: 'bg-lime-500 hover:bg-lime-400 text-slate-950 focus:ring-lime-500',
    badgeBg: 'bg-lime-500/10 border-lime-500/30 text-lime-400',
    badgeText: 'text-lime-400',
    iconCircle: 'border-lime-500 text-lime-400 bg-lime-500/5',
  },
  ADMIN: {
    accentText: 'text-blue-400',
    accentBg: 'bg-blue-500',
    borderFocus: 'focus:border-blue-500/80 focus:ring-blue-500/20',
    btnBg: 'bg-blue-500 hover:bg-blue-400 text-white focus:ring-blue-500',
    badgeBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    badgeText: 'text-blue-400',
    iconCircle: 'border-blue-500 text-blue-400 bg-blue-500/5',
  },
  TEACHER: {
    accentText: 'text-purple-400',
    accentBg: 'bg-purple-500',
    borderFocus: 'focus:border-purple-500/80 focus:ring-purple-500/20',
    btnBg: 'bg-purple-500 hover:bg-purple-400 text-white focus:ring-purple-500',
    badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    badgeText: 'text-purple-400',
    iconCircle: 'border-purple-500 text-purple-400 bg-purple-500/5',
  },
  PARENT: {
    accentText: 'text-amber-400',
    accentBg: 'bg-amber-500',
    borderFocus: 'focus:border-amber-500/80 focus:ring-amber-500/20',
    btnBg: 'bg-amber-600 hover:bg-amber-500 text-slate-950 focus:ring-amber-500',
    badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    badgeText: 'text-amber-400',
    iconCircle: 'border-amber-500 text-amber-400 bg-amber-500/5',
  },
};

export function getThemeSpecs(role) {
  return SPECS_BY_ROLE[role] || SPECS_BY_ROLE.STUDENT;
}
