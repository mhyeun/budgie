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
          domain={this.props.domain}
          tickFormatter={(unixTime) => moment(unixTime).format("MMM Do YYYY")}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Balance" stroke="#8884d8" />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    );
  }
}

export default Chart;
