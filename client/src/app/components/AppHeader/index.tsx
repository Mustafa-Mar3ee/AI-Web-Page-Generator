import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { AppHeaderTabs } from './AppHeaderTabs';
export const AppHeader = () => {

    const { lang } = useTranslation();
    const changeLng = () => {
        setLanguage(lang === 'ar' ? 'en' : 'ar');
    }

    return (
        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            sx={{ pt: 4, pb: 3, px: { xs: 2, md: 14 }, overflow: 'hidden' }}
            className=' shadow'
        >
            <Image
                src='/logo.png'
                width={200}
                height={50}
                alt='logo'
            />

            <AppHeaderTabs />

            <Stack direction='row' alignItems='center' columnGap={1} >
                <Tooltip title="Notifications">
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                </Tooltip>


                <Tooltip title="RTL - LTR">
                    <IconButton onClick={changeLng}>
                        <LanguageIcon />
                    </IconButton>
                </Tooltip>
                <Button variant='contained'>
                    Contact Us
                </Button>
            </Stack>

        </Stack>
    )
}
