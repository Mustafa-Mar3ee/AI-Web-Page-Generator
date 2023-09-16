import { EventEmitterEnums, eventEmitter } from '@/eventEmitter';
import { getDir } from '@/utils/getDir';
import useTranslation from 'next-translate/useTranslation';
import { SnackbarProvider, useSnackbar } from "notistack";
import { useEffect } from 'react';

const Listener = ({ children }: { children: JSX.Element }) => {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        eventEmitter.addListener(
            EventEmitterEnums.ENQUEUE_SNACKBAR,
            enqueueSnackbar
        );
        return () => {
            eventEmitter.removeAllListeners(EventEmitterEnums.ENQUEUE_SNACKBAR);
        };
    }, []);

    return <>{children}</>;
};

export const SnackbarProviderWrapper = ({ children }: { children: JSX.Element }) => {
    const { lang } = useTranslation();

    return (
        <SnackbarProvider
            anchorOrigin={{
                horizontal: getDir(lang) === "rtl" ? "right" : "left",
                vertical: "bottom",
            }}
            maxSnack={3}
            SnackbarProps={{
                dir: getDir(lang)
            }}
        ><Listener>
                {children}
            </Listener>
        </SnackbarProvider>
    )
}
