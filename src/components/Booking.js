import React, { useState } from 'react'

export default function Booking({ handlerSubmited, setError }) {
  const [bookSlot, SetBookSlot] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    checkTime: []
  })

  const handlerSubmit = (event) => {
    event.preventDefault()
  }

  const handlerChange = (e) => {
    let { name, value } = e.target
    if (value === 'TennisCourt' || value === 'clubHouse') {
      console.log("nnnnkllllll", value)
      name = 'title'
    }
    console.log("naem", name)
    console.log("value", value)
    SetBookSlot(pre => { return { ...pre, [name]: value } })
  }


  function timeFrom() {
    let timeDiff = bookSlot.endTime.split(':')[0] - bookSlot.startTime.split(':')[0]
    let startTime = bookSlot.startTime.split(':')[0]
    for (let i = 0; i < timeDiff; i++) {
      bookSlot.checkTime[i] = Number(startTime)
      startTime = Number(startTime) + 1
    }
  }


  const handlerSumbit = () => {
    if (bookSlot.title && bookSlot.date && bookSlot.startTime && bookSlot.endTime) {
      // console.log("all field given")
      setError(true)
      timeFrom()
      handlerSubmited(bookSlot)
      SetBookSlot({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        checkTime: []
      })
    }
    else {
      // console.log("error")
      setError(false)
    }
  }
  return (
    <div className='container'>
      <div className='header'>Book Slot </div>
      <form onSubmit={handlerSubmit} className='form-submit'>
        <div>
          <label htmlFor='sport'>Select Sports</label>
          <select
            value={bookSlot.title}
            onChange={(e) => handlerChange(e)}
          >
            <option
              value={''}
            >Choose the Sports</option>
            <option
              value={"TennisCourt"}>Tennis Court</option>
            <option
              value={"clubHouse"}>Club House</option>
          </select>
        </div>
        <div>
          <label htmlFor='date'>Date</label>
          <input
            id='date'
            type='date'
            placeholder='Date'
            name='date'
            value={bookSlot.date}
            onChange={(e) => handlerChange(e)}
          ></input>
        </div>
        <div>
          <label htmlFor='start-time'>Start Time</label>
          <input
            type='time'
            name='startTime'
            placeholder='Start Time'
            value={bookSlot.startTime}
            onChange={handlerChange}
          ></input>
        </div>
        <div>
          <label htmlFor='end-Time'>End Time</label>
          <input
            id='end-Time'
            type='time'
            name='endTime'
            placeholder='End Time'
            value={bookSlot.endTime}
            onChange={handlerChange}
          ></input>
        </div>
      </form>
      <div className='book-slot-btn'
      >
        <button
          onClick={handlerSumbit}
        >Book Slot</button>
      </div>

    </div>
  )
}
