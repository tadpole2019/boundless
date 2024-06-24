import { useEffect, useState } from 'react'
import Navbar from '@/components/common/navbar'
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
import { FaHeart } from 'react-icons/fa'

import CardIns from '@/components/instrument/card'
import ProductCardIns from '@/components/instrument/instrument-productbrief-card'

//試抓資料區
import Lesson from '@/data/Lesson.json'

export default function Test() {
  // -------試抓資料區----------
  console.log(Lesson)

  // ----------------------手機版本  ----------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }

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

  //收藏按鍵的功能
  //會有兩個狀態 連結會員資料 已經按過讚的收回;沒按過的按讚
  const [colorChange, setcolorChange] = useState(false)
  const colorToggle = () => {
    //按按鍵切換狀態
    setcolorChange(!colorChange)
  }

  return (
    <>
      <Navbar menuMbToggle={menuMbToggle} />
      <div className="container position-relative">
        {/* 手機版主選單/navbar */}
        <div
          className={`menu-mb d-sm-none d-flex flex-column align-items-center ${
            showMenu ? 'menu-mb-show' : ''
          }`}
        >
          {/* 用戶資訊 */}
          <div className="menu-mb-user-info d-flex align-items-center flex-column mb-3">
            <div className="mb-photo-wrapper mb-2">
              <Image
                src="/jam/amazingshow.jpg"
                alt="user photo mb"
                fill
              ></Image>
            </div>
            <div>用戶名稱</div>
          </div>
          <Link
            className="mm-item"
            href="/user"
            style={{ borderTop: '1px solid #b9b9b9' }}
          >
            會員中心
          </Link>
          <Link className="mm-item" href="/lesson/lesson-list">
            探索課程
          </Link>
          <Link className="mm-item" href="/instrument/instrument-list">
            樂器商城
          </Link>
          <Link className="mm-item" href="/jam/recruit-list">
            Let &apos;s JAM!
          </Link>
          <Link className="mm-item" href="/article/article-list">
            樂友論壇
          </Link>
          <div className="mm-item" style={{ color: '#1581cc' }}>
            登出
            <ImExit size={20} className="ms-2" />
          </div>
        </div>
        {/* 麵包屑 */}
        <div
          className="breadcrumb-wrapper"
          style={{ paddingBlock: '20px 30px' }}
        >
          <ul className="d-flex align-items-center p-0 m-0">
            <IoHome size={20} />
            <li style={{ marginLeft: '8px' }}>Let&apos;s JAM!</li>
            <FaChevronRight />
            <Link href="/jam/recruit-list">
              <li style={{ marginLeft: '10px' }}>團員募集</li>
            </Link>

            <FaChevronRight />
            <li style={{ marginLeft: '10px' }}>JAM 資訊</li>
          </ul>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6">
            {/* 主內容 */}
            <main className="content">
              <div className="Left">
                {/* prodBriefingArea */}
                <div className="prodBriefingArea-ins d-flex ">
                  <div className="pic-Con ">
                    <div className="main-Pic border border-secondary">
                      <img
                        src="/instrument/Orange_PPC108/PPC108_1.png"
                        className="main-Pic"
                      ></img>
                    </div>
                    <div className="sub-Pic-Con ">
                      <div className="sub-Pic border border-secondary">
                        <img
                          src="/instrument/Orange_PPC108/PPC108_1.png"
                          className="sub-Pic"
                        ></img>
                      </div>
                      <div className="sub-Pic border border-secondary">
                        <img
                          src="/instrument/Orange_PPC108/PPC108_2.png"
                          className="sub-Pic"
                        ></img>
                      </div>
                      <div className="sub-Pic border border-secondary">
                        <img
                          src="/instrument/Orange_PPC108/PPC108_3.png"
                          className="sub-Pic"
                        ></img>
                      </div>
                      <div className="sub-Pic border border-secondary">
                        <img
                          src="/instrument/Orange_PPC108/PPC108_1.png"
                          className="sub-Pic"
                        ></img>
                      </div>
                    </div>
                  </div>

                  {/* 手機版productbrief-card放這 */}
                  <div className="Right-mobile">
                    <div className="prodBriefing  ">
                      <div className="prodMainName">Orange Micro Terror</div>
                      <div className="Rating">
                        <div className="star">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/84522f0e347edba7963eb335fd5301feca031f8d880bba21dd9760a01286c3a5?"
                            className="starImg"
                          />
                          <div className="ratingNumber">4.9</div>
                          <div className="commentNumber">(10)</div>
                        </div>
                        <div className="sales">已售出 10</div>
                      </div>
                      <div className="productPrice">
                        <div className="price">NT$ 22,680</div>
                        <div className="likesIcon icon-container ">
                          <FaHeart
                            className="likesIcon"
                            size="32px"
                            style={{ color: `${colorChange ? 'red' : ''}` }}
                            onClick={colorToggle}
                          />
                        </div>
                        {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ed2e715f1421a33de89ac321d6dcc6d56fbac40a7d43dfe2cf0ecb15054bd3f?"
                        className="likesIcon"
                        style={{ color: `${colorChange ? 'red' : ''}` }}
                        onClick={colorToggle}
                      /> */}
                      </div>

                      <div className="Intro">
                        小巧的放大器，巨大的音色。
                        <br />
                        <br /> Micro Terror是一種全球現象。從最初的 Tiny Terror
                        中汲取靈感，這個微型怪物將一個閥門前置放大器連接到一個固態輸出部分，以獲得巨大的音調，使其小型框架成為一種嘲弄。
                        <br />
                        <br />
                        Micro Terror 重量不到 1
                        公斤，可以說是市場上最便攜的放大器頭。與配套的 PPC108
                        機櫃搭配使用時，Micro Terror 的 Aux
                        輸入和耳機輸出使其成為完美的練習夥伴，即使是最雜亂的餐具櫃也足夠小。
                        然而，不要被它的微型足跡所迷惑，因為尺寸是這款放大器唯一的小問題。Micro
                        Terror 採用高強度鋼外殼，按照與 Terror
                        系列其他產品相同的高標準製造，配備單個 ECC83 (12AX7)
                        前置放大器閥，並與固態功率放大器耦合。這個小東西發出的聲音深度（和音量）確實令人震驚，橙色的咆哮和咬合聲很豐富。更重要的是，Micro
                        Terror 可以與任何 8-16 歐姆音箱一起使用。
                      </div>
                      <div className="shoppingBtn" id="shoppingBtn">
                        <div className="cartBtn">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c240e4bc8653fe6179383ea22f1eb80902c70eec255a944e9d8e0efbf823c4e3?"
                            className="cartIcon"
                                                  />
                                                  //FIXME
                          <div className="cart">加入購物車</div>
                        </div>
                        <div className="buyBtn">
                          <div className="buy">立即購買</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*商品細節 */}
                  <div className="detail">
                    {/* 規格 */}
                    <div className="outline detail-wrapp  mt40">
                      <div className="detail-title">規格</div>
                      <div className="list">
                        <ul>
                          <li>輸出功率：20W</li>
                          <li>單體輸出孔：8 ~ 16ohm</li>
                          <li>真空管：PREAMP: 1 X 12AX7/ECC83</li>
                          <li>尺寸：400mm x 210mm x 180mm</li>
                          <li>重量：0.85kg</li>
                        </ul>
                      </div>
                    </div>

                    {/* 買家評論 */}
                    <div className="reviews mt40">
                      <div className="detail-title">買家評論</div>
                      <div className="list">
                        <div className="review">
                          <div className="review-area">
                            <div className="review-title">
                              <img
                                loading="lazy"
                                srcSet="..."
                                className="review-avatar"
                              />
                              <div className="review-user">
                                <div className="review-Name">
                                  <div className="user-Name">John Mayer</div>
                                  <div className="review-Date">2024-01-25</div>
                                </div>
                                <div className="review-Star">
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                    className="img-13"
                                  />
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                    className="img-13"
                                  />
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                    className="img-13"
                                  />
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                    className="img-13"
                                  />
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                    className="img-13"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="review-content">
                              初次見到這套軟體 全是英文 完全不知從何下手
                              去Youtube上查了很多教學影片 也去網路上搜了各種資料
                              還是不知道該從何著手。不過還好有在Youtu上看到這門課的宣傳影片
                              就進到Ｈahow這網站裡買下了第一堂課
                              原本只是想了解Logic的基本操作
                              沒想到竟然連簡單的編曲技術也學會了（目前剛上完第三章）受益良多！！
                              非常期待上完這堂課以後能做出什麼樣作品
                              我會繼續力學習的！！非常感謝老師開這堂課！！
                            </div>
                            <div className="comment-Like">
                              <div className="comment-Like-Number">
                                1人覺得有幫助
                              </div>
                              <div className="comment-Like-Icon">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b33573d1006caa2dd045129e591ff98dd975245bb9b1f9ad55c74a65c6a47d58?"
                                  className="comment-like-icon-img"
                                />
                                <div className="comment-Like-Word">有幫助</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="review">
                          <div className="review-area">
                            <div className="review-title">
                              <img
                                loading="lazy"
                                srcSet="..."
                                className="review-avatar"
                              />
                              <div className="review-user">
                                <div className="review-Name">
                                  <div className="user-Name">John Mayer</div>
                                  <div className="review-Date">2024-01-25</div>
                                </div>
                                <div className="review-Star">
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                    className="img-13"
                                  />
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                    className="img-13"
                                  />
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                    className="img-13"
                                  />
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                    className="img-13"
                                  />
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                    className="img-13"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="review-content">
                              初次見到這套軟體 全是英文 完全不知從何下手
                              去Youtube上查了很多教學影片 也去網路上搜了各種資料
                              還是不知道該從何著手。不過還好有在Youtu上看到這門課的宣傳影片
                              就進到Ｈahow這網站裡買下了第一堂課
                              原本只是想了解Logic的基本操作
                              沒想到竟然連簡單的編曲技術也學會了（目前剛上完第三章）受益良多！！
                              非常期待上完這堂課以後能做出什麼樣作品
                              我會繼續力學習的！！非常感謝老師開這堂課！！
                            </div>
                            <div className="comment-Like">
                              <div className="comment-Like-Number">
                                1人覺得有幫助
                              </div>
                              <div className="comment-Like-Icon">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b33573d1006caa2dd045129e591ff98dd975245bb9b1f9ad55c74a65c6a47d58?"
                                  className="comment-like-icon-img"
                                />
                                <div className="comment-Like-Word">有幫助</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="review">
                          <div className="review-area">
                            <div className="review-title">
                              <img
                                loading="lazy"
                                srcSet="..."
                                className="review-avatar"
                              />
                              <div className="review-user">
                                <div className="review-Name">
                                  <div className="user-Name">John Mayer</div>
                                  <div className="review-Date">2024-01-25</div>
                                </div>
                                <div className="review-Star">
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                    className="img-13"
                                  />
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                    className="img-13"
                                  />
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                    className="img-13"
                                  />
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                    className="img-13"
                                  />
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                    className="img-13"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="review-content">
                              初次見到這套軟體 全是英文 完全不知從何下手
                              去Youtube上查了很多教學影片 也去網路上搜了各種資料
                              還是不知道該從何著手。不過還好有在Youtu上看到這門課的宣傳影片
                              就進到Ｈahow這網站裡買下了第一堂課
                              原本只是想了解Logic的基本操作
                              沒想到竟然連簡單的編曲技術也學會了（目前剛上完第三章）受益良多！！
                              非常期待上完這堂課以後能做出什麼樣作品
                              我會繼續力學習的！！非常感謝老師開這堂課！！
                            </div>
                            <div className="comment-Like">
                              <div className="comment-Like-Number">
                                1人覺得有幫助
                              </div>
                              <div className="comment-Like-Icon">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b33573d1006caa2dd045129e591ff98dd975245bb9b1f9ad55c74a65c6a47d58?"
                                  className="comment-like-icon-img"
                                />
                                <div className="comment-Like-Word">有幫助</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="more-review">
                          <div className="more-review-word">更多回饋</div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0121670ff626339b824728641b333ff15c591ace8f84c9c919e13179e8adc237?"
                            className="img-33"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/*   ----------------------頁面內容 右半部---------------------- */}
          <div className="d-none d-sm-block col-sm-6 page-control">
            <ProductCardIns className="Right-card" />
          </div>
        </div>
        {/* 猜你喜歡 */}
        <div className="you-will-like">
          <div className="detail-title ">猜你喜歡...</div>
          <div className="card-con">
            <CardIns />
            <CardIns />
            <CardIns />
            <CardIns />
            <CardIns />
          </div>
        </div>
        <div className="you-will-like-mobile">
          <div className="detail-title ">猜你喜歡...</div>
          {/* 手機版card-con */}
          <div className="card-con-mobile row d-flex gy-4">
            <div className="col-6">
              <CardIns />
            </div>
            <div className="col-6">
              <CardIns />
            </div>
            <div className="col-6">
              <CardIns />
            </div>
            <div className="col-6">
              <CardIns />
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        * {
          box-sizing: -box;
        }
        :root {
          --primary: #1581cc;
          --light-primary: #18a1ff;
          --deep-primary: #124365;
          --dark: #1d1d1d;
          --secondary: #5a5a5a;
          --body: #b9b9b9;
          --yellow: #faad14;
          --red: #ec3f3f;
        }

        body {
          font-family: 'Noto Sans TC', sans-serif;

          & ul {
            list-style: none;
            margin: 0;
          }

          & a {
            text-decoration: none;
          }
        }

        /* --------------- header & navbar --------------- */
        header {
          background-color: var(--primary);
          height: 60px;
          padding: 10px 35px;
          .logo {
            max-width: 180px;
          }
          .logo-mb {
            max-width: 30px;
          }

          @media screen and (max-width: 576px) {
            padding-inline: 20px;
          }
        }

        nav {
          flex: 1;
          max-width: 660px;
        }

        nav a {
          display: block;
          padding: 5px 12px;
          -radius: 10px;
          color: #fff;
          font-size: 20px;
          font-weight: 500;
          &:hover {
            color: var(--deep-primary);
            background-color: #fff;
          }
        }

        .navbar-mb {
          color: #fff;
        }

        /* --------------- container --------------- */
        .container {
          min-height: calc(100vh);
        }
        .breadcrumb-wrapper {
            cursor: pointer;
            transition: 0.3s;
            &:hover {
              color: #1581cc;
            }
        }

        /* prodBriefingArea */
        .prodBriefingArea-ins{
             width: 100%;
            padding:0px;
          
            overflow: hidden; 
            flex-direction:column;
          justify-content:center;
        }
     
     .pic-Con{
        display:flex;
    height: 100%;
     flex-direction:column;
          justify-content:center;
          align-items:center;
     }
     .main-Pic{
height:550px;
width:550px;
border-radius: 10px;
border: 1px solid var(--body, #B9B9B9);

     }
     .sub-Pic-Con{
        display:flex;
        justify-content:space-between;
height:130px;
width:550px;
{/* margin-top:5px; */}
padding-top:20px;

     }
     .sub-Pic{
height:130px;
width:130px;
border-radius: 10px;
border: 1px solid var(--body, #B9B9B9);
&:hover{
border-radius: 10px;
border: 5px solid var(--primary-light, #18A1FF);
}
     }
        .mt-60 {
          margin-top: 60px;
        }

        /* ------------------ */

        /* 課程細節 */
        .mt40 {
          margin-top: 40px;
        }

        /* detail共用 */
        .detail{
            max-width:100%;
        }
        .detail-title {
          color: var(--primary-deep, #0d3652);
          font: 700 24px Noto Sans TC, sans-serif;
        }

        .list {
          background-color: rgba(185, 185, 185, 0.3);
          padding:8px 12px;
        }

        .outline {
          {/* height: 243px;
          width: 660px; */}
        }

        .outline ul{
list-style-type: disc; 
        }

        .suitable {
          {/* height: 130px;
          width: 660px; */}
        }
        .achievement {
          {/* height: 107px;
          width: 660px; */}
        }
        .review-title {
          display: flex;
        }
        .review-avatar {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 44px;
          : 1px solid black;
          -radius: 50%;
        }
        .review-Name {
          display: flex;
          gap: 10px;
        }
        .comment-Like {
          display: flex;
          justify-content: end;
          gap: 5px;
        }
        .comment-Like-Icon {
          display: flex;
          border-radius: 3px;
          border: 1px solid #1581cc;
          gap: 4px;
        }
        .more-review {
          justify-content: end;
          display: flex;
          margin-right: 20px;
          margin-block: 10px;
          gap: 9px;
          font-size: 16px;
          color: var(--primary, #1581cc);
          font-weight: 700;
          padding: 4px 0 4px 80px;
        }
        .teacher-info {
          {/* height: 217px;
          width: 660px; */}
        }
        .teacher-info-area {
          display: flex;
          {/* height: 166px;
          width: 660px; */}
        }
        .teacher-img-con {
          width: 140px;
          height: 140px;
        }
        .teacherImg {
          width: 100%;
          height: auto;
          object-fit: cover;
          overflow: auto;
        }
        .teacher-info-word {
          width: 77%;
        }

.page-control{
    
            
}
    

        /* ------------- */

        .you-will-like {
          {/* height: 508px; */}
          width: 100%;
          margin-top: 30px;
        }
        .card-con{
            padding:0;
            display:flex;
            justify-content:space-between;
            
        }
        .card-con-mobile{
            display:block;
//TODO
        }
        .Right-mobile{
            display:none;
        }
        .you-will-like-mobile{
            display:none;
        }
        /* --------------- footer --------------- */


        {/* -----------RWD-------------*/}
        @media screen and (max-width:576px) {

 .main-Pic{
    height: 390px;
max-width: 390px;
 }
   .sub-Pic-Con{
        display:flex;
        justify-content:space-between;
width:100%;
{/* margin-top:5px; */}
padding-top:20px;

     }
 .sub-Pic {
    width: 90px;
height: 90px;
 }
  .Right{
    display:none;
  }
  {/* 手機版productbrief-card */}
                        .prodBriefingArea{
    width:100%;
    height:204px;
}
                        .prodImg {
            padding:0px;
         
          background-color: #ff9595;
          border-radius: 10px;
          height:204px;
          
        }
                        .Right-mobile{
display:block;
  }
                        .prodBriefing {
                        /* background-color: #ff9595; */
                        {/* margin-left: 110px; */}
                        margin-top: 20px;
                      }
                      .prodMainName {
                        color: var(--dark, #1d1d1d);
                        /* font: 700 40px Noto Sans TC, sans-serif; */
                        font-weight: 700;
                        font-size: 40px;
                      }
                      /*  */
                      .font-family {
                        font-family: Noto Sans TC, sans-serif;
                      }
                      /*  */

                      .Rating {
                        justify-content: space-between;
                        display: flex;
                        margin-top: 10px;
                        width: 100%;
                        gap: 20px;
                        font-weight: 400;
                      }

                      .star {
                        justify-content: center;
                        align-items: center;
                        display: flex;
                        gap: 10px;
                        white-space: nowrap;
                      }

                      .ratingNumber {
                        color: var(--yellow, #faad14);
                        align-self: stretch;
                        font: 24px Noto Sans TC, sans-serif;
                      }

                      .commentNumber {
                        color: var(--body, #b9b9b9);
                        align-self: stretch;
                        flex-grow: 1;
                        margin: auto 0;
                        font: 16px Noto Sans TC, sans-serif;
                      }
                      .sales {
                        color: var(--secondary, #5a5a5a);
                        margin: auto 0;
                        font: 16px Noto Sans TC, sans-serif;
                      }
                      .productPrice {
                        justify-content: space-between;
                        align-items:center;
                        display: flex;
                        margin-top: 10px;
                        gap: 20px;
                      }
                      .price {
                        color: var(--dark, #1d1d1d);
                        white-space: nowrap;
                        padding: 9px 21px 2px 0;
                        font: 700 28px Noto Sans TC, sans-serif;
                      }
                      .likesIcon {
                        justify-content: center;
                        align-items: center;
                        border-radius: 5px;
                        border: 1px solid var(--body, #b9b9b9);
                        display: flex;
                        aspect-ratio: 1;
                        width: 34px;
                        height: 34px;
                        margin: auto 0;
                        padding: 0 7px;
                      }
                      .likesIcon :hover {
                        background-color: #ffc0cb;
                      }

                      .container{
                        padding-bottom: 95px;
                      }
                      .shoppingBtn {
                        display: flex;
                        {/* margin-top: 20px; */}
                        justify-content: space-evenly;
                        gap: 12px;
                        font-size: 16px;
                        color: var(--white, #fff);
                        font-weight: 700;
                         position: fixed;
                         bottom: 0;
                        left: 0;
                        width: 100%;
                        background-color:white;
                        margin-top:870px;
                        margin-bottom:45px;
                        z-index:1200;
                      }

                      .cartBtn {
                        display: flex;
                        {/* justify-content: space-between; */}
                        border-radius: 5px;
                        background-color: var(--body, #b9b9b9);
                        gap: 12px;
                        padding: 8px 78px;
                        flex: 1 0 0;
                      }
                   .cart{
                    line-height: normal;
                   }
                      .buyBtn {
                        justify-content: space-between;
                        border-radius: 5px;
                        background-color: #18a1ff;
                        gap: 12px;
                        padding: 8px 78px;
                        flex: 1 0 0;
                      }
                   
                      {/* ---------- */}

                      {/* detail-mobile */}
                      .detail{
max-width:100%;
                      }
                        //FIXME
                      .review-content{
                        max-width:100%;
                       word-wrap: break-word;
  overflow-wrap: break-word;

  
                      }
                      .you-will-like{
                       display:none;
}
//FIXME
.you-will-like-mobile{
    display:block;
}
.card-con-mobile{
    display:block;
     {/* flex: 0 0 90%;  */}
}
.you-will-like-mobile-card{
 flex: 0 0 30%; 
}
                   
                   
}
    
      `}</style>
    </>
  )
}
