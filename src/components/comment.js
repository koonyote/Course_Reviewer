import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import config from "../config.json";
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AddTaskIcon from '@mui/icons-material/AddTask';
import EditIcon from '@mui/icons-material/Edit';

export default function Comment_page() {
    let [comment_api, set_comment_api] = React.useState()
    let [call_api, set_call_api] = React.useState(false)
    let [frist_time, set_first_time] = React.useState(true)
    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3NTNiYmFiM2U4YzBmZjdjN2ZiNzg0ZWM5MmY5ODk3YjVjZDkwN2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY291cnNlLXJldmlld2VyLTUzYjE4IiwiYXVkIjoiY291cnNlLXJldmlld2VyLTUzYjE4IiwiYXV0aF90aW1lIjoxNjcyNjY4MDYyLCJ1c2VyX2lkIjoicTZyYnhtaUd5cmNnNkVPcWdzWFVLZ3lpZGNCMiIsInN1YiI6InE2cmJ4bWlHeXJjZzZFT3Fnc1hVS2d5aWRjQjIiLCJpYXQiOjE2NzI2NjgwNjIsImV4cCI6MTY3MjY3MTY2MiwiZW1haWwiOiJ0ZXN0MDFAbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdDAxQG1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.g0RZ_HdeGjPKTUJEQ8IKmHrvMTtUmkYccmaVFftQYzxxXNggwFPHS8e-eJ_v8nQFnDWSoDy_ZM3uXQW-fuQ83WoM81ITTcalIrOXJWQjfhQSbOfAMS4FWDGgmHSV4QtEw-IdrpLzzitj62VWp55FReNtbIkjC8ASS2jB3BHAMksueIDMm90z3bQen0-WzdSnYJ2obgzQy5y2m6RpHOgXwsb9c4VTLX8ualJc23ve95blJbSXfHmqnQqDLazGJYNXKGVO0XsyoCArW4djZwzTYgvEuJTkuLqfrOnMHzQEitjxiN6pD66A0crmWYX9o0vEGRK0KodpLMHlf4FtzliXOA"
    useEffect(() => {
        const path = window.location.pathname.split("/")
        const api = async () => {
            
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
                if (frist_time) {
                    window.setTimeout(() => {
                        set_first_time(false)
                        set_comment_api(data)
                    }, 1000);
                } else set_comment_api(data)
            }
        }
        api()
        set_call_api(false)
    }, [call_api]); // call api | useEffect will trigger whenever variable is different.
    async function API_Add_Like(event, param_comment_id, available) {
        // หาก True ให้ไป Like | หาก false ให้ไป Delete 
        if (available) {
            
            await fetch(`${config.domain}/add-like`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "*",
                    "User-Agent": "Custom",
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    "comment_id": param_comment_id
                })
            });
            set_call_api(true)
        } else {
            
            await fetch(`${config.domain}/delete-like`, {
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
                    "comment_id": param_comment_id
                })
            });
            set_call_api(true)
        }
    }
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
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', shadows: 0, border: 0, borderRadius: 3 }}>
                                    <CardContent >
                                        <Card>
                                            <Typography gutterBottom variant="h5" component="h2" textAlign={'left'} href="#" >

                                                <AccountCircleIcon sx={{}} /> {/* เอาลงมาไม่ได้จ้า */}
                                                <Link href={`#`} underline="hover" sx={{ pl: 1.2 }}>
                                                    {data.username}
                                                </Link>
                                            </Typography>
                                        </Card>
                                        <Card sx={{ border: 0, borderRadius: 3, boxShadow: 2, mt: 1 }}>
                                            <Typography sx={{ pl: 2, pt: 1, pb: 1 }}>
                                                {data.message} { data.owner_comment ? <Button size="small" color={'info'} onClick={(e)=> {alert('ยังไม่มีฟังก์ชั่นเปลี่ยน และ API จ้า')}}><EditIcon fontSize='small' sx={{ mb: 0.65 }} /></Button>  : '' }
                                            </Typography>
                                        </Card>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: 'left', pl: 3 }} >
                                        <Button size="small" onClick={(e) => { API_Add_Like(e, data.comment_id, data.available); }} > {!data.available ? <ThumbUpAltIcon sx={{ mb: 0.65 }} /> : <ThumbUpOffAltIcon />} &nbsp;({data.like})</Button>
                                        <Button size="small" sx={{ alignContent: 'center' }} color={'success'}><AddTaskIcon fontSize='small' sx={{ mb: 0.65 }} /> &nbsp;  (0)</Button>
                                        <Typography sx={{ pl: 2, textAlign: 'right', pr: 2 }} color='text.secondary'>
                                            {!data.update_time ? `แสดงความคิดเห็น : ${data.create_time.substring(0, 10)}` : `แก้ไขเมื่อ : ${data.create_time.substring(0, 10)}`}

                                            {/* เหลือส่วนบอกแก้ไข ตอนนี้ข้อมูลที่ออกมามีแต่ที่แก้ไขแล้ว */}
                                        </Typography>
                                        
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                        :
                        <Grid item key={[1, 2, 3, 4, 5]} xs={12} sm={12} md={12}>
                            <Card sx={{
                                height: '100%', display: 'flex', flexDirection: 'column', shadows: 0, border: 0, borderRadius: 3,
                                justifyItems: 'center', alignContent: 'center', alignItems: 'center'
                            }}>
                                <CardContent >
                                    <Card>
                                        <Typography gutterBottom variant="h5" component="h2" href="#" >
                                            <AccountCircleIcon size='large' />
                                        </Typography>
                                    </Card>

                                </CardContent>
                                <CircularProgress size={100} sx={{ margin: 2 }} />
                            </Card>
                        </Grid>
                }
            </Grid>
        </Container>
    );
}
