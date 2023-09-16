import { getDir } from "@/utils/getDir";
import { CacheProvider, EmotionCache } from "@emotion/react";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import { setLocale } from "yup";
import { ar, en } from "../../../../locales/validation";

export type LanguageProviderWrapperProps = {
    children: JSX.Element;
    emotionCache: EmotionCache;
};

export const LanguageProviderWrapper = ({ children, emotionCache }: LanguageProviderWrapperProps) => {
    const { lang } = useTranslation();

    useEffect(() => {
        setLocale(lang === "ar" ? ar : en);
        document.dir = getDir(lang);
    }, [lang]);
    return (
        <CacheProvider value={emotionCache}>{children}</CacheProvider>
    )
}
