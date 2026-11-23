# T-135: Crear menú de configuración dedicado accesible desde el avatar de usuario

## Descripción
Añadir un botón "Ajustes" en el menú de avatar de usuario (`UserAvatarMenu.tsx`) que despliegue un submenú con opciones de configuración: privacidad, RRSS, perfil, comunidad, cuenta.

## Contexto actual
- `UserAvatarMenu.tsx` actualmente tiene: MiPerfil, Pasaporte Universal, Vincular Telegram (admin), Panel de Admin (admin), Cerrar Sesión
- No existe entrada de "Configuración" o "Ajustes" general
- El volumen de settings justifica un menú propio accesible desde el avatar

## Decisiones e interfaces selladas
- Añadir botón "Ajustes" en `UserAvatarMenu.tsx` después del botón de Vincular Telegram (o en posición apropiada)
- El nuevo botón navega a una ruta `/ajustes` o despliega un submenú dentro del menú actual con secciones:
  1. **Privacidad**: selectores de visibilidad para RRSS y datos personales (ref T-134)
  2. **RRSS**: gestionar enlaces de Instagram, LinkedIn, Website, teléfono, email
  3. **Perfil**: ver/editar datos del perfil de usuario
  4. **Cuenta**: configuración de cuenta (password, sesiones, etc.)
- Utilizar icono `Settings` de `lucide-react` (ya importado en el componente)
- La ruta `/ajustes` debe estar en `src/App.tsx` protegida apropiadamente

## Dependencias
- `src/components/layout/UserAvatarMenu.tsx`: añadir botón "Ajustes" con onNavigate o estado toggle
- `src/App.tsx`: añadir ruta `/ajustes` element `<ProtectedRoute><AjustesView /></ProtectedRoute>`
- Nuevo componente `src/pages/AjustesView.tsx` o reutilizar `src/pages/FichaView.tsx` parcialmente
- Verificar que `ConfigPrivacidad` extensión (T-134) esté completa antes o paralelo
