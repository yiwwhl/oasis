import { defineConfig } from "vitepress";

// happy path：先不考虑其他的 nav 对应的 sidebar 的实现，因为暂时也没有那么多内容
export default defineConfig({
  base: "oasis",
  title: "Oasis",
  description: "Document Oasis",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Harbor Design", link: "docs/harbor-design/index" },
    ],
    sidebar: [
      {
        text: "ProForm",
        items: [
          {
            text: "快速上手",
            items: [
              {
                text: "简介",
                link: "/docs/harbor-design/pro-form/get-started/introduction",
              },
              {
                text: "安装",
                link: "/docs/harbor-design/pro-form/get-started/install",
              },
            ],
          },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/yiwwhl" }],
  },
});
