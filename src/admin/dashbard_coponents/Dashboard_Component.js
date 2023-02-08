import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import domain_server from "../../config.json";
import Chart from './Chart';
import FunnelChart_Component from './FunnelChart';
import Stack from '@mui/material/Stack';
import BarchartCourseComment from './BarchartCourseComment';
import { ProductLink } from '../..';

function Title(props) {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );
}

Title.propTypes = {
    children: PropTypes.node,
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const cfg_link = { 
    course : '/course', 
    people : '/member',
    comment: '/comment'
}

function Admin_Dashboard() {
    const [data_api, set_data_api] = React.useState('')
    React.useEffect(() => {
        const api = async () => {
            const token = localStorage.getItem("token");
            const API = await fetch(`${domain_server.domain}/dashboard-info`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "*",
                    "User-Agent": "Custom",
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });
            const data = await API.json();
            if (API.status === 200) set_data_api(data);
        };
        window.setTimeout(() => {
            api();
        }, 1000);
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{}}>
                <Grid item xs={3}  >
                    {people_count(data_api.member_total)}
                </Grid>
                <Grid item xs={3}>
                    {subject_count(data_api.course_total)}
                </Grid>
                <Grid item xs={6}>
                    {comment_count(data_api.comment_total)}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 240,
                        }}
                    >
                        {data_api.comment_to_statistic ?
                            <Chart data={data_api.comment_to_statistic} /> :
                            <CircularProgress size={100} />}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 240,
                        }}
                    >
                        {data_api.course_to_statistic ?
                            // <FunnelChart_Component data={data_api.course_to_statistic} /> :
                            <BarchartCourseComment data={data_api.course_to_statistic}/> : 
                                <CircularProgress size={100} />
                        }
                    </Paper>
                </Grid>


                {/* <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid> */}
            </Grid>
        </Box>
    );
}

function people_count(member) {
    return (
        <Item sx={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
            px: 3,
            bgcolor: '#FD8B7C'
        }}>
            <React.Fragment>
                <Title>จำนวนผู้ใช้</Title>
                <Typography component="p" variant="h4" sx={{ fontWeight: 'bold' }}>
                    {member}
                </Typography>
                <div>
                    <Link color="text.secondary" href={ProductLink.admin_table + cfg_link.people} >
                        รายละเอียด
                    </Link>
                </div>
            </React.Fragment>
        </Item>
    )
}

function subject_count(subject) {
    return (
        <Item sx={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
            px: 3,
            bgcolor: '#F0C459'
        }}>
            <React.Fragment>
                <Title>จำนวนรายวิชา</Title>
                <Typography component="p" variant="h4" sx={{ fontWeight: 'bold' }}>
                    {subject}
                </Typography>
                <div>
                    <Link color="text.secondary" href={ProductLink.admin_table + cfg_link.course} >
                        รายละเอียด
                    </Link>
                </div>
            </React.Fragment>
        </Item>
    )
}

function comment_count(comment) {
    return (
        <Item sx={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
            px: 3,
            bgcolor: '#D9D9D9'
        }}>
            <React.Fragment>
                <Title>จำนวนคอมเม้นต์</Title>
                <Typography component="p" variant="h4" sx={{ fontWeight: 'bold' }}>
                    {comment}
                </Typography>
                <Link sx={{opacity: 0}}>&nbsp;</Link>
            </React.Fragment>
        </Item>
    )
}

export default Admin_Dashboard