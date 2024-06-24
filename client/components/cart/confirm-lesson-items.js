import React from 'react'
import LessonConfirm from '@/pages/cart/confirm-lesson-items.module.scss'


export default function ConfirmLessonItems({
  lessonData,
}) {
  return (
    <>
      {lessonData.map((v,i)=>{
        return (
          <div className={`${LessonConfirm.lesson_item}`}>
            <div className={`${LessonConfirm.lesson_item_name} h6`}>
              {v.name}
            </div>
            <div className={`${LessonConfirm.lesson_item_price} h6`}>${(v.price).toLocaleString()}</div>
            <div className={`${LessonConfirm.lesson_item_payment} h6`}>${(v.price).toLocaleString()}</div>
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