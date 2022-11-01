import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";

const data = [];
for (let num = 30; num >= 0; num--) {
  data.push({
    date: subDays(new Date(), num).toISOString().substring(0, 10),
    value: 1 + Math.random(),
  });
}

// const data = [
//   {
//     name: "Jan",
//     uv: 40,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Feb",
//     uv: 30,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Mar",
//     uv: 20,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Apr",
//     uv: 27,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "May",
//     uv: 18,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Jun",
//     uv: 23,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Jul",
//     uv: 34,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: "Aug",
//     uv: 34,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: "Sep",
//     uv: 34,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: "Oct",
//     uv: 34,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: "Nov",
//     uv: 34,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: "Dec",
//     uv: 34,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const Chart = () => {
  return (
    <div>
      <ResponsiveContainer width="100%" height="100%" aspect={2.2}>
        <AreaChart
          width="auto"
          height="auto"
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFB800" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#FFF0CA" stopOpacity={0} />
              <stop offset="95%" stopColor="#FFB800" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickFormatter={(str) => {
              const date = parseISO(str);
              if (date.getDate() % 3 === 0) {
                return format(date, "MMM");
              }
              return "";
            }}
          />

          <YAxis
            datakey="value"
            axisLine={false}
            tickLine={false}
            tickCount={8}
            tickFormatter={(number) => `$${number.toFixed(2)}`}
            stroke="#9CA3AF"
            fontWeight={500}
            fontSize="0.875rem"
          />
          {/* <XAxis
            style={{ fontFamily: "Sora" }}
            dataKey="name"
            stroke="#9CA3AF"
            fontWeight={600}
            dy={8}
            fontSize="0.875rem"
            interval={"preserveStartEnd"}
            // tickFormatter={(value) => value + ""}
          />
          <YAxis
            style={{ fontFamily: "Sora" }}
            // tickFormatter={nFormatter}
            type="number"
            dy={-4}
            fontWeight={500}
            fontSize="0.875rem"
            domain={["dataMin", "dataMax"]}
            allowDecimals={false}
            scale="auto"
            stroke="#9CA3AF"
          /> */}
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {/* <Tooltip /> */}
          <Area
            type="monotone"
            dataKey="value"
            strokeWidth={3}
            stroke="#FFB800"
            fillOpacity={2}
            fill="url(#colorUv)"
          />
          {/* <Area
            type="linear"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
