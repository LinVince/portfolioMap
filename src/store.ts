import { create } from 'zustand';

const useDarkModeStore = create((set) => ({
    darkMode: false,
    setDarkMode: (isDarkMode:any) => set({ darkMode: isDarkMode }),
}));

export default useDarkModeStore;
