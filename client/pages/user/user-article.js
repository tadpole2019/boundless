import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'
import Head from 'next/head'
import NavbarMb from '@/components/common/navbar-mb'

// 會員認證hook
import { useAuth } from '@/hooks/user/use-auth'
import { jwtDecode } from 'jwt-decode'

// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'

export default function Test() {
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
    getDatas()
  }, [])
  //登出功能

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

  // ----------------------會員登入狀態  ----------------------

  
    


  //-------------------------獲得該文章資料 code來自 article-list


  const appKey = 'userToken'
  const [article, setArticle] = useState([])
  let datas
  const getDatas = async () => {

    // 拿取Token回傳後端驗證狀態
    const Loginusertoken = localStorage.getItem(appKey)

    if (!Loginusertoken) {
      console.error('沒有登入的token 故無法取得使用者資料。')
      return null
    }
    const userID = jwtDecode(Loginusertoken)
    const id = userID.id

    // console.log(uid)
    try {
      const res = await fetch(`http://localhost:3005/api/user/MyArticle/${id}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
       datas = await res.json()
      if (datas) {
        setArticle(datas) // 設定獲取的文章數據到狀態中
        console.log(datas)
      }
      
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    console.log(article);
  }, [article]);
  
  // ----------------------手機版本  ----------------------
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
  // ----------------------假資料  ----------------------
  // sidebar假資料
  // const sidebarData = [
  //   '會員資訊',
  //   '我的樂團',
  //   '我的訂單',
  //   '我的文章',
  //   '我的收藏',
  //   '我的優惠券 ',
  //   '我的課程',
  //   '我的訊息',
  // ]

  // 資料排序
  const [dataSort, setDataSort] = useState('latest')
  // ----------------------條件篩選  ----------------------
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
  // filter假資料
  const brandData = [
    { id: 1, name: 'YAMAHA' },
    { id: 2, name: 'Roland' },
    { id: 3, name: 'Fender' },
    { id: 4, name: 'Gibson' },
  ]
  const [brandSelect, setBrandSelect] = useState('all')

  const [priceLow, setPriceLow] = useState('')
  const [priceHigh, setPriceHigh] = useState('')

  // 課程評價
  const scoreState = ['all', '5', '4', '3']
  const [score, setScore] = useState('all')

  // 活動促銷
  const [sales, setSales] = useState(false)

  // 清除表單內容
  const cleanFilter = () => {
    setBrandSelect('all')
    setPriceLow('')
    setPriceHigh('')
    setScore('all')
    setSales(false)
  }

  return (
    <>
      <Head>
        <title>我的文章</title>
      </Head>
      <Navbar menuMbToggle={menuMbToggle} />
      {/* 先把HEROSECTION隱藏 */}
      {/* <div
        className="page-shero d-none d-sm-block"
        style={{ paddingTop: '60px' }}
      >
        <Image src={jamHero} className="object-fit-cover w-100" alt="cover" />
      </div> */}
      <div className="container position-relative">
        {/* 手機版主選單/navbar */}
        <div
          className={`menu-mb d-sm-none d-flex flex-column align-items-center ${
            showMenu ? 'menu-mb-show' : ''
          }`}
        >
          {/* 用戶資訊 */}
          <NavbarMb/>
        </div>
        <div className="row">
          {/* sidebar */}
          <div className="sidebar-wrapper d-none d-sm-block col-sm-2">
            <div className="sidebar">
              <div className="sidebar-user-info">
                <div className="sidebar-user-info-imgBox">
                  <Image
                    src={avatarImage}
                    alt="user photo mb"
                    fill
                    priority="default" //不加的話Next 會問是否要加優先級
                    sizes="(max-width: 150px)"
                  ></Image>
                </div>
                <div className="sidebar-user-info-text">
                  <div className="sidebar-user-info-name">
                    {LoginUserData.nickname}
                  </div>
                  <div className="sidebar-user-info-band">{LoginUserData.my_jamname}</div>
                </div>
                {/* 更換大頭貼的功能暫定併回會員資訊 故不再sidebar顯示 */}
                {/* <div className="sidebar-user-info-Camera-img">
                  <Image src={avatar} alt="user photo mb" fill></Image>
                </div> */}
              </div>
              <ul className="d-flex flex-column">
                {/* {sidebarData.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link href={`#`}>{item}</Link>
                    </li>
                  )
                })} */}

                <li key={1}>
                  <Link href="/user/user-info">會員資訊</Link>
                </li>
                <li key={2}>
                  <Link href={LoginUserData.jamstate == '1' ?  `/jam/recruit-list/${LoginUserData.my_jam}`: `/user/user-jam`}>我的樂團</Link>
                </li>
                <li key={3}>
                  <Link href="/user/user-order">我的訂單</Link>
                </li>
                <li key={4}>
                  <Link href="/user/user-article">我的文章</Link>
                </li>
                <li key={5}>
                  <Link href="/user/user-coupon">我的優惠券</Link>
                </li>
              </ul>
            </div>
          </div>

          {/*   ----------------------頁面內容  ---------------------- */}
          <div className="col-12 col-sm-10 page-control">
            {/* 手機版sidebar */}
            <div
              className={`sidebar-mb d-sm-none ${
                showSidebar ? 'sidebar-mb-show' : ''
              }`} style={{top:'190px'}}
            >
              <div className="sm-close">
                <IoClose
                  size={32}
                  onClick={() => {
                    setShowSidebar(false)
                  }}
                />
              </div>
              <Link href={`/user/user-info`} className="sm-item ">
                會員資訊
              </Link>
              <Link href={LoginUserData.jamstate == '1' ?  `/jam/recruit-list/${LoginUserData.my_jam}`: `/user/user-jam`} className="sm-item ">
                我的樂團
              </Link>
              <Link href={`/user/user-order`} className="sm-item">
                我的訂單
              </Link>
              <Link href={`/user/user-article`} className="sm-item active">
                我的文章
              </Link>
              <Link href={`/user/user-coupon`} className="sm-item">
                我的優惠券
              </Link>
            </div>
            {/*  ---------------------- 頂部功能列  ---------------------- */}
            <div className="top-function-container">
              {/*  ---------------------- 麵包屑  ---------------------- */}
              <div className="breadcrumb-wrapper-ns">
                <ul className="d-flex align-items-center p-0 m-0">
                  <IoHome size={20} />
                  <li style={{ marginLeft: '8px' }}>會員中心</li>
                  <FaChevronRight />
                  <li style={{ marginLeft: '10px' }}>我的文章</li>
                </ul>
              </div>

              <div className="top-function-flex">
                {/*  ---------------------- 搜尋欄  ---------------------- */}
                <div className="search-sidebarBtn">
                  <div
                    className="d-flex d-sm-none align-items-center b-btn b-btn-body"
                    role="presentation"
                    style={{ paddingInline: '16px' }}
                    onClick={sidebarToggle}
                  >
                    選單
                  </div>
                  <div className="search input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="請輸入關鍵字..."
                    />
                    <div className="search-btn btn d-flex justify-content-center align-items-center p-0">
                      <IoIosSearch size={25} />
                    </div>
                  </div>
                </div>

                <div className="filter-sort d-flex justify-content-between">
                  <div className="sort-mb d-block d-sm-none">
                    <select
                      className="form-select"
                      value={dataSort}
                      name="dataSort"
                      onChange={(e) => {
                        setDataSort(e.target.value)
                      }}
                    >
                      <option value="latest">新到舊</option>
                      <option value="oldest">舊到新</option>
                    </select>
                  </div>
                  {/*  ---------------------- 條件篩選  ---------------------- */}
                  <form className="d-flex align-items-center position-relative">
                    <div
                      className="filter-text d-flex align-items-center me-sm-4"
                      role="presentation"
                      onClick={onshow}
                    >
                      條件篩選
                      <FaFilter size={13} />
                      <div
                        className={`filter ${
                          filterVisible === false ? 'd-none' : 'd-block'
                        }`}
                        onClick={stopPropagation}
                        role="presentation"
                      >
                        {/* 品牌 */}
                        <div className="filter-item">
                          <div className="filter-title">選擇品牌</div>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={brandSelect}
                            name="brand"
                            onChange={(e) => {
                              setBrandSelect(e.target.value)
                            }}
                          >
                            <option value="all">全部</option>
                            {brandData.map((v) => {
                              return (
                                <option key={v.id} value={v.id}>
                                  {v.name}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                        {/* 價格區間 */}
                        <div className="filter-item">
                          <div className="filter-title">價格區間</div>
                          <input
                            type="number"
                            className="form-control mb-2"
                            placeholder="最低價"
                            name="priceLow"
                            value={priceLow}
                            min={0}
                            max={priceHigh - 1}
                            onChange={(e) => {
                              setPriceLow(e.target.value)
                            }}
                          />
                          <input
                            type="number"
                            className="form-control"
                            placeholder="最高價"
                            name="priceHigh"
                            value={priceHigh}
                            min={priceLow + 1}
                            onChange={(e) => {
                              setPriceHigh(e.target.value)
                            }}
                          />
                        </div>
                        {/* 商品評價 */}
                        <div className="filter-item m-0">
                          <div className="filter-title">商品評價</div>
                          <div className="filter-radio-group d-flex flex-wrap justify-content-between">
                            {scoreState.map((v, i) => {
                              return (
                                <div
                                  className="filter-radio-item form-check p-0 mb-3"
                                  key={i}
                                >
                                  <label className="form-check-label">
                                    <input
                                      type="radio"
                                      name="score"
                                      value={v}
                                      checked={v === score}
                                      onChange={(e) => {
                                        setScore(e.target.value)
                                      }}
                                    />
                                    &nbsp;{v === 'all' ? '全部' : v + '星'}
                                  </label>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                        {/* 促銷商品 */}
                        <div className="filter-item">
                          <div className="form-check">
                            <label className="form-check-label filter-title mb-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={sales}
                                name="sales"
                                onChange={() => {
                                  setSales(!sales)
                                }}
                              />{' '}
                              促銷商品
                            </label>
                          </div>
                        </div>
                        <div
                          className="d-flex justify-content-between gap-2 mt-2"
                          style={{ paddingInline: '10px' }}
                        >
                          <div
                            className="filter-btn clean-btn w-100 d-flex justify-content-center"
                            role="presentation"
                            onClick={cleanFilter}
                          >
                            清除
                          </div>
                          <div className="filter-btn confirm-btn w-100 d-flex justify-content-center">
                            確認
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {/* ---------------------- 資料排序  ---------------------- */}
                  <div className="sort d-none d-sm-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      排序
                      <FaSortAmountDown size={14} />
                    </div>
                    <div
                      className={`sort-item ${
                        dataSort === 'latest' ? 'active' : ''
                      }`}
                      role="presentation"
                      onClick={(e) => {
                        setDataSort('latest')
                      }}
                    >
                      新到舊
                    </div>
                    <div
                      className={`sort-item ${
                        dataSort === 'oldest' ? 'active' : ''
                      }`}
                      role="presentation"
                      onClick={(e) => {
                        setDataSort('oldest')
                      }}
                    >
                      舊到新
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 主內容 */}
            <main className="content">
              <div className="container custom-container">
                <div className="row">
                  <div
                    className="col-sm-10 col-12"
                    style={{
                      backgroundColor: 'rgb(255, 255, 255)',
                    }}
                  >
                    <div className="user-content col-12">
                      <div className="user-content-top">
                        <div className="user-title-userInfo">我的文章</div>
                        <div className="user-acticle-newBtn btn  btn-primary">
                        <Link href="http://localhost:3000/article/article-list/article-publish">
                          <div>新文章</div>
                          </Link>
                        </div>
                      </div>

                      <div className="user-acticleList ">
                        <div className="user-acticleList-item-title d-flex row mb-2">
                          <div className="form-check col-sm-6 col-6 ">
                            <input
                              className="form-check-input user-acticleList-item-title-acticleCheck"
                              type="checkbox"
                              defaultValue=""
                              id="user-acticleList-item-title-acticleCheck"
                            />
                            <label
                              className="form-check-label user-acticleList-item-title-acticleLabel"
                              htmlFor="user-acticleList-item-title-acticleCheck"
                            >
                              文章標題
                            </label>
                          </div>
                          <div className="user-acticleList-item-title-time col-sm-2 col-2">
                            時間
                          </div>
                          <div className="user-acticleList-item-title-message col-sm-1 col-1 px-2">
                            留言數
                          </div>
                          <div className="user-acticleList-item-title-btnGroup col-sm-3 col-4 row ">
                            <div className=" btn btn-primary user-acticleList-item-title-newBtn col-sm-5 col-9">
                              <Link href="http://localhost:3000/article/article-list/article-publish">
                                新文章
                              </Link>
                            </div>
                            <div className=" btn btn-primary user-acticleList-item-title-btn col-sm-5 col-9">
                              刪除
                            </div>
                          </div>
                        </div>
                        <hr />

                        {/* 單筆資料初版 */}
                        {/* <div className="user-acticleList-item d-flex row mb-2">
                          <div className="form-check col-sm-6 col-6 ">
                            <input
                              className="form-check-input user-acticleList-item-acticleCheck"
                              type="checkbox"
                              defaultValue=""
                              id="user-acticleList-item-acticleCheck"
                            />
                            <label
                              className="form-check-label user-acticleList-item-acticleLabel"
                              htmlFor="user-acticleList-item-acticleCheck"
                            >
                            {article[0] ? article[0].title : ''} 
                              那些在買七弦吉他前，需要注意的調 Tone
                              撇步！那些在買七弦吉他前，需要注意的調 Tone
                              撇步！那些在買七弦吉他前，需要注意的調 Tone
                              撇步！那些在買七弦吉他前，需要注意的調 Tone
                              撇步！那些在買七弦吉他前，需要注意的調 Tone 撇步！
                            </label>
                          </div>
                          <div className="user-acticleList-item-time col-sm-2 col-2">
                            2024/01/14
                          </div>
                          <div className="user-acticleList-item-message col-sm-1 col-1 px-2">
                            10
                          </div>
                          <div className="user-acticleList-item-btnGroup col-sm-3 col-4 row ">
                            <div className="user-acticleList-item-text   col-sm-5 col-9 ">
                              已發布
                            </div>
                            <div className=" btn btn-primary user-acticleList-item-btn col-sm-5 col-9">
                              編輯
                            </div>
                          </div>
                        </div>

                        <hr /> */}

                        {article.map((item, index) => (
                        <div>
                        <div key={item.id} className="user-acticleList-item d-flex row mb-2">
                          <div className="form-check col-sm-6 col-6 ">
                            <input
                              className="form-check-input user-acticleList-item-acticleCheck"
                              type="checkbox"
                              defaultValue=""
                              id={`user-articleList-item-articleCheck-${index}`}
                            />
                            <label
                              className="form-check-label user-acticleList-item-acticleLabel"
                              htmlFor={`user-articleList-item-articleCheck-${index}`}
                            >
                            {item.title}
                            </label>
                          </div>
                          <div className="user-acticleList-item-time col-sm-2 col-2">
                          {item.created_time.split("T")[0]}
                          </div>
                          <div className="user-acticleList-item-message col-sm-1 col-1 px-2">
                            10
                          </div>
                          <div className="user-acticleList-item-btnGroup col-sm-3 col-4 row ">
                            <div className="user-acticleList-item-text   col-sm-5 col-9 ">
                              已發布
                            </div>
                            <div className=" btn btn-primary user-acticleList-item-btn col-sm-5 col-9">
                            <Link
                              href={`/article/article-edit/${item.auid}`}
                            >
                              編輯
                            </Link>
                            </div>
                          </div>                          
                        </div>
                        <hr />
                        </div>
                        ))}


                      </div>

                      <div className="user-orderList-pagination">
                        {/* <p>待放分頁元件 注意class</p> */}
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
        /* -------------------user sidebar-------------------- */
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
            width: 140px;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            color: var(--dark, #1d1d1d);
            text-align: start;

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

        /* -------------------user sidebar-------------------- */
        /* --------------- user-contect-acticle--------------- */
        hr {
          margin: 10px;
        }

        .btn-primary {
          background-color: #18a1ff;
        }
        .custom-container {
          padding: 0;
          color: #000;

          & p {
            font-family: 'Noto Sans TC';
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            color: #000;
            text-overflow: ellipsis;
          }
          & h5 {
            font-family: 'Noto Sans TC';
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: var(--primary-deep, #124365);
          }

          .user-orderList-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            align-self: stretch;
          }
        }

        .user-content {
          display: flex;
          width: 1070px;
          padding: 20px 10px;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
          border-radius: 5px;
          background: var(--gray-30, rgba(185, 185, 185, 0.3));

          .user-content-top {
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

            .user-acticle-newBtn {
              display: none;
            }
          }
          /*----------------------acticle css----------------------- */
          .user-acticleList {
            width: 100%;
          }

          .user-acticleList-item {
            align-items: center;
            padding-left: 25px;
            margin-inline: auto;
            /*height: 60px; */

            .user-acticleList-item-acticleCheck {
            }
            .user-acticleList-item-acticleLabel {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }

            .user-acticleList-item-time {
            }

            .user-acticleList-item-message {
            }

            .user-acticleList-item-btnGroup {
              /* width: 200px; */
              gap: 10px;
              align-items: center;
              justify-content: end;

              .user-acticleList-item-text {
                color: var(--primary-deep, #124365);
                font-weight: bold;
                font-size: 20px;
              }
              .user-acticleList-item-btn {
                align-items: self-end;
              }
            }
          }

          .user-acticleList-item-title {
            align-items: center;
            margin-inline: auto;
            padding-left: 25px;
            .user-acticleList-item-title-acticleCheck {
            }
            .user-acticleList-item-title-acticleLabel {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }

            .user-acticleList-item-title-time {
            }

            .user-acticleList-item-title-message {
            }

            .user-acticleList-item-title-btnGroup {
              /* width: 200px; */
              gap: 10px;
              justify-content: end;

              .user-acticleList-item-title-text {
                color: var(--primary-deep, #124365);
                font-weight: bold;
              }
              .user-acticleList-item-title-btn {
                align-items: self-end;
              }
            }
          }

          /*----------------------acticle css----------------------- */

          .user-orderList-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            align-self: stretch;
          }
        }

        /* RWD未生效 */

        /* RWD讓SIDEBAR消失 測試用記得刪 */
        @media screen and (max-width: 576px) {
          body {
            padding-inline: 20px;
          }

          .custom-container {
            overflow: hidden;

            .user-content {
              width: 390px;
              padding: 10px;
              overflow: hidden;

              .user-acticle-newBtn {
                display: flex;
                margin-right: 25px;
              }
            }
          }

          .user-content {
            .user-acticleList-item-title {
              padding-left: 15px;
              .user-acticleList-item-title-acticleCheck {
              }
              .user-acticleList-item-title-acticleLabel {
                -webkit-line-clamp: 2;
              }
              .user-acticleList-item-title-message {
                display: none;
              }
              .user-acticleList-item-title-time {
                text-align: right;
                font-size: 12px;

                /* display: none; */
              }

              .user-acticleList-item-title-btnGroup {
                justify-content: flex-end;
                font-size: 12px;

                .user-acticleList-item-title-newBtn {
                  display: none;
                }
                .user-acticleList-item-title-text {
                  text-align: right;
                  font-size: 12px;
                  padding: 3px;
                }

                .user-acticleList-item-title-btn {
                  font-size: 12px;
                  padding: 3px;
                }
              }
            }

            .user-acticleList-item {
              padding-left: 15px;
              .user-acticleList-item-acticleCheck {
                margin-top: 15px;
              }
              .user-acticleList-item-acticleLabel {
                -webkit-line-clamp: 2;
              }
              .user-acticleList-item-message {
                display: none;
              }
              .user-acticleList-item-time {
                font-size: 12px;
                /* display: none; */
              }

              .user-acticleList-item-btnGroup {
                justify-content: flex-end;
                font-size: 12px;

                .user-acticleList-item-text {
                  text-align: right;
                  font-size: 20px;
                  padding: 3px;item
                }

                .user-acticleList-item-btn {
                  font-size: 12px;
                  padding: 3px;
                }
              }
            }
          }
        }
        /* RWD讓SIDEBAR消失 測試用記得刪 */
      `}</style>
    </>
  )
}
