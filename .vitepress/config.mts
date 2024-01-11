import { defineConfig } from "vitepress";
import { resolve } from "path";
import vueJSX from "@vitejs/plugin-vue-jsx";

// happy path：先不考虑其他的 nav 对应的 sidebar 的实现，因为暂时也没有那么多内容
export default defineConfig({
  base: "/oasis/",
  title: "Oasis",
  description: "Document Oasis",
  vite: {
    plugins: [vueJSX()],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "../"),
        },
      ],
    },
  },
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Harbor Design", link: "/docs/harbor-design/" },
      { text: "About", link: "/docs/about/" },
    ],
    sidebar: {
      "/docs/harbor-design/": [
        {
          text: "Harbor Design",
          items: [
            {
              text: "ProForm",
              items: [
                {
                  text: "简介",
                  items: [
                    {
                      text: "什么是 ProForm",
                      link: "/docs/harbor-design/pro-form/introduction/what",
                    },
                    {
                      text: "快速上手",
                      link: "/docs/harbor-design/pro-form/introduction/get-started",
                    },

                    {
                      text: "Stackblitz 在线体验",
                      link: "/docs/harbor-design/pro-form/introduction/online-playground",
                    },
                  ],
                },
                {
                  text: "功能概览",
                  items: [
                    {
                      text: "useForm",
                      link: "/docs/harbor-design/pro-form/feature-overview/useForm",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/yiwwhl" }],
    footer: {
      message: "Oasis of knowledge",
      copyright: "Copyright © 2023-present yiwwhl",
    },
  },
});
