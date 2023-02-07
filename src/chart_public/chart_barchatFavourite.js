import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip, Pie, PieChart,BarChart, Legend, Bar } from 'recharts';
import Title from '../admin/dashbard_coponents/Title';

const data = [
    {
        "name": "Page A",
        "uv": 4000,
    },
    {
        "name": "Page B",
        "uv": 3000,
    },
    {
        "name": "Page C",
        "uv": 2000,
    },
    {
        "name": "Page D",
        "uv": 2780,
    },
    {
        "name": "Page E",
        "uv": 1890,
    },
]
function loop_object(params) {
    // console.log(params)
    let loop_array = []
    for (const property in params) {
        loop_array.push({
            "value": params[property].favourite,
            "name": params[property].course_id,
        })
    }
    let sorted = loop_array.sort(
        (p1, p2) => (p1.value < p2.value) ? 1 : (p1.value > p2.value) ? -1 : 0);
    return sorted
}

export default function ChartBarFavourite(props) {
      const table_data = loop_object(props.data)
    return (
        <React.Fragment>
            <Title>รายการโปรด</Title>
            <ResponsiveContainer>
                <BarChart width={730} height={250} data={table_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}