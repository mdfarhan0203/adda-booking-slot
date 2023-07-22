import React, { useState } from 'react'

export default function Booking({ handlerSubmited }) {
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
    const { name, value } = e.target
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
  return (
    <div className='container'>
      <div className='header'>Book Slot </div>
      <form onSubmit={handlerSubmit} className='form-submit'>
        <div>
          <label htmlFor='sport'>Select Sports</label>
          <select
            id='sport'
            name='title'
            value={bookSlot.title}
            onChange={(e) => handlerChange(e)}>
            <option
            >Clubhouse</option>
            <option
            >Tennis Court</option>
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
