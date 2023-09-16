import { DefaultSeoProps } from 'next-seo';

const DefaultSEO = (lang: string): DefaultSeoProps => ({
    title: lang === 'ar' ? "مسراج" : 'Misraj'
})

export default DefaultSEO