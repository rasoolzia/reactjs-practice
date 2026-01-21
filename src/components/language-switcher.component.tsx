import { LANGUAGES } from '@/constants';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomDropdown, DropdownItem } from './custom-dropdown.component';

const AVAILABLE_LANGS = [
  {
    code: LANGUAGES.en,
    labelKey: `navigation.languageOptions.${LANGUAGES.en}`,
  },
  {
    code: LANGUAGES.fa,
    labelKey: `navigation.languageOptions.${LANGUAGES.fa}`,
  },
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common');

  const language = i18n.resolvedLanguage || i18n.language || LANGUAGES.en;
  const isLanguageEn = language === LANGUAGES.en;
  const options = useMemo(() => AVAILABLE_LANGS, []);

  const handleChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <CustomDropdown
      className="w-full"
      trigger={
        <div className="hover:bg-neutral-200 dark:hover:bg-neutral-700 flex justify-between align-middle p-3 rounded-xl cursor-pointer">
          {t('navigation.language')}: {language.toUpperCase()}
        </div>
      }
      ListClassName="w-full"
      align={isLanguageEn ? 'left' : 'right'}
    >
      {options.map((option) => (
        <DropdownItem
          key={option.code}
          onClick={() => handleChange(option.code)}
          className={`${isLanguageEn ? 'text-left' : 'text-right'} ${language === option.code ? 'bg-neutral-200 dark:bg-neutral-700' : ''}`}
        >
          {t(option.labelKey)}
        </DropdownItem>
      ))}
    </CustomDropdown>
  );
}
