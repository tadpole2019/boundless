import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/user/use-auth'
import { useJam } from '@/hooks/use-jam'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '@/components/common/navbar'
import NavbarMb from '@/components/common/navbar-mb'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import 'animate.css'
// scss
import styles from '@/pages/jam/jam.module.scss'

export default function Index() {
  const router = useRouter()
  // ----------------------會員登入狀態 & 會員資料獲取  ----------------------
  //從hook 獲得使用者登入的資訊  儲存在變數LoginUserData裡面
  const { LoginUserData, handleLoginStatus, getLoginUserData, handleLogout } =
    useAuth()
  // console.log(LoginUserData)
  //檢查token
  useEffect(() => {
    handleLoginStatus()
    //獲得資料
    getLoginUserData()
    getData()
  }, [])
  // -------------------------------------------------- 手機版本  --------------------------------------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }
  const checkLogin = () => {
    toast('請先登入', {
      icon: 'ℹ️',
      style: {
        border: '1px solid #666666',
        padding: '16px',
        color: '#1d1d1d',
      },
      duration: 2000,
    })
  }
  const [carouselData, setCarouselData] = useState([])
  const [carouselUseData, setCarouselUseData] = useState([])
  const getData = async () => {
    try {
      const res = await fetch(`http://localhost:3005`)

      // res.json()是解析res的body的json格式資料，得到JS的資料格式
      const result = await res.json()

      // 設定到state中，觸發重新渲染(re-render)，會進入到update階段
      // 進入狀態前檢查資料類型為陣列，以避免錯誤
      // console.log(datas)
      if (result.status == 'success') {
        setCarouselData(result.data)
      } else {
        console.log(result.error)
      }
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    if (carouselData.length > 0) {
      carouselData.push({ img: 'banner.jpg', url: '/coupon/couponAdd' })
      setCarouselUseData(carouselData)
    }
  }, [carouselData])
  console.log(carouselUseData)
  return (
    <>
      <Head>
        <title>Boundless 線上音樂學習平台</title>
      </Head>
      <Navbar menuMbToggle={menuMbToggle} />
      <div
        className="container-fill position-relative"
        style={{ minHeight: '95svh' }}
      >
        {/* 手機版主選單/navbar */}
        <div
          className={`menu-mb d-sm-none d-flex flex-column align-items-center ${
            showMenu ? 'menu-mb-show' : ''
          }`}
        >
          <NavbarMb />
        </div>
        <div>
          <h1 hidden>Boundless 線上音樂學習平台</h1>
          {/* 圖片輪播 */}
          <section className="carousel-section">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="3"
                  aria-label="Slide 4"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="4"
                  aria-label="Slide 5"
                ></button>
              </div>
              <div className="carousel-inner" style={{ borderRadius: '10px' }}>
                {carouselUseData.map((v, i) => {
                  if (i < 4) {
                    return (
                      <Link
                        href={`/lesson/${v.lesson_category_name}/${v.puid}`}
                        className={`carousel-item ${i == 0 ? 'active' : ''}`}
                        data-bs-interval="6000"
                      >
                        <Image
                          src={`/課程與師資/lesson_img/${v.img}`}
                          alt="..."
                          fill
                        />
                      </Link>
                    )
                  } else {
                    return (
                      <div
                        className={`carousel-item`}
                        data-bs-interval="4000"
                        style={{cursor: 'pointer'}}
                        onClick={() => {
                          if (LoginUserData.id) {
                            router.push(v.url)
                          } else {
                            checkLogin()
                          }
                        }}
                      >
                        <Image src={`/${v.img}`} alt="..." fill />
                      </div>
                    )
                  }
                })}
                {/* <div className="carousel-item active" data-bs-interval="4000">
                  <Image
                    src="/課程與師資/lesson_img/lesson_001.jpeg"
                    alt="..."
                    fill
                  />
                </div>
                <div className="carousel-item" data-bs-interval="4000">
                  <Image
                    src="/課程與師資/lesson_img/lesson_009.jpeg"
                    alt="..."
                    fill
                  />
                </div>
                <div className="carousel-item" data-bs-interval="4000">
                  <Image
                    src="/課程與師資/lesson_img/lesson_008.jpeg"
                    alt="..."
                    fill
                  />
                </div>
                <div className="carousel-item" data-bs-interval="4000">
                  <Image
                    src="/課程與師資/lesson_img/lesson_004.jpeg"
                    alt="..."
                    fill
                  />
                </div>
                <div className="carousel-item" data-bs-interval="4000">
                  <Image src="/banner.jpg" alt="..." fill />
                </div> */}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </section>
          {/* 課程區塊 */}
          <section className="lesson-section row align-items-center mx-0">
            {/* 雲 */}
            <div className="cloud-item cloud1">
              <Image src="/asset/cloud1.png" width={185} height={120} />
            </div>
            <div className="cloud-item cloud2">
              <Image src="/asset/cloud2.png" width={380} height={200} />
            </div>
            <div className="cloud-item cloud3">
              <Image src="/asset/cloud1.png" width={240} height={160} />
            </div>
            <div className="col-6 d-none d-sm-flex flex-column justify-content-center align-items-center px-5">
              <h2 className="mb-5 text-center" style={{ fontSize: '40px' }}>
                從休閒到專業
                <br />
                精彩課程拓展你的音樂邊界
              </h2>
              <Link className="b-btn b-lesson-btn px-5 py-3" href="/lesson">
                開始探索
              </Link>
            </div>
            <div className="col-6 d-none d-sm-flex justify-content-end px-0">
              <div className="lesson-section-img">
                <Image src="/asset/lesson.png" fill />
              </div>
            </div>
            {/* 課程區塊-手機版 */}
            <div className="d-flex d-sm-none flex-column align-items-center">
              <h2 className="text-center">
                從休閒到專業
                <br />
                精彩課程拓展你的音樂邊界
              </h2>
              <div className="lesson-section-img my-3">
                <Image src="/asset/lesson_round.png" fill />
              </div>
              <Link className="b-btn b-lesson-btn px-4 py-2" href="/lesson">
                開始探索
              </Link>
            </div>
          </section>
          {/* 樂器區塊 */}
          <section className="instrument-section row align-items-center mx-0">
            <div className="col-6 d-none d-sm-flex justify-content-end px-0">
              <div className="instrument-section-img">
                <Image src="/asset/instrument.png" fill />
              </div>
            </div>
            <div className="col-6 d-none d-sm-flex flex-column justify-content-center align-items-center px-5">
              <h2
                className="mb-5 text-center"
                style={{ color: '#18a1ff', fontSize: '40px' }}
              >
                工欲善其事，必先利其器
                <br />
                百種樂器任君挑選
              </h2>
              <Link
                className="b-btn b-instrument-btn px-5 py-3"
                href="/instrument"
              >
                來去逛逛
              </Link>
            </div>
            {/* 樂器區塊-手機版 */}
            <div className="d-flex d-sm-none flex-column align-items-center">
              <h2 className="text-center" style={{ color: '18a1ff' }}>
                工欲善其事，必先利其器
                <br />
                百種樂器任君挑選
              </h2>
              <div className="instrument-section-img my-3">
                <Image src="/asset/instrument.png" fill />
              </div>
              <Link
                className="b-btn b-instrument-btn px-4 py-2"
                href="/instrument"
              >
                來去逛逛
              </Link>
            </div>
          </section>
          {/* 樂團區塊 */}
          <section className="jam-section row align-items-center mx-0">
            <div className="col-12 px-0">
              <div className="jam-section-img">
                <Image src="/asset/jam.png" fill />
              </div>
            </div>
            <div className="jam-text col-12 d-flex flex-column justify-content-center align-items-center px-5">
              <h2 className="slogan mb-4 mb-sm-5 text-center">
                線上組團媒合幫你尋覓知音
                <br />
                Let’s JAM!
              </h2>
              <Link
                className="b-btn b-jam-btn px-4 px-sm-5 py-2 py-sm-3"
                href="/jam/recruit-list"
              >
                立即應徵
              </Link>
            </div>
          </section>
          {/* 文章區塊 */}
          <section className="article-section row align-items-center mx-0">
            <div className="col-6 d-none d-sm-flex px-0">
              <div className="article-section-img">
                <Image src="/asset/article.png" fill />
              </div>
            </div>
            <div className="col-6 d-none d-sm-flex flex-column justify-content-center align-items-center px-5">
              <h2 className="mb-5 text-center" style={{ fontSize: '40px' }}>
                滿腹想法無處傾瀉？
                <br />
                樂友論壇歡迎你的獨到見解
              </h2>
              <Link
                className="b-btn b-article-btn px-5 py-3"
                href="/article-list"
              >
                查看文章
              </Link>
            </div>
            {/* 文章區塊-手機版 */}
            <div className="d-flex d-sm-none flex-column align-items-center">
              <h2 className="text-center">
                滿腹想法無處傾瀉？
                <br />
                樂友論壇歡迎你的獨到見解
              </h2>
              <div className="article-section-img my-3">
                <Image src="/asset/article_round.png" fill />
              </div>
              <Link
                className="b-btn b-article-btn px-4 py-2"
                href="/article-list"
              >
                查看文章
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}
