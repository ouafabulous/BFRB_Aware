import { data as dummy } from './data/dummy0'

const getFakeData = async({filepath}) => {
    const input = dummy
    const data = []
    let index = 0

    for(const row of input) {
        const {date, country} = row
        data.push({date, country})
    }

    const nextData = () => {
        const nextData = data[index]
        if(index < data.length - 1) throw ("No more data")
        index += 1
        return nextData
    }
    return {
        nextData
    }
}

export default getFakeData