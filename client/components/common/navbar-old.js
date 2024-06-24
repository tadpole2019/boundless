import React, { useState } from 'react'
import { IoCart, IoMenu } from 'react-icons/io5'
import Image from 'next/image'
import logo from '@/assets/logo.svg'
import logoMb from '@/assets/logo_mb.svg'
import Link from 'next/link'

export default function Navbar({ menuMbToggle }) {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <>
      <header className="w-100 d-flex justify-content-between align-items-center">
        <Link href="#" className="d-none d-lg-block ">
          <Image src={logo} alt="logo" className="logo" />
        </Link>
        <Link href="" className="d-lg-none">
          <Image src={logoMb} alt="logo-mobile" className=" logo-mb" />
        </Link>

        <nav className="navbar-wrapper">
          <ul className="navbar d-none d-lg-flex justify-content-between flex-row">
            <li>
              <Link href="/lesson">探索課程</Link>
            </li>
            <li>
              <Link href="/instrument">樂器商城</Link>
            </li>
            <li>
              <Link href="/jam/recruit-list">Let&apos;s JAM!</Link>
            </li>
            <li>
              <Link href="/article/article-list">樂友論壇</Link>
            </li>
            <li className="ms-3">
              <Link href="/cart">
                <IoCart size={30} className="cart-icon" />
              </Link>
            </li>
            <li className="login-state d-flex justify-content-center">
              <Link className="" href="/login">
                登入/註冊
              </Link>
              {/* 用戶頭像 */}
              <div className="user-img d-none">
                <Image
                  src="/jam/amazingshow.jpg"
                  alt="user-photo"
                  fill={true}
                />
              </div>
            </li>
          </ul>
          {/* 手機版 navbar */}
          <div className="navbar-mb d-lg-none d-flex justify-content-end align-items-center">
            <Link href="/cart" className="p-0 me-3">
              <IoCart size={30} />
            </Link>
            <IoMenu size={30} className="ms-3" onClick={menuMbToggle} />
          </div>
        </nav>
      </header>
    </>
  )
}
