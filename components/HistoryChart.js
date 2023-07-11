import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(80, 80, 80, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 1,
  useShadowColorFromDataset: false, // optional
}

const countPerDate = (crisisesDateArray) => {
  const initialValue = {}
  const grouppedValues = crisisesDateArray.reduce((acc, value) => {
    if (acc[value.toLocaleDateString()] != undefined) acc[value.toLocaleDateString()] += 1
    else {
      acc[value.toLocaleDateString()] = 1
    }
    return acc
  }, initialValue)

  const today = new Date()
  const countArray = []

  for (let i = 6; i >= 0; i--) {
    const priorDateString = new Date(new Date().setDate(today.getDate() - i)).toLocaleDateString()
    countArray.push({ date: priorDateString, count: grouppedValues[priorDateString] || 0 })
  }

  return countArray
}

const HistoryChart = ({ history }) => {
  const countArray = countPerDate(history.map((dateString) => new Date(dateString)))

  const chartData = {
    labels: countArray.map((x) => x['date']),
    datasets: [
      {
        data: countArray.map((x) => x['count']),
        color: (opacity = 1) => `rgba(255, 63, 47, ${opacity})`,
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Number of crisis the last 7 days'], // optional
  }

  return (
    <LineChart
      data={chartData}
      width={Dimensions.get('window').width}
      height={400}
      verticalLabelRotation={30}
      chartConfig={chartConfig}
      bezier
    />
  )
}

export default HistoryChart
