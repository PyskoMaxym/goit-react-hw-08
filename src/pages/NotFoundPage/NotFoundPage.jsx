import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 10,
      }}
    >
      <Typography variant="h3" color="error" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" gutterBottom>
        The page you're looking for doesn't exist.
      </Typography>
      
    </Box>
  );
};

export default NotFoundPage;