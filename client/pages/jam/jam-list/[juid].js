import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/user/use-auth'
import { useJam } from '@/hooks/use-jam'
import Navbar from '@/components/common/navbar'
import NavbarMb from '@/components/common/navbar-mb'
import Footer from '@/components/common/footer'
import MemberInfo from '@/components/jam/member-info'
import logoMb from '@/assets/logo_mb.svg'
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
  const { setInvalidJam } = useJam()
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
  }, [])
  //登出功能
  const mySwal = withReactContent(Swal)

  const [genre, setGenre] = useState([])
  const [jam, setJam] = useState({
    id: 0,
    juid: '',
    name: '',
    formed_time: '',
    genre: [],
    region: '',
    introduce: '',
    cover_img: '',
    works_link: '',
    former: {},
    member: [],
  })
  // ---------------------- 手機版本  ----------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }
  // ----------------------------- genre對應 -----------------------------
  const genreName = jam.genre.map((g) => {
    const matchedgenre = genre.find((gd) => gd.id === g)
    return matchedgenre.name
  })
  // ----------------------------- 創立時間資料中，單獨取出日期 -----------------------------
  // 調出的時間是ISO格式，顯示時需要轉換成本地時區
  const formedDate = new Date(jam.formed_time)
    .toLocaleString()
    .split(' ')[0]
    .replace(/\//g, '-')

  // ----------------------------------------------- 退出樂團 ----------------------------------------------------
  const sendQuit = async () => {
    // 獲得該使用者在樂團的職位，用於復原招募樂手
    const quitMemberPlay = jam.member.find((v) => {
      return (v.id == LoginUserData.id)
    }).play

    let formData = new FormData()
    formData.append('id', LoginUserData.id)
    formData.append('juid', jam.juid)
    formData.append('playname', quitMemberPlay)
    const res = await fetch('http://localhost:3005/api/jam/quit', {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    })
    const result = await res.json()
    if (result.status === 'success') {
      return true
    } else {
      return false
    }
  }

  // 退出警示&成功訊息
  const warningQuit = () => {
    mySwal
      .fire({
        title: '確定退出樂團？',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ec3f3f',
        cancelButtonColor: '#666666',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await sendQuit()
          if (res) {
            mySwal.fire({
              title: '已退出，即將回到招募列表',
              icon: 'success',
              iconColor: '#1581cc',
              showConfirmButton: false,
              timer: 2500,
            })
            setTimeout(() => {
              router.push('/jam/recruit-list')
            }, 2500)
          }
        }
      })
  }

  // ----------------------------------------------- 解散樂團 ----------------------------------------------------
  const sendDisband = async () => {
    // 組合出所有樂團內的成員uid
    let ids = []
    ids.push(jam.former.uid)
    for (let i = 0; i < jam.member.length; i++) {
      ids.push(jam.member[i].uid)
    }
    let formData = new FormData()
    formData.append('ids', JSON.stringify(ids))
    formData.append('juid', jam.juid)
    const res = await fetch('http://localhost:3005/api/jam/disband', {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    })
    const result = await res.json()
    if (result.status === 'success') {
      return true
    } else {
      return false
    }
  }

  // 解散警示&成功訊息
  const warningDisband = () => {
    mySwal
      .fire({
        title: '即將解散樂團',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ec3f3f',
        cancelButtonColor: '#666666',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await sendDisband()
          if (res) {
            mySwal.fire({
              title: '樂團已解散，重新導向至招募列表',
              icon: 'success',
              iconColor: '#1581cc',
              showConfirmButton: false,
              timer: 2500,
            })
            setTimeout(() => {
              router.push('/jam/recruit-list')
            }, 2500)
          }
        }
      })
  }

  // ----------------------------------------------- 獲得頁面資料 ----------------------------------------------------
  const getSingleData = async (juid) => {
    try {
      const res = await fetch(
        // 加入uid是為了檢查該使用者是否有申請此樂團，以及其申請狀態
        `http://localhost:3005/api/jam/singleFormedJam/${juid}`
      )
      // res.json()是解析res的body的json格式資料，得到JS的資料格式
      const data = await res.json()
      if (data.status === 'success') {
        setGenre(data.genreData)
        setJam(data.jamData)
      } else if (data.status === 'error') {
        setInvalidJam(false)
        router.push(`/jam/jam-list`)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // ----------------------------- useEffect -----------------------------
  // 初次渲染後，向伺服器要求資料，設定到狀態中
  useEffect(() => {
    if (router.isReady) {
      const { juid } = router.query
      getSingleData(juid)
    }
  }, [router.isReady, LoginUserData.uid])

  return (
    <>
      <Head>
        <title>JAM資訊</title>
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
              <Link href="/jam/jam-list">
                <li style={{ marginLeft: '10px' }}>活動中的JAM</li>
              </Link>

              <FaChevronRight />
              <li style={{ marginLeft: '10px' }}>JAM資訊</li>
            </ul>
          </div>
          {/*   ---------------------- 主要內容  ---------------------- */}
          <div className={`${styles.jamMain} col-12 col-sm-8`}>
            <div className={`${styles.jamLeft}`}>
              {/*   ---------------------- 樂團資訊  ---------------------- */}
              <section className={`${styles.jamLeftSection}`}>
                <div
                  className={`${styles.jamTitle} d-flex justify-content-start align-items-center`}
                >
                  <div>JAM資訊</div>
                </div>
                {/* -------------------------- 封面圖 -------------------------- */}
                <div className={`${styles.coverWrapper}`}>
                  {jam.cover_img ? (
                    <Image
                      src={`http://localhost:3005/jam/${jam.cover_img}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      alt={jam.cover_img}
                    />
                  ) : (
                    <div className={`${styles.noCoverBackground}`}>
                      <Image src={logoMb} alt="logo-mobile" />
                    </div>
                  )}
                </div>
                {/* -------------------------- 團名 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    團名
                  </div>
                  <div className={`${styles.infoText} col-12 col-sm-10`}>
                    {jam.name}
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
                {/* -------------------------- 地區 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    地區
                  </div>
                  <div className={`${styles.infoText} col-12 col-sm-10`}>
                    {jam.region}
                  </div>
                </div>
                {/* -------------------------- 成立日期 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    成立日期
                  </div>
                  <div className={`${styles.infoText} col-12 col-sm-10`}>
                    {formedDate}
                  </div>
                </div>
                {/* -------------------------- 樂團介紹 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    樂團介紹
                  </div>
                  <div
                    className={`${styles.infoText} col-12 col-sm-10`}
                    style={{ textAlign: 'justify' }}
                  >
                    {jam.introduce ? jam.introduce : '暫無介紹'}
                  </div>
                </div>
              </section>
              <hr style={{ margin: '6px' }} />
              <section className={`${styles.jamLeftSection}`}>
                <div className={`${styles.jamTitle}`}>展示牆</div>
                {jam.works_link ? (
                  <div className={`${styles.videoWrapper}`}>
                    <iframe
                      src={`https://www.youtube.com/embed/${jam.works_link}`}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                      style={{ width: '100%', height: '100%' }}
                    ></iframe>
                  </div>
                ) : (
                  ''
                )}
                {/* 使用者是否屬於此樂團 */}
                {LoginUserData.my_jam === jam.juid ? (
                  <>
                    {/* 是否是發起人 */}
                    {LoginUserData.id === jam.former.id ? (
                      <div className="d-flex justify-content-center gap-5">
                        <div
                          className="b-btn b-btn-danger px-4"
                          role="presentation"
                          onClick={() => {
                            warningDisband()
                          }}
                        >
                          解散樂團
                        </div>
                        <div className="d-flex justify-content-center">
                          <Link
                            className="b-btn b-btn-primary px-4"
                            href="/jam/jam-list/edit"
                          >
                            編輯資訊
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center">
                        <div
                          className="b-btn b-btn-danger"
                          style={{ paddingInline: '38px' }}
                          role="presentation"
                          onClick={() => {
                            warningQuit()
                          }}
                        >
                          退出
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  ''
                )}
              </section>
            </div>
          </div>

          {/*   ---------------------- 成員名單  ---------------------- */}
          <div className={`${styles.jamRightWrapper} col-12 col-sm-4`}>
            <div className={`${styles.jamRight}`}>
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
                <div className={`${styles.itemTitle} me-3 mt-1`}>參加者</div>
                <div className="d-flex flex-column gap-2">
                  {jam.member.map((v) => {
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
                  })}
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
