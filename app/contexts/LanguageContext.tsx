import React, { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageSetup } from '../../hooks/useLanguageSetup';

type LanguageContextType = {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({ 
  currentLanguage: 'en',
  changeLanguage: () => {}
});

export const useLanguage = () => useContext(LanguageContext);

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const { saveLanguage } = useLanguageSetup();

  const changeLanguage = async (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    await saveLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageProvider };