import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery"; // ตัวจัด Fullscreen
import config from "../config.json";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
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
import { ProductLink } from "..";

const theme = createTheme();
const theme_favorite = createTheme({
    typography: {
        button: {
            fontSize: "1rem",
        },
    },
});

var images = [
    'https://img.freepik.com/free-photo/abstract-studio-background-texture-light-blue-gray-gradient-wall-flat-floor-product_1258-88339.jpg?w=1060&t=st=1675763801~exp=1675764401~hmac=e98c16a4855dcb8d6ed6796e1d75df08f2f01947d1d4f2f428b0566a542af8c3',
    'https://img.freepik.com/free-photo/abstract-blur-empty-green-gradient-studio-well-use-as-background-website-template-frame-business-report_1258-52616.jpg?w=740&t=st=1675763824~exp=1675764424~hmac=137ff51d8a0b65c286dc8f97b28b955b6fa5bd5b2b9c88e29a1a5696c139fa59',
    'https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-88586.jpg?w=1060&t=st=1675763843~exp=1675764443~hmac=4a01818b1c03c57344bdebac58661b523b85f3dd4e25393039928a248b4b7431',
    'https://img.freepik.com/free-photo/studio-background-concept-abstract-empty-light-gradient-purple-studio-room-background-product_1258-56060.jpg?w=1060&t=st=1675763865~exp=1675764465~hmac=65ac4d22112f0c1c69171a26301f0a87daf3f589d1d02fc08354b2111bd9a793',
    'https://img.freepik.com/free-photo/gold-shiny-background-with-variating-hues_1258-85534.jpg?w=740&t=st=1675763886~exp=1675764486~hmac=c3b35322167e50e8f265fdb368e12fe57d2ec51390a6a08ec9c80ffe047a17e5',
    'https://img.freepik.com/free-photo/abstract-empty-smooth-light-pink-studio-room-background-use-as-montage-product-displaybannertemp_1258-107802.jpg?w=1060&t=st=1675763910~exp=1675764510~hmac=2e91a3456f5492ee886b066cc3383e780fec6732927105e046c90b4ca5373829',
    'https://img.freepik.com/free-photo/green-light-green-blur-gradient-background_1258-85446.jpg?w=740&t=st=1675764112~exp=1675764712~hmac=11f634f30594497b240087e85875305699bd9b4a240460b986ead2e64a04ae8f',
    'https://img.freepik.com/free-photo/abstract-luxury-gold-yellow-gradient-studio-wall-well-use-as-background-layout-banner-product-presentation_1258-56105.jpg?w=1060&t=st=1675764144~exp=1675764744~hmac=b1f59aa2fbc79e5ba3b1bb6fcc8206c53a138627496ee18ebb14f12b796da3a5',
    'https://img.freepik.com/free-photo/empty-green-studio-well-use-as-background-website-template-frame-business-report_1258-71742.jpg?w=1380&t=st=1675764312~exp=1675764912~hmac=934de7c8de60e48c31dc52a47b24e84310d35f6e7ae53e8f542e6cebf72d78e3',
    'https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30621.jpg?w=1060&t=st=1675764775~exp=1675765375~hmac=93eef79ca4f57486717560c517eee4442e0de064cc7da4fe9ef4c7d06bc112ef',
  'https://img.freepik.com/free-photo/studio-background-concept-abstract-empty-light-gradient-purple-studio-room-background-product_1258-67806.jpg?w=996&t=st=1675764402~exp=1675765002~hmac=699c820d078f500e1095e2a806713caaf5cac23e0e7fcf69cfc14f4c765d83cd',
  ];
export default function FavoriteList() {
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const token = localStorage.getItem("token");
    const [apiData, setApiData] = React.useState()
    const [effect, setEffect] = React.useState(0)
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
    }, [effect]);
    console.log(apiData)
    async function API_Delete_Favorite(code) {
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

        if (send.status == 200) {
            Swal.fire({
              icon: 'success',
             title: 'ลบออกจากรายการโปรดสำเร็จ',
             showConfirmButton: false,
             timer: 1500,
           })
           
          } else {
            Swal.fire({
              icon: 'error',
             title: 'ลบออกจากรายการโปรดไม่สำเร็จ',
             showConfirmButton: false,
             timer: 1500,
           })
            
          }
        const status = send.status === 200 ? true : false;
        return status
    }

    async function handle_bt_favorite(event, course_id) {
        const send = await API_Delete_Favorite(course_id)
        if (send) setEffect(effect + 1)
    }
    const Swal = require('sweetalert2')
    return (
        apiData ?
            <Grid container spacing={4}>
                {/* { (apiData == []) :'asds' }  */}
                {
                (apiData.length != 0) ? ( apiData.map((data,index) => (
                    <Grid item key={data} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                shadows: 1,
                                borderRadius: 6,
                                
                            }}
                        >
                            <img
                      style={{
                        width: '100%',
                        height: '100%',
                        maxHeight:20,
                        opacity:0.4
                      }}
                      src={images[index % 10]}
                    ></img>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                    textAlign={"center"}
                                >
                            <Link
                                href={`${ProductLink.comment}/${data.course_id}`}
                                underline="hover"
                                color="#174468"
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
                                    <IconButton sx={{
                                        color: "#FFC0CB",
                                        ":hover": {
                                            backgroundColor: "#fffff",
                                        },
                                    }}
                                        onClick={(e) => {
                                            handle_bt_favorite(e, data.course_id);
                                        }}>
                                        <FavoriteIcon />
                                    </IconButton>
                                </ThemeProvider>
                            </CardActions>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button
                                    size="small"
                                    onClick={() => window.open(`${ProductLink.rating}/${data.course_id}`)}
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
                                    onClick={() => window.open(ProductLink.comment + "/" + data.course_id)}
                                >
                                    <CommentIcon fontSize="small"></CommentIcon> &nbsp; (
                                    {data.comment})
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))) : ( <Grid item  xs={12} sm={12} md={12} sx={{justifyContent:'center' , alignItems: 'center',display: 'flex', minHeight:300 ,fontSize:20 ,color:"#FF985A" , fontWeight:'bold'}}> รายการโปรดของคุณว่างอยู่ </Grid> )
                } 
                
            </Grid>
            : <LinearProgress />
    );
}
