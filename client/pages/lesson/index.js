import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/common/navbar'
import NavbarMb from '@/components/common/navbar-mb'
import Footer from '@/components/common/footer'
//試抓資料區
import Card from '@/components/lesson/lesson-card'
import Cardrwd from '@/components/lesson/lesson-card-rwd'
// import Lesson from '@/data/Lesson.json'

import Link from 'next/link'
import Image from 'next/image'
import lessonHero from '@/assets/lesson-hero.jpg'
import Head from 'next/head'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'

import BS5Pagination from '@/components/common/pagination.js'

import { useParams } from 'react-router-dom'

// 會員認證hook
import { useAuth } from '@/hooks/user/use-auth'

export default function LessonList({}) {
  const router = useRouter()
  // ----------------------會員登入狀態 & 會員資料獲取  ----------------------
  //從hook 獲得使用者登入的資訊  儲存在變數LoginUserData裡面
  const { LoginUserData, handleLoginStatus, getLoginUserData, handleLogout } =
    useAuth()
  const [userData, setUserData] = useState()
  //檢查token
  //   useEffect(() => {
  //     handleLoginStatus()
  //     //獲得資料
  //     getLoginUserData()
  //   }, [])
  //   useEffect(() => {
  //     handleLoginStatus()
  //     //獲得資料
  //     getLoginUserData()
  //   }, [])
  //登出功能

  //檢查是否獲取資料
  //   console.log(LoginUserData)
  //   讀取使用者資料後 定義大頭貼路徑
  let avatarImage
  if (LoginUserData.img) {
    avatarImage = `/user/${LoginUserData.img}`
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

  useEffect(() => {
    document.addEventListener('click', () => {
      setFilterVisible(false)
    }) //鉤子在組件渲染完成後註冊了一個點擊事件監聽器。當點擊事件發生時，會調用一個函數來將 filterVisible 設置為 false，從而隱藏篩選表單。
  }, []) //這個事件監聽器只會在組件首次渲染時被註冊，並且在組件卸載時被清理。
  // 阻止事件冒泡造成篩選表單關閉//防止觸發組件外部的點擊事件，進而導致篩選表單被關閉。
  const stopPropagation = (e) => {
    e.stopPropagation()
  }
  // 顯示表單
  const onshow = (e) => {
    stopPropagation(e)
    setFilterVisible(!filterVisible)
  }
  // ----------------------假資料  ----------------------
  // 資料排序
  const [dataSort, setDataSort] = useState('upToDate')

  const [priceLow, setPriceLow] = useState('')
  const [priceHigh, setPriceHigh] = useState('')

  //-------------------連資料庫
  const perPage = 12
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [LessonArray, setLessonArray] = useState([])

  function getLesson() {
    return new Promise((resolve, reject) => {
      let url = 'http://localhost:3005/api/lesson'
      fetch(url, {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          // 将 result 每 perPage 条记录分成一页一页的数组
          const pages = result.reduce((acc, current, index) => {
            const tempPage = Math.floor(index / perPage) // 当前记录所在的页码
            if (!acc[tempPage]) {
              acc[tempPage] = [] // 如果该页不存在，则创建一个新的页数组
            }
            acc[tempPage].push(current) // 将当前记录添加到相应的页数组中
            return acc
          }, [])
          setTotalPage(pages.length)
          setLessonArray(pages[currentPage]) // 将分页后的结果传递给 resolve
          console.log(LessonArray)

          setLessonArray(pages[currentPage]) // 将分页后的结果传递给 resolve
          console.log(pages[currentPage])
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
    })
  }
  useEffect(() => {
    getLesson()
  }, [currentPage])

  const handlePageClick = (event) => {
    const newPage = event.selected
    setCurrentPage(newPage)
    //   console.log(currentPage)
  }

  // 在组件中定义 isFiltered 状态，并提供一个函数来更新它的值
  const [isFiltered, setIsFiltered] = useState(false)
  //-----------所有過濾資料功能傳回來的地方

  const [data, setData] = useState(LessonArray)

  //-----------------篩選功能
  // 價格篩選
  //確保 priceLow 和 priceHigh 有被定義後再呼叫 priceRange 函式
  const priceRange = (priceLow, priceHigh) => {
    if (priceLow !== '' && priceHigh !== '') {
      console.log('priceLow:', priceLow)
      console.log('priceHigh:', priceHigh)
      fetch(
        `http://localhost:3005/api/lesson?priceLow=${priceLow}&priceHigh=${priceHigh}`
      )
        .then((response) => response.json()) //在網路請求成功時將回應物件轉換為 JSON 格式，並回傳一個新的 Promise 物件。這個新的 Promise 物件會在 JSON 解析成功後被解析，而且 data 參數會包含解析後的 JSON 資料。

        .then((data) => setData(data))
      setIsFiltered(true)
      console.log(data)
    }
  }

  //   課程評價篩選
  const scoreState = ['all', '5', '4', '3']
  const [score, setScore] = useState('all')
  const [confirmClicked, setConfirmClicked] = useState(false) // 新状态来跟踪确认按钮点击
  //   当点击确认按钮时触发的useEffect
    useEffect(() => {
      if (score === 'all') {
        setData(LessonArray)
      } else {
        const scoreNum = parseInt(score, 10)
        const filtered = LessonArray.filter(
          (lesson) => Math.round(lesson.average_rating) === scoreNum
        )
        setData(filtered)
        setIsFiltered(true)
      }
      setConfirmClicked(false) // 处理完后重置确认按钮的点击状态
    }, [confirmClicked]) // 依赖于确认按钮点击状态

  // 促銷課程篩選
  const [sales, setSales] = useState(false)

  // 监听confirmClicked变化，执行筛选逻辑
  // useEffect(() => {
  //   if (confirmClicked) {
  //     if (sales == true) {
  //       // 筛选促销课程
  //       const salesCourses = LessonArray.filter(
  //         (lesson) => lesson.discount_state == 1
  //       )
  //       setData(salesCourses)
  //       setIsFiltered(true)
  //     } else {
  //       // 不筛选，显示所有课程
  //       setData(LessonArray)
  //     }
  //     // 重置confirmClicked状态以便下次点击
  //     setConfirmClicked(false)
  //   }
  // }, [confirmClicked, sales]) // 添加sales作为依赖项，确保筛选逻辑正确执行

  // 点击确认按钮的处理函数
  const handleConfirmClick = () => {
    setConfirmClicked(true)
    console.log(confirmClicked)
  }

  // 清除表單內容
  const cleanFilter = () => {
    setPriceLow('')
    setPriceHigh('')
    setScore('all')
    setSales(false)
    setData(LessonArray)
  }

  //-------------------搜尋功能
  const [search, setSearch] = useState('')
  const handleSearch = () => {
    // console.log('按鈕被點擊了')
    let newData
    if (search.trim() === '') {
      newData = LessonArray
      //   console.log(newData)
    } else {
      newData = LessonArray.filter((v, i) => {
        return v.name.includes(search)
      })
    }

    setData(newData)
    setIsFiltered(true)
  }

  //-------------------排序功能

  //最熱門
  const sortBySales = () => {
    const sortedProducts = [...LessonArray].sort((a, b) => b.sales - a.sales)
    setData(sortedProducts)
    setIsFiltered(true)
  }

  //依評價
  const sortByRating = () => {
    const sortedProducts = [...LessonArray].sort(
      (a, b) => b.average_rating - a.average_rating
    )
    setData(sortedProducts)
    setIsFiltered(true)
  }
  //依時數
  const sortBylength = () => {
    const sortedProducts = [...LessonArray].sort((a, b) => b.length - a.length)
    setData(sortedProducts)
    setIsFiltered(true)
  }

  //-------------------渲染分類功能li
  const [LessonCategory, setLessonCategory] = useState([])

  function getLessonCategory() {
    return new Promise((resolve, reject) => {
      let url = 'http://localhost:3005/api/lesson/categories'
      fetch(url, {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          resolve(result)
          console.log(result)
          setLessonCategory(result)
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
    })
  }

  useEffect(() => {
    getLessonCategory()
  }, [])

  //-------------------選定特定分類

  const [selectedCategory, setSelectedCategory] = useState('') // 儲存所選分類
  function handleCategoryChange(id) {
    console.log('Clicked on category with ID:', id)
    // 在這裡執行你的其他邏輯，比如更新狀態
    // 特別處理「全部」選項
    if (id === 0) {
      setSelectedCategory(0) // 使用空字串表示「全部」
    } else {
      setSelectedCategory(id)
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/lesson/category/${selectedCategory}`
        )
        const data = await response.json()
        console.log(data)

        setData(data) //連回渲染特定分類課程
      } catch (error) {
        console.error('Error fetching products:', error)
      }
      setIsFiltered(true)
    }
    //当selectedCategory变化时重新获取商品数据
    if (selectedCategory !== '') {
      fetchProducts()
    }
  }, [selectedCategory])

  //-------------------選定特定分類後 熱門課程消失 //FIXME回到原始url熱門課程出不來
  const { category } = useParams() // 从URL参数中获取category值
  const [showHotCourses, setShowHotCourses] = useState(true) // 控制是否显示热门课程部分

  useEffect(() => {
    //   如果URL中存在category参数，则隱藏热门课程部分
    if ('all') {
      setShowHotCourses(false)
    } else {
      // 否则顯示热门课程部分
      setShowHotCourses(true)
    }
    console.log(showHotCourses)
  }, [])

  return (
    <>
      <Head>
        <title>探索課程</title>
      </Head>
      <Navbar menuMbToggle={menuMbToggle} />
      <div className="hero d-none d-sm-block">
        <Image
          src={lessonHero}
          className="object-fit-cover w-100"
          alt="cover"
        />
      </div>
      <div className="container position-relative">
        {/* <NavbarMB
          menuMbToggle={menuMbToggle}
          className={`menu-mb d-sm-none d-flex flex-column align-items-center ${
            showMenu ? 'menu-mb-show' : ''
          }`}
        /> */}
        {/* 手機版主選單/navbar */}
        <div
          className={`menu-mb d-sm-none d-flex flex-column align-items-center ${
            showMenu ? 'menu-mb-show' : ''
          }`}
        >
          <NavbarMb />
        </div>

        <div className="row">
          {/* sidebar */}
          <div className="sidebar-wrapper d-none d-sm-block  col-sm-2">
            <div className="sidebar">
              <ul className="d-flex flex-column">
                <Link href={'/lesson/?category === 0'}>
                  <li
                    onClick={() => handleCategoryChange(0)}
                    style={{
                      color: selectedCategory === 0 ? '#18a1ff' : '',
                      cursor: 'pointer',
                    }}
                  >
                    全部
                  </li>
                </Link>
                {/* 分類功能 */}
                {LessonCategory.map((v, index) => {
                  return (
                    <Link key={index} href={'/lesson/?category=${v.id}'}>
                      <li
                        onClick={() => handleCategoryChange(v.id)}
                        style={{
                          color: selectedCategory === v.id ? '#18a1ff' : '',
                          cursor: 'pointer',
                        }}
                      >
                        {v.name}
                      </li>
                    </Link>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* 頁面內容 */}
          <div className="col-12 col-sm-10 page-control">
            {/* 手機版分類sidebar */}
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
              <Link href={`/lesson/?category === 0`} className="sm-item active">
                全部
              </Link>
              {LessonCategory.map((v, index) => {
                return (
                  <Link
                    key={index}
                    href={`/lesson/?category=${v.id}`}
                    className="sm-item"
                    onClick={() => {
                      handleCategoryChange(v.id)
                      setShowSidebar(false)
                    }}
                  >
                    {v.name}
                  </Link>
                )
              })}
            </div>

            {/* 頂部功能列 */}
            <div className="top-function-container">
              {/* 麵包屑 */}
              <div className="breadcrumb-wrapper">
                <ul className="d-flex align-items-center p-0 m-0">
                  <IoHome size={20} />
                  <li style={{ marginLeft: '8px' }}>探索課程</li>
                  <FaChevronRight />
                  <li style={{ marginLeft: '10px' }}>線上課程</li>
                </ul>
              </div>

              <div className="top-function-flex">
                {/*  ---------------------- 搜尋欄  ---------------------- */}
                <div className="search-sidebarBtn">
                  <div
                    className="d-flex d-sm-none b-btn b-btn-body"
                    role="presentation"
                    style={{ paddingInline: '16px' }}
                    onClick={sidebarToggle}
                  >
                    課程分類
                  </div>
                  <div className="search input-group">
                    {/* 輸入欄位 */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="請輸入課程名稱..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <div
                      // 搜尋按鈕
                      onClick={handleSearch}
                      className="search-btn btn d-flex justify-content-center align-items-center p-0"
                    >
                      <IoIosSearch size={25} />
                    </div>
                  </div>
                </div>
                {/* 手機版排序 */}
                <div className="filter-sort d-flex justify-content-between">
                <div className="sort-mb d-block d-sm-none">
                    <select
                      className="form-select"
                      value={dataSort}
                      name="dataSort"
                      onChange={(e) => {
                        const selectedValue = e.target.value
                        if (selectedValue === 'upToDate') {
                          sortBySales()
                        } else if (selectedValue === 'review') {
                          sortByRating()
                        } else if (selectedValue === 'classLength') {
                          sortBylength()
                        }
                        setDataSort(selectedValue)
                      }}
                    >
                      <option selected value="upToDate">
                        最熱門
                      </option>
                      <option value="review">依評價</option>
                      <option value="classLength">依時數</option>
                    </select>
                  </div>

                  {/* ----------------------條件篩選------------------ */}
                  <form className="d-flex align-items-center  position-relative">
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
                          <div className="filter-title">課程評價</div>
                          <div className="filter-radio-group d-flex flex-wrap justify-content-between">
                            {scoreState.map((v, i) => {
                              return (
                                <div
                                  className="filter-radio-item form-check p-0 mb-3"
                                  key={i}
                                >
                                  <label className="form-check-label">
                                    <input
                                      classname="form-check-input"
                                      type="radio"
                                      name="score"
                                      value={v}
                                      checked={v === score}
                                      //   onChange={(e) => {
                                      //     setScore(e.target.value)
                                      //   }}
                                      onChange={(e) => {
                                        const value = e.target.value
                                        setScore(
                                          value === 'all' ? 'all' : value
                                        ) // 不需要转换为数字，如果你在比较时也转换了
                                      }}
                                    />
                                    &nbsp;{v === 'all' ? '全部' : v + '星'}
                                  </label>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between gap-2">
                          <div
                            className="filter-btn clean-btn w-100 d-flex justify-content-center"
                            role="presentation"
                            onClick={cleanFilter}
                          >
                            清除
                          </div>
                          <div
                            className="filter-btn confirm-btn w-100 d-flex justify-content-center"
                            role="presentation"
                            onClick={() => {
                              priceRange(priceLow, priceHigh)

                              handleConfirmClick()
                            }}
                          >
                            確認
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {/* web版資料排序 */}
                  <div className="sort d-none d-sm-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      排序
                      <FaSortAmountDown size={14} />
                    </div>

                    <div className="sort-item " onClick={sortBySales}>
                      最熱門
                    </div>
                    <div className="sort-item" onClick={sortByRating}>
                      依評價
                    </div>
                    <div className="sort-item" onClick={sortBylength}>
                      依時數
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 主內容 */}
            <div className="content" style={{ minHeight: '95svh' }}>
              {showHotCourses && (
                <div className="hot-lesson">
                  <h4 className="text-primary">熱門課程</h4>
                  <div className="hot-lesson-card-group">
                    {LessonArray.slice() // Create a copy of data array to avoid mutating original array
                      .sort((a, b) => b.sales - a.sales) // Sort courses based on sales volume
                      .slice(0, 4) // Get top 4 courses */
                      .map((v, i) => {
                        return (
                          <div className="hot-lesson-card" key={i}>
                            <Card
                              course-card
                              id={v.id}
                              luid={v.puid}
                              name={v.name}
                              average_rating={v.average_rating}
                              price={v.price}
                              teacher_name={v.teacher_name}
                              img={v.img}
                              length={v.length}
                              sales={v.sales}
                            />
                          </div>
                        )
                      })}
                  </div>
                </div>
              )}
              <hr />
              {/*-------- 列表頁卡片迴圈------- */}
              <div className="lesson-card-group">
                {/* 更改為搜尋過後篩選出來的課程 */}

                {isFiltered &&
                  // 如果已经进行了筛选或搜索，渲染筛选后的 Lesson 数据
                  data.map((v, i) => {
                    const {
                      lesson_category_name,
                      id,
                      puid,
                      name,
                      average_rating,
                      review_count,
                      price,
                      teacher_name,
                      teacher_id,
                      img,
                      img_small,
                      sales,
                      length,
                    } = v
                    return (
                      <div className="mb-4" key={id}>
                        {isSmallScreen ? (
                          <Cardrwd
                            lesson_category_id={lesson_category_name}
                            id={id}
                            luid={puid}
                            name={name}
                            average_rating={Math.round(average_rating)}
                            review_count={review_count}
                            price={price}
                            teacher_name={teacher_name}
                            img_small={img_small}
                            sales={sales}
                            length={length}
                          />
                        ) : (
                          <Card
                            lesson_category_id={lesson_category_name}
                            id={id}
                            luid={puid}
                            name={name}
                            average_rating={Math.round(average_rating)}
                            review_count={review_count}
                            price={price}
                            teacher_name={teacher_name}
                            img={img}
                            sales={sales}
                            length={length}
                          />
                        )}
                      </div>
                    )
                  })}

                {!isFiltered &&
                  // 如果没有进行筛选或搜索，渲染原始的 Lesson 数据
                  LessonArray.map((v, i) => {
                    const {
                      lesson_category_name,
                      id,

                      puid,
                      name,
                      average_rating,
                      review_count,
                      price,
                      teacher_name,
                      teacher_id,
                      img,
                      img_small,
                      sales,
                      length,
                    } = v
                    {/* console.log(lesson_category_name) */}
                    return (
                      <div key={id}>
                        {isSmallScreen ? (
                          <Cardrwd
                            lesson_category_id={lesson_category_name}
                            id={id}
                            luid={puid}
                            name={name}
                            average_rating={Math.round(average_rating)}
                            review_count={review_count}
                            price={price}
                            teacher_name={teacher_name}
                            img_small={img_small}
                            sales={sales}
                            length={length}
                          />
                        ) : (
                          <Card
                            lesson_category_id={lesson_category_name}
                            id={id}
                            luid={puid}
                            name={name}
                            average_rating={Math.round(average_rating)}
                            review_count={review_count}
                            price={price}
                            teacher_name={teacher_name}
                            img={img}
                            sales={sales}
                            length={length}
                          />
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {!isFiltered && (
          <BS5Pagination
            forcePage={currentPage}
            onPageChange={handlePageClick}
            pageCount={totalPage}
          />
        )}
      </div>
      <Footer />
      <style jsx>{`
        .content {
          padding-inline: 22px;
        }
        .lesson-card-group {
          display: flex;
          margin-block: 30px;
          gap: 20px;
          flex-wrap: wrap;
        }
        .hot-lesson-card-group {
          margin-block: 30px;
          gap: 10px;
          display: flex;
          justify-content: space-between;
        }
        @media screen and (max-width: 576px) {
          .content {
            padding-inline: 0;
            display: flex;
          }
          .hot-lesson {
            display: none;
          }
          .lesson-card-group {
            justify-content: center;
            gap: 16px;
          }
        }
      `}</style>
    </>
  )
}
