import { ResponsiveLine } from '@nivo/line'
import { useAnalyticsContext } from '../../contexts/AnalyticsContext';


// const data = [
//   {
//       "id": "totalCalls",
//       "color": "hsl(250, 70%, 50%)",
//       "data": [
//         { "x": "Jan", "y": Math.floor(Math.random() * 100) },
//         { "x": "Feb", "y": Math.floor(Math.random() * 100) },
//         { "x": "Mar", "y": Math.floor(Math.random() * 100) },
//         { "x": "Apr", "y": Math.floor(Math.random() * 100) },
//         { "x": "May", "y": Math.floor(Math.random() * 100) },
//         { "x": "Jun", "y": Math.floor(Math.random() * 100) },
//         { "x": "Jul", "y": Math.floor(Math.random() * 100) },
//         { "x": "Aug", "y": Math.floor(Math.random() * 100) },
//         { "x": "Sep", "y": Math.floor(Math.random() * 100) },
//         { "x": "Oct", "y": Math.floor(Math.random() * 100) },
//         { "x": "Nov", "y": Math.floor(Math.random() * 100) },
//         { "x": "Dec", "y": Math.floor(Math.random() * 100) },
//       ]
//     },
//     {
//       "id": "totalChats",
//       "color": "hsl(23, 70%, 50%)",
//       "data": [
//         { "x": "Jan", "y": Math.floor(Math.random() * 100) },
//         { "x": "Feb", "y": Math.floor(Math.random() * 100) },
//         { "x": "Mar", "y": Math.floor(Math.random() * 100) },
//         { "x": "Apr", "y": Math.floor(Math.random() * 100) },
//         { "x": "May", "y": Math.floor(Math.random() * 100) },
//         { "x": "Jun", "y": Math.floor(Math.random() * 100) },
//         { "x": "Jul", "y": Math.floor(Math.random() * 100) },
//         { "x": "Aug", "y": Math.floor(Math.random() * 100) },
//         { "x": "Sep", "y": Math.floor(Math.random() * 100) },
//         { "x": "Oct", "y": Math.floor(Math.random() * 100) },
//         { "x": "Nov", "y": Math.floor(Math.random() * 100) },
//         { "x": "Dec", "y": Math.floor(Math.random() * 100) },
//       ]
//     },
//     {
//       "id": "Goals Set",
//       "color": "hsl(250, 70%, 50%)",
//       "data": [
//         { "x": "Jan", "y": Math.floor(Math.random() * 100) },
//         { "x": "Feb", "y": Math.floor(Math.random() * 100) },
//         { "x": "Mar", "y": Math.floor(Math.random() * 100) },
//         { "x": "Apr", "y": Math.floor(Math.random() * 100) },
//         { "x": "May", "y": Math.floor(Math.random() * 100) },
//         { "x": "Jun", "y": Math.floor(Math.random() * 100) },
//         { "x": "Jul", "y": Math.floor(Math.random() * 100) },
//         { "x": "Aug", "y": Math.floor(Math.random() * 100) },
//         { "x": "Sep", "y": Math.floor(Math.random() * 100) },
//         { "x": "Oct", "y": Math.floor(Math.random() * 100) },
//         { "x": "Nov", "y": Math.floor(Math.random() * 100) },
//         { "x": "Dec", "y": Math.floor(Math.random() * 100) },
//       ]
//     },
//     {
//       "id": "Goals Achieved",
//       "color": "hsl(23, 70%, 50%)",
//       "data": [
//         { "x": "Jan", "y": Math.floor(Math.random() * 100) },
//         { "x": "Feb", "y": Math.floor(Math.random() * 100) },
//         { "x": "Mar", "y": Math.floor(Math.random() * 100) },
//         { "x": "Apr", "y": Math.floor(Math.random() * 100) },
//         { "x": "May", "y": Math.floor(Math.random() * 100) },
//         { "x": "Jun", "y": Math.floor(Math.random() * 100) },
//         { "x": "Jul", "y": Math.floor(Math.random() * 100) },
//         { "x": "Aug", "y": Math.floor(Math.random() * 100) },
//         { "x": "Sep", "y": Math.floor(Math.random() * 100) },
//         { "x": "Oct", "y": Math.floor(Math.random() * 100) },
//         { "x": "Nov", "y": Math.floor(Math.random() * 100) },
//         { "x": "Dec", "y": Math.floor(Math.random() * 100) },
//       ]
//     },
// ];



const MyResponsiveLine = () => {
  const { totalChats, totalCalls, goalsSet, goalsAchieved } = useAnalyticsContext();

  const data = [
    {
      "id": "Total Calls",
      "color": "hsl(250, 70%, 50%)",
      "data": [
        { "x": "Jan", "y": 0 },
        { "x": "Feb", "y": totalCalls },
        { "x": "Mar", "y": 0 },
        { "x": "Apr", "y": 0 },
        { "x": "May", "y": 0 },
      ]
    },
    {
      "id": "Total Chats",
      "color": "hsl(23, 70%, 50%)",
      "data": [
        { "x": "Jan", "y": 0 },
        { "x": "Feb", "y": totalChats },
        { "x": "Mar", "y": 0 },
        { "x": "Apr", "y": 0 },
        { "x": "May", "y": 0 },
      ]
    },
    {
      "id": "Goals Set",
      "color": "hsl(250, 70%, 50%)",
      "data": [
        { "x": "Jan", "y": 0 },
        { "x": "Feb", "y": goalsSet },
        { "x": "Mar", "y": 0 },
        { "x": "Apr", "y": 0 },
        { "x": "May", "y": 0 },
      ]
    },
    {
      "id": "Goals Achieved",
      "color": "hsl(23, 70%, 50%)",
      "data": [
        { "x": "Jan", "y": 0 },
        { "x": "Feb", "y": goalsAchieved },
        { "x": "Mar", "y": 0 },
        { "x": "Apr", "y": 0 },
        { "x": "May", "y": 0 },
      ]
    },
  ];
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Months',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      pointSize={5}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  )
}

export default MyResponsiveLine;