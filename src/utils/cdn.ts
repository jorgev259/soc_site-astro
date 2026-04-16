import { CDN_URL } from 'astro:env/client'

export const getCDNUrl = (file: string) => `${CDN_URL}/${file}`
export const getImgUrl = (file: string) => getCDNUrl(`img/${file}`)
