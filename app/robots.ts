import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_API_BASE_URL === 'https://api.punkga.me') {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
    }
  }
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
