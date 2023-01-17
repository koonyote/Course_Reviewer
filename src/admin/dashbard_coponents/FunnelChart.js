import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip, FunnelChart, Funnel, LabelList } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

function loop_object(params) {
    // console.log(params)
    let loop_array = []
    const color_string = [
        "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#567189" , "#7B8FA1" , "#CFB997", "#FFEA20" , "#FF8B13", "#E3F6FF", 
        "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#567189" , "#7B8FA1" , "#CFB997", "#FFEA20" , "#FF8B13", "#E3F6FF", 
        "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#567189" , "#7B8FA1" , "#CFB997", "#FFEA20" , "#FF8B13", "#E3F6FF", 
        "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#567189" , "#7B8FA1" , "#CFB997", "#FFEA20" , "#FF8B13", "#E3F6FF", 
    ]
    for (const property in params) {
        let randomNummer = Math.floor(Math.random() * color_string.length)
        if (params[property].comment !== 0) loop_array.push({
            "value": params[property].comment,
            "name": params[property].info.name_th,
            "fill": color_string[randomNummer]
        })
    }
    let sorted = loop_array.sort(
        (p1, p2) => (p1.value < p2.value) ? 1 : (p1.value > p2.value) ? -1 : 0);
      return sorted
}


const data = [
    {
        "value": 80,
        "name": "点击",
        "fill": "#83a6ed"
    },
    {
        "value": 50,
        "name": "访问",
        "fill": "#8dd1e1"
    },
    {
        "value": 40,
        "name": "咨询",
        "fill": "#82ca9d"
    },
    {
        "value": 26,
        "name": "订单",
        "fill": "#a4de6c"
    }
]

export default function FunnelChart_Component(props) {
    const theme = useTheme();
    const table_data = loop_object(props.data)
    return (
        <React.Fragment>
            {/* { props ? props : 'NO '} */}
            <Title>Course Comment</Title>
            <ResponsiveContainer>
                <FunnelChart argin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                }}>
                    <Tooltip />
                    <Funnel dataKey={'value'} data={table_data} isAnimationActive >
                        <LabelList position="right" fill='#000' stroke='none' dataKey={"name"} />
                    </Funnel>
                </FunnelChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}