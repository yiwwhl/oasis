# 简介

## 什么是 ProForm

ProForm 是一款基于特定 JSON 规则定义的 schema，专为快速渲染表单组件而设计。此组件通过结构化的 JSON 规则，为开发人员提供了高效的表单开发解决方案

## Schema 的设计理念

ProForm 组件通过整合预定义布局、自定义 Form Schema 以及其他配置项，实现了对表单组件的高效渲染。本文档将在后续章节详细介绍预设布局和配置项，而在此部分，我们主要聚焦于阐述 Schema 的设计理念，以指导用户充分理解并有效利用该组件。

### 规则形式简述

schema 的定制遵循一定的规则，体现在代码类型定义层面是

```ts
export type ProFormProxyRule<T> =
  | T
  | ((runtimeMeta: runtimeMeta) => T)
  | ((runtimeMeta: runtimeMeta) => Promise<T>);
```

即任意的 schema 配置均支持三种配置模式，且函数模式下可以从参数中获取到最新的数据和未来可随时拓展的一些参数，形式下：

1. 值类型
2. 同步函数类型
3. 异步函数类型

当然如果这个值本身需要是一个函数（比如组件自身的一些函数或者事件如 onClick 等），需要用到 `useModifiers` 这个 hook 将其特殊标注出来，这样核心处理函数，便不会继续深入处理该函数，这个后续会详细展开说明

### 浅谈规则的价值

如何看待规则本身，我认为是一件有意思的事。规则所带来的一些能力你可能不会使用到，譬如根据另外一个字段的值去动态替换当前表单项的组件。但抛开这种具体的业务细节，我认为规则所带来的是更清晰的代码逻辑设计与更灵活的业务玩法，因为我们的出发点不再是业务，而是对某一种规则的实现

当然在具体实现的过程中也会遇到很多问题，例如怎样定义规则，既定规则之间存在的干扰和竞争如何解决，资源（个人开发的时间、精力等）短缺带来的代码本身缺少测试，缺少文档如何应对，考虑不周导致的存在破坏性重构问题如何抉择等等。

这种权衡和尝试贯穿了本项目的开发，也以此来记录个人的成长。

### 规则应用示例

```ts
// 1. 值类型
useForm({
  schemas: [
    {
      label: "性别",
      field: "gender",
      component: Select,
    },
  ],
});

// 2. 函数类型
useForm({
  schemas: [
    {
      // 若使用到 model，该 label 将在 model gender 发生变更后自动更新
      label: ({model}) => `${model.gender} 性别`,
      field: () => "gender",
      component: () => Select,
    },
  ],
});

// 3. 异步函数类型
useForm({
  schemas: [
    {
      label: () => {
        return new Promise((resolve) => {
          resolve("性别")
        })
      },
      field: () => {
        return new Promise((resolve) => {
          resolve("gender")
        })
      },
      component: () => {
        return new Promise((resolve) => {
          resolve(Select)
        })
      },,
    },
  ],
});

/**
 * 只要没有被 useModifiers 进行 raw 特殊标注，无论是 componentProps
 * 还是其内部的 options 都会被特殊代理，即 componentProps 中的 options
 * 也同样支持上述玩法：值类型/函数类型/异步函数类型，
 */
useForm({
  schemas: [
    {
      label: "性别",
      field: "gender",
      component: Select,
      componentProps: {
        // 1. 值类型
        options: [],
        // 2. 函数类型
        options: () => []
        // 3. 异步函数类型
        options: () => {
          return new Promise((resolve) => {
            resolve([])
          })
        }
      },
    },
  ],
});
```
