import { defineUserConfig,defaultTheme } from "vuepress";

export default defineUserConfig({
  lang: "zh-CN",
  base: '/blog/',
  title: "循此苦旅，以达星辰",
  description: "记录个人学习成长",
  theme: defaultTheme({
    navbar: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "Github",
        link: "https://github.com/SOALIN228"
      },
    ],
  }),
});
