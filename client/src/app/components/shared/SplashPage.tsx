import { Portal } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import { PointsLoader } from "./PointsLoader";

const Splash = () => {
  return (
    <Portal>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Image src='/logo.png' width={300} height={30}
          style={{ marginBottom: -20 }}
          alt='' />
        <PointsLoader className=" " />
      </Box>
    </Portal>

  );
};

export default Splash;
