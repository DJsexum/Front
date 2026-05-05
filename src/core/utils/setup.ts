import { appStore } from "@utils/store.svelte";

export function setTheme(document:any)
{
    if(localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
    {
        document.documentElement.classList.add('dark');
        appStore.isDarkMode = true;
        localStorage.setItem('color-theme', 'dark');
    }
        else
        {
            document.documentElement.classList.remove('dark');
            appStore.isDarkMode = false;
            localStorage.setItem('color-theme', 'light');
        }
}