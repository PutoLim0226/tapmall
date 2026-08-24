import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Seller Centre": "Seller Centre",
      "Download": "Download",
      "Follow us on": "Follow us on",
      "Help": "Help",
      "Welcome": "Welcome",
      "Logout": "Logout",
      "Sign Up": "Sign Up",
      "Login": "Login",
      "Search Placeholder": "Sign up and get 100% off on your first order",
      "Categories": "Categories",
      "Daily Discover": "Daily Discover",
      "Add To Cart": "Add To Cart",
      "sold": "sold",
      "Your Cart": "Your Cart",
      "Your shopping cart is empty": "Your shopping cart is empty",
      "Remove": "Remove",
      "Total": "Total",
      "Checkout": "Checkout",
      "Email or Phone": "Email or Username",
      "Password": "Password",
      "Name": "Name",
      "New to Tapmall? Sign Up": "New to Tapmall? Sign Up",
      "Have an account? Log In": "Have an account? Log In"
    }
  },
  'zh-TW': {
    translation: {
      "Seller Centre": "賣家中心",
      "Download": "下載",
      "Follow us on": "追蹤我們",
      "Help": "幫助中心",
      "Welcome": "歡迎",
      "Logout": "登出",
      "Sign Up": "註冊",
      "Login": "登入",
      "Search Placeholder": "註冊首單享100%優惠",
      "Categories": "商品分類",
      "Daily Discover": "每日新發現",
      "Add To Cart": "加入購物車",
      "sold": "已售出",
      "Your Cart": "你的購物車",
      "Your shopping cart is empty": "你的購物車是空的",
      "Remove": "移除",
      "Total": "總計",
      "Checkout": "結帳",
      "Email or Phone": "信箱",
      "Password": "密碼",
      "Name": "姓名",
      "New to Tapmall? Sign Up": "Tapmall 新朋友？註冊",
      "Have an account? Log In": "已經有帳號？登入"
    }
  },
  'zh-CN': {
    translation: {
      "Seller Centre": "卖家中心",
      "Download": "下载",
      "Follow us on": "关注我们",
      "Help": "帮助中心",
      "Welcome": "欢迎",
      "Logout": "登出",
      "Sign Up": "注册",
      "Login": "登录",
      "Search Placeholder": "注册首单享100%优惠",
      "Categories": "商品分类",
      "Daily Discover": "每日新发现",
      "Add To Cart": "加入购物车",
      "sold": "已售出",
      "Your Cart": "你的购物车",
      "Your shopping cart is empty": "你的购物车是空的",
      "Remove": "移除",
      "Total": "总计",
      "Checkout": "结账",
      "Email or Phone": "邮箱",
      "Password": "密码",
      "Name": "姓名",
      "New to Tapmall? Sign Up": "Tapmall 新朋友？注册",
      "Have an account? Log In": "已经有帐号？登录"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
