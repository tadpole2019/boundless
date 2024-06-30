import axios from 'axios'

const parameter = {
  url: '',
  param: {},
  success: () => {},
  fail: () => {},
}

class API {
  Get(param = parameter) {
    axios
      .get(this.url + param.url)
      .then((res) => param.success(res.data))
      .catch((err) => param.fail(err))
  }

  Post(param = parameter) {
    axios
      .post(this.url + param.url, param.param)
      .then((res) => param.success(res.data))
      .catch((err) => param.fail(err))
  }

  constructor() {
    this.url = 'http://localhost:3005/api/'
  }
}

export default new API()

//#region 程式碼封裝並發送 HTTP 請求
// 這段程式碼定義了一個名為 API 的類別，用於發送 HTTP 請求到後端的 API 服務器。讓我們一步步解釋這段程式碼的意思：
// 首先匯入了 axios 模組，這是一個用於發送 HTTP 請求的 JavaScript 函式庫。
// 定義了一個名為 parameter 的常數物件，它包含了請求所需的一些參數，包括 URL、請求參數、成功時的回調函式和失敗時的回調函式。
// 定義了一個名為 API 的類別，裡面包含了兩個方法 Get 和 Post，用於發送 GET 和 POST 請求。
// 在 Get 方法中，它使用 axios.get 方法向指定的 URL 發送 GET 請求，並根據請求的結果調用成功或失敗的回調函式。
// 在 Post 方法中，它使用 axios.post 方法向指定的 URL 發送 POST 請求，同樣根據請求的結果調用成功或失敗的回調函式。
// 在類別的建構函式中，設置了後端 API 服務器的基本 URL，這裡設置為 http://localhost:3005/api/，這應該是後端 API 服務器的根路徑。
// 最後，通過 export default new API() 匯出了一個新建立的 API 類別的實例，這樣其他模組就可以直接引用這個實例來發送 HTTP 請求。
// 總的來說，這段程式碼封裝了發送 HTTP 請求的邏輯，提供了簡潔的介面讓前端代碼可以輕鬆地向後端的 API 服務器發送請求。
//#endregion
