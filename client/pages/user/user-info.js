import { useEffect, useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import NavbarMb from '@/components/common/navbar-mb'

//圖片
import jamHero from '@/assets/jam-hero.png'

// 會員認證hook
import { useAuth } from '@/hooks/user/use-auth'
import { jwtDecode } from 'jwt-decode'

//選項資料 data
// import CityCountyData from '@/data/CityCountyData.json'
import playerData from '@/data/player.json'
import genreData from '@/data/genre.json'

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
  // 舊版會警告 因為先渲染但沒路徑 bad
  // const avatarImage = `/user/${LoginUserData.img}`
  // const avatargoogle = `${LoginUserData.photo_url}`
  // const avatarDefault = `/user/avatar_userDefault.jpg`

  // ----------------------會員登入狀態  ----------------------

  
  // ----------------------會員資料處理  ----------------------
  // ---------------性別-------------
  let gender = '讀取中'
  if (LoginUserData.gender == 1) {
    gender = '男'
  } else if (LoginUserData.gender == 2) {
    gender = '女'
  } else if (LoginUserData.gender == 3) {
    gender = '其他'
  } else {
    gender = '尚未填寫'
  }

  // ---------------生日-------------
  let birthday = '0000-00-00'
  if (LoginUserData.birthday) {
    // 原本處理方式 但和SQL資料庫有時區差異------------
    // birthday = userData.birthday.split('T')[0]

    // testTime = new Date(testTime)
    // const taipeiTime = new Date(testTime.getTime() + 8 * 60 * 60 * 1000)
    // YYYYMMDDTime = taipeiTime.toISOString().slice(0, 19).replace('T', ' ')
    // 原本處理方式 但和SQL資料庫有時區差異------------
    let defaultTime = LoginUserData.birthday
    let inputDate = new Date(defaultTime)
    let year = inputDate.getFullYear()
    let month = String(inputDate.getMonth() + 1).padStart(2, '0') // 月份從0開始，需要加1，並保持兩位數
    let day = String(inputDate.getDate()).padStart(2, '0') // 日期需保持兩位數
    birthday = `${year}-${month}-${day}`
    // console.log(birthday)
  }

  // ---------------曲風-------------
  let totalGenreData = genreData.map((v) => ({
    key: v.id,
    value: v.id,
    label: v.name,
  }))
  // console.log(totalGenreData)
  // console.log(totalGenreData[0].value)
  // console.log(totalGenreData[0].label)
  let genreLike,
    finalGenreLike = `尚未填寫`
  if (LoginUserData.genre_like) {
    genreLike = LoginUserData.genre_like
    // 使用 split 方法將字串拆分成陣列
    let [genreLike1, genreLike2, genreLike3] = genreLike.split(',')
    // 傻人方法
    for (let i = 0; i < totalGenreData.length; i++) {
      if ([genreLike1] == totalGenreData[i].value) {
        genreLike1 = totalGenreData[i].label
        break // 找到匹配後就跳出迴圈
      }
    }
    for (let i = 0; i < totalGenreData.length; i++) {
      if ([genreLike2] == totalGenreData[i].value) {
        genreLike2 = totalGenreData[i].label
        break // 找到匹配後就跳出迴圈
      }
    }
    for (let i = 0; i < totalGenreData.length; i++) {
      if ([genreLike3] == totalGenreData[i].value) {
        genreLike3 = totalGenreData[i].label
        break // 找到匹配後就跳出迴圈
      }
    }
    //判斷最後結果
    if (genreLike1 && genreLike2 && genreLike3 !== undefined) {
      finalGenreLike = `${genreLike1}, ${genreLike2}, ${genreLike3}`
    } else if (genreLike1 && genreLike2 !== undefined) {
      finalGenreLike = `${genreLike1}, ${genreLike2}`
    } else if (genreLike1 !== undefined) {
      finalGenreLike = `${genreLike1}`
    }
  }
  // console.log(finalGenreLike)

  // ---------------演奏樂器-------------
  let totalPlayerData = playerData.map((v) => ({
    key: v.id,
    value: v.id,
    label: v.name,
  }))

  // console.log(totalPlayerData[0].value)
  // console.log(totalPlayerData[0].label)
  let playInstrument,
    finalPlayInstrument = `尚未填寫`
  if (LoginUserData.play_instrument) {
    playInstrument = LoginUserData.play_instrument
    // 使用 split 方法將字串拆分成陣列
    let [playInstrument1, playInstrument2, playInstrument3] =
      playInstrument.split(',')
    // 傻人方法
    for (let i = 0; i < totalPlayerData.length; i++) {
      if ([playInstrument1] == totalPlayerData[i].value) {
        playInstrument1 = totalPlayerData[i].label
        break // 找到匹配後就跳出迴圈
      }
    }
    for (let i = 0; i < totalPlayerData.length; i++) {
      if ([playInstrument2] == totalPlayerData[i].value) {
        playInstrument2 = totalPlayerData[i].label
        break // 找到匹配後就跳出迴圈
      }
    }
    for (let i = 0; i < totalPlayerData.length; i++) {
      if ([playInstrument3] == totalPlayerData[i].value) {
        playInstrument3 = totalPlayerData[i].label
        break // 找到匹配後就跳出迴圈
      }
    }
    //判斷最後結果
    if (playInstrument1 && playInstrument2 && playInstrument3 !== undefined) {
      finalPlayInstrument = `${playInstrument1}, ${playInstrument2}, ${playInstrument3}`
    } else if (playInstrument1 && playInstrument2 !== undefined) {
      finalPlayInstrument = `${playInstrument1}, ${playInstrument2}`
    } else if (playInstrument1 !== undefined) {
      finalPlayInstrument = `${playInstrument1}`
    }
  }
  // console.log(finalPlayInstrument)
  // ---------------公開資訊-------------
  //帶入隱私設定進來, 但是不可更改
  let privacy,
    privacyBD = '',
    privacyPhone = '',
    privacyEmail = '',
    ArrPrivacy
  if (LoginUserData.privacy) {
    privacy = LoginUserData.privacy
    ArrPrivacy = privacy.split(',')
    privacyBD = ArrPrivacy[0]
    privacyPhone = ArrPrivacy[1]
    privacyEmail = ArrPrivacy[2]
  }
  // console.log(privacyBD)
  // console.log(privacyPhone)
  // console.log(privacyEmail)

  // ----------------------會員資料處理  ----------------------

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
        <title>會員資訊</title>
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

              <Link href={`/user/user-info`} className="sm-item active">
                會員資訊
              </Link>
              <Link href={LoginUserData.jamstate == '1' ?  `/jam/recruit-list/${LoginUserData.my_jam}`: `/user/user-jam`} className="sm-item">
                我的樂團
              </Link>
              <Link href={`/user/user-order`} className="sm-item">
                我的訂單
              </Link>
              <Link href={`/user/user-article`} className="sm-item">
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
                  <li style={{ marginLeft: '10px' }}>會員資訊</li>
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
                        <div className="user-title-userInfo">會員資訊</div>
                        <div className="user-btnGroup">
                          <div className="user-btnGroup-btn1">
                            <div>
                              <Link href={`/user/user-homepage/${LoginUserData.uid}`}>
                                查看個人首頁
                              </Link>
                            </div>
                          </div>
                          <div className="user-btnGroup-btn2">
                            <div><Link href="/user/user-info-edit">編輯資訊</Link></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">真實姓名</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {LoginUserData.name}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">暱稱</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {LoginUserData.nickname}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">性別</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {gender}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">喜歡曲風</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {finalGenreLike}
                            {/* {LoginUserData.genre_like} */}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">演奏樂器</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {finalPlayInstrument}
                            {/* {LoginUserData.play_instrument} */}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">公開資訊</div>
                        <div className="user-info-item-checkBoxGroup ">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="privacyBD"
                              defaultChecked={privacyBD == '1' ? true : false}
                              disabled={true}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="privacyBD"
                            >
                              生日
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              
                              id="privacyPhone"
                              defaultChecked={privacyPhone == '1' ? true : false}
                              disabled={true}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="privacyPhone"
                            >
                              手機
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"                            
                              id="privacyEmail"
                              defaultChecked={privacyEmail == '1' ? true : false}
                              disabled={true}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="privacyEmail"
                            >
                              電子信箱
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">生日</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {birthday}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">手機</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {LoginUserData.phone ?   LoginUserData.phone : "尚未填寫"}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">電子信箱</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {LoginUserData.email}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">地址</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {LoginUserData.postcode}
                            {LoginUserData.country}
                            {LoginUserData.township}
                            {LoginUserData.address ? LoginUserData.address : "尚未填寫"}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item-info">
                        <div className="user-info-item-info-titleText">
                          自我介紹
                        </div>
                        <div className="user-info-item-info2">
                          <div className="user-info-item-info-contentText">
                            {LoginUserData.info ? LoginUserData.info : "尚未填寫"}
                          </div>
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

          .user-content {
            max-width: 1076px;
            /* width: 1100px; */
            /* height: 705px; */
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 20px;
            padding-bottom: 20px;
            background: rgba(185, 185, 185, 0.3);
            border-radius: 5px;
            flex-direction: column;
            justify-content: start;
            align-items: flex-start;
            gap: 5px;
            display: inline-flex;
            font-family: Noto Sans TC;
          }

          .user-content-top {
            align-self: stretch;
            justify-content: space-between;
            align-items: flex-start;
            display: inline-flex;
            word-wrap: break-word;
          }

          .user-title-userInfo {
            color: #0d3652;
            font-size: 28px;
            font-weight: 700;
          }

          .user-btnGroup {
            justify-content: flex-start;
            align-items: flex-start;
            gap: 10px;
            display: flex;
            color: white;
            font-size: 18px;
            font-weight: 700;
          }

          .user-btnGroup-btn1 {
            padding: 10px;
            background: #b9b9b9;
            border-radius: 5px;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            gap: 10px;
            display: flex;
          }
          .user-btnGroup-btn2 {
            padding: 10px;
            background: #18a1ff;
            border-radius: 5px;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            gap: 10px;
            display: flex;
          }

          /* ------------------ */
          .user-info-item {
            align-self: stretch;
            justify-content: space-between;
            align-items: center;
            display: flex;

            .user-info-item-titleText {
              display: flex;
              color: #124365;
              font-size: 16px;
              font-family: Noto Sans TC;
              font-weight: 700;
              word-wrap: break-word;
            }

            .user-info-item-checkBoxGroup {
              display: flex;
              height: 38px;
              max-width: 900px;
              padding: 3px 0px;
              align-items: center;
              gap: 10px;
              flex: 1 0 0;
              color: #000;
            }

            .user-info-item-Content {
              display: flex;
              height: 38px;
              max-width: 900px;
              padding: 3px 0px;
              align-items: center;
              gap: 10px;
              flex: 1 0 0;

              .user-info-item-contentText {
                flex: 1 1 0;
                color: black;
                font-size: 16px;
                font-family: Noto Sans TC;
                font-weight: 400;
                word-wrap: break-word;
              }
            }
          }

          .user-info-item-info {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            align-self: stretch;
          }

          .user-info-item-info-titleText {
            color: var(--primary-deep, #124365);
            font-family: 'Noto Sans TC';
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }

          .user-info-item-info2 {
            display: flex;
            max-width: 900px;
            align-items: center;
            gap: 10px;
            flex: 1 0 0;
          }

          .user-info-item-info-contentText {
            flex: 1 0 0;
            color: #000;
            text-align: justify;

            font-family: 'Noto Sans TC';
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }

          .user-orderList-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            align-self: stretch;
          }
        }

        /*------------- RWD  ----------- */
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
              margin-bottom: 20px;

              .user-info-item {
                display: block;
              }

              .user-info-item-info {
                display: block;
              }
            }
          }
          /*------------- RWD  ----------- */
        }
      `}</style>
    </>
  )
}
