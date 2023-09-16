import { DefaultSeoProps } from 'next-seo';

const DefaultSEO = (lang: string): DefaultSeoProps => ({
    title: lang === 'ar' ? "مولد الصفحات" : 'WebPage generator'
})

export default DefaultSEO