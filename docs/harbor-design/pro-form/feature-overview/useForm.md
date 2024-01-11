# useForm 函数

::: tip useForm
该函数用于初始化基本的 form 配置，其返回值形如 [setup,「Operations」]，「Operations」是一系列封装好的功能操作合集
:::

## 返回值介绍

### setup

setup 作为 useForm 函数的首个结果，在运行时会生成一些必要的元信息，但对于开发者来说，这些元信息是无需手动操作的，只需要交给 ProForm 组件去初始化表单即可

```tsx {4,16}
import { ProForm, useForm } from "@harbor-design/proform";
import { Input } from "@arco-design/web-vue";

const [setup, _] = useForm({
  schemas: [
    {
      label: "姓名",
      field: "name",
      component: Input,
    },
  ],
});

// render
render() {
  return <ProForm setup={setup} />
}
```

### 「Operations」

「Operations」是一个可持续迭代的业务工具包合集，此处对于业务的定义是对于表单业务的封装，例如常见的会有「submit - 提交」「hydrate - 数据回填」「share - 信息共享」等

```tsx {8,16,16-21}
import { ProForm, useForm } from "@harbor-design/proform";
import { Input } from "@arco-design/web-vue";

const [setup, _] = useForm({ // [!code --]
const [setup, { submit, hydrate, share }] = useForm({ // [!code ++]
  schemas: [
    {
      label: ({ shared }) => shared.nameLabel,
      field: "name",
      component: Input,
    },
  ],
});

onMounted(() => {
  share({
    nameLabel: "姓名"
  })
  hydrate({
    name: "Harbor Design"
  })
})

// render
render() {
  return <ProForm setup={setup} />
}
```

使用上述示例后，将得到下图的渲染效果，即通过 share 共享了 schema 中使用的 label，通过 hydrate 的方式向表单数据的 name 字段注入 Harbor Design

![showCase1](./assets/showCase1.png)

## 入参介绍

### ui

### grid

### native

### runtime

::: details 简介：用于在运行时进行一些额外的控制，其存在的主要价值是避免将运行时定制化的东西过度耦合到 runtimeMetas 里面【详情展开查看更多】
理论上我们大部分操作都是通过先前提到的`模式 + runtimeMeta`去实现的
例如：当我们希望定义一个元素的 label，可以通过 `label: ({ shared, model, reactiveModel, ... }) => "something"`
`{ shared, model, reactiveModel, ... }` 这一系列内容被统称为 runtimeMetas

但对于 type 为 `list` 的表单项来说，我们往往还需要更深度的定制
例如：列表数据的 label 默认展示其 index，或者是特定的 index 需要展示特定的 label 逻辑等，于是我们需要一个 `index` 信息，用于控制展示

不过 index 不应该被做进 runtimeMetas 里，这是因为一来 runtime 层和 schema 的处理层是隔离的，其次对于整个场景中，也只有 list 会存在这样的 index 需求，如果当你使用其他 type 也提示有一个 index 但又无法使用，会造成更多困扰，所以对于这样特殊的需求，新增了一层独立的 runtime 定义，将专门用于在运行时层面去强化处理已经处理结束的 schema
:::

::: warning 当然该配置不仅存在于 useForm 里，也存在于每一个表单定制项里，从概念上 useForm 的配置代表当前整个表单的全局配置，而每一个定制项中的配置代表单个表单项的渲染需求，同理于上述的 native 配置

以 `customizeListItemLabel` 为例阐述一下此概念

```tsx {2-7,12-17}
const [setup, { submit }] = useForm({
  runtime: {
    // 全局定义，若整个表单的列表展现形式统一，可以通过定义在全局适用到 list 类型的每一个表单项中
    customizeListItemLabel(rawLabel, rawIndex) {
      return `${rawLabel} ${rawIndex}`;
    },
  },
  schemas: [
    {
      type: "list",
      field: "users",
      runtime: {
        // 局部定义，局部覆盖全局，所以最终的 label 展示为 `姓名 0 局部`
        customizeListItemLabel(rawLabel, rawIndex) {
          return `${rawLabel} ${rawIndex} 局部`;
        },
      },
      children: [
        {
          label: "姓名",
          field: "name",
          component: Input,
        },
      ],
    },
  ],
});
```

:::

#### 目前已有的 runtime 处理函数如下

::: tip customizeListItemLabel
用于在运行时强化定制列表 label 的展现效果，函数将默认回填入参 `rawLabel` 和 `rawIndex` 供进一步的处理，函数的返回值将作为最终的 label 呈现在页面上

```tsx
customizeListItemLabel(rawLabel, rawIndex) {
  return `${rawLabel} ${rawIndex}`;
}
```

:::

### schemas
