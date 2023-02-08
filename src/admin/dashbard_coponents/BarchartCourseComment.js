import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip, FunnelChart, Funnel, LabelList , BarChart, Legend, Bar} from 'recharts';
import Title from './Title';


function loop_object(params) {
    // console.log(params)
    let loop_array = []
    for (const property in params) {
        if (params[property].comment !== 0) loop_array.push({
            "value": params[property].comment,
            "name": params[property].info.name_th,
        })
    }
    let sorted = loop_array.sort(
        (p1, p2) => (p1.value < p2.value) ? 1 : (p1.value > p2.value) ? -1 : 0);
    return sorted
}



export default function BarchartCourseComment(props) {
    const theme = useTheme();
    const table_data = loop_object(props.data)
    return (
        <React.Fragment>
            {/* { props ? props : 'NO '} */}
            <Title>จำนวนคอมคิดเห็น - รายวิชา</Title>
            <ResponsiveContainer>

                <BarChart argin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                }} data={table_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>



            </ResponsiveContainer>
        </React.Fragment>
    );
}