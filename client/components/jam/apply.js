import styles from '@/pages/jam/jam.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { FaUser } from 'react-icons/fa'
import { useState } from 'react'

export default function Apply({
  id = 0,
  applier = {},
  message = '',
  play = '',
  created_time = '',
  state = 0,
  sendResult,
}) {
  const [resultState, setResultState] = useState(state)
  const switchState = (resultState) => {
    switch (resultState) {
      case 0:
        return (
          <>
            <div
              className="b-btn b-btn-body px-3"
              role="presentation"
              onClick={() => {
                setResultState(2)
                sendResult(id, 2)
              }}
            >
              拒絕
            </div>
            <div
              className="b-btn b-btn-primary px-3"
              role="presentation"
              onClick={() => {
                setResultState(1)
                sendResult(id, 1)
              }}
            >
              接受
            </div>
          </>
        )
      case 1:
        return (
          <>
            <div
              className="b-btn-disable px-3"
              style={{ backgroundColor: '#1581cc' }}
              role="presentation"
            >
              等待回覆
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div
              className="b-btn-disable px-3"
              style={{ backgroundColor: '#666666' }}
              role="presentation"
            >
              已拒絕
            </div>
          </>
        )
      default:
        return null
    }
  }
  return (
    <>
      <div className="d-flex justify-content-between align-items-sm-start flex-sm-row flex-column px-1">
        <div
          className="d-flex align-items-center flex-wrap"
          style={{ gap: '10px' }}
        >
          <div className={`${styles.cardBadge} ${styles.player}`}>{play}</div>
          <div className={`${styles.userPhotoWrapper}`}>
            {applier.img ? (
              <Image
                src={`http://localhost:3005/user/${applier.img}`}
                alt={`${applier.name}'s photo`}
                width={32}
                height={32}
                className={`${styles.userPhoto}`}
              />
            ) : (
              <div className={`${styles.userPhotoDefault}`}>
                <FaUser size={24} className={`${styles.userDefaultIcon}`} />
              </div>
            )}
          </div>
          <Link href={`../../user/user-homepage/${applier.uid}`} className={`${styles.memberName}`}>
            {applier.nickname ? applier.nickname : applier.name}
          </Link>
        </div>

        <div
          data-bs-toggle="collapse"
          href={`#${id}`}
          aria-expanded="false"
          aria-controls="collapseExample"
          className="d-flex justify-content-end mt-1 nt-sm-0"
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
            color: '#1581cc',
          }}
        >
          <div>查看訊息</div>
        </div>
      </div>
      <div className="collapse" id={id}>
        <div className="card card-body">
          <div className="fw-medium">{created_time}</div>
          {message}
          <div className="d-flex justify-content-end gap-2">
            {switchState(resultState)}
          </div>
        </div>
      </div>
    </>
  )
}
