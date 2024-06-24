import styles from '@/pages/jam/jam.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { FaUser } from 'react-icons/fa'

export default function MemberInfo({ uid, name, nickname, img, play }) {
  return (
    <div
      className="d-flex align-items-center flex-wrap"
      style={{ gap: '10px' }}
    >
      <div className={`${styles.cardBadge} ${styles.player}`}>{play}</div>
      <div className={`${styles.userPhotoWrapper}`}>
        {img ? (
          <Image
            src={`http://localhost:3005/user/${img}`}
            alt={`${name}'s photo`}
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
      <Link
        href={`../../user/user-homepage/${uid}`}
        className={`${styles.memberName}`}
        target='_blank'
      >
        {nickname ? nickname : name}
      </Link>
    </div>
  )
}
