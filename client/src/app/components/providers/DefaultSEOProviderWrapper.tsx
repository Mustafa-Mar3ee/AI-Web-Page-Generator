import { DefaultSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import DefaultSEO from '../../../../next-seo.config';



export const DefaultSEOProviderWrapper = ({ children }: { children: JSX.Element }) => {
    const { lang } = useTranslation();

    return (
        <>
            <DefaultSeo {...DefaultSEO(lang)} />
            {children}
        </>
    )
}
