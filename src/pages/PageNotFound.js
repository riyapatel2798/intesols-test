import { Box } from "@mui/material"
import { Link } from "react-router-dom"
const PageNotFound = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ mb: 5, mt: 5, fontSize: 24 }}>Page Not Found</Box>
      <Box>
        <Link to="/"> Back to Home page</Link>
      </Box>
    </Box>
  )
}

export default PageNotFound
