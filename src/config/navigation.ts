import { Home, User, CheckSquare, Briefcase, FileText, Settings, Calendar, MessageSquare, Handshake, Scale, Users, Vote } from 'lucide-react';

export interface NavItem {
  label: string;
  labelKey?: string;
  href: string;
  icon: any;
  adminOnly?: boolean;
}

export const navigationConfig: NavItem[] = [
  {
    label: 'Inicio',
    labelKey: 'nav.orientation',
    href: '/dashboard',
    icon: Home,
  },
  {
    label: 'Tareas',
    labelKey: 'nav.tasks',
    href: '/tareas',
    icon: CheckSquare,
  },
  {
    label: 'Comunidades',
    labelKey: 'nav.communities',
    href: '/comunidades',
    icon: Users,
  },
  {
    label: 'Tablón',
    labelKey: 'nav.board',
    href: '/tablon',
    icon: MessageSquare,
  },
  {
    label: 'Gobernanza',
    labelKey: 'nav.governance',
    href: '/gobernanza',
    icon: Vote,
  },
  {
    label: 'Actas',
    labelKey: 'nav.actas',
    href: '/actas',
    icon: FileText,
  },
  {
    label: 'Proyectos',
    labelKey: 'nav.proyectos',
    href: '/proyectos',
    icon: Briefcase,
  },
  {
    label: 'Calendario',
    labelKey: 'nav.calendar',
    href: '/calendario',
    icon: Calendar,
  },
  {
    label: 'Marketplace',
    labelKey: 'nav.marketplace',
    href: '/soberania',
    icon: Handshake,
  },
  {
    label: 'Cruce',
    labelKey: 'nav.cruce',
    href: '/cruce',
    icon: Scale,
    adminOnly: true,
  },
  {
    label: 'Admin',
    labelKey: 'nav.admin',
    href: '/admin',
    icon: Settings,
    adminOnly: true,
  },
];

export interface AppRouteConfig {
  path: string;
  label?: string;
  purpose?: 'profile' | 'ficha' | 'other';
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

export const appRouteConfigs: AppRouteConfig[] = [
  { path: '/', label: 'Inicio', purpose: 'other' },
  { path: '/perfil', label: 'Perfil', purpose: 'profile', requireAuth: true },
  { path: '/ficha', label: 'Ficha', purpose: 'ficha', requireAuth: true },
  { path: '/p/:uid', label: 'Pasaporte', purpose: 'other' }
];
