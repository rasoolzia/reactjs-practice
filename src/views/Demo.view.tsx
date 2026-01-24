import { useAuthBridge } from '@/bridges';
import { CustomButton } from '@/components/custom-button.component';
import { userRoles } from '@/constants';
import { useRouteNavigation } from '@/hooks';
import { useAuthStore } from '@/stores';
import { User, UserRole } from '@/types';
import { useTranslation } from 'react-i18next';

export default function DemoView() {
  const { t } = useTranslation('demo');
  const { navigateTo, isCurrentRoute } = useRouteNavigation();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const updateUser = useAuthStore((s) => s.updateUser);
  const { logoutWithToast } = useAuthBridge();
  const setLoginData = useAuthStore((s) => s.setLoginData);

  const handleLogin = () => navigateTo('login');
  const loginTestUser = () => {
    const testUser = {
      user: {
        id: 1,
        name: 'rasool',
        username: 'rasool',
        email: 'rasool@gmail.com',
        role: 'admin' as UserRole,
      },
      accessToken: 'part1.part2.part3',
    };
    //don't do this ever!!!
    //this is just for times the auth server is down and just for testing!
    setLoginData(testUser);
  };
  const handleLogout = async () => {
    await logoutWithToast();
    navigateTo('home', { replace: true });
  };
  const handleAdminRoute = () => navigateTo('invoices-list');
  const handleRoleChanges = (role: UserRole) =>
    updateUser({ ...user, role } as User);

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">
        {t('title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-6 rounded-2xl bg-bg-secondary shadow-md space-y-4">
          <h2 className="text-xl font-semibold">{t('navigation.title')}</h2>
          <div className="space-y-3">
            <CustomButton onClick={() => navigateTo('home')}>
              {t('navigation.goHome')}
            </CustomButton>
            <CustomButton onClick={() => navigateTo('about')}>
              {t('navigation.goAbout')}
            </CustomButton>

            {isAuthenticated && (
              <div className="flex gap-2 flex-wrap">
                <CustomButton
                  variant={
                    userRoles.guest === user?.role ? 'primary' : 'outline'
                  }
                  onClick={() => handleRoleChanges(userRoles.guest)}
                >
                  {t('navigation.guest')}
                </CustomButton>
                <CustomButton
                  variant={
                    userRoles.user === user?.role ? 'primary' : 'outline'
                  }
                  onClick={() => handleRoleChanges(userRoles.user)}
                >
                  {t('navigation.user')}
                </CustomButton>
                <CustomButton
                  variant={
                    userRoles.admin === user?.role ? 'primary' : 'outline'
                  }
                  onClick={() => handleRoleChanges(userRoles.admin)}
                >
                  {t('navigation.admin')}
                </CustomButton>
              </div>
            )}
          </div>
        </section>

        <section className="p-6 rounded-2xl bg-bg-secondary shadow-md space-y-4">
          <h2 className="text-xl font-semibold">{t('auth.title')}</h2>
          <p>
            {t('auth.status')}: {isAuthenticated ? t('auth.authenticated') : t('auth.notAuthenticated')}
          </p>
          {user && (
            <div className="space-y-1">
              <p>{t('auth.user')}: {user.username}</p>
              <p>{t('auth.email')}: {user.email}</p>
              <p>{t('auth.role')}: {user.role}</p>
            </div>
          )}
          {!isAuthenticated ? (
            <CustomButton onClick={handleLogin}>{t('auth.login')}</CustomButton>
          ) : (
            <CustomButton onClick={handleLogout}>{t('auth.logout')}</CustomButton>
          )}
          {!isAuthenticated && (
            <CustomButton variant="secondary" onClick={loginTestUser}>
              {t('auth.loginTestUser')}
            </CustomButton>
          )}
        </section>

        <section className="p-6 rounded-2xl bg-bg-secondary shadow-md space-y-4">
          <h2 className="text-xl font-semibold">{t('acl.title')}</h2>
          <p>{t('acl.description')}</p>
          {isAuthenticated && user?.role === userRoles.admin ? (
            <CustomButton onClick={handleAdminRoute}>
              {t('acl.accessAdminRoute')}
            </CustomButton>
          ) : (
            <p className="text-red-500 font-medium">
              {t('acl.needAdminRole')}
            </p>
          )}
        </section>

        <section className="p-6 rounded-2xl bg-bg-secondary shadow-md space-y-3">
          <h2 className="text-xl font-semibold">{t('routeInfo.title')}</h2>
          <p>{t('routeInfo.home')}: {isCurrentRoute('home') ? '✓' : '✗'}</p>
          <p>{t('routeInfo.about')}: {isCurrentRoute('about') ? '✓' : '✗'}</p>
          <p>{t('routeInfo.login')}: {isCurrentRoute('login') ? '✓' : '✗'}</p>
          <p>{t('routeInfo.register')}: {isCurrentRoute('register') ? '✓' : '✗'}</p>
        </section>
      </div>

      <section className="mt-8 p-6 rounded-2xl bg-bg-secondary shadow-md">
        <h2 className="text-xl font-semibold mb-4">{t('features.title')}</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>✅ {t('features.list.routeNames')}</li>
          <li>✅ {t('features.list.acl')}</li>
          <li>✅ {t('features.list.authGuards')}</li>
          <li>✅ {t('features.list.routeBuilder')}</li>
          <li>✅ {t('features.list.typeSafe')}</li>
          <li>✅ {t('features.list.programmaticNav')}</li>
          <li>✅ {t('features.list.breadcrumb')}</li>
          <li>✅ {t('features.list.dynamicSidebar')}</li>
          <li>✅ {t('features.list.routeProtection')}</li>
          <li>✅ {t('features.list.documentTitle')}</li>
        </ul>
      </section>
    </>
  );
}
