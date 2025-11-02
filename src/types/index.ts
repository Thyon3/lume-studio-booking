// Common types used throughout the application

export interface ServiceItem {
  name: string;
  tags: string[];
  img: string;
  url: string;
  description: string;
}

export interface PortfolioItem {
  name: string;
  description: string;
  img: string;
  url: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  link: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

// Animation and motion types
export interface AnimationVariant {
  initial: any;
  animate: any;
  exit?: any;
}

export interface ScrollAnimationProps {
  delay?: number;
  stagger?: boolean;
  viewMargin?: string;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  onClick?: () => void;
}

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'outline' | 'ghost';
}

// Content types
export interface ContentSection {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  badge?: string;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  videoBackground?: string;
  ctaText?: string;
  ctaLink?: string;
}
