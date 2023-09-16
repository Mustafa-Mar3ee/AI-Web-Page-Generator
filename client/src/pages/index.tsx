import { AppHeader } from "@/app/components/AppHeader";
import { SearchSection } from "@/app/components/Home/SearchSection";
import { SectionCard } from "@/app/components/Home/SectionCard";
import { WithoutCount } from "@/interfaces/common";
import { _SectionSchema } from "@/schemas/section/section.schema";
import { SectionIndex } from "@/schemas/section/section.types";
import { TopicIndex } from "@/schemas/topic/topic.types";
import { useQuery } from "@apollo/client";
import { Button, Grid, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Page: NextPage = () => {
  const [active, setActive] = useState<string>("");
  const [topics, setTopics] = useState<TopicIndex[]>();

  const { data: sections } = useQuery<WithoutCount<SectionIndex>>(
    _SectionSchema.index,
    {
      ssr: false,
    }
    );
    
useEffect(() => {
   let current = sections?.items.find((el)=>el.id===active)
   setTopics(current?.topics as any)

}, [active])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <AppHeader /> 
      <SearchSection />

      <Grid container spacing={2} justifyContent="center">
        {sections?.items.map(({ id, title }) => (
          <Grid item key={id}>
            <Button
              variant={active === id ? "contained" : "text"}
              onClick={() => setActive(id)}
              sx={{ m: 0 }}
            >
              {title}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={8} justifyContent="center" sx={{
          px: 10,
           py: 8
            }}>
  <Grid item xs={12} lg={4}>
    <Box
      sx={{
        position: "relative",
        height: 440,
        borderRadius: 7,
        overflow: "hidden",
      }}
    >
      <img
        alt=""
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        src="https://robohash.org/1"
      />
    </Box>
  </Grid>
  <Grid item xs={12} lg={8}>
    <Stack spacing={2} sx={{ pt: 4 }}>
      <Typography variant="h5" color="primary">
        Technology
      </Typography>
      <Typography variant="h3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
        soluta fuga voluptas! Incidunt at
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
        praesentium dolores, in quidem aspernatur ratione eaque! Quam
        praesentium error numquam quibusdam temporibus enim minima. Itaque
        fugiat eius maiores officia magni!
      </Typography>
    </Stack>
  </Grid>
</Grid>

<Grid container p={4} spacing={2}  >
  {topics?.map((el: TopicIndex) => (
   <Grid xs={16} md={3}    item>
  <SectionCard key={el.id} topic={el} />    
   </Grid>
  ))}
</Grid>
    </Box>
  );
};

export default Page;
