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
export default function Comment_page() {
    const comment = [1, 2, 3, 4, 5]
    return (
        <Container sx={{ py: 8, border: 0, borderRadius: 3, boxShadow: 10, marginBottom: 10, marginTop: 2 }} maxWidth="md" >
            <Typography gutterBottom variant="h5" component="h2" textAlign={'center'} href="#" >
                Comment Student
            </Typography>
            <Grid container spacing={4}>

                {
                    comment.map((data) => (
                        <Grid item key={data} xs={12} sm={12} md={12}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', shadows: 0, border:0, borderRadius: 3 }}>
                                <CardContent >
                                    <Card>
                                        <Typography gutterBottom variant="h5" component="h2" textAlign={'left'} href="#" >

                                            <AccountCircleIcon sx={{}} /> {/* เอาลงมาไม่ได้จ้า */}
                                            <Link href={`#`} underline="hover" sx={{ pl: 2 }}>
                                                username
                                            </Link>
                                        </Typography>
                                    </Card>
                                    <Card sx={{ border: 1, border: 0, borderRadius: 3, boxShadow: 2 , mt:1}}>
                                        <Typography sx={{ padding: 2 }}>
                                            วิชานี้เนื้อหาดีมากค่ะ อาจารย์สอนค่อนข้างเข้าใจ
                                        </Typography>
                                    </Card>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'left', pl: 3 }} >
                                    <Button size="small" > {true ? <ThumbUpAltIcon sx={{ mb: 0.65 }} /> : <ThumbUpOffAltIcon />} &nbsp;(0)</Button>
                                    <Button size="small" sx={{ alignContent: 'center' }} color={'success'}><AddTaskIcon fontSize='small' sx={{ mb: 0.65 }} /> &nbsp;  (0)</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }



            </Grid>

        </Container>
    );
}
