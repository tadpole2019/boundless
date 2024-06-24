import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import CartData from '@/data/cart/cart.json'
import CouponData from '@/data/cart/coupons.json'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const router = useRouter()
  const mySwal = withReactContent(Swal)
  const confirmOrderSubmit = () => {
    localStorage.removeItem('CartData')
    localStorage.removeItem('LessonCoupon')
    localStorage.removeItem('InstrumentCoupon')
    mySwal
      .fire({
        position: 'center',
        icon: 'success',
        iconColor: '#1581cc',
        title: '結帳成功！',
        showConfirmButton: false,
        timer: 2000,
      })
      .then(
        setTimeout(() => {
          router.push(`/user/user-order`)
        }, 2000)
      )
  }
  let cartData = CartData.map((v) => {
    // if (v.type == 1) {
    //   return { ...v, qty: 1 }
    // } else {
    //   return v
    // }
    return { ...v, qty: 1 }
  })
  //加入到購物車的項目
  let [items, setItems] = useState([])

  useEffect(() => {
    localStorage.setItem('CartData', JSON.stringify(items))
  }, [items])

  // 新增商品至購物車
  const addInstrumentItem = (item, qty) => {
    // 檢查購物車是否已存在該商品
    const index = items.findIndex((v) => {
      return v.id == item.id
    })
    console.log(index)
    if (index > -1) {
      increment(item, qty)
    } else {
      // 不存在購物車中，擴充該商品的"數量"屬性
      //擴充item的屬性多一個qty
      const newItem = { ...item, qty: qty }
      const newItems = [...items, newItem]
      setItems(newItems)
      localStorage.setItem('CartData', JSON.stringify(newItems))
    }
  }

  const addLessonItem = (item) => {
    const index = items.findIndex((v) => {
      return v.id == item.id
    })
    if (index == -1) {
      const newItem = { ...item, qty: 1 }
      const newItems = [...items, newItem]
      setItems(newItems)
      localStorage.setItem('CartData', JSON.stringify(newItems))
    }
  }

  //在購物車中，移除某商品的id
  const remove = (items, id) => {
    const newItems = items.filter((v, i) => {
      return v.id !== id
    })

    setItems(newItems)

    localStorage.setItem('CartData', JSON.stringify(newItems))
  }

  //遞增某商品id數量
  const increment = (item, qty) => {
    const newItems = items.map((v) => {
      if (v.id === item.id) return { ...v, qty: v.qty + qty }
      else return v
    })

    setItems(newItems)

    localStorage.setItem('CartData', JSON.stringify(newItems))
  }

  const increment_cart = (items, id) => {
    const newItems = items.map((v) => {
      if (v.id === id) return { ...v, qty: v.qty + 1 }
      else return v
    })

    setItems(newItems)

    localStorage.setItem('CartData', JSON.stringify(newItems))
  }

  //遞減某商品id數量
  const decrement = (item) => {
    const newItems = items.map((v, i) => {
      if (v.id === item.id) return { ...v, qty: v.qty - 1 }
      else return v
    })
    setItems(newItems)

    localStorage.setItem('CartData', JSON.stringify(newItems))
  }

  const decrement_cart = (items, id) => {
    const newItems = items.map((v, i) => {
      if (v.id === id) return { ...v, qty: v.qty - 1 }
      else return v
    })
    setItems(newItems)

    localStorage.setItem('CartData', JSON.stringify(newItems))
  }

  //lessondata
  const lessonData = items.filter((v, i) => {
    return v.type === 2
  })

  const lessonCoupons = CouponData.filter((v, i) => {
    return v.kind === 2
  })

  //instrumentdata
  const instrumentData = items.filter((v, i) => {
    return v.type === 1
  })

  const instrumentCoupons = CouponData.filter((v, i) => {
    return v.kind === 1
  })

  //計算個數
  const calcTotalItems = () => {
    let total = 0
    total = items.length
    return total
  }

  const calcLessonItems = () => {
    let total = lessonData.length
    return total
  }

  const calcInstrumentItems = () => {
    let total = 0

    for (let i = 0; i < instrumentData.length; i++) {
      total += instrumentData[i].qty
    }
    return total
  }

  //計算總價格

  const calcLessonPrice = () => {
    let total = 0

    for (let i = 0; i < lessonData.length; i++) {
      total += lessonData[i].price
    }
    return total
  }

  const calcInstrumentPrice = () => {
    let total = 0

    for (let i = 0; i < instrumentData.length; i++) {
      total += instrumentData[i].qty * instrumentData[i].price
    }
    return total
  }

  const calcTotalPrice = () => {
    let total = 0

    for (let i = 0; i < items.length; i++) {
      total = calcLessonPrice() + calcInstrumentPrice()
    }
    return total
  }

  //計算折價券

  const [lessonDiscount, setLessonDiscount] = useState(0)

  const handleLessonSelector = (e) => {
    localStorage.setItem('LessonCoupon', e)
    setLessonDiscount(e)
  }

  // 抓不到 固定用註冊禮
  const handleLessonCUIDSelector = (cuid) => {
    // console.log(cuid)
    localStorage.setItem('LessonCouponCUID', 18)
  }

  const [instrumentDiscount, setinstrumentDiscount] = useState(0)

  const handleInstrumentSelector = (e) => {
    localStorage.setItem('InstrumentCoupon', e)
    setinstrumentDiscount(e)
  }

  const handleInstrumentCUIDSelector = (cuid) => {
    // console.log(cuid)
    localStorage.setItem('InstrumentCouponCUID', 2)
  }

  const cartNull = () => {
    toast('購物車是空的哦', {
      icon: 'ℹ️',
      style: {
        border: '1px solid #666666',
        padding: '16px',
        color: '#1d1d1d',
      },
      duration: 2000,
    })
  }

  const alreadyBought = () => {
    toast('購物車中已存在該商品', {
      icon: 'ℹ️',
      style: {
        border: '1px solid #666666',
        padding: '16px',
        color: '#1d1d1d',
      },
      duration: 2000,
    })
  }

  const notifyBuy = (name) => {
    toast.success(`${name} 已加入購物車`, {
      style: {
        border: '1px solid #666666',
        padding: '16px',
        color: '#1d1d1d',
      },
      iconTheme: {
        primary: '#1581cc',
      },
      duration: 2000,
    })
  }

  useEffect(() => {
    const lastInstrumentCoupon = JSON.parse(
      localStorage.getItem('InstrumentCoupon') ?? 0
    )
    setinstrumentDiscount(lastInstrumentCoupon)
  }, [])

  const calcLessonDiscount = () => {
    let total = 0
    total =
      lessonDiscount < 1 && lessonDiscount !== 0
        ? calcLessonPrice() - lessonDiscount * calcLessonPrice()
        : lessonDiscount
    return total
  }

  const calcInstrumentDiscount = () => {
    let total = 0
    total =
      instrumentDiscount < 1 && instrumentDiscount !== 0
        ? calcInstrumentPrice() - calcInstrumentPrice() * instrumentDiscount
        : instrumentDiscount
    // console.log(instrumentDiscount);
    return total
  }

  const calcTotalDiscount = () => {
    let total = 0
    parseInt(calcInstrumentDiscount())
    total = parseInt(calcInstrumentDiscount()) + parseInt(calcLessonDiscount())
    return total
  }

  return (
    <CartContext.Provider
      value={{
        items,
        instrumentData,
        instrumentCoupons,
        instrumentDiscount,
        lessonData,
        lessonCoupons,
        lessonDiscount,
        handleLessonSelector,
        handleLessonCUIDSelector,
        handleInstrumentSelector,
        handleInstrumentCUIDSelector,
        addLessonItem,
        addInstrumentItem,
        increment,
        increment_cart,
        decrement,
        decrement_cart,
        remove,
        calcInstrumentItems,
        calcInstrumentPrice,
        calcInstrumentDiscount,
        calcLessonItems,
        calcLessonPrice,
        calcLessonDiscount,
        calcTotalItems,
        calcTotalPrice,
        calcTotalDiscount,
        confirmOrderSubmit,
        cartNull,
        notifyBuy,
        alreadyBought,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

1
