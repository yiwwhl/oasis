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

ui 这个概念比较宽泛，其主要作用是选定一个预设的渲染模式，这也是表单逻辑和 UI 设计独立的体现

目前 ProForm 内置了三种 UI 库的接口，分别是 `ArcoDesign` `NaiveUI` `NutUI` 即用户在实现这三种 UI 框架进行项目开发时无需额外的接口实现，当然这个后续可以随着迭代增加或者是由用户自己提供在入口处

假如你的项目中表单根据业务场景进行了不同样式的设计，表单渲染和业务样式之间形成了多对一的关系后，我们可以在入口处提供多套预设，在具体使用时通过 `ui` 指定需要的预设进行渲染即可

如下例中的 `UIA` 和 `UIB`，他们二者的渲染核心均使用 ArcoVue，但他们的容器可以存在差异，native 也可以存在差异，这样对于同一个项目的同一个 UI 框架，就可以默认预设多套表单样式，并在使用时通过指定具体的 ui 来决定使用何种 UI 预设

```tsx
UIA: {
  extend: "ArcoVue",
  container: {
    Form: FormA,
    FormItem: FormItemA,
    Item: ItemA,
    Group: GroupA,
    List: ListA,
    ListItem: ListItemA,
  },
},
UIB: {
  extend: "ArcoVue",
  container: {
    Form: FormB,
    FormItem: FormItemB,
    Item: ItemB,
    Group: GroupB,
    List: ListB,
    ListItem: ListItemB,
  },
},

// 使用时
const [setup, { submit }] = useForm({
  ui: "UIA",
  schemas,
});
```

### grid

grid 用于布局相关的设置，其具体的使用还有待优化，但目前主要的玩法还是和原生的 grid 类似

### native

native 用于配置组件库的 Form 与 FormItem 的属性

譬如对于 ArcoDesign 来说，Form 可以设置 layout 属性以配置基本的表格布局方式，如下例

```tsx {2-8}
useForm({
  native: {
    props: {
      Form: {
        layout: "vertical",
      },
    },
  },
});
```

这会对当前整个表单实例生效，同样的，我们也可以在具体的 schema 配置项里去配置局部生效的 native，例如

::: danger 但需要注意的是，局部对 Form 的操作会覆盖全局，但对 FormItem 的操作不会，这也是符合预期的
:::

```tsx {7-13}
useForm({
  schemas: [
    {
      label: "姓名",
      field: "name",
      component: Input,
      native: {
        props: {
          Form: {
            layout: "vertical",
          },
        },
      },
    },
  ],
});
```

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

### schemas 与一些特殊 mark 函数的介绍

schemas 是 ProForm 中相当重要的一环，开发者通过定义简洁的 `schema` 来快速创建一个表单业务，并无需关心具体的数据绑定逻辑和繁复的处理细节，有利于提升开发效率并降低出错概率

由于 schema 中的定义较多且细碎，我会整体挪到下一篇文章中描述，在这里主要是再谈一下关于 `schema` 设计的初心

对于前端常见的业务数据处理场景来说，交互形式一般有三种：

```ts
- 目标值
- (...args: any[]) => 目标值
- (...args: any[]) => Promise<目标值>
```

我在设计 `schema` 配置逻辑的时候，在底层代码做了大量的支持，理论上除了一些逻辑上明确不需要深度处理的数据例如 `component` `native` ... 等，其余的数据都做了深层处理的考虑，换言之，对一个 `schema` 项的配置可以有三种形式，以对 `label` 的配置而言

```ts
- label: "姓名",
- label: ({ model }) => "姓名" + model.xxx // 一旦使用了 model 等数据，label 值会根据 model 的变化而变化
- label: ({ model }) => new Promise((resolve) => resolve("姓名")) // 可以通过一个异步函数的结果动态配置 label
```

这样动态的能力可以避免项目中出现大量的 `if-else` 逻辑，也减少了维护上的成本，并提升了 `schema` 的可玩性，同理，你也可以对 `field` `component` `componentProps` ... 等字段使用类似的玩法

但这样的灵活性也带来一些问题，于是就有了一些 `mark` 函数，目前提供了两个

- markNativeFunction
- markNativeObject

由于上述特性，系统在底层除了少数白名单性质的属性外，是会无限处理下去，直至结果“稳定”的，这样的操作既提供了一种便利，也带来了一些麻烦，比较易于理解的就是对于我们的一些事件监听函数来说，我们希望它在事件真实触发的时机执行，而不是在`计算 schema `时就处理掉，这时候我们需要明确它是一个无需被深度处理的函数，例如

```ts
{
  label: "性别",
  field: "gender"
  component: Select,
  componentProps: {
    options: () => [
      {
        label: "男",
        value: "male"
      },
      {
        label: "女",
        value: "female"
      }
    ]
    onSelect: markNativeFunction(() => {
      // do something when select
    })
  }
}
```

上述例子我们通过 `markNativeFunction` 将 select 函数保留，这样它就可以在 Select 组件 emit 一个 select 事件时正确的触发该函数，但对于 options 来说，我们并未使用 `markNativeFunction` 将其包裹，在计算时它将被计算成函数的结果，也即是一个数组用于 options 的渲染

同理，系统里除了对函数进行了深层的处理外，对 `object` 也做了深度的处理，本质上是由于 object 中也存在 value 是函数的情况，想要保持足够的灵活性，就需要无限深度的嗅探，但这也带来一些问题，当我们的系统中存在了一个不需要处理的 object 时，`markNativeObject` 就派上了用场，用法如下

```ts
{
  label: "照片",
  field: "images"
  component: Uploader,
  componentProps: {
    ...markNativeObject(「无需继续处理的对象」)
  }
}
```

通过这样的形式你可以确保你的一些通用配置是可以抽象出去，并且不用担心被系统给深度处理掉
