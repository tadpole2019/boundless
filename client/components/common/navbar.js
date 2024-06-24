import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { IoCart, IoMenu } from 'react-icons/io5'
import Image from 'next/image'
import logo from '@/assets/logo.svg'
import logoMb from '@/assets/logo_mb.svg'
import Link from 'next/link'
import { ImExit } from 'react-icons/im'
// sweetalert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Toaster } from 'react-hot-toast'

// 會員認證hook
import { useAuth } from '@/hooks/user/use-auth'
//google登入
import useFirebase from '@/hooks/user/use-firebase'

// 購物車小badge 測試
import { useCart } from '@/hooks/use-cart'

export default function Navbar({ menuMbToggle }) {
  const { calcTotalItems, cartNull } = useCart()
  const [showMenu, setShowMenu] = useState(false)
  const { logoutFirebase } = useFirebase()

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
  //   讀取使用者資料後 定義大頭貼路徑
  let avatarImage
  if (LoginUserData.img) {
    avatarImage = `http://localhost:3005/user/${LoginUserData.img}`
  } else if (LoginUserData.photo_url) {
    avatarImage = `${LoginUserData.photo_url}`
  } else {
    avatarImage = `http://localhost:3005/user/avatar_userDefault.jpg`
  }

  //--------------------------登入狀態下 點擊右上角叫出小視窗-------------------
  // 定義狀態來追蹤 className
  const [avatarActive, setavatarActive] = useState(false)

  // 點擊事件處理函式
  const handleClick = () => {
    // 更改狀態，切換 className
    setavatarActive(!avatarActive)
  }
  // 根據狀態設置不同的 className 針對右上角小視窗
  const avatarActivestatus = avatarActive ? '' : 'menu-active'
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
  const [cartState, setCartState] = useState(false)
  useEffect(() => {
    if(localStorage.getItem('CartData')) {
      setCartState(true)
    }
  }, [])

  return (
    <>
      <Toaster
        containerStyle={{
          top: 80,
          zIndex: 101,
        }}
      />
      <header className="w-100 d-flex justify-content-between align-items-center">
        <Link href="/" className="d-none d-lg-block ">
          <Image src={logo} alt="logo" className="logo" />
        </Link>
        <Link href="/" className="d-lg-none">
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
              <Link href="/article/article-list">樂友論壇</Link>
            </li>
            <li
              className="ms-3 cart-icon"
              onClick={() => {
                if (cartState && calcTotalItems() !== 0) {
                  router.push(`/cart/check`)
                } else {
                  cartNull()
                }
              }}
            >
              <div className="cart">
                <IoCart size={30} className="cart-icon" />
                {cartState && calcTotalItems() !== 0 ? (
                  <span className="button__badge">{calcTotalItems()}</span>
                ) : (
                  ''
                )}
              </div>
            </li>
            <li className="login-state d-flex justify-content-center">
              {LoginUserData.id ? (
                <div
                  className="user-img "
                  onClick={handleClick}
                  role="presentation"
                >
                  <Image
                    src={avatarImage}
                    alt="user-photo"
                    fill={true}
                    sizes="(max-width: 150px)"
                  />
                </div>
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
                  sizes="(max-width: 150px)"
                />
              </div>
            </li>
          </ul>
          {/* 手機版 navbar */}
          <div className="navbar-mb d-lg-none d-flex justify-content-end align-items-center">
            <div
              className="p-0 me-3 cart-icon"
              onClick={() => {
                if (cartState && calcTotalItems() !== 0) {
                  router.push(`/cart/check`)
                } else {
                  cartNull()
                }
              }}
            >
              <div className="cart">
                <IoCart size={30} className="cart-icon" />
                {cartState && calcTotalItems() !== 0 ? (
                  <span className="button__badge">{calcTotalItems()}</span>
                ) : (
                  ''
                )}
              </div>
            </div>

            <IoMenu size={30} className="ms-3" onClick={menuMbToggle} />
          </div>
          {/* 登入狀態下 點擊右上角叫出小視窗          */}
          <div
            className={`avatar-menu d-none  d-sm-flex  flex-column align-items-center ${avatarActivestatus}`}
          >
            {/* 用戶資訊 */}
            <div className="mm-user-info">
              歡迎，
              {LoginUserData.nickname
                ? LoginUserData.nickname
                : LoginUserData.name}
            </div>
            <Link className="mm-item-right" href="/user/user-info">
              會員中心
            </Link>
            {/*eslint-disable-next-line jsx-a11y/click-events-have-key-events*/}
            <div
              onClick={() => {
                handleLogout()
                logoutFirebase()
                logoutAlert()
              }}
              //onclick 要加這個 不然ES會跳沒有給身障人士使用
              role="presentation"
              className="mm-item-right logout-btn"
              style={{ color: '#1581cc' }}
            >
              登出
              <ImExit size={16} className="ms-2 mt-1" />
            </div>
          </div>
        </nav>
      </header>

      <style jsx>{`
        .navbar-wrapper {
          position: relative;
          z-index: 120; /* 設置 z-index */
        }

        .cart {
          display: block;
          padding: 5px 12px;
          border-radius: 10px;
          color: #fff;
          font-size: 20px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          &:hover {
            color: #124365;
            background-color: #fff;
          }
        }
        .avatar-menu {
          width: 160px;
          position: absolute;
          top: 59px;
          right: -20px;
          background-color: #fff;
          border-inline: 1px solid;
          border-bottom: 1px solid;
          border-color: #b9b9b9;
          border-radius: 0 0 3px 3px;
          a {
            color: #1581cc;
          }

          .mm-user-info {
            border-radius: 0px;
            width: 100%;
            padding-block: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 400;
            color: #000;
            font-size: 16px;
          }
          .mm-item-right {
            border-radius: 0px;
            width: 100%;
            padding-block: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            color: var($primary);
            cursor: pointer;
            font-size: 16px;
            &:hover {
              background-color: #ececec;
            }
          }

          .logout-btn {
            font-size: 16px;
          }
        }
        .menu-active {
          top: -580px;
        }
        .cart-icon {
          position: relative;
        }
        .button__badge {
          background-color: #fa3e3e;
          border-radius: 10px;
          color: white;
          padding: 3px 6px;
          font-size: 10px;
          position: absolute;
          top: 1px;
          right: 5px;
        }
      `}</style>
    </>
  )
}
