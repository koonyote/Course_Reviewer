import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip} from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

function loop_object( params ) { 
  let loop_array = []
  for (const property in params) {
    loop_array.push( createData(`${property}`, params[property]) )
  }
  return loop_array
}

export default function Chart( props ) {
  const theme = useTheme();
  const table_data = loop_object(props.data)
  return (
    <React.Fragment>
      {/* { props ? props : 'NO '} */}
      <Title>รายการแสดงความคิดเห็น 100 ล่าสุด</Title>
      <ResponsiveContainer>
        <LineChart
          data={table_data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              คอมเม้นต์ (จำนวน)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}