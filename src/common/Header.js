import { Box, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { GET_WEATHER } from "../utils/ApiHandler"

const Header = () => {

    const [weatherInfo, setWeatherInfo] = useState({})
    useEffect(() => {
        getWeatherInfo()
    }, []);

    const getWeatherInfo = async () => {
        var res = await GET_WEATHER("Melbourne, Australia");
    }
    return(
        <Grid>
        <Box sx={{ typography: 'title', mb: 5, mt:5, textAlign: 'center' }}>Demo task</Box>
        <Box></Box>
        </Grid>
    )
}

export default Header;