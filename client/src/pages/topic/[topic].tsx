import { Grid, Typography, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';

const TopicContainer = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const TopicImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: 300,
  objectFit: 'cover',
  borderRadius: theme.spacing(1),
}));

const TopicTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontWeight: 'bold',
  fontSize: '1.5rem',
}));

const TopicDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const TopicParagraph = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const GoBackButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

interface TopicLayoutProps {
  image: string;
  title: string;
  description: string;
  paragraph: string;
}

const TopicLayout: React.FC<TopicLayoutProps> = ({ image, title, description, paragraph }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <TopicContainer elevation={3}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Display the image */}
          <TopicImage src={"https://robohash.org/1"} alt="Topic" />
        </Grid>
        <Grid item xs={12}>
          {/* Display the title */}
          <TopicTitle variant="h2">{"djaslkjfhal"}</TopicTitle>
        </Grid>
        <Grid item xs={12}>
          {/* Display the description */}
          <TopicDescription variant="body1">{"jasfkjashfjkashfjkhaskjfhasjk"}</TopicDescription>
        </Grid>
        <Grid item xs={12}>
          {/* Display the paragraph */}
          <TopicParagraph variant="body1">{"akjsfhkashfuahfiuwahfuiwahfkashfkjasf"}</TopicParagraph>
        </Grid>
        <Grid item xs={12}>
          {/* "Go Back" button */}
          <GoBackButton variant="contained" onClick={handleGoBack}>
            Go Back
          </GoBackButton>
        </Grid>
      </Grid>
    </TopicContainer>
  );
};
export default TopicLayout