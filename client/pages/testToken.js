import React, { useState } from 'react'

const YourComponent = () => {
  const [token, setToken] = useState(null)
  let account = $('[name=account]').val()
  let password = $('[name=password]').val()
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        const { token } = data

        // 解析token
        const user = jwt_decode(token)

        // 將token寫入localStorage
        localStorage.setItem(appKey, token)

        // 更新React state中的token
        setToken(token)

        // 在這裡你可以進行其他處理，例如導向到登入後的頁面
      } else {
        // 處理登入失敗的情況
        const errorData = await response.json()
        alert(errorData.message)
      }
    } catch (error) {
      console.error('發生錯誤：', error)
    }
  }

  return (
    <div>
      {/* 登入按鈕 */}
      <button onClick={handleLogin}>登入</button>
    </div>
  )
}

export default YourComponent
