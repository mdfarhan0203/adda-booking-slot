import './App.css';
import React, { useState } from 'react';
import Booking from './components/Booking';


export default function App() {
  const [slot, setSlot] = useState([])
  const [price, setPrice] = useState(0)
  const [show, setShow] = useState(false)
  const [isData, setIsData] = useState(false)
  const [error,setError]=useState(true)



  function calculatPrice(input) {
    let startHour = input.startTime.split(':')[0]
    let endHour = input.endTime.split(':')[0]
    let hours = endHour - startHour
    if (input.title === "clubHouse") {
      if (Number(startHour) > 16 && Number(endHour) < 22) {
        setPrice(hours * 500)
      }
      else {
        // if user has selected time 15 to 20 the for 1 hour 100 and rest hour 500 will be calculated
        //Example use has selected starting time 15 and ending time 20 then 
        //2 hour*100 >>>15,16 --->2*100
        //3 hour*500>>>17,18,19--->3*500
        //total---->200+1500--->1700

        let bigNumber = input.checkTime.filter((item) => item > 16 && item < 22)
        let prices = 0
        if (bigNumber.length > 1) {
          prices = 500 * bigNumber.length
        }
        hours = input.checkTime.length - bigNumber.length
        let newPrice = hours * 100 + prices
        setPrice(newPrice)
      }
    }
    else {
      setPrice(hours * 50)
    }

  }

// checking array is present or not to other array
  function checkedArray(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr2.includes(arr1[i])) {
        return false
      }
    }
    return true
  }


  function checkCondition(data) {
    for (let name of slot) {
      if (
        name.title === data.title &&
        name.date === data.date
      ) {
        let cheching = checkedArray(name.checkTime, data.checkTime)
        if (!(cheching)) {
          setShow(true)
          console.log("Falied ")
          break;
        }
        else {
          setShow(false)
          setSlot((pre) => { return [...pre, data] })
        }
      }
      else {
        setShow(false)
        setSlot((pre) => { return [...pre, data] })
      }
    }
  }


  const handlerSubmited = (data) => {
    calculatPrice(data)
    if (slot.length >= 1) {
      setIsData(true)
      checkCondition(data)
    }
    else {
      setIsData(true)
      setSlot((pre) => { return [...pre, data] })
    }
  }

  return (
    <div className="containerApp">
      <div>
        <Booking handlerSubmited={handlerSubmited} setError={setError} />
      </div>
      <div className='content'>
        {error? isData ? show ?
          <div><h3>Booking Failed, Already Booked
          </h3></div> : <div><h3>Booked, Rs. {price}</h3></div> : null:<div><h1 className='error'>Please Select All Fieldes</h1></div>}
      </div>
    </div>
  );
}


