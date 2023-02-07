import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip, Pie, PieChart, RadialBarChart, RadialBar, Legend } from 'recharts';
import Title from '../admin/dashbard_coponents/Title';

export default function ChartRadial(props) {
    let data  = [
        {
            "name": "benefit",
            "value": 0,
            "fill": "#8884d8"
        },
        {
            "name": "knowledge",
            "value": 0,
            "fill": "#83a6ed"
        },
        {
            "name": "satisfaction",
            "value": 0,
            "fill": "#8dd1e1"
        },
        {
            "name": "teacher",
            "value": 0,
            "fill": "#82ca9d"
        },
        {
            "name": "teaching",
            "value": 0,
            "fill": "#ffc658"
        }
    ]
    //   const table_data = loop_object(props.data)
    if ( props.data ) {
        data[0].value += props.data.benefit
        data[1].value += props.data.knowledge
        data[2].value += props.data.satisfaction
        data[3].value += props.data.teacher
        data[4].value += props.data.teaching
    }

    return (
        <React.Fragment>
            <Title>ด้านความพึงพอใจ</Title>
            <ResponsiveContainer >
                <RadialBarChart
                    width={730}
                    height={250}
                    innerRadius="10%"
                    outerRadius="100%"
                    data={data}
                    startAngle={0}
                    endAngle={360}
                >
                    <RadialBar minAngle={15}  background clockWise={true} dataKey='value' />
                    <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
                    <Tooltip />
                </RadialBarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}