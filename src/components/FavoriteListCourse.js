import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery"; // ตัวจัด Fullscreen
import config from "../config.json";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { LinearProgress } from "@mui/material";
import IconButton from '@mui/material/IconButton';

const theme = createTheme();
const theme_favorite = createTheme({
    typography: {
      button: {
        fontSize: "1rem",
      },
    },
  });




export default function FavoriteList() {
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const token = localStorage.getItem("token");
    const [apiData,setApiData] = React.useState()
    React.useEffect(() => {
        const api = async () => {
            const token = localStorage.getItem("token");
            const API = await fetch(`${config.domain}/list-favorite`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "*",
                    "User-Agent": "Custom",
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST",
                },
            });
            const data = await API.json();
            if (API.status === 200) {
                setApiData(data)
            }
        };
        window.setTimeout(() => {
            api();
        }, 1000);
    }, [apiData] );

    async function API_Add_Favorite(code) {
        const send = await fetch(`${config.domain}/delete-favorite`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "*",
            "User-Agent": "Custom",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            course_id: code,
          }),
        });
        const status = send.status === 200 ? true : false;
        return status
      }
    
      async function handle_bt_favorite(event, course_id) {
        console.log(course_id)
        const send = await API_Add_Favorite(course_id)
        if (send) setApiData(undefined)
      }

    return (
        apiData  ?  
        <Grid container spacing={4}>
        {apiData.map((data) => (
          <Grid item key={data} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                shadows: 1,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  textAlign={"center"}
                  href="#"
                >
                  <Link
                    href={`/course-detail/${data.course_id}`}
                    underline="hover"
                  >
                    {data.course_id}
                  </Link>
                </Typography>
                <Typography textAlign={"center"}>
                  {" "}
                  {data.course_name_th}{" "}
                </Typography>
                <Typography textAlign={"center"}>
                  {" "}
                  {data.course_name_en}{" "}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <ThemeProvider theme={theme_favorite}>
                 {/* Icon */}
                    <IconButton sx={{ color: "#FFC0CB" , 
                ":hover": {
                    backgroundColor: "#fffff",
                  },
                  }}
                  onClick={(e) => {
                    handle_bt_favorite(e, data.course_id);
                  }}>
                        <FavoriteIcon/>
                    </IconButton>
                </ThemeProvider>
              </CardActions>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  size="small"
                  onClick={() => window.open(`/rating/${data.course_id}`)}
                >
                  <Rating
                    name="half-rating-read"
                    size="small"
                    defaultValue={data.score}
                    precision={0.5}
                    readOnly
                    sx={{ paddingBottom: 0.5 }}
                  />
                </Button>
                <Button
                  size="small"
                  sx={{ alignContent: "center" }}
                  onClick={() => window.open(`/comment/${data.course_id}`)}
                >
                  <CommentIcon fontSize="small"></CommentIcon> &nbsp; (
                  {data.comment})
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      : <LinearProgress />
    );
}
