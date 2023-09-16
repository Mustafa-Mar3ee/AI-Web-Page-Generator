import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

import { DivProps } from '@/interfaces/common';
import { _PromptSchema } from '@/schemas/topic/prompt.schema';
import { useMutation } from '@apollo/client';

export type SearchSectionProps = TextFieldProps & {
  svgContainerProps?: Omit<DivProps, 'children'>;
  TextFiledBoxProps?: Omit<DivProps, 'children'>;
};

export const SearchSection = (props: SearchSectionProps) => {
  const theme = useTheme();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mutate] = useMutation(_PromptSchema.receivePrompt);

  const handleButtonClick = async () => {
    setIsLoading(true);

    try {
      await mutate({ variables: { text: inputText } });
      setIsModalOpen(true);
      setInputText('');
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="top-0  left-0 w-full" {...props.svgContainerProps}>
      <svg
          fill={theme.palette.secondary.main}
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <div className="mx-4 md:-mt-16 flex justify-center mb-4" {...props.TextFiledBoxProps}>
        <Stack
          className="w-full shadow-md shadow-purple-200"
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 1,
            px: 2.5,
            py: 2,
            maxWidth: 600,
          }}
          alignItems="center"
          gap={2}
        >
          <TextField
            label="Explain the thoughts currently occupying your mind."
            variant="outlined"
            fullWidth
            value={inputText}
            onChange={handleTextChange}
            {...props}
          />

          <Button variant="contained" onClick={handleButtonClick} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Generate New Content'}
          </Button>
        </Stack>
      </div>

     
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" color="green" component="div">
            Success!
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            AI is generating more related content for you. Please check back in a few minutes.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
