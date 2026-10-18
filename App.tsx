import React from 'react';
import { SettingsProvider } from './src/context/SettingsContext';
import { RootNavigator } from './src/navigation/RootNavigator';

// 11-қадам (Слайд 16): SettingsProvider барлық экрандарды қоршайды
export default function App() {
  return (
    <SettingsProvider>
      <RootNavigator />
    </SettingsProvider>
  );
}
