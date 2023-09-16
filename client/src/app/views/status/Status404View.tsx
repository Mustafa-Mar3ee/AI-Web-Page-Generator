import { StyledStatusDiv } from "@/app/components/styled/StyledStatusDiv";
import { statusCounter } from "@/utils/statusCounter";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Status404View = () => {
  const code: [string, string, string] = ["4", "0", "4"];
  // eslint-disable-next-line
  useEffect(statusCounter(code), []);
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Status - 404</title>
      </Head>

      <StyledStatusDiv>
        <Box sx={{ position: "relative", zoom: { xs: 0.5, lg: 1 } }}>
          <div className="clip">
            <div className="shadow-digit">
              <span className="digit thirdDigit">{code[0]}</span>
            </div>
          </div>
          <div className="clip">
            <div className="shadow-digit">
              <span className="digit secondDigit">{code[1]}</span>
            </div>
          </div>
          <div className="clip">
            <div className="shadow-digit">
              <span className="digit firstDigit">{code[2]}</span>
            </div>
          </div>
        </Box>
        <h2 style={{ textAlign: "center" }}>
          The page you were looking for does not exist.
        </h2>

        <Button
          onClick={() => router.push("/")}
          startIcon={<HomeIcon />}
          variant="contained"
          sx={{ mt: 6 }}
        >
          Go to home page
        </Button>
      </StyledStatusDiv>
    </>
  );
};

export default Status404View;
