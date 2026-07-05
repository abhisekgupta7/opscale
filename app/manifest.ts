import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Opscale-Wholesale OS',
    short_name: 'Opscale',
    description: 'Opscale-Wholesale OS is a comprehensive platform designed to streamline wholesale operations, providing tools for inventory management, order processing, and customer relationship management. It aims to enhance efficiency and productivity for businesses in the wholesale sector.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}