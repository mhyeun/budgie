import React from "react";
import moment from "moment";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import "./chart.scss";

export interface ChartProps {
  data?: any;
  domain?: any;
}

class Chart extends React.Component<ChartProps> {
  render() {
    return (
      <LineChart
        width={960}
        height={540}
        data={this.props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          scale="time"
          type="number"
          domain={["auto", "auto"]}
          tickFormatter={(unixTime) => moment(unixTime).format("MM/D")}
        />
        <YAxis />
        <Tooltip
          formatter={(value) => {
            return `$${value}`;
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="Balance" stroke="#228B22" />
        <Line type="monotone" dataKey="Goal" stroke="#5294E2" />
      </LineChart>
    );
  }
}

export default Chart;
