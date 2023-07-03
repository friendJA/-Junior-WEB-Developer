import moment from 'moment';
import './App.css'
// import Item from './Item'
import { useEffect, useState } from 'react';

export default function App() {
  const [work, setWork] = useState<any[]>()

  const fetchData = async () => {
    const endDate = new Date(); // Current date
    const cellCount = 350;
    const startDate = new Date(endDate.getTime() - (cellCount - 1) * 24 * 60 * 60 * 1000);
    const renderCells = Array.from({ length: cellCount }, (_, index) => {
      const date = new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000);
      return {
        [moment(date).format('YYYY-MM-DD')]: 0
      };
    });

    const response = await fetch('https://dpg.gg/test/calendar.json')
    const newData = await response.json()
    const convertedArray = Object.entries(newData).map(([key, value]) => ({ [key]: value }));
    const newConvArray = renderCells.map((date1) => {
      const dateKey = Object.keys(date1)[0];
      const matchingItem = convertedArray.find((item) => Object.keys(item)[0] === dateKey);

      convertedArray.find((item) => Object.keys(item) === Object.keys(date1))
        ;
      if (matchingItem) {
        const updatedValue = matchingItem[dateKey];
        return { [dateKey]: updatedValue };
      }

      return date1;

    });
    setWork(newConvArray)
  }


  useEffect(() => {

    fetchData()
  }, [])

  const getColor = (contribution: number) => {
    if (contribution === 0) {
      return '#EDEDED'
    } else if (contribution > 1 && contribution <= 9) {
      return '#ACD5F2'
    } else if (contribution > 10 && contribution <= 19) {
      return '#7FA8C9'
    } else if (contribution > 20 && contribution <= 29) {
      return '#527BA0'
    } else if (contribution >= 30) {
      return '#254E77'
    } else {
      return '#EDEDED'
    }

  }


  const renderTr = () => work?.map((item) => {

    return <div className='item' key={Object.keys(item)[0]} style={{ backgroundColor: getColor(Number(Object.values(item)[0])) }}>

    </div>
  })




  return (
    <div className="App h-screen flex items-center justify-center">
      <div className="gridDiv">
        {renderTr()}
      </div>
    </div>
  )
}