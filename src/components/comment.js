import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import config from "../config.json";
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import Rating from '@mui/material/Rating';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery'; // ตัวจัด Fullscreen
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { padding } from '@mui/system';


import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AddTaskIcon from '@mui/icons-material/AddTask';

async function API_Add_Like(event,param_comment_id,available) { 
    console.log(param_comment_id)
    if (available) {
            const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3NTNiYmFiM2U4YzBmZjdjN2ZiNzg0ZWM5MmY5ODk3YjVjZDkwN2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY291cnNlLXJldmlld2VyLTUzYjE4IiwiYXVkIjoiY291cnNlLXJldmlld2VyLTUzYjE4IiwiYXV0aF90aW1lIjoxNjcyNTAyNzk1LCJ1c2VyX2lkIjoicTZyYnhtaUd5cmNnNkVPcWdzWFVLZ3lpZGNCMiIsInN1YiI6InE2cmJ4bWlHeXJjZzZFT3Fnc1hVS2d5aWRjQjIiLCJpYXQiOjE2NzI1MDI3OTUsImV4cCI6MTY3MjUwNjM5NSwiZW1haWwiOiJ0ZXN0MDFAbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdDAxQG1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Lvak5c0yztGECuNV6Tgm5FX9T45wx_PRUj2G9ic9EHlINUSBs1jJdl8jMNa4r9w3lWVFsVcl3R19-daOrS7NxS2zpIVRESCh_PIYcn5QtLYBH9VlBhTAVwqcXmZnoLZ6foSObTkWwMq0NDp191g4aL8VfHFDbpGgY2XDvNsCjYCAbzhq14HJnttE05JvftvMZQOAtzgKBRzR4fxew7Gy6X4KDt5ZxrRtTkkRyeqnn7PXbr-7KTFCe9eWA1o0cwfhCpQfLFtzOIgaodhYE1n7KDtXsRRMo8b0FIhuaaRFnuT2PevqX3F2fGjFy43bJaCIyP6Y0JYHEf5Fit40DYafSA"
    const API = await fetch(`${config.domain}/add-like`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "*",
        "User-Agent": "Custom",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
      },
      body: JSON.stringify({
        
            "comment_id" : param_comment_id
          
      })
    });
    }

}
export default function Comment_page() {
    let [comment_api,set_comment_api] = React.useState()
    useEffect(() => {
        // const myArray = text.split(" ", 3);
        const path = window.location.pathname.split("/")
        const api = async () => {
          const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3NTNiYmFiM2U4YzBmZjdjN2ZiNzg0ZWM5MmY5ODk3YjVjZDkwN2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY291cnNlLXJldmlld2VyLTUzYjE4IiwiYXVkIjoiY291cnNlLXJldmlld2VyLTUzYjE4IiwiYXV0aF90aW1lIjoxNjcyNTAyNzk1LCJ1c2VyX2lkIjoicTZyYnhtaUd5cmNnNkVPcWdzWFVLZ3lpZGNCMiIsInN1YiI6InE2cmJ4bWlHeXJjZzZFT3Fnc1hVS2d5aWRjQjIiLCJpYXQiOjE2NzI1MDI3OTUsImV4cCI6MTY3MjUwNjM5NSwiZW1haWwiOiJ0ZXN0MDFAbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdDAxQG1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Lvak5c0yztGECuNV6Tgm5FX9T45wx_PRUj2G9ic9EHlINUSBs1jJdl8jMNa4r9w3lWVFsVcl3R19-daOrS7NxS2zpIVRESCh_PIYcn5QtLYBH9VlBhTAVwqcXmZnoLZ6foSObTkWwMq0NDp191g4aL8VfHFDbpGgY2XDvNsCjYCAbzhq14HJnttE05JvftvMZQOAtzgKBRzR4fxew7Gy6X4KDt5ZxrRtTkkRyeqnn7PXbr-7KTFCe9eWA1o0cwfhCpQfLFtzOIgaodhYE1n7KDtXsRRMo8b0FIhuaaRFnuT2PevqX3F2fGjFy43bJaCIyP6Y0JYHEf5Fit40DYafSA"
          const API = await fetch(`${config.domain}/list-comment/${path[2]}`, {
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
          const data = await API.json()
          if (API.status === 200) {
            window.setTimeout(() => {
                console.log('Get API Success')
                // api()
                set_comment_api(data)
              }, 1000);
          }
        }
          api()
      }, []);
    const comment = [1, 2, 3, 4, 5]
    return (
        <Container sx={{ py: 8, border: 0, borderRadius: 3, boxShadow: 10, marginBottom: 10, marginTop: 2 }} maxWidth="md" >
            <Typography gutterBottom variant="h5" component="h2" textAlign={'center'} href="#" >
                Comment Student
            </Typography>
            <Grid container spacing={4}>

                {
                    comment_api ? 
                    comment_api.map((data) => (
                        <Grid item key={data} xs={12} sm={12} md={12}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', shadows: 0, border:0, borderRadius: 3 }}>
                                <CardContent >
                                    <Card>
                                        <Typography gutterBottom variant="h5" component="h2" textAlign={'left'} href="#" >

                                            <AccountCircleIcon sx={{}} /> {/* เอาลงมาไม่ได้จ้า */}
                                            <Link href={`#`} underline="hover" sx={{ pl:1.2 }}>
                                                {data.username}
                                            </Link>
                                        </Typography>
                                    </Card>
                                    <Card sx={{ border:0, borderRadius: 3, boxShadow: 2 , mt:1}}>
                                        <Typography sx={{ pl:2 , pt:1 , pb:1}}>
                                        {data.message}
                                        </Typography>
                                    </Card>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'left', pl: 3 }} >
                                    <Button size="small" onClick={(e) => { API_Add_Like(e,data.comment_id, data.available);  }} > {!data.available ? <ThumbUpAltIcon sx={{ mb: 0.65 }} /> : <ThumbUpOffAltIcon />} &nbsp;({data.like})</Button>
                                    <Button size="small" sx={{ alignContent: 'center' }} color={'success'}><AddTaskIcon fontSize='small' sx={{ mb: 0.65 }} /> &nbsp;  (0)</Button>
                                    <Typography sx={{ pl:2 , textAlign:'right', pr:2}} color='text.secondary'>
                                        { !data.update_time ? `แสดงความคิดเห็น : ${data.create_time.substring(0,10)}` : `แก้ไขเมื่อ : ${data.create_time.substring(0,10)}`}
                                            
                                            {/* เหลือส่วนบอกแก้ไข ตอนนี้ข้อมูลที่ออกมามีแต่ที่แก้ไขแล้ว */}
                                    </Typography>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                    : 
                    <Grid item key={comment} xs={12} sm={12} md={12}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', shadows: 0, border:0, borderRadius: 3 ,
                justifyItems: 'center' , alignContent: 'center' , alignItems: 'center'}}>
                        <CardContent >
                            <Card>
                                <Typography gutterBottom variant="h5" component="h2"  href="#" >
                                <AccountCircleIcon size='large' />
                                </Typography>
                            </Card>
                            
                        </CardContent>
                           <CircularProgress size={100} sx={{margin: 2 }}/> 
                        
                    </Card>
                    </Grid>
                }



            </Grid>

        </Container>
    );
}
