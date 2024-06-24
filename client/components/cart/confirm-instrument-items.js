import React from 'react'
import InstrumentConfirm from '@/pages/cart/confirm-instrument-items.module.scss'

export default function ConfirmInstrumentItems({
    instrumentData,
}
) {
  return (
    <>
    {instrumentData.map((v,i)=>{
        return (
            <div className={`${InstrumentConfirm.instrument_item}`}>
                <div className={`${InstrumentConfirm.instrument_item_name} h6`}>
                    {v.name}
                </div>
                <div className={`${InstrumentConfirm.instrument_item_price} h6`}>${(v.price).toLocaleString()}</div>
                <div className={`${InstrumentConfirm.instrument_item_quantity} h6`}>{v.qty}</div>
                <div className={`${InstrumentConfirm.instrument_item_total} h6`}>${(v.price*v.qty).toLocaleString()}</div>
                <div className={`${InstrumentConfirm.instrument_item_payment} h6`}>${(v.price*v.qty).toLocaleString()}</div>
            </div>
        )
    })}
    <style jsx>{`
        .h6 {
          font-family: 'Noto Sans TC';
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      `}</style>
    </>
)
}
