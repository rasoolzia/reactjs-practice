import { TheSidebar } from '@/components/the-sidebar.component';
import { componentsRoutes } from '@/constants';
import { SidebarItem } from '@/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';

export default function ComponentsLayout() {
  const { t } = useTranslation('common');

  const sideBarItems: SidebarItem[] = useMemo(
    () => [
      {
        title: t('navigation.links.components.input'),
        path: componentsRoutes?.input?.path as string,
      },
      {
        title: t('navigation.links.components.button'),
        path: componentsRoutes?.button?.path as string,
      },
      {
        title: t('navigation.links.components.table'),
        path: componentsRoutes?.table?.path as string,
      },
      {
        title: t('navigation.links.components.toggle'),
        path: componentsRoutes?.toggle?.path as string,
      },
      {
        title: t('navigation.links.components.dropdown'),
        path: componentsRoutes?.dropdown?.path as string,
      },
      {
        title: t('navigation.links.components.expansionPanel'),
        path: componentsRoutes?.expansionPanel?.path as string,
      },
    ],
    [t],
  );

  return (
    <div className="layout-content flex flex-col gap-6 h-full">
      <div className={`flex grow w-full bg-bg-primary text-text-primary gap-2`}>
        <div className="h-full w-56 shrink-0">
          <TheSidebar
            items={sideBarItems}
            className="p-2"
            itemClassName="hover:bg-neutral-200 dark:hover:bg-neutral-700"
            activeItemClassName="bg-neutral-200 dark:bg-neutral-700"
          />
        </div>
        <div className="h-full grow flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
