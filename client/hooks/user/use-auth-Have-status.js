import { createContext, useState, useContext, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

//建立context
const AuthContext = createContext()

// 協助全站(_app.js)裡套用Provider的元件，集中要使用的狀態
// 使⽤有前後開頭與結尾的自訂元件標記，需要⽤ props.children 屬性來獲得夾在其中的不確定值
export function AuthProvider({ children }) {
  // const initAuth = {
  //   isAuth: false,
  //   userData: {
  //     id: 0,
  //     name: '',
  //     email: '',
  //     google_uid: '',
  //     img: '',
  //   },
  // }

  // 共享用狀態(state)
  // const [auth, setAuth] = useState(initAuth)
  const [token, setToken] = useState('')
  // const [userData, setUserData] = useState()

  const appKey = 'userToken'

  // 登入
  // const login = () => {
  //   setAuth({
  //     isAuth: true,
  //     userData: {
  //       id: 3,
  //       name: '鍾傑元',
  //       email: 'harmon4652@gmail.com',
  //       google_uid: '',
  //       img: 'avatar_user0003.jpg',
  //     },
  //   })
  // }

  // 登出
  // const logout = () => {
  //   setAuth(initAuth)
  // }

  //驗證當前token
  const handleLoginStatus = async (e) => {
    // 拿取Token回傳後端驗證狀態
    const usertoken = localStorage.getItem(appKey)
    try {
      const response = await fetch('http://localhost:3005/api/user/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${usertoken}`,
        },
        body: JSON.stringify(),
      })

      const statusData = await response.json()
      console.log('Response from server:', statusData)

      // console.log(userData)

      // 在這裡處理後端返回的資料
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  useEffect(() => {
    // 在這裡呼叫 handleLoginStatus，確保 token 已經有值
    if (token) {
      handleLoginStatus()
    }
  }, [token])

  // 原本
  const getLoginUserData = async (e) => {
    // 拿取Token回傳後端驗證狀態
    const Loginusertoken = localStorage.getItem(appKey)

    if (!Loginusertoken) {
      console.error('沒有登入的token 故無法取得使用者資料。')
      return null
    }
    const userID = jwtDecode(Loginusertoken)
    const id = userID.id

    try {
      const response = await fetch(`http://localhost:3005/api/user/${id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Loginusertoken}`,
        },
        body: JSON.stringify(),
      })

      const LoginUserData = await response.json()
      console.log('Response from server:', LoginUserData)

      // setUserData(LoginUserData)
      console.log(LoginUserData)

      // 在這裡處理後端返回的資料
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  useEffect(() => {
    // 在這裡呼叫 handleLoginStatus，確保 token 已經有值
    if (token) {
      getLoginUserData()
    }
  }, [token])

  return (
    <AuthContext.Provider
      value={{ handleLoginStatus, getLoginUserData }} //用value屬性傳入共享用狀態(state)
    >
      {children}
    </AuthContext.Provider>
  )
}

// 包裝好專用於此context的勾子名稱
export const useAuth = () => useContext(AuthContext)
