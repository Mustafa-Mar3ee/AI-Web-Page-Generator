import MenuIcon from '@mui/icons-material/Menu';
import { Box, Divider, Drawer, IconButton, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';



export const Tabs = ({ active, setActive }: { active: number, setActive: (e: number) => void }) => {
    return (
        <>
            {['Services', 'Creative Stdio', 'Blog', 'About us'].map((txt, i) => (
                <Box key={i} component={'div'} onClick={() => setActive(i)}
                    className=' active:opacity-60 cursor-pointer'
                    sx={{
                        transition: 'color 0.4s ease'
                        , ...(active === i && { color: 'primary.main' }),
                    }}
                >
                    {txt}
                    <Stack direction={'row'} sx={{
                        height: '3.5px',
                        ...(active === i ? { maxWidth: 120 } : { maxWidth: 0 }),
                        transition: 'max-width 0.35s linear'
                    }} columnGap={'3px'}>
                        <Box
                            sx={{
                                backgroundColor: 'primary.main',
                                borderRadius: 10,
                                width: '8px',
                            }}
                        >
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: 'primary.main',
                                borderRadius: 10,
                                width: '100%'
                            }}
                        >
                        </Box>

                    </Stack>
                </Box>
            ))}
        </>
    )
}


export const AppHeaderTabs = () => {
    const [active, setActive] = useState(0);
    const downLg = useMediaQuery<Theme>((theme) => theme.breakpoints.down('lg'));



    const [open, _setOpen] = useState(false);

    const setOpen = (v: boolean) => () => _setOpen(v)



    return (<>




        {downLg ? <> <IconButton onClick={setOpen(true)} sx={{ alignSelf: 'center', justifyContent: 'start' }}>
            <MenuIcon />
        </IconButton>
            <Drawer
                anchor={'left'}
                open={open}
                onClose={setOpen(false)}

            >
                <Image
                    src='/logo.png'
                    width={200}
                    height={50}
                    alt='logo'
                    style={{ margin: 5 }}
                />
                <Divider />

                <Stack
                    justifyContent='center'
                    alignItems='center'
                    rowGap={1.5}
                    sx={{ px: 8, mt: 2 }}
                >
                    <Tabs {...{ active, setActive }} />
                </Stack>
            </Drawer>

        </> : <Typography color={'grey.500'} variant='h6' component={Stack} direction='row' alignItems='center' columnGap={5}>
            <Tabs {...{ active, setActive }} />
        </Typography>}

    </>
    )
}
