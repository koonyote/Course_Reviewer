import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CircularProgress from "@mui/material/CircularProgress";

export default function MediaCourseDetail(props) {
  // console.log(props)
  // console.log(props.data.length);
  // const CODE = props.data.CODE
  // const NAME_TH = props.data.NAME_TH
  // const NAME_EN = props.data.NAME_EN
  // const CREDIT = props.data.CREDIT
  // const UNIT = props.data.UNIT
  // const LANGUAGE = props.data.LANGUAGE
  // const CLASSNOTE = props.data.CLASSNOTE
  // const PREFIXNAME = props.data.PREFIXNAME
  // const OFFICER = props.data.OFFICERNAME + " " + props.data.OFFICERSURNAME
  const theme = useTheme();
  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between'  }}>
      {
        ( props.data !== undefined  )  ? 
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h7">
          {(props.data.NAME_EN) ? props.data.NAME_EN : ''} 
          </Typography>
          <Typography variant="subtitle1"  component="div">
          {(props.data.NAME_EN) ? props.data.NAME_TH : ''} 
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" >
          รหัสวิชา : {props.data.CODE}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" >
          {(props.data.UNIT) ? `หน่วยกิต: ${props.data.UNIT} (${props.data.LANGUAGE})` : ''} 
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" >
          {(props.data.CLASSNOTE) ? `เกี่ยวกับ: ${props.data.CLASSNOTE}` : ''} 
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" >
          {(props.data.PREFIXNAME) ? `ผู้สอน : ${props.data.PREFIXNAME + " " + props.data.OFFICERNAME + " " + props.data.OFFICERSURNAME}` : ''}   
          </Typography>  
          <Typography variant="subtitle1" color="text.secondary" component="div" >
          {(!props.data.NAME_EN) ? `วิชานี้ไม่เปิดการสอนในภาคการศึกษานี้` : ''} 
          </Typography>
        </CardContent>
      </Box>
      : <Box sx={{ display: 'flex', justifyContent: 'center' , alignItems: 'center' , ml: '20%'}}>
        <CircularProgress size={25}/> 
      </Box>
      }
      
      <CardMedia
        component="img"
        sx={{ width: 'auto', maxWidth: 100, float:'left', textAlign: 'left' }}
        image="https://media.discordapp.net/attachments/1069520916326907934/1069521820849537044/6920933.jpg?width=671&height=671"
        alt="214493 "
      />
    </Card>
  );
}
