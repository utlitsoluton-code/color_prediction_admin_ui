import React, { useState, useEffect } from 'react'
import { addSlot } from './../../endpoints'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function AddSlot() {
  const navigate = useNavigate()

  const [slotValue, setSlotValue] = useState({
    slotNumber: '',
    slotName: '',
    startDate: '',
    startTime: '',
    endTime: '',

  })
  const [createBtndiable, setCreateBtndiable] = useState(false)
  const [createBtnloading, setCreateBtnloading] = useState(false)

  const handleChange = async (e) => {
    const { name, value } = e.target

    setSlotValue((prevValues) => {
        return {
          ...prevValues,
          [e.target.name]: e.target.value,
        }
      })
  }

  async function handleAddSlot() {
    const { slotNumber, slotName, startDate, startTime, endTime } = slotValue
    if (!slotNumber || !slotName || !startDate || !startTime || !endTime) return

    const startDateTime = `${startDate} ${startTime}`;
    const endDateTime = `${startDate} ${endTime}`;
  
    const startDateTimestamp = new Date(startDateTime).getTime();
    const startTimeTimestamp = new Date(startDateTime).getTime();
    const endTimeTimestamp = new Date(endDateTime).getTime();

    const data = JSON.stringify({
      slotNumber,
      slotName,
      startDate: startDateTimestamp,
      startTime: startTimeTimestamp,
      endTime: endTimeTimestamp,
    });
  
    setCreateBtndiable(true)
    setCreateBtnloading(true)
    
    try {
      await addSlot(JSON.parse(data))
        .then(() => {      
          
              Swal.fire('Created!', `Slot has been Created.`, 'success')
            // Reset slotValue state to empty fields
            setSlotValue({
              slotNumber: '',
              slotName: '',
              startDate: '',
              startTime: '',
              endTime: '',
            });
    
        })
        .catch((err) => console.log('Err -> ', err))
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
    setCreateBtndiable(false)
    setCreateBtnloading(false)
  }

  return (
      <div>
        <div className='text-end'>
        <button className="btn btn-primary" onClick={()=>navigate(-1)}>Back</button>
  
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Slot Name
          </label>
          <input
            type="text"
            name="slotName"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Slot Name"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={slotValue.slotName}

          />
    
      {/* {nameError && <label style={{ color: "red" }}>Slot name is required.</label>} */}
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Slot Number
      </label>
      <input
        type="text"
        name="slotNumber"
        className="form-control"
        id="exampleInputEmail1"
        placeholder="Slot Number"
        aria-describedby="emailHelp"
        onChange={handleChange}
        value={slotValue.slotNumber}

      />
      {/* {nameError && <label style={{ color: "red" }}>Slot number is required.</label>} */}
    </div>
    <div className="mb-3">
      <label htmlFor="startDate" className="form-label">
        Start Date
      </label>
      <input
        type="date"
        name="startDate"
        className="form-control"
        id="startDate"
        placeholder="Start Date"
        aria-describedby="emailHelp"
        onChange={handleChange}
        value={slotValue.startDate}

      />
      {/* {startDateError && <label style={{ color: "red" }}>Start date is required.</label>} */}
    </div>
    <div className="mb-3">
      <label htmlFor="startTime" className="form-label">
        Start Time
      </label>
      <input
        type="time"
        name="startTime"
        className="form-control"
        id="startTime"
        placeholder="Start Time"
        aria-describedby="emailHelp"
        value={slotValue.startTime}
        onChange={handleChange}


      />
      {/* {startTimeError && <label style={{ color: "red" }}>Start time is required.</label>} */}
    </div>
    <div className="mb-3">
      <label htmlFor="endTime" className="form-label">
        End Time
      </label>
      <input
        type="time"
        name="endTime"
        className="form-control"
        id="endTime"
        placeholder="End Time"
        aria-describedby="emailHelp"
        onChange={handleChange}
        value={slotValue.endTime}

      />
      {/* {endTimeError && <label style={{ color: "red" }}>End time is required.</label>} */}
    </div>

    {/* <div className="mb-3">
      <div className="mb-2 row">
        <label htmlFor="" className="form-label">
          Status
        </label>
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              name="status"
              checked={slotValue?.status == 'OPEN'}
              value="OPEN"
              type="checkbox"
              onChange={handleChange}
              id="inlineCheckbox1"
              
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              Active
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              name="status"
              type="checkbox"
              checked={slotValue?.status == 'CLOSE'}
              value="CLOSE"
              onChange={handleChange}
              id="inlineCheckbox2"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Inactive
            </label>
          </div>
        </div>
      </div>
    </div> */}
    <button onClick={handleAddSlot} disabled={createBtndiable} type="submit" className="btn btn-primary mb-5">
      Submit
    </button>
    {(createBtnloading) && <span>Creating...</span>}
  </div>
       
  )
}

export default AddSlot
