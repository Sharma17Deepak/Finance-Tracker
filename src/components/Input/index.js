import React from 'react'
import "./style.css"

const Input = ({label, state, setState, placeholder, type}) => {
  return (
    <div className='input-wrapper'>
        <p className='label-input'>{label}</p>
        <input className='custom-input' 
            type={type}
            placeholder={placeholder}
            value={state}
            onChange={(e)=>{setState(e.target.value)}}
        ></input>
    </div>
  )
}

export default Input