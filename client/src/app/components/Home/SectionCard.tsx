import { TopicIndex } from "@/schemas/topic/topic.types";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export const SectionCard = ({ topic }: { topic: TopicIndex }) => {
  return (
    <Grid
      container
      sx={{
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        overflow: "hidden",
        p: 4,
      }}
    >
      <Card sx={{ boxShadow: "none", width: "100%",height: '20rem' }}>
        <Grid item xs={12}>
          <Box sx={{ height: 150 }} className=" relative  ">
            <Image
              src={`https://robohash.org/${topic.id}`}
              style={{
                objectFit: "cover",
              }}
              fill
              alt=""
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CardContent>
            <Typography variant="h6" component="div">
              {topic.title }
            </Typography>
            <Box component="div" whiteSpace="normal">
              <Typography variant="h6" color="text.secondary">
                {topic.description }
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Grid>
      </Card>
    </Grid>
  );
};
