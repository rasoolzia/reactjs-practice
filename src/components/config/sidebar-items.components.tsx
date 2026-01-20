import { useAuthBridge } from '@/bridges';
import { CustomToggle } from '@/components/custom-toggle.component';
import { LanguageSwitcher } from '@/components/language-switcher.component';
import {
  authRoutes,
  baseRoutes,
  componentsRoutes,
  panelRoutes,
} from '@/constants';
import { useAcl, useTheme } from '@/hooks';
import { useAuthStore } from '@/stores';
import { RouteGroup, SidebarItem } from '@/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export function useSidebarItems(): SidebarItem[] {
  const { isDarkMode, toggleTheme } = useTheme();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { logoutWithToast } = useAuthBridge();
  const { canAccessRoute } = useAcl();
  const { t } = useTranslation('common');

  return useMemo(() => {
    const items: SidebarItem[] = [
      {
        title: t('navigation.links.home'),
        path: baseRoutes.home.path as string,
      },
      {
        title: t('navigation.links.about'),
        path: baseRoutes.about.path as string,
      },
      {
        title: t('navigation.links.demo'),
        path: baseRoutes.demo.path as string,
      },
      {
        title: t('navigation.links.lists.root'),
        group: [
          {
            title: t('navigation.links.lists.list1'),
            path: (baseRoutes?.lists as RouteGroup)?.comments1?.path as string,
          },
          {
            title: t('navigation.links.lists.list2'),
            path: (baseRoutes?.lists as RouteGroup)?.comments2?.path as string,
          },
          {
            title: t('navigation.links.lists.list3'),
            path: (baseRoutes?.lists as RouteGroup)?.comments3?.path as string,
          },
          {
            title: t('navigation.links.lists.list4'),
            path: (baseRoutes?.lists as RouteGroup)?.comments4?.path as string,
          },
        ],
      },
    ];

    if (canAccessRoute(componentsRoutes?.root?.name as string)) {
      items.push({
        title: t('navigation.links.components.root'),
        path: componentsRoutes?.root?.path as string,
      });
    }

    if (!isAuthenticated) {
      items.push({
        title: t('navigation.links.auth.root'),
        group: [
          {
            title: t('navigation.links.auth.login'),
            path: authRoutes?.login?.path as string,
          },
          {
            title: t('navigation.links.auth.register'),
            path: authRoutes?.register?.path as string,
          },
        ],
      });
    }

    if (canAccessRoute(panelRoutes?.root?.name as string)) {
      if (
        canAccessRoute(
          (panelRoutes?.invoices as RouteGroup)?.all?.name as string,
        )
      ) {
        items.push({
          title: t('navigation.links.panel.root'),
          group: [
            {
              title: t('navigation.links.panel.root'),
              end: true,
              path: panelRoutes?.root?.path as string,
            },
            {
              title: t('navigation.links.panel.invoices.all'),
              path: (panelRoutes?.invoices as RouteGroup)?.all?.path as string,
            },
          ],
        });
      } else {
        items.push({
          title: t('navigation.links.panel.root'),
          path: panelRoutes?.root?.path as string,
        });
      }
    }

    if (canAccessRoute(baseRoutes?.chat?.name as string)) {
      items.push({
        title: t('navigation.links.chat.root'),
        path: baseRoutes?.chat?.path as string,
      });
    }

    items.push({
      title: t('navigation.darkMode'),
      component: <CustomToggle isActive={isDarkMode} toggle={toggleTheme} />,
    });

    items.push({
      title: '',
      component: <LanguageSwitcher />,
      className: 'p-0!',
    });

    if (isAuthenticated) {
      items.push({
        title: t('navigation.logout'),
        className:
          'cursor-pointer text-red-500 hover:bg-red-200 dark:hover:bg-red-950',
        actions: {
          onClick: logoutWithToast,
        },
      });
    }

    return items;
  }, [
    canAccessRoute,
    logoutWithToast,
    isAuthenticated,
    isDarkMode,
    toggleTheme,
    t,
  ]);
}
