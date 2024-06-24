import { Lekton } from "next/font/google"
import { useState } from "react"
export default function InstrumentCouponDropdowns({
  instrumentCoupons,
  handleInstrumentSelector,
  handleInstrumentCUIDSelector,
}) {
  const coupons = instrumentCoupons.map((v) => {
    return (
      <option key={v.id} value={v.discount} name={v.name} cuid={v.id}>
        {v.name}
      </option>
    )
  })
  



let select = ()=>{
  if(typeof localStorage !== 'undefined'){
   return  localStorage.getItem('InstrumentCoupon')
  }else{
   return ''
  }
 }




  return (
    <>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue={0}
        value={select()}
        onChange={(e) => {
          console.log(e.target.getAttribute("name"))
          handleInstrumentSelector(e.target.value)
          //目前抓不到
          console.log(e.target.getAttribute("cuid")); // 檢查是否能夠正確獲取到 data-cuid 的值
          let cuid = e.target.getAttribute("cuid");
          handleInstrumentCUIDSelector(cuid)
        }}
      >
        <option value={0} disabled>
          請選擇折價券
        </option>
        {coupons}
      </select>
    </>
  )
}
