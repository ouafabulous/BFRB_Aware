import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 1,
  useShadowColorFromDataset: false, // optional
}

const HistoryChart = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Rainy Days'], // optional
  }

  return (
    <LineChart
      data={chartData}
      width={Dimensions.get('window').width}
      height={256}
      verticalLabelRotation={30}
      chartConfig={chartConfig}
      bezier
    />
  )
}

export default HistoryChart
