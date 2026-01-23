import { useTranslation } from 'react-i18next';

export default function AboutView() {
  const { t } = useTranslation('about');

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold  mb-4">{t('title')}</h1>
      <p className="text-lg mb-6">
        {t('description')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">{t('mission.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('mission.description')}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">{t('features.title')}</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
            <li>{t('features.list.architecture')}</li>
            <li>{t('features.list.routing')}</li>
            <li>{t('features.list.stateManagement')}</li>
            <li>{t('features.list.theme')}</li>
            <li>{t('features.list.responsive')}</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold  mb-4">{t('team.title')}</h2>
        <p className="text-lg">
          {t('team.description')}
        </p>
      </div>
    </div>
  );
}
