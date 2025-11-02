// Application constants and configuration

export const APP_CONFIG = {
  name: 'Lume Studio',
  description: 'Creative Design Studio',
  url: 'https://lume-studio.com',
  author: 'Lume Studio Team',
} as const;

export const SOCIAL_LINKS = [
  {
    name: 'Twitter',
    href: '#',
    icon: 'twitter',
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: 'linkedin',
  },
  {
    name: 'Facebook',
    href: '#',
    icon: 'facebook',
  },
  {
    name: 'Threads',
    href: '#',
    icon: 'threads',
  },
  {
    name: 'Instagram',
    href: '#',
    icon: 'instagram',
  },
  {
    name: 'TikTok',
    href: '#',
    icon: 'tiktok',
  },
] as const;

export const CONTACT_INFO = {
  email: 'contact@lume-studio.com',
  phone: '+1 555-555-5555',
  address: '123 Main St, Anytown USA',
  addressUK: '123 Main St, Anytown UK',
} as const;

export const STATS_DATA = [
  {
    value: 120,
    label: 'Projects Launched',
  },
  {
    value: 40,
    label: 'Average Client Growth',
    suffix: '%',
  },
  {
    value: 5,
    label: 'Years in the Game',
    suffix: '+',
  },
] as const;

export const ANIMATION_CONFIG = {
  defaultDuration: 0.3,
  defaultDelay: 0.1,
  staggerDelay: 0.05,
  springConfig: {
    type: 'spring',
    bounce: 0.3,
    duration: 0.6,
  },
  blurConfig: {
    type: 'spring',
    bounce: 0.001,
  },
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const COLORS = {
  primary: {
    light: '#000000',
    dark: '#ffffff',
  },
  secondary: {
    light: '#f3f4f6',
    dark: '#1f2937',
  },
  accent: {
    light: '#3b82f6',
    dark: '#60a5fa',
  },
} as const;

export const DELAYS = {
  fast: 0.1,
  normal: 0.2,
  slow: 0.3,
  extraSlow: 0.5,
} as const;

export const DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  extraSlow: 0.8,
} as const;
