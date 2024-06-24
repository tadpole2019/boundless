import React from 'react'
import styles from '@/components/coupon/coupon.module.scss'

export default function Coupon({
  id,
  name,
  type,
  kind,
  discount,
  valid,
  limit_time,
}) {
  return (
    <>
      <div className={`${styles.couponCard} card mb-3 mx-1`}>
        <div className="row  d-flex g-0">
          {/* 左 */}
          <div className="col-3">
            <img
              className={`${styles.couponImg} my-3 p-2`}
              src={`/coupon/${valid ? 'logoWhite.jpg' : 'logoValid.jpg'}`}
              alt="..."
            />
          </div>
          <div className="col-9">
            <div className="mx-2 card-body d-flex justify-content-between">
              <div>
                <div
                  className="h5 p-1
                  card-title fw-bold"
                >
                  {(valid = `${name}`)}
                  {/* 註冊禮即時領取 */}
                </div>
                <div className="h4 px-3 py-2">
                  {kind === 2 ? '課程' : '樂器'}
                  {/* 課程 */}
                </div>
              </div>
              <div className="card-text d-flex justify-content-center align-items-center">
                <div className="fs-3 fw-bold salesType">
                  {type === 1 ? discount : IsINT(discount * 10) + '折'}
                  {/* 95折 */}
                </div>
              </div>
            </div>
            {/* 下 */}
            <div>
              <p className="card-text px-4 py-1">
                <small className="text-muted ">到期日{limit_time}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  )
}
const IsINT = function (int) {
  if (int % 10 === 0) {
    return int / 10
  } else {
    return int
  }
}
