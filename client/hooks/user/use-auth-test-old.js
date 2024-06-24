import { createContext, useState, useContext } from 'react'

//建立context
const AuthContext = createContext()

// 協助全站(_app.js)裡套用Provider的元件，集中要使用的狀態
// 使⽤有前後開頭與結尾的自訂元件標記，需要⽤ props.children 屬性來獲得夾在其中的不確定值
export function AuthProvider({ children }) {
  const initAuth = {
    isAuth: false,
    userData: {
      id: 0,
      name: '',
      email: '',
      google_uid: '',
      img: '',
    },
  }

  // 共享用狀態(state)
  const [auth, setAuth] = useState(initAuth)

  // 登入
  const login = () => {
    setAuth({
      isAuth: true,
      userData: {
        id: 3,
        name: '鍾傑元',
        email: 'harmon4652@gmail.com',
        google_uid: '',
        img: 'avatar_user0003.jpg',
      },
    })
  }

  // 登出
  const logout = () => {
    setAuth(initAuth)
  }

  return (
    <AuthContext.Provider
      value={{ auth, login, logout }} //用value屬性傳入共享用狀態(state)
    >
      {children}
    </AuthContext.Provider>
  )
}

// 給消費者們(consumers)，包裝好專用於此context的勾子名稱
export const useAuth = () => useContext(AuthContext)
