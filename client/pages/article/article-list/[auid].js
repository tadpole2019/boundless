import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Navbar from '@/components/common/navbar'
import NavbarMb from '@/components/common/navbar-mb'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'
import { RiUserSettingsFill } from 'react-icons/ri'
import Datetime from '@/components/article/datetime'
// 會員認證hook
import { useAuth } from '@/hooks/user/use-auth'
export default function Auid() {
  // ----------------------手機版本  ----------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }

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
  //登出功能

  //檢查是否獲取資料
  console.log(LoginUserData)
  //   讀取使用者資料後 定義大頭貼路徑
  let avatarImage
  if (LoginUserData.img) {
    avatarImage = `http://localhost:3005/user/${LoginUserData.img}`
  } else if (LoginUserData.photo_url) {
    avatarImage = `${LoginUserData.photo_url}`
  } else {
    avatarImage = `/user/avatar_userDefault.jpg`
  }
  // 舊版會警告 因為先渲染但沒路徑 bad
  // const avatarImage = `/user/${LoginUserData.img}`
  // const avatargoogle = `${LoginUserData.photo_url}`
  // const avatarDefault = `/user/avatar_userDefault.jpg`

  // ----------------------會員登入狀態  ----------------------

  // ----------------------要資料  ----------------------

  // ----------------------跟後端要資料  ----------------------
  //-----------------------動態路由
  //  由router中獲得動態路由(屬性名稱pid，即檔案[pid].js)的值，router.query中會包含pid屬性
  // 1. 執行(呼叫)useRouter，會回傳一個路由器
  // 2. router.isReady(布林值)，true代表本元件已完成水合作用(hydration)，可以取得router.query的值
  const router = useRouter()
  const { auid } = router.query
  // 動態路由參數

  // ----------------------全部資料----------------------
  const [articleDetail, setArticleDetail] = useState({})
  const getSingleDetail = async (auid) => {
    try {
      const res = await fetch(`http://localhost:3005/api/article/${auid}`)
      // res.json()是解析res的body的json格式資料，得到JS的資料格式
      const data = await res.json()

      // 設定到state中，觸發重新渲染(re-render)，會進入到update階段
      // 進入狀態前檢查資料類型有值，以避免錯誤
      if (data) {
        setArticleDetail(data[0])
        // 只拿第一筆資料
        // console.log(articleDetail.title)
      }
    } catch (e) {
      console.error(e)
    }
  }
  // 初次渲染"之後(After)"+router.isReady改變時，執行其中程式碼

  // 字串轉HTML格式
  const [myContent, setMyContent] = useState('')
  const getContent = (content) => {
    document.querySelector('.newContent').innerHTML = content
  }
  useEffect(() => {
    setMyContent(getContent(articleDetail.content))
  }, [articleDetail.content])

  useEffect(() => {
    // 如果isReady是true，確保能得到query的值
    if (router.isReady) {
      const { auid } = router.query
      getSingleDetail(auid)
    }
  }, [router.isReady])

  // ----------------------假資料  ----------------------

  const [filterVisible, setFilterVisible] = useState(false)
  useEffect(() => {
    document.addEventListener('click', (e) => {
      setFilterVisible(false)
    })
  }, [])
  // 阻止事件冒泡造成篩選表單關閉
  const stopPropagation = (e) => {
    e.stopPropagation()
  }
  // 顯示表單
  const onshow = (e) => {
    stopPropagation(e)
    setFilterVisible(!filterVisible)
  }

  return (
    <>
      <Head>
        <title>{articleDetail.title}</title>
      </Head>
      <Navbar menuMbToggle={menuMbToggle} />
      <div className="container position-relative">
        {/* 手機版主選單/navbar */}
        <div
          className={`menu-mb d-sm-none d-flex flex-column align-items-center ${
            showMenu ? 'menu-mb-show' : ''
          }`}
        >
          <NavbarMb/>
        </div>
        <div className="row">
          {/* 麵包屑 */}
          <div className="breadcrumb-wrapper-ns">
            <ul className="d-flex align-items-center p-0 m-0 flex-wrap">
              <IoHome size={20} />
              <Link href="/article/article-list">
                <li style={{ marginLeft: '8px' }}>樂友論壇</li>
              </Link>
              <FaChevronRight />
              <Link
                href={
                  articleDetail.category_name == '技術'
                    ? '/article/article-list/sharing'
                    : '/article/article-list/comments'
                }
              >
                <li style={{ marginLeft: '10px' }}>
                  {articleDetail.category_name == '技術'
                    ? '技術分享'
                    : '音樂評論'}
                </li>
              </Link>
              <FaChevronRight />
              <li style={{ marginLeft: '10px' }}>{articleDetail.title}</li>
            </ul>
          </div>
          <div className="">
            {/* 主內容 */}
            <main className="content pt-0">
              <div className="d-flex justify-content-end">
                {LoginUserData.id === articleDetail.user_id ? (
                  <Link
                    href={`/article/article-edit/${auid}`}
                    className="icon-btn"
                  >
                    <RiUserSettingsFill
                      size={30}
                      style={{ color: 'gray', cursor: 'pointer' }}
                    />
                    編輯
                  </Link>
                ) : (
                  ''
                )}
              </div>
              <h1 className="text-center">{articleDetail.title}</h1>
              <div className="newContent mb-3">{myContent}</div>
              <div className="main-img">
                <Image
                  src={`http://localhost:3005/article/${articleDetail.img}`}
                  alt=""
                  className="big-pic object-fit-contain w-100"
                  responsive
                  fill
                />
              </div>
              <div className="article-label d-flex pt-4 ps-3">
                <div className="bg-dark text-light pt-1 pb-1 ps-2 pe-2 me-3">
                  標籤
                </div>
                <div className="pt-1 pb-1 ps-2 pe-2">
                  {articleDetail.category_name}
                </div>
              </div>
              {/* Reader Comment */}
              <h3 className="pt-5 text-primary">讀者留言</h3>
              <div className="reader-comment pt-3 d-flex align-items-center">
                <Image
                  className="article-author"
                  src={`/user/${articleDetail.user_img}`}
                  alt="空的圖"
                  width={50}
                  height={50}
                />
                <span className="ps-3 info-p text-primary">
                  {articleDetail.user_name}
                </span>
                <span className="ps-2 info-p text-secondary">
                  <Datetime
                    published_time={articleDetail.comment_created_time}
                  />
                </span>
              </div>
              <p className="pt-1">{articleDetail.comment_content}</p>
              <div className="reader-like d-flex justify-content-between">
                <div />
                <div className="d-flex align-items-center">
                  <div>{articleDetail.comment_likes}人認同</div>
                  <button
                    type="button"
                    className="btn btn-outline-primary ms-1"
                  >
                    <i className="fa-solid fa-thumbs-up" />
                    認同
                  </button>
                </div>
              </div>
              {/* 最後textarea */}
              <div className="ps-3 pe-3">
                <textarea
                  className="form-control"
                  rows={5}
                  placeholder="發表文章評語...(限50字)"
                  defaultValue={''}
                />
                <div className="text-end mt-2 mb-3">
                  <button className="btn btn-primary" type="submit">
                    發表
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .wrapper {
          padding-left: 20px;
          padding-right: 20px;
        }
        .nav-category {
          display: flex;
          justify-content: between;
        }
        @media screen and (max-width: 576px) {
          .nav-category {
            display: none;
          }
        }
        main {
          padding-left: 55px;
          padding-right: 55px;
          @media screen and (max-width: 576px) {
            padding-inline: 10px;
          }
        }
        h1 {
          padding-top: 5;
        }
        @media screen and (max-width: 576px) {
          h1 {
            padding-top: 0;
          }
        }
        .breadcrumb-wrapper {
          margin-top: 50px;
          margin-left: 50px;
        }
        @media screen and (max-width: 576px) {
          .breadcrumb-wrapper {
            margin-top: 30px;
            margin-left: 10px;
          }
        }
        .main-img {
          position: relative;
          weight: 1000px;
          height: 500px;
        }
        .big-pic {
          position: absolute;
          top: 0;
          left: 0;
        }
        @media screen and (max-width: 576px) {
          .main-img {
            weight: 576px;
            height: 300px;
          }
        }
      `}</style>
    </>
  )
}
