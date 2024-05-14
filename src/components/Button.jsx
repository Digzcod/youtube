import React from 'react'
import StyleButton from "classnames";




const Button = ({typeButton}) => {

    const btnStyle = StyleButton(`
    py-[.3rem] 
    bg-slate-50
    px-[1.5rem] border 
    rounded-lg text-[12px]
    `,{
        "hover:bg-slate-100 hover:font-medium": true
    })
  return (
        <button className={btnStyle}>
            {typeButton}
        </button>
    
  )
}

export default Button