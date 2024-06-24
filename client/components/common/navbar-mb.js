import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { ImExit } from 'react-icons/im'
// sweetalert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// 會員認證hook
import { useAuth } from '@/hooks/user/use-auth'
//google登入
import useFirebase from '@/hooks/user/use-firebase'

export default function NavbarMb() {
  const { logoutFirebase } = useFirebase()

  // ----------------------會員登入狀態 & 會員資料獲取  ----------------------
  //從hook 獲得使用者登入的資訊  儲存在變數LoginUserData裡面
  const { LoginUserData, handleLoginStatus, getLoginUserData, handleLogout } =
    useAuth()
  //檢查token
  useEffect(() => {
    handleLoginStatus()
    //獲得資料
    getLoginUserData()
  }, [])

  //檢查是否獲取資料
  // console.log(LoginUserData)
  //   讀取使用者資料後 定義大頭貼路徑
  let avatarImage
  if (LoginUserData.img) {
    avatarImage = `http://localhost:3005/user/${LoginUserData.img}`
  } else if (LoginUserData.photo_url) {
    avatarImage = `${LoginUserData.photo_url}`
  } else {
    avatarImage = `http://localhost:3005/user/avatar_userDefault.jpg`
  }

  //----------------------------sweetalert--------------------------------------
  //登出
  const router = useRouter()
  const mySwal = withReactContent(Swal)
  const logoutAlert = () => {
    mySwal
      .fire({
        position: 'center',
        icon: 'success',
        iconColor: '#1581cc',
        title: '登出成功，將為您跳轉到首頁',
        showConfirmButton: false,
        timer: 2000,
      })
      .then(
        setTimeout(() => {
          router.push(`/`).then(() => window.location.reload())
        }, 2000)
      )
  }

  return (
    <>
      {/* 用戶資訊 */}
      {LoginUserData.id ? (
        <>
          <div className="menu-mb-user-info d-flex align-items-center flex-column mb-3">
            <div className="mb-photo-wrapper mb-2">
              <Image src={avatarImage} alt="user photo mb" fill />
            </div>
            <div>
              {LoginUserData.nickname
                ? LoginUserData.nickname
                : LoginUserData.name}
            </div>
          </div>
          <Link
            className="mm-item"
            href="/user/user-info"
            style={{ borderTop: '1px solid #b9b9b9' }}
          >
            會員中心
          </Link>
        </>
      ) : (
        <Link className="mm-item" href="/login">
          登入/註冊
        </Link>
      )}

      <Link className="mm-item" href="/lesson">
        探索課程
      </Link>
      <Link className="mm-item" href="/instrument">
        樂器商城
      </Link>
      <Link className="mm-item" href="/jam/recruit-list">
        Let &apos;s JAM!
      </Link>
      <Link className="mm-item" href="/article/article-list">
        樂友論壇
      </Link>
      {LoginUserData.id ? (
        <div
          className="mm-item"
          style={{ color: '#1581cc' }}
          onClick={() => {
            handleLogout()
            logoutFirebase()
            logoutAlert()
          }}
        >
          登出
          <ImExit size={20} className="ms-2" />
        </div>
      ) : (
        ''
      )}
    </>
  )
}
