import { useState } from "react";
//react icons
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'

export default function PlusMinusBtn(){
    let [count, setCount] = useState(0);
    function incrementCount(){
        count = count + 1;
        setCount(count);
    }
    function decrementCount(){
        count = count - 1;
        setCount(count);
    }

    return (
        <div className="input-group">
        <button
          className={`${Instrument.quantity_left_minus} btn btn-light`}
          onClick={() => {
            if (v.qty === 1) {
              remove(items,v.id)
            }else{
              decrement(items,v.id)
            }
            }}
        >
          <FaMinus />
        </button>
        <input
          type="text"
          className={`${Instrument.input_number} form-control`}
          id="quantity"
          name="quantity"
          defaultValue={v.qty}
          min={1}
          max={100}
        />
        <button
          className={`${Instrument.quantity_right_plus} btn btn-primary`}
          onClick={() => {
            increment(items, v.id)
          }}
        >
          <FaPlus />
        </button>
      </div>
    )
}

