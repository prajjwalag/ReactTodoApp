import { Check } from 'lucide-react'
import React from 'react'

const CheckBox = ({label, checked, onChange}) => {
  return (
    <label className='flex gap-4 items-center cursor-pointer'>
        <input type="checkbox" className='hidden' checked={checked} onChange={onChange}/>
        <div className={`shrink-0 size-6 flex items-center justify-center border-2 border-gray-400 rounded-md transition ${checked ? "bg-accent" : "bg-transparent"}`}>
            {checked && <Check className='size-4 text-black'/>}
        </div>
        <span className={`flex-1 w-full ${checked ? "line-through text-gray-400" : "text-white"}`}>{label}</span>
    </label>
  )
}

export default CheckBox
