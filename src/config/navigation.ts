import { Home, User, CheckSquare, Briefcase, FileText, Settings, Calendar, MessageSquare, Handshake, Scale, Users } from 'lucide-react';

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
    href: '/',
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
    label: 'Propuestas',
    labelKey: 'nav.propuestas',
    href: '/tablon',
    icon: MessageSquare,
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
    label: 'Marketplace',
    labelKey: 'nav.marketplace',
    href: '/marketplace',
    icon: Handshake,
  },
  {
    label: 'Cruce',
    labelKey: 'nav.cruce',
    href: '/cruce',
    icon: Scale,
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
