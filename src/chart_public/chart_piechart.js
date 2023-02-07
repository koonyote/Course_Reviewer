import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip, Pie, PieChart } from 'recharts';
import Title from '../admin/dashbard_coponents/Title';

export default function ChartPie(props) {
    let form = [
        {
            "name": "คะแนน 1",
            "value": 0,
            "fill": "#ff7f00"
        },
        {
            "name": "คะแนน 2",
            "value": 0,
            "fill": "#ff9500"
        },
        {
            "name": "คะแนน 3",
            "value": 0,
            "fill": "#ffaa00"
        },
        {
            "name": "คะแนน 4",
            "value": 0,
            "fill": "#ffbf00"
        },
        {
            "name": "คะแนน 5",
            "value": 0,
            "fill": "#ffd400"
        }
    ];
    if (props.data) { 
        form[0].value =+ props.data.one; 
        form[1].value =+ props.data.two; 
        form[2].value =+ props.data.three; 
        form[3].value =+ props.data.four; 
        form[4].value =+ props.data.five; 
    }
    return (
        <React.Fragment>
            <Title>คะแนนรายวิชา</Title>
            <ResponsiveContainer>
                <PieChart width={730} height={250}>
                    <Tooltip />
                    <Pie data={form} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="fill" label />
                </PieChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}