// #region ---common ---
import { useEffect, useMemo, useState } from 'react'
import Navbar from '@/components/common/navbar'
import NavbarMb from '@/components/common/navbar-mb'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'
import Head from 'next/head'

// 會員認證hook
import { useAuth } from '@/hooks/user/use-auth'

// lesson card
import Card from '@/components/lesson/lesson-card'
import Cardrwd from '@/components/lesson/lesson-card-rwd'

// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'
// #endregion common ---
// ---coupon ---
import styles from '@/pages/user/coupon.module.scss'
import Coupon from '@/components/coupon/coupon.js'
// API
import CouponClass from '@/API/Coupon'

//  Sweet Alert
import Swal from 'sweetalert2'

export default function Test() {
  // #region ---會員登入狀態 & 會員資料獲取 ---
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
  //登出功能

  //檢查是否獲取資料
  // console.log(LoginUserData)
  //   讀取使用者資料後 定義大頭貼路徑
  let avatarImage
  if (LoginUserData.img) {
    avatarImage = `/user/${LoginUserData.img}`
  } else if (LoginUserData.photo_url) {
    avatarImage = `${LoginUserData.photo_url}`
  } else {
    avatarImage = `/user/avatar_userDefault.jpg`
  }

  // userID????
  let avatarUserID
  if (LoginUserData.id) {
    avatarUserID = LoginUserData.id
  }

  // #endregion
  // #region ---會員登入狀態 ---
  // 在電腦版或手機版時
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 576)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  // #endregion
  // #region ---手機版本 ---
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }
  // sidebar
  const [showSidebar, setShowSidebar] = useState(false)
  const sidebarToggle = () => {
    setShowSidebar(!showSidebar)
  }
  // 阻止事件冒泡造成篩選表單關閉
  const stopPropagation = (e) => {
    e.stopPropagation()
  }
  // 領取
  const [dataSort, setDataSort] = useState([])

  return (
    <>
      <Head><title>活動優惠券領取</title></Head>
      <Navbar menuMbToggle={menuMbToggle} />
      {/* 先把HeroSection隱藏 */}
      <div className="page-shero d-none d-sm-block">
        <Image src={jamHero} className="object-fit-cover w-100" alt="cover" />
      </div>
      <div className="container position-relative">
        {/* 手機版主選單/navbar */}
        <div
          className={`menu-mb d-sm-none d-flex flex-column align-items-center ${
            showMenu ? 'menu-mb-show' : ''
          }`}
        >
          <NavbarMb />
        </div>

        <div className="row">
          {/* ---頁面內容 --- */}
          <div className="col-12 col-sm-10 page-control">
            {/* --- 頂部功能列 --- */}
            <div className="top-function-container">
              {/* --- 麵包屑 --- */}
              <div className="breadcrumb-wrapper-ns">
                <ul className="d-flex align-items-center p-0 m-0">
                  <IoHome size={20} />
                  <li style={{ marginLeft: '8px' }}>活動優惠領取</li>
                </ul>
              </div>
            </div>
            {/* 主內容 */}
            <main className="content">
              <div className="container custom-container">
                <div className="row p-0">
                  <div
                    className="col-sm-10 col-12"
                    style={{
                      backgroundColor: 'rgb(255, 255, 255)',
                    }}
                  >
                    <div className="coupon-content col-12">
                      {/* 活動領取 */}
                      <div className="row m-sm-3">
                        <div className="col-9">
                          {/* 連結至樂器/課程列表 */}
                          <Link href={`/instrument`}>
                            {' '}
                            <img
                              className="couponImg"
                              // style={{
                              //   width: '100%',
                              //   minWidth: '390px',
                              // }}
                              src="bannerNew.jpg"
                            />
                          </Link>
                        </div>
                        <div className="col-3 d-flex align-items-center justify-content-center">
                          <button
                            className="b-btn b-lesson-btn px-3 py-3"
                            style={{
                              backgroundColor: 'rgb(255, 255, 255)',
                              border: '1px solid rgb(255, 255, 255)',
                            }}
                            onClick={async () => {
                              const obj = {
                                user_id: avatarUserID,
                                coupon_template_id: 2,
                              }
                              const res = await CouponClass.Create(obj)
                              const swal = await Swal.fire({
                                title: res === true ? '領取成功' : '領取失敗',
                                icon: res === true ? 'success' : 'error',
                                showConfirmButton: false,
                                timer: 1000,
                              })

                              if (res === true) {
                                const data = await CouponClass.FindAll(
                                  LoginUserData.id
                                )
                                setDataSort(data)
                              }
                            }}
                          >
                            立即領取
                          </button>
                        </div>
                      </div>
                      <div className="row row m-sm-3">
                        <div className="col-9">
                          {/* 連結至樂器/課程列表 */}
                          <Link href={`/lesson`}>
                            {' '}
                            <img
                              className="couponImg"
                              // style={{
                              //   width: '100%',
                              //   minWidth: '390px',
                              // }}
                              src="bannerNew3.jpg"
                            />
                          </Link>
                        </div>
                        <div className="col-3 d-flex align-items-center justify-content-center">
                          <button
                            className="b-btn b-lesson-btn px-3 py-3"
                            style={{
                              backgroundColor: 'rgb(255, 255, 255)',
                              border: '1px solid rgb(255, 255, 255)',
                            }}
                            onClick={async () => {
                              const obj = {
                                user_id: avatarUserID,
                                coupon_template_id: 10,
                              }
                              const res = await CouponClass.Create(obj)
                              const swal = await Swal.fire({
                                title: res === true ? '領取成功' : '領取失敗',
                                icon: res === true ? 'success' : 'error',
                                showConfirmButton: false,
                                timer: 1000,
                              })

                              if (res === true) {
                                const data = await CouponClass.FindAll(
                                  LoginUserData.id
                                )
                                setDataSort(data)
                              }
                            }}
                          >
                            立即領取
                          </button>
                        </div>
                      </div>
                      <div className="row row m-sm-3">
                        <div className="col-9">
                          {/* 連結至樂器/課程列表 */}
                          <Link href={`/instrument`}>
                            {' '}
                            <img className="couponImg" src="bannerNew2.jpg" />
                          </Link>
                        </div>
                        <div className="col-3 d-flex align-items-center justify-content-center">
                          <button
                            className="b-btn b-lesson-btn px-3 py-3"
                            style={{
                              backgroundColor: 'rgb(255, 255, 255)',
                              border: '1px solid rgb(255, 255, 255)',
                            }}
                            onClick={async () => {
                              const obj = {
                                user_id: avatarUserID,
                                coupon_template_id: 18,
                              }
                              const res = await CouponClass.Create(obj)
                              const swal = await Swal.fire({
                                title: res === true ? '領取成功' : '領取失敗',
                                icon: res === true ? 'success' : 'error',
                                showConfirmButton: false,
                                timer: 1000,
                              })

                              if (res === true) {
                                const data = await CouponClass.FindAll(
                                  LoginUserData.id
                                )
                                setDataSort(data)
                              }
                            }}
                          >
                            立即領取
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        /* ---user sidebar--- */
        .sidebar-user-info {
          display: flex;
          padding: 0px 12px;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          align-self: stretch;
          /* position: relative; */
          .sidebar-user-info-imgBox {
            width: 100px;
            height: 100px;
            border-radius: 100px;
            /* react Image 要加上這兩條參數 家在外層容器的css , Image本身要fill */
            position: relative;
            overflow: hidden;
          }
          .sidebar-user-info-text {
            display: flex;
            width: 100px;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            color: var(--dark, #1d1d1d);
            text-align: center;
            /* h5 */
            font-family: 'Noto Sans TC';
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            .sidebar-user-info-band {
              margin-bottom: 20px;
            }
          }
          .sidebar-user-info-Camera-img {
            width: 30px;
            height: 30px;
            position: absolute;
            left: 85px;
            top: 70px;
            fill: var(--light-gray, #cfcfcf);
          }
        }
        /* --- contect--- */
        .custom-container {
          padding: 0;
          color: #000;
          .coupon-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            align-self: stretch;
          }
        }
        .content {
          gap: 20px;
        }
        .content .coupon-content {
          display: flex;
          height: fit-content;
          padding: 20px 10px;
          flex-direction: column;
          align-items: center;
          border-radius: 5px;
          gap: 20px;
          background: var(--gray-30, rgba(185, 185, 185, 0.3));
          .couponImg {
            width: 100%;
            border-radius: 5px;
            margin-left: 20px @media screen and (max-width: 576px) {
              width: 70%;
              min-width: 280px;
            }
          }
          .coupon-content-top {
            display: flex;
            align-items: flex-start;
            align-self: stretch;
            color: var(--primary-deep, #124365);
            text-align: center;
            justify-content: space-between;
            /* h3 */
            font-family: 'Noto Sans TC';
            font-size: 28px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }
        }
      `}</style>
    </>
  )
}
