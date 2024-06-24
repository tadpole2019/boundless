import '@/styles/globals.scss'
import '@/styles/template.scss'
import { CartProvider } from '@/hooks/use-cart'
import { useEffect } from 'react'

// 會員認證專用的Provider元件 (檢驗是否登入)
import { AuthProvider } from '@/hooks/user/use-auth'

import { JamProvider } from '@/hooks/use-jam'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
      <JamProvider>
        <CartProvider>
          <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
        </CartProvider>
      </JamProvider>
  )
}
