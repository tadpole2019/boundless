import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { debounce } from 'lodash'
import { useAuth } from '@/hooks/user/use-auth'
import { useJam } from '@/hooks/use-jam'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/common/navbar'
import NavbarMb from '@/components/common/navbar-mb'
import Footer from '@/components/common/footer'
import MemberInfo from '@/components/jam/member-info'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { ImExit } from 'react-icons/im'
// scss
import styles from '@/pages/jam/jam.module.scss'

export default function Info() {
  const router = useRouter()
  const { setInvalidEdit } = useJam()
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
    // 阻擋非法訪問
    if (!LoginUserData.my_jam) {
      setInvalidEdit(false)
      router.push('/jam/recruit-list')
      return
    }
  }, [])
  //登出功能
  const mySwal = withReactContent(Swal)

  const [genre, setGenre] = useState([])
  const [player, setPlayer] = useState([])
  const [jam, setJam] = useState({
    id: 0,
    juid: '',
    title: '',
    degree: 0,
    created_time: '',
    genre: [],
    player: [],
    region: '',
    band_condition: '',
    description: '',
    former: {},
    member: [],
  })
  // ---------------------- 手機版本  ----------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }

  // ----------------------------- 讓player代碼對應樂器種類 -----------------------------
  const playerName = jam.player.map((p) => {
    const matchedPlayer = player.find((pd) => pd.id === p) // 物件
    return matchedPlayer.name
  })
  // 累加重複的樂器種類 吉他變成吉他*2
  const countPlayer = playerName.reduce((accumulator, count) => {
    if (!accumulator[count]) {
      accumulator[count] = 1
    } else {
      accumulator[count]++
    }
    return accumulator
  }, {})
  //   console.log(countPlayer)
  const playerResult = Object.entries(countPlayer).map(([player, count]) => {
    return count > 1 ? `${player}*${count}` : player
  })
  //   console.log(playerResult)

  // ----------------------------- 預計人數 -----------------------------
  const nowNumber = jam.member.length + 1
  const totalNumber = jam.member.length + jam.player.length + 1
  // ----------------------------- genre對應 -----------------------------
  const genreName = jam.genre.map((g) => {
    const matchedgenre = genre.find((gd) => gd.id === g)
    return matchedgenre.name
  })

  // ----------------------------- 創立時間資料中，單獨取出日期 -----------------------------
  // 調出的時間是ISO格式，顯示時需要轉換成本地時區
  const createdDate = new Date(jam.created_time)
    .toLocaleString()
    .split(' ')[0]
    .replace(/\//g, '-')
  // ----------------------------- 計算倒數時間 -----------------------------
  const [countDown, setCountDown] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  })

  let interval
  function calcTimeLeft() {
    let countDownObj = {}
    const now = Date.now()
    // 創立日期 + 30天 - 目前時間 = 剩餘時間
    const createdTime = new Date(jam.created_time).getTime()
    interval = createdTime + 30 * 24 * 60 * 60 * 1000 - now
    const cdDay = Math.floor(interval / (1000 * 60 * 60 * 24))
    const cdHour = Math.floor(
      (interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const cdMinute = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60))
    const cdSecond = Math.floor((interval % (1000 * 60)) / 1000)
    countDownObj = {
      day: cdDay,
      hour: cdHour,
      minute: cdMinute,
      second: cdSecond,
    }
    return countDownObj
  }

  // ----------------------------- 剩餘時間是否小於5天 -----------------------------
  const timeWarningState =
    (Date.now() - new Date(jam.created_time).getTime()) /
      (1000 * 60 * 60 * 24) >=
    25
      ? true
      : false

  // ----------------------------- 入團申請表單 -----------------------------
  // 表單完成狀態 0: 有欄位尚未填寫或不符規定, 1: 填寫完成, 2: 填寫中
  const [complete, setComplete] = useState(2)
  // ---------------------- 標題 ----------------------
  const [title, setTitle] = useState('')
  const [titleCheck, setTitleCheck] = useState(true)
  // ---------------------- 其他條件 ----------------------
  const [condition, setCondition] = useState('')
  const [conditionCheck, setConditionCheck] = useState(true)
  // ---------------------- 描述 ----------------------
  const [description, setDescription] = useState('')
  const [descriptionCheck, setDescriptionCheck] = useState(true)

  // ---------------------- 表單填寫 ----------------------
  // 檢查不雅字詞
  const checkBadWords = debounce(() => {
    const badWords = /幹|屎|尿|屁|糞|靠北|靠腰|雞掰|王八|你媽|妳媽|淫/g
    setTitleCheck(title.search(badWords) < 0 ? true : false)
    setConditionCheck(condition.search(badWords) < 0 ? true : false)
    setDescriptionCheck(description.search(badWords) < 0 ? true : false)
  }, 250)

  // 檢查表單是否填妥
  const checkComplete = () => {
    if (titleCheck === false || title === '') {
      setComplete(0)
      return false
    }
    if (conditionCheck === false) {
      setComplete(0)
      return false
    }
    if (descriptionCheck === false || description === '') {
      setComplete(0)
      return false
    }
    setComplete(1)
    return true
  }
  // 送出更改
  const sendForm = async (juid, title, condition, description) => {
    if (!checkComplete()) {
      return false
    }
    let formData = new FormData()
    formData.append('juid', juid)
    formData.append('title', title)
    formData.append('condition', condition)
    formData.append('description', description)
    const res = await fetch('http://localhost:3005/api/jam/updateForm', {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    })
    const result = await res.json()
    if (result.status === 'success') {
      notifySuccess(juid)
    } else {
      console.log(result.error)
    }
  }
  // 修改成功後，彈出訊息框，並返回資訊頁面
  const notifySuccess = (juid) => {
    mySwal
      .fire({
        position: 'center',
        icon: 'success',
        iconColor: '#1581cc',
        title: '修改成功，返回資訊頁',
        showConfirmButton: false,
        timer: 3000,
      })
      .then(
        setTimeout(() => {
          router.push(`/jam/recruit-list/${juid}`)
        }, 3000)
      )
  }

  // 向伺服器要求資料，設定到狀態中用的函式
  const getSingleData = async (juid) => {
    try {
      const res = await fetch(
        `http://localhost:3005/api/jam/singleJam/${juid}/${LoginUserData.uid}`
      )
      // res.json()是解析res的body的json格式資料，得到JS的資料格式
      const data = await res.json()
      if (data.status === 'success') {
        setPlayer(data.playerData)
        setGenre(data.genreData)
        setJam(data.jamData)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // ----------------------------- useEffect -----------------------------
  // 初次渲染後，向伺服器要求資料，設定到狀態中
  useEffect(() => {
    if (LoginUserData.my_jam) {
      getSingleData(LoginUserData.my_jam)
    }
  }, [LoginUserData.my_jam])

  // 確定讀取完jam資料後，把值設定到對應的狀態中
  useEffect(() => {
    setTitle(jam.title)
    setCondition(jam.band_condition)
    setDescription(jam.description)
    setCountDown(calcTimeLeft())
    // 每秒更新一次倒數計時
    const timer = setInterval(() => {
      setCountDown(calcTimeLeft())
    }, 1000)

    // 清除計時器
    return () => clearInterval(timer)
  }, [jam.created_time])

  // ---------------------- 偵測表單輸入變化，並執行檢查
  useEffect(() => {
    // 跳出未填寫完畢警告後再次輸入，消除警告
    setComplete(2)
    // 檢查不雅字詞
    checkBadWords.cancel() // 取消上一次的延遲
    checkBadWords()
  }, [title, condition, description])
  return (
    <>
      <Head>
        <title>修改表單</title>
      </Head>
      <Navbar menuMbToggle={menuMbToggle} />
      <div
        className="container position-relative"
        style={{ minHeight: '95svh' }}
      >
        {/* 手機版主選單/navbar */}
        <div
          className={`menu-mb d-sm-none d-flex flex-column align-items-center ${
            showMenu ? 'menu-mb-show' : ''
          }`}
        >
          <NavbarMb/>
        </div>
        <div className={`${styles.row} row`}>
          {/* 麵包屑 */}
          <div className="breadcrumb-wrapper-ns">
            <ul className="d-flex align-items-center p-0 m-0">
              <IoHome size={20} />
              <li style={{ marginLeft: '8px' }}>Let&apos;s JAM!</li>
              <FaChevronRight />
              <Link href="/jam/recruit-list">
                <li style={{ marginLeft: '10px' }}>團員募集</li>
              </Link>

              <FaChevronRight />
              <li style={{ marginLeft: '10px' }}>修改表單</li>
            </ul>
          </div>
          {/*   ---------------------- 主要內容  ---------------------- */}
          <div className={`${styles.jamMain} col-12 col-sm-8`}>
            <div className={`${styles.jamLeft}`}>
              {/*   ---------------------- 樂團資訊  ---------------------- */}
              <section className={`${styles.jamLeftSection}`}>
                <div
                  className={`${styles.jamTitle} d-flex justify-content-between align-items-center`}
                >
                  <div>修改表單</div>
                  <div className={`${styles.cardBadge} ${styles.degree}`}>
                    {jam.degree == '1' ? '新手練功' : '老手同樂'}
                  </div>
                </div>
                {/* -------------------------- 主旨 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <label className={`${styles.itemTitle} col-12 col-sm-2`} htmlFor='title'>
                    主旨
                  </label>
                  <div
                    className={`${styles.itemInputWrapper} col-12 col-sm-10 d-flex align-items-center`}
                  >
                    <input
                      type="text"
                      className={`${styles.itemInput} form-control`}
                      name='title'
                      id='title'
                      placeholder="發起動機或目的，上限20字"
                      maxLength={20}
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value)
                      }}
                    />
                    {titleCheck ? (
                      ''
                    ) : (
                      <div
                        className={`${styles.warningText} ms-2 d-none d-sm-block`}
                      >
                        偵測到不雅字詞
                      </div>
                    )}
                  </div>
                  {titleCheck ? (
                    ''
                  ) : (
                    <div
                      className={`${styles.warningText} d-block d-sm-none p-0`}
                    >
                      偵測到不雅字詞
                    </div>
                  )}
                </div>
                {/* -------------------------- 發起日期 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    發起日期
                  </div>
                  <div className={`${styles.infoText} col-12 col-sm-10`}>
                    {createdDate}
                  </div>
                </div>
                {/* -------------------------- 音樂風格 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    音樂風格
                  </div>
                  <div
                    className={`${styles.itemInputWrapper} col-12 col-sm-10`}
                  >
                    <div
                      className="d-flex flex-wrap"
                      style={{ gap: '8px', flex: '1 0 0' }}
                    >
                      {genreName.map((v, i) => {
                        return (
                          <div
                            key={i}
                            className={`${styles.cardBadge} ${styles.genere}`}
                          >
                            {v}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                {/* -------------------------- 徵求樂手 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    徵求樂手
                  </div>
                  <div
                    className={`${styles.itemInputWrapper} col-12 col-sm-10`}
                  >
                    <div
                      className="d-flex flex-wrap"
                      style={{ gap: '8px', flex: '1 0 0' }}
                    >
                      {playerResult.map((v, i) => {
                        return (
                          <div
                            key={i}
                            className={`${styles.cardBadge} ${styles.player}`}
                          >
                            {v}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                {/* -------------------------- 預計人數 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    預計人數
                  </div>
                  <div className={`${styles.infoText} col-12 col-sm-10`}>
                    <span style={{ color: '#1581cc' }}>{nowNumber}</span> /{' '}
                    {totalNumber} 人
                  </div>
                </div>
                {/* -------------------------- 地區 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    地區
                  </div>
                  <div className={`${styles.infoText} col-12 col-sm-10`}>
                    {jam.region}
                  </div>
                </div>
                {/* -------------------------- 其他條件 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <label className={`${styles.itemTitle} col-12 col-sm-2`} htmlFor='condition'>
                    其他條件(選填)
                  </label>
                  <div
                    className={`${styles.itemInputWrapper} col-12 col-sm-10`}
                  >
                    <input
                      type="text"
                      className={`form-control`}
                      name='condition'
                      id='condition'
                      placeholder="事先說好要求，有助於玩團和樂哦～上限30字"
                      maxLength={30}
                      value={condition}
                      onChange={(e) => {
                        setCondition(e.target.value)
                      }}
                    />
                    {conditionCheck ? (
                      ''
                    ) : (
                      <div
                        className={`${styles.warningText} mt-1 d-none d-sm-block`}
                      >
                        偵測到不雅字詞
                      </div>
                    )}
                  </div>
                  {conditionCheck ? (
                    ''
                  ) : (
                    <div
                      className={`${styles.warningText} d-block d-sm-none p-0`}
                    >
                      偵測到不雅字詞
                    </div>
                  )}
                </div>
                {/* -------------------------- 描述 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <label className={`${styles.itemTitle} col-12 col-sm-2`} htmlFor='description'>
                    描述
                  </label>
                  <div
                    className={`${styles.itemInputWrapper} col-12 col-sm-10`}
                  >
                    <textarea
                      className={`${styles.textArea} form-control`}
                      placeholder="輸入清楚、吸引人的描述，讓大家瞭解你的成團動機吧！上限150字"
                      name="description"
                      id='description'
                      maxLength={150}
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value)
                      }}
                    />
                    {descriptionCheck ? (
                      ''
                    ) : (
                      <div
                        className={`${styles.warningText} mt-1 d-none d-sm-block`}
                      >
                        偵測到不雅字詞
                      </div>
                    )}
                  </div>
                  {descriptionCheck ? (
                    ''
                  ) : (
                    <div
                      className={`${styles.warningText} d-block d-sm-none p-0`}
                    >
                      偵測到不雅字詞
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-center gap-5">
                  <Link
                    className="b-btn b-btn-body"
                    style={{ paddingInline: '38px' }}
                    href={`/jam/recruit-list/${jam.juid}`}
                  >
                    取消
                  </Link>
                  <div
                    className="b-btn b-btn-primary"
                    style={{ paddingInline: '38px' }}
                    role="presentation"
                    onClick={() => {
                      sendForm(
                        LoginUserData.my_jam,
                        title,
                        condition,
                        description
                      )
                    }}
                  >
                    送出
                  </div>
                </div>
                {complete === 0 ? (
                  <div
                    className="d-flex justify-content-center"
                    style={{ marginTop: '-8px' }}
                  >
                    <div className={`${styles.warningText}`}>
                      請遵照規則，並填寫所有必填內容
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </section>
            </div>
          </div>

          {/*   ---------------------- 成員名單  ---------------------- */}
          <div className={`${styles.jamRightWrapper} col-12 col-sm-4`}>
            <div className={`${styles.jamRight}`}>
              <div className={`${styles.jamTitle}`}>期限倒數</div>
              <div
                style={{
                  color: timeWarningState ? '#ec3f3f' : '#1d1d1d',
                  fontSize: '20px',
                }}
              >
                {interval <= 0
                  ? '發起失敗'
                  : `${countDown.day} 天 ${countDown.hour} 小時 ${countDown.minute} 分 ${countDown.second} 秒`}
              </div>
              <div
                className={`${styles.jamTitle}`}
                style={{ marginBlock: '10px' }}
              >
                成員名單
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className={`${styles.itemTitle} me-3`}>發起人</div>
                <MemberInfo
                  uid={jam.former.uid}
                  name={jam.former.name}
                  nickname={jam.former.nickname}
                  img={jam.former.img}
                  play={jam.former.play}
                />
              </div>
              <div className="d-flex">
                <div className={`${styles.itemTitle} me-3`}>參加者</div>
                <div className="d-flex flex-column gap-2">
                  {jam.member[0] ? (
                    jam.member.map((v) => {
                      return (
                        <MemberInfo
                          key={v.uid}
                          uid={v.uid}
                          name={v.name}
                          nickname={v.nickname}
                          img={v.img}
                          play={v.play}
                        />
                      )
                    })
                  ) : (
                    <span className="fw-medium">尚無人參加</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
