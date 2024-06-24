import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '@/components/common/navbar'
import NavbarMb from '@/components/common/navbar-mb'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import jamHero from '@/assets/jam-hero.png'
// data
import CityCountyData from '@/data/CityCountyData.json'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'
// 自製元件
import RecruitCard from '@/components/jam/recruit-card'
import BS5Pagination from '@/components/common/pagination'
import { useAuth } from '@/hooks/user/use-auth'
import { useJam } from '@/hooks/use-jam'

export default function RecruitList() {
  const router = useRouter()
  const {
    invalidJam,
    invalidEdit,
    notifyInvalidToast,
    notifyInvalidEditToast,
  } = useJam()
  // ----------------------會員登入狀態 & 會員資料獲取  ----------------------
  //從hook 獲得使用者登入的資訊  儲存在變數LoginUserData裡面
  const { LoginUserData, handleLoginStatus, getLoginUserData, handleLogout } =
    useAuth()
  //檢查token
  useEffect(() => {
    handleLoginStatus()
    //獲得資料
    getLoginUserData()
    // 若使用者嘗試進入以解散或不存在的jam，跳出警告訊息
    if (invalidJam === false) {
      notifyInvalidToast()
    }
    if (invalidEdit === false) {
      notifyInvalidEditToast()
    }
    document.addEventListener('click', () => {
      setFilterVisible(false)
    })
  }, [])

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

  // ----------------------條件篩選  ----------------------
  const [filterVisible, setFilterVisible] = useState(false)
  // 阻止事件冒泡造成篩選表單關閉
  const stopPropagation = (e) => {
    e.stopPropagation()
  }
  // 顯示表單
  const onshow = (e) => {
    stopPropagation(e)
    setFilterVisible(!filterVisible)
  }
  // ---------------------- filter 資料  ----------------------
  const [player, setPlayer] = useState('')

  const [genre, setgenre] = useState('')

  const [degree, setDegree] = useState('')
  // 篩選城市用的資料
  const cityData = CityCountyData.map((v, i) => {
    return v.CityName
  }).filter((v) => {
    return v !== '釣魚臺' && v !== '南海島'
  })
  const [region, setRegion] = useState('')

  // 清除表單內容
  const cleanFilter = () => {
    setPlayer('all')
    setgenre('all')
    setDegree('all')
    setRegion('all')
  }
  // ---------------------- JAM 資料  ----------------------
  // ------------------------------------------------------- 製作分頁
  const [page, setPage] = useState(1)
  const [pageTotal, setPageTotal] = useState(0)
  // 資料排序
  const [order, setOrder] = useState('ASC')
  // 點按分頁時，要送至伺服器的query string參數
  const handlePageClick = (event) => {
    router.push({
      pathname: router.pathname,

      query: {
        page: event.selected + 1,
        order: order,
        genre: genre,
        player: player,
        degree: degree,
        region: region,
      },
    })
  }

  // 點擊篩選表確認
  const handleLoadData = () => {
    // 要送至伺服器的query string參數

    // 註: 重新載入資料需要跳至第一頁
    const params = {
      page: 1, // 跳至第一頁
      order: order,
      genre: genre,
      player: player,
      degree: degree,
      region: region,
    }

    // console.log(params)

    router.push({
      pathname: router.pathname,
      query: params,
    })
  }
  const handleOrder = (order) => {
    setOrder(order)
    const params = {
      page: 1,
      order: order,
      genre: genre,
      player: player,
      degree: degree,
      region: region,
    }

    router.push({
      pathname: router.pathname,
      query: params,
    })
  }

  const checkLogin = (LoginUserData) => {
    if (
      !LoginUserData ||
      LoginUserData.status === 'error' ||
      LoginUserData.length == 0
    ) {
      toast('請先登入', {
        icon: 'ℹ️',
        style: {
          border: '1px solid #666666',
          padding: '16px',
          color: '#1d1d1d',
        },
        duration: 2000,
      })
    } else {
      router.push('/jam/recruit-list/form')
    }
  }

  const [jams, setJams] = useState([])
  const [genreData, setGenreData] = useState([])
  const [playerData, setPlayerData] = useState([])
  // 向伺服器要求資料，設定到狀態中用的函式
  // params 中儲存所有可能的query篩選條件
  const getDatas = async (params) => {
    // 用URLSearchParams產生查詢字串
    const searchParams = new URLSearchParams(params)

    try {
      const res = await fetch(
        `http://localhost:3005/api/jam/allJam?${searchParams.toString()}`
      )

      // res.json()是解析res的body的json格式資料，得到JS的資料格式
      const datas = await res.json()

      // 設定到state中，觸發重新渲染(re-render)，會進入到update階段
      // 進入狀態前檢查資料類型為陣列，以避免錯誤
      // console.log(datas)
      if (datas) {
        const combineData = datas.jamData.map((v) => {
          const matchFormer = datas.formerData.find(
            (fv) => fv.id === v.former.id
          )
          return { ...v, former: matchFormer }
        })
        // 設定獲取頁數總合
        setPageTotal(datas.pageTotal)
        // 設定獲取項目
        setPage(datas.page)
        setJams(combineData)
        setGenreData(datas.genreData)
        setPlayerData(datas.playerData)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      // 從router.query得到所有查詢字串參數
      const { order, page, genre, player, degree, region } = router.query
      // 要送至伺服器的query string參數

      // console.log(router.query)

      // 設定回所有狀態(注意所有從查詢字串來都是字串類型)，都要給預設值
      setPage(Number(page) || 1)
      setOrder(order || 'ASC')
      setgenre(genre || 'all')
      setPlayer(player || 'all')
      setDegree(degree || 'all')
      setRegion(region || 'all')

      // 載入資料
      getDatas(router.query)
    }

    // eslint-disable-next-line
  }, [router.query, router.isReady])

  return (
    <>
      <Head>
        <title>團員募集</title>
      </Head>
      <Navbar menuMbToggle={menuMbToggle} />
      <div className="page-hero d-none d-sm-block">
        <Image
          src={jamHero}
          className="object-fit-cover w-100"
          alt="cover"
          priority
        />
      </div>
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
          {/* sidebar */}
          <div className="sidebar-wrapper d-none d-sm-block col-sm-2">
            <div className="sidebar">
              <ul className="d-flex flex-column">
                <li>
                  <Link href={`/jam/recruit-list`} className="active">
                    團員募集
                  </Link>
                </li>
                <li>
                  <Link href={`/jam/jam-list`}>活動中的JAM</Link>
                </li>
                <li>
                  <Link href={`/jam/Q&A`}>什麼是JAM？</Link>
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
              }`}
            >
              <div className="sm-close">
                <IoClose
                  size={32}
                  onClick={() => {
                    setShowSidebar(false)
                  }}
                />
              </div>
              <Link href={`/jam/recruit-list`} className="sm-item active">
                團員募集
              </Link>
              <Link href={`/jam/jam-list`} className="sm-item">
                活動中的JAM
              </Link>
              <Link href={`/jam/Q&A`} className="sm-item">
                什麼是JAM？
              </Link>
            </div>
            {/* 手機版 發起/我的JAM 按鍵 */}
            {LoginUserData.my_jam ? (
              <Link
                href={`/jam/recruit-list/${LoginUserData.my_jam}`}
                className="fixed-btn b-btn b-btn-primary d-block d-sm-none"
              >
                我的JAM
              </Link>
            ) : (
              <div
                role="presentation"
                className="fixed-btn b-btn b-btn-primary d-block d-sm-none"
                onClick={() => {
                  checkLogin(LoginUserData)
                }}
              >
                發起JAM
              </div>
            )}

            {/*  ---------------------- 頂部功能列  ---------------------- */}
            <div className="top-function-container">
              {/*  ---------------------- 麵包屑  ---------------------- */}
              <div className="breadcrumb-wrapper">
                <ul className="d-flex align-items-center p-0 m-0">
                  <IoHome size={20} />
                  <li style={{ marginLeft: '8px' }}>Let&apos;s JAM!</li>
                  <FaChevronRight />
                  <li style={{ marginLeft: '10px' }}>團員募集</li>
                </ul>
              </div>

              <div className="top-function-flex" style={{paddingBlock: '2px'}}>
                {/*  ---------------------- 搜尋欄  ---------------------- */}
                <div className="search-sidebarBtn">
                  <div
                    className="d-flex d-sm-none b-btn b-btn-body"
                    role="presentation"
                    style={{ paddingInline: '16px' }}
                    onClick={sidebarToggle}
                  >
                    選單
                  </div>
                  {LoginUserData.my_jam ? (
                    <Link
                      href={`/jam/recruit-list/${LoginUserData.my_jam}`}
                      className="b-btn b-btn-primary px-3 d-none d-sm-block"
                    >
                      我的JAM
                    </Link>
                  ) : (
                    <div
                      role="presentation"
                      className="b-btn b-btn-primary px-3 d-none d-sm-block"
                      onClick={() => {
                        checkLogin(LoginUserData)
                      }}
                    >
                      發起JAM
                    </div>
                  )}
                </div>

                <div className="filter-sort d-flex justify-content-between">
                  <div className="sort-mb d-block d-sm-none">
                    <select
                      className="form-select"
                      value={order}
                      name="order"
                      onChange={(e) => {
                        handleOrder(e.target.value)
                      }}
                    >
                      <option value="ASC">即將到期</option>
                      <option value="DESC">最近發起</option>
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
                        {/* 技術程度 */}
                        <div className="filter-item">
                          <div
                            className="filter-title"
                            style={{ color: '#666666' }}
                          >
                            技術程度
                          </div>
                          <select
                            className="form-select"
                            value={degree}
                            name="degree"
                            onChange={(e) => {
                              setDegree(e.target.value)
                            }}
                          >
                            <option value="all">全部</option>
                            <option value="1">新手練功</option>
                            <option value="2">老手同樂</option>
                          </select>
                        </div>
                        {/* 徵求樂手 */}
                        <div className="filter-item">
                          <div
                            className="filter-title"
                            style={{ color: '#18a1ff' }}
                          >
                            徵求樂手
                          </div>
                          <select
                            className="form-select"
                            value={player}
                            name="player"
                            onChange={(e) => {
                              setPlayer(e.target.value)
                            }}
                          >
                            <option value="all">全部</option>
                            {playerData.map((v) => {
                              return (
                                <option key={v.id} value={v.id}>
                                  {v.name}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                        {/* 音樂風格 */}
                        <div className="filter-item">
                          <div
                            className="filter-title"
                            style={{ color: '#faad14' }}
                          >
                            音樂風格
                          </div>
                          <select
                            className="form-select"
                            value={genre}
                            name="genre"
                            onChange={(e) => {
                              setgenre(e.target.value)
                            }}
                          >
                            <option value="all">全部</option>
                            {genreData.map((v) => {
                              return (
                                <option key={v.id} value={v.id}>
                                  {v.name}
                                </option>
                              )
                            })}
                          </select>
                        </div>

                        {/* 地區 */}
                        <div className="filter-item">
                          <div
                            className="filter-title"
                            style={{ color: '#1d1d1d' }}
                          >
                            地區
                          </div>
                          <select
                            className="form-select"
                            value={region}
                            name="region"
                            onChange={(e) => {
                              setRegion(e.target.value)
                            }}
                          >
                            <option value="all">全部</option>
                            {cityData.map((v, i) => {
                              return (
                                <option key={i} value={v}>
                                  {v}
                                </option>
                              )
                            })}
                          </select>
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
                          <div
                            role="presentation"
                            className="filter-btn confirm-btn w-100 d-flex justify-content-center"
                            onClick={handleLoadData}
                          >
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
                      className={`sort-item ${order === 'ASC' ? 'active' : ''}`}
                      role="presentation"
                      onClick={() => {
                        handleOrder('ASC')
                      }}
                    >
                      即將到期
                    </div>
                    <div
                      className={`sort-item ${
                        order === 'DESC' ? 'active' : ''
                      }`}
                      role="presentation"
                      onClick={() => {
                        handleOrder('DESC')
                      }}
                    >
                      最近發起
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 主內容 */}
            <main className="content">
              {jams.length > 0 ? (
                jams.map((v) => {
                  const {
                    juid,
                    former,
                    title,
                    degree,
                    genre,
                    player,
                    region,
                    created_time,
                  } = v
                  return (
                    <RecruitCard
                      key={juid}
                      juid={juid}
                      former={former}
                      title={title}
                      degree={degree}
                      genre={genre}
                      player={player}
                      region={region}
                      created_time={created_time}
                      genreData={genreData}
                      playerData={playerData}
                    />
                  )
                })
              ) : (
                <div className="no-result">查無資料</div>
              )}
            </main>
            <div className="d-flex justify-content-center">
              <BS5Pagination
                forcePage={page - 1}
                onPageChange={handlePageClick}
                pageCount={pageTotal}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .content {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          align-items: flex-start;
          align-content: flex-start;
          align-self: 'stretch';
          @media screen and (max-width: 576px) {
            justify-content: center;
          }
        }
      `}</style>
    </>
  )
}
