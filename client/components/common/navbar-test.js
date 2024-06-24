import React, { useState, useEffect } from 'react'
import { IoCart, IoMenu } from 'react-icons/io5'
import Image from 'next/image'
import logo from '@/assets/logo.svg'
import logoMb from '@/assets/logo_mb.svg'
import Link from 'next/link'
import { ImExit } from 'react-icons/im'

// 會員認證hook
import { useAuth } from '@/hooks/user/use-auth'

export default function Navbar({ menuMbToggle }) {
  const [showMenu, setShowMenu] = useState(false)

  // ----------------------會員登入狀態 & 會員資料獲取  ----------------------
  //從hook 獲得使用者登入的資訊  儲存在變數LoginUserData裡面
  const { LoginUserData, handleLoginStatus, getLoginUserData, handleLogout } =
    useAuth()
  const [userData, setUserData] = useState()
  //檢查token
  useEffect(() => {
    handleLoginStatus()
    //獲得資料
    getLoginUserData()
  }, [])

  //檢查是否獲取資料
  // console.log(LoginUserData)
  //   讀取使用者資料後 定義大頭貼路徑   再觀察一下 大頭貼目前有bad 錯誤訊息
  const avatarImage = `/user/${LoginUserData.img}`
  const avatarDefault = `/user/avatar_userDefault.jpg`

  //--------------------------登入狀態下 點擊右上角叫出小視窗-------------------
  // 定義狀態來追蹤 className
  const [avatarActive, setavatarActive] = useState(false)

  // 點擊事件處理函式
  const handleClick = () => {
    // 更改狀態，切換 className
    setavatarActive(!avatarActive)
  }

  // 根據狀態設置不同的 className
  const avatarActivestatus = avatarActive ? '' : 'menu-active'

  return (
    <>
      <header className="w-100 d-flex justify-content-between align-items-center">
        <Link href="#" className="d-none d-lg-block ">
          <Image src={logo} alt="logo" className="logo" />
        </Link>
        <Link href="" className="d-lg-none">
          <Image src={logoMb} alt="logo-mobile" className=" logo-mb" />
        </Link>

        <nav className="navbar-wrapper">
          <ul className="navbar d-none d-lg-flex justify-content-between flex-row">
            <li>
              <Link href="/lesson">探索課程</Link>
            </li>
            <li>
              <Link href="/instrument">樂器商城</Link>
            </li>
            <li>
              <Link href="/jam/recruit-list">Let&apos;s JAM!</Link>
            </li>
            <li>
              <Link href="/article">樂友論壇</Link>
            </li>
            <li className="ms-3">
              <Link href="/cart">
                <IoCart size={30} className="cart-icon" />
              </Link>
            </li>
            <li className="login-state d-flex justify-content-center">
              {LoginUserData.id ? (
                <Link className="" href="">
                  <div
                    className="user-img "
                    onClick={handleClick}
                    role="presentation"
                  >
                    <Image src={avatarImage} alt="user-photo" fill={true} />
                  </div>
                </Link>
              ) : (
                <Link className="" href="/login">
                  登入/註冊
                </Link>
              )}

              {/* 用戶頭像 */}
              <div className="user-img d-none">
                <Image
                  src="/jam/amazingshow.jpg"
                  alt="user-photo"
                  fill={true}
                />
              </div>
            </li>
          </ul>
          {/* 手機版 navbar */}
          <div className="navbar-mb d-lg-none d-flex justify-content-end align-items-center">
            <Link href="/cart" className="p-0 me-3">
              <IoCart size={30} />
            </Link>
            <IoMenu size={30} className="ms-3" onClick={menuMbToggle} />
          </div>
        </nav>
      </header>
      {/* 登入狀態下 點擊右上角叫出小視窗          */}
      <div
        className={`avatar-menu  d-flex flex-column align-items-center ${avatarActivestatus}`}
      >
        {/* 用戶資訊 */}
        <div className="menu-mb-user-info d-flex align-items-center flex-column mb-3">
          {/* <div className="mb-photo-wrapper mb-2">
            <Image src={avatarImage} alt="user photo mb" fill></Image>
          </div>
          <div>{LoginUserData.nickname}</div> */}
        </div>
        <Link
          className="mm-item"
          href="/user/user-info"
          style={{ borderTop: '1px solid #b9b9b9' }}
        >
          會員中心
        </Link>
        <Link className="mm-item" href="/lesson/lesson-list">
          探索課程
        </Link>
        <Link className="mm-item" href="/instrument/instrument-list">
          樂器商城
        </Link>
        <Link className="mm-item" href="/jam/recruit-list">
          Let &apos;s JAM!
        </Link>
        <Link className="mm-item" href="/article/article-list">
          樂友論壇
        </Link>
        {/*eslint-disable-next-line jsx-a11y/click-events-have-key-events*/}
        <div
          onClick={handleLogout}
          //onclick 要加這個 不然ES會跳沒有給身障人士使用
          role="presentation"
          className="mm-item logout-btn"
          style={{ color: '#1581cc' }}
        >
          登出
          <ImExit size={20} className="ms-2" />
        </div>
      </div>
      <style jsx>{`
        .avatar-menu {
          padding-top: 10px;
          width: 300px;

          position: absolute;
          top: 60px;
          right: 20px;
          z-index: 1000;
          background-color: #fff;
          /*display: none;*/
          transition: all 0.5s ease;
          /*border-radius: 20px;*/
        }
        .menu-active {
          top: -600px;
        }
        .logout-btn:hover {
          cursor: pointer; /* 添加手型游標 */
          /* 其他樣式，例如改變背景顏色或邊框等 */
          background-color: #f0f0f0;
        }
      `}</style>
    </>
  )
}
