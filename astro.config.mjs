// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig
(
  {
    output: 'server',
    integrations: [svelte()],

    adapter: node
    (
      {
        mode: 'standalone'
      }
    ),
    
    server: 
    {
    port:4000,
    host: true,
    },

    vite: 
    {
      plugins: [tailwindcss()]
    }
  }
);