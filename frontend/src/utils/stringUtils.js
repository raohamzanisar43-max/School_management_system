export function initials(name) {
  return (name || '?').trim().split(/\s+/).map(n => n[0]).slice(0, 2).join('').toUpperCase();
}
