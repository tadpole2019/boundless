import { useEffect, useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import jamHero from '@/assets/jam-hero.png'
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

  let produceTestImage = `/instrument/上低音號/Jupiter_jbr700/jbr700_1.jpg`

  // ----------------------會員登入狀態  ----------------------
  

  //------獲取單一使用者全部訂單 
  const appKey = 'userToken'
  const [userOrderData, setuserOrderData] = useState([])
  const getLoginUserOrder = async (e) => {
    // 拿取Token回傳後端驗證狀態
    const Loginusertoken = localStorage.getItem(appKey)

    if (!Loginusertoken) {
      console.error('沒有登入的token 故無法取得使用者資料。')
      return null
    }
    const userID = jwtDecode(Loginusertoken)
    const id = userID.id
    // console.log(id)

    try {
      const response = await fetch(
        `http://localhost:3005/api/user/order/${id}`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Loginusertoken}`,
          },
          body: JSON.stringify(),
        }
      )
      const orderDatas = await response.json()
      // console.log('Response from server:', LoginUserData)
      // setUserData(LoginUserData)
      // console.log(LoginUserProfile)
      
      // console.log(orderDatas.data)
      setuserOrderData(orderDatas.data)
      
      
      // 在這裡處理後端返回的資料
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  //-------------------------------------------------------------
  //執行一次，如果有登入，獲得該使用者全部資料寫入userData 狀態
  useEffect(() => {
    if (LoginUserData) {
      getLoginUserOrder()
    }
  }, []) 
  let OrderData = []
  let i = 0
  let y = 0
  
  useEffect(() => {
    // 檢查獲得訂單
    // console.log(userOrderData.productResult[0][0])
    if(userOrderData.productResult){
      OrderData = userOrderData
      // console.log(OrderData.productResult[0][0])
    }
    
  }, [userOrderData]) 


  
  
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

  console.log(userOrderData)

  return (
    <>
      <Head>
        <title>我的訂單</title>
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
              <Link href={`/user/user-order`} className="sm-item active">
                我的訂單
              </Link>
              <Link href={`/user/user-article`} className="sm-item">
                我的文章
              </Link>
              <Link href={`/user/user-coupon`} className="sm-item ">
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
                  <li style={{ marginLeft: '10px' }}>我的訂單</li>
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
                        <div className="user-title-userInfo">我的訂單</div>
                      </div>
                      <div className="user-orderList">


                        {/* <div className="user-order-item-instrument ">
                          <div className="user-order-item-instrument-leftSide col-lg-3 col-12">
                            <div className="user-order-item-instrument-leftSide-img">
                              <Image src={produceTestImage} alt='' priority style={{ borderRadius: 10, padding:5 }} width={150} height={150}></Image>
                            </div> */}
                            {/* <div className="user-order-item-instrument-leftSide-btn btn btn-primary">
                              退貨
                            </div> */}
                          {/* </div>
                          <div className="user-order-item-instrument-detail col-lg-9 col-12">
                            <div className="user-order-item-instrument-detail-row ">
                              <div className="user-order-item-instrument-detail-row-col-productName">
                                <p>
                                  <span>商品名稱：</span> YBH_621S X 1
                                </p>
                              </div>
                            </div>
                            <div className="user-order-item-instrument-detail-row row">
                              <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                <h5>訂單編號</h5>
                                <p>31700023464729</p>
                              </div>
                              <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                <h5>購買日期</h5>
                                <p>2024/01/14</p>
                              </div>
                              <div className="user-order-item-instrument-detail-row-col col-lg-3 col-12">
                                <h5>付款金額</h5>
                                <p>$ 72000</p>
                              </div>
                            </div>
                            <div className="user-order-item-instrument-detail-row row">
                              <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                <h5>付款方式</h5>
                                <p>信用卡</p>
                              </div>
                              <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                <h5>商品狀態</h5>
                                <p>配送完成</p>
                              </div>
                              <div className="user-order-item-instrument-detail-row-col-address col-lg-4 col-5">
                                <h5>配送地址</h5>
                                <p>320桃園市中壢區新生路二段421號</p>
                              </div>
                            </div>
                          </div>
                        </div> */}



                        {/* {OrderData.productResult ? 
                        <div className="user-order-item-instrument ">
                          <div className="user-order-item-instrument-leftSide col-lg-3 col-12">
                            <div className="user-order-item-instrument-leftSide-img">
                              <Image src={produceTestImage} alt='' priority style={{ borderRadius: 10, padding:5 }} width={150} height={150}></Image>
                            </div>
                           
                          </div>
                          <div className="user-order-item-instrument-detail col-lg-9 col-12">
                            <div className="user-order-item-instrument-detail-row ">
                              <div className="user-order-item-instrument-detail-row-col-productName">
                                <p>
                                  <span>商品名稱：</span> { userOrderData.productResult[0][0].name} {OrderData.productResult[0][0].quantity != 1  ?   "  *  " + OrderData.productResult[0][0].quantity : ''}
                                </p>
                                
                              </div>
                            </div>
                            <div className="user-order-item-instrument-detail-row row">
                              <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                <h5>訂單編號</h5>
                                <p>{OrderData.productResult[0][0].order_id + 31700023464729}</p>
                              </div>
                              <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                <h5>購買日期</h5>
                                <p>{OrderData.productResult[0][0].onshelf_time}</p>
                              </div>
                              <div className="user-order-item-instrument-detail-row-col col-lg-3 col-12">
                                <h5>付款金額</h5>
                                <p>{OrderData.productResult[0][0].price * OrderData.productResult[0][0].quantity}</p>
                              </div>
                            </div>
                            <div className="user-order-item-instrument-detail-row row">
                              <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                <h5>付款方式</h5>
                                <p>信用卡</p>
                              </div>
                              <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                <h5>商品狀態</h5>
                                <p>{OrderData.productResult[0][0].transportation_state}</p>
                              </div>
                              <div className="user-order-item-instrument-detail-row-col-address col-lg-4 col-5">
                                <h5>配送地址</h5>
                                <p>{OrderData.productResult[0][0].postcode}{OrderData.productResult[0][0].country}{OrderData.productResult[0][0].township}{OrderData.productResult[0][0].address}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        : ''} */}

                        {/* {userOrderData.productResult && userOrderData.productResult.map((product, index) => (
                          <div className="user-order-item-instrument" key={index}>
                            <div className="user-order-item-instrument-leftSide col-lg-3 col-12">
                              <div className="user-order-item-instrument-leftSide-img">
                                <Image src={product.image} alt={product.name} priority style={{ borderRadius: 10, padding:5 }} width={150} height={150}></Image>
                              </div>
                              
                            </div>
                            <div className="user-order-item-instrument-detail col-lg-9 col-12">
                              <div className="user-order-item-instrument-detail-row">
                                <div className="user-order-item-instrument-detail-row-col-productName">
                                  <p>
                                    <span>商品名稱：</span> {product[0].name} {product[0].quantity !== 1 ? ` * ${product[0].quantity}` : ''}
                                  </p>
                                </div>
                              </div>
                              <div className="user-order-item-instrument-detail-row row">
                                <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                  <h5>訂單編號</h5>
                                  <p>{product.order_id + 31700023464729}</p>
                                </div>
                                <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                  <h5>購買日期</h5>
                                  <p>{product.onshelf_time}</p>
                                </div>
                                <div className="user-order-item-instrument-detail-row-col col-lg-3 col-12">
                                  <h5>付款金額</h5>
                                  <p>{product.price * product.quantity}</p>
                                </div>
                              </div>
                              <div className="user-order-item-instrument-detail-row row">
                                <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                  <h5>付款方式</h5>
                                  <p>信用卡</p>
                                </div>
                                <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                  <h5>商品狀態</h5>
                                  <p>{product.transportation_state}</p>
                                </div>
                                <div className="user-order-item-instrument-detail-row-col-address col-lg-4 col-5">
                                  <h5>配送地址</h5>
                                  <p>{product.postcode}{product.country}{product.township}{product.address}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))} */}

                        {userOrderData.productResult && userOrderData.productResult.map((productList, index) => (
                          <div key={index}>
                            {productList.map((product, innerIndex) => (
                              <div className="user-order-item-instrument" key={innerIndex}>
                                <div className="user-order-item-instrument-leftSide col-lg-3 col-12" style={{paddingTop:25}}>
                                  <div className="user-order-item-instrument-leftSide-img " >
                                  
                                    <Image src={`/smallForOrder/${product.img_small}`} alt={product.name} priority style={{ borderRadius: 10, padding:5 ,height: '100%' , width:"100%", objectFit:'contain'}} width={150} height={150}  ></Image>
                                  </div>
                                </div>
                                <div className="user-order-item-instrument-detail col-lg-9 col-12" style={{paddingTop:15}}>
                                  <div className="user-order-item-instrument-detail-row">
                                    <div className="user-order-item-instrument-detail-row-col-productName">
                                      <p>
                                        <span>商品名稱：</span> {product.name} {product.quantity !== 1 ? ` * ${product.quantity}` : ''}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="user-order-item-instrument-detail-row row">
                                    <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                      <h5>訂單編號</h5>
                                      <p>{product.order_id + 31700023464729}</p>
                                    </div>
                                    <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                      <h5>購買日期</h5>
                                      <p>{product.onshelf_time.split("T")[0]}</p>
                                    </div>
                                    <div className="user-order-item-instrument-detail-row-col col-lg-3 col-12">
                                      <h5>付款金額</h5>
                                      <p>${product.price * product.quantity}</p>
                                    </div>
                                  </div>
                                  <div className="user-order-item-instrument-detail-row row">
                                    <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                      <h5>付款方式</h5>
                                      <p>信用卡</p>
                                    </div>
                                    <div className="user-order-item-instrument-detail-row-col col-lg-3 col-5">
                                      <h5>{product.type == '1' ? '商品狀態': ''}</h5>
                                      <p>{product.type == '1' ? product.transportation_state : ""}</p>
                                    </div>
                                    <div className="user-order-item-instrument-detail-row-col-address col-lg-4 col-5">
                                      <h5>{product.type == '1' ? '配送地址': ''}</h5>
                                      <p>{product.type == '1' ? `${product.postcode}${product.country}${product.township}${product.address}` : ''}</p>
                                    </div>
                                    
                                  </div>
                                  
                                </div>
                              </div>
                            ))}
                          </div>
                          
                        ))}

                        {/* <div className="user-order-item-lesson">
                          <div className="user-order-item-lesson-leftSide">
                            <div className="user-order-item-lesson-leftSide-img">
                              <img src="" alt="" />
                            </div>
                            <div className="user-order-item-lesson-leftSide-btn btn btn-primary">
                              修改訂單
                            </div>
                          </div>
                          <div className="user-order-item-lesson-detail">
                            <div className="user-order-item-lesson-detail-row">
                              <div className="user-order-item-lesson-detail-row-col-productName">
                                <p>
                                  <span>商品名稱：</span> 上課
                                </p>
                              </div>
                            </div>
                            <div className="user-order-item-lesson-detail-row">
                              <div className="user-order-item-lesson-detail-row-col">
                                <h5>訂單編號</h5>
                                <p>31700023464729</p>
                              </div>
                              <div className="user-order-item-lesson-detail-row-col">
                                <h5>購買日期</h5>
                                <p>2024/01/14</p>
                              </div>
                              <div className="user-order-item-lesson-detail-row-col ">
                                <h5>付款金額</h5>
                                <p>$ 72000</p>
                              </div>
                            </div>
                            <div className="user-order-item-lesson-detail-row">
                              <div className="user-order-item-lesson-detail-row-col">
                                <h5>付款方式</h5>
                                <p>信用卡</p>
                              </div>
                            </div>
                          </div>
                        </div> */}

                      </div>

                      {/* <div className="user-orderList-pagination">
                        <p>待放分頁元件 注意class</p>
                      </div> */}
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
        /* --------------- user-contect-order--------------- */

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

          .user-content {
            display: flex;
            width: 1070px;
            padding: 20px 10px;
            margin: 0;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            border-radius: 5px;
            background: var(--gray-30, rgba(185, 185, 185, 0.3));
          }

          .user-content-top {
            display: flex;
            align-items: flex-start;
            align-self: stretch;
            color: var(--primary-deep, #124365);
            text-align: center;
            /* h3 */
            font-family: 'Noto Sans TC';
            font-size: 28px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }

          .user-order-item-instrument {
            /* padding-left: 25px;*/
            display: flex;
            width: 1050px;
            /*height: 250px;*/
            align-items: center;
            gap: 20px;
            border-bottom: 1px solid var(--body, #b9b9b9);

            @media screen and (max-width: 576px) {
              flex-direction: column;
            }


            .user-order-item-instrument-leftSide {
              /* padding-left: 25px; */
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 10px;

              .user-order-item-instrument-leftSide-img {
                display: flex;
                width: 150px;
                height: 150px;
                align-items: flex-start;
                gap: 10px;
                border-radius: 10px;
                border: 1px solid var(--body, #b9b9b9);
                background: #fff;
              }

              .user-order-item-instrument-leftSide-btn {
                display: flex;
                padding: 3px 15px;
                justify-content: center;
                align-items: center;
                gap: 10px;
                border-radius: 5px;
                background: var(--primary, #1581cc);
              }
            }

            .user-order-item-instrument-detail {
              /*padding-left: 25px; */
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              /* gap: 30px; */
              flex: 1 0 0;

              .user-order-item-instrument-detail-row {
                display: flex;
                align-items: center;
                gap: 5px;
                align-self: stretch;

                .user-order-item-instrument-detail-row-col-productName {
                  width: 700px;
                  padding: 0px 20px 5px 0px;
                  font-size: 20px;
                  @media screen and (max-width: 576px) {
                    margin-Left:30px
                  }

                  

                  & span {
                    font-family: 'Noto Sans TC';
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    color: var(--primary-deep, #124365);
                  }
                }

                .user-order-item-instrument-detail-row-col {
                  
                  display: flex;
                  padding: 0px 20px 5px 0px;
                  align-items: center;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  @media screen and (max-width: 576px) {
                    margin-Left:30px
                  }
                  
                }

                
                .user-order-item-instrument-detail-row-col-address {
                  /*width: 800px;*/
                  padding: 0px 20px 5px 0px;
                  @media screen and (max-width: 576px) {
                    margin-Left:30px
                  }
                  & h5 {
                    font-family: 'Noto Sans TC';
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    color: var(--primary-deep, #124365);
                    
                  }
                }
              }
            }
          }

          .user-order-item-lesson {
            /* padding-left: 25px; */
            display: flex;
            width: 1050px;
            height: 250px;
            align-items: center;
            gap: 20px;
            border-bottom: 1px solid var(--body, #b9b9b9);

            .user-order-item-lesson-leftSide {
              /* padding-left: 25px; */
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 10px;

              .user-order-item-lesson-leftSide-img {
                display: flex;
                width: 150px;
                height: 150px;
                align-items: flex-start;
                gap: 10px;
                border-radius: 10px;
                border: 1px solid var(--body, #b9b9b9);
                background: #fff;
              }

              .user-order-item-lesson-leftSide-btn {
                display: flex;
                padding: 3px 15px;
                justify-content: center;
                align-items: center;
                gap: 10px;
                border-radius: 5px;
                background: var(--primary, #1581cc);
              }
            }

            .user-order-item-lesson-detail {
              /*padding-left: 25px;*/
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              /* gap: 30px; */
              flex: 1 0 0;

              .user-order-item-lesson-detail-row {
                display: flex;
                align-items: center;
                gap: 5px;
                align-self: stretch;

                .user-order-item-lesson-detail-row-col-productName {
                  width: 700px;
                  padding: 0px 20px 5px 0px;
                  font-size: 20px;

                  & span {
                    font-family: 'Noto Sans TC';
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    color: var(--primary-deep, #124365);
                  }
                }

                .user-order-item-lesson-detail-row-col {
                  width: 200px;
                  display: flex;
                  padding: 0px 20px 5px 0px;
                  align-items: center;

                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;

                  text-overflow: ellipsis;
                }
              }
            }
          }

          .user-orderList-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            align-self: stretch;
          }
        }

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
            }
            .user-order-item-instrument {
              width: 370px;
              overflow: hidden;
            }

            .user-order-item-instrument-detail-row-col-address {
              width: 370px;
              overflow: hidden;
            }

            .user-order-item-lesson {
              width: 370px;
              overflow: hidden;
            }
          }
        }
        /* RWD讓SIDEBAR消失 測試用記得刪 */
      `}</style>
    </>
  )
}
