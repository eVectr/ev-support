import React from 'react'
const CheckBox = ({ time ,getCheckboxValue,index,e, label, className, name, disabled = false, errors, ...restProps }) => {
   return (
       <div>
           <label htmlFor={name} className={`checkbox ${className || ''}`}>
               <input name={name} onChange={(e) => getCheckboxValue(e, time, index)} id={name} type='checkbox'  className='checkbox__field'  {...restProps}/>
           </label>
       </div>
   )
}
export default CheckBox