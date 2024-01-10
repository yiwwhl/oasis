# 安装

```sh
pnpm add @harbor-design/proform
```

# 配置步骤

我们需要在 `main.ts` 中定制项目预设，预设包括了表单默认的 `ui` 及整个俩目会用到的所有动态表单相关的组件库的默认预设 `uiPresets`，由于各个 UI 库在一些细节上存在差异（譬如在 FormItem 字段定义和 Form 具体的 validate 实现上）所以通常来说如果遇到 ProForm 不支持的 UI 库时，需要自己定义完整的 adapter 用于程序核心运转，而对于已经内置支持的组件库，只需要定义运行时的容器即可，容器通过插槽的方式将 UI 交给外部决定，你可以自己决定一些核心元件的位置等

下面是一个简单的定义示例，ProForm 目前支持了 `ArcoVue、NutUI、NaiveUI` 的适配，所以下方只定义了具体的容器 `container`

```ts
// main.ts
import { useFormPresetConfigurer } from "@harbor-design/proform";
import { Form, FormItem } from "@arco-design/web-vue";
import { NForm, NFormItem } from "naive-ui";
import Item from "@/Infra/ProFormRuntimeDoms/Item";
import Group from "@/Infra/ProFormRuntimeDoms/Group";
import List from "@/Infra/ProFormRuntimeDoms/List";
import ListItem from "@/Infra/ProFormRuntimeDoms/ListItem";

useFormPresetConfigurer({
  ui: "ArcoVue",
  uiPresets: {
    ArcoVue: {
      container: {
        Form,
        FormItem,
        Item,
        Group,
        List,
        ListItem,
      },
    },
    NaiveUI: {
      container: {
        Form: NForm,
        FormItem: NFormItem,
        Item,
        Group,
        List,
        ListItem,
      },
    },
  },
});

// @/Infra/ProFormRuntimeDoms/ListItem，可通过该例子尝试理解插槽和外部 UI 定制结合形成的简单的 headless 设计
import { defineComponent } from "vue";
import styles from "./index.module.scss";
import { Button } from "@arco-design/web-vue";

export default defineComponent({
  setup(_, { slots }) {
    return () => {
      return (
        <div class={styles.listItemWrapper}>
          <div class={styles.mainContent}>{slots.default?.()}</div>
          {slots.delete?.({
            container: <Button class={styles.removeBtn}>移除</Button>,
          })}
        </div>
      );
    };
  },
});
```

## MVP

下面是使用 ProForm 的一个最基本的示例

```ts
import { defineComponent } from "vue";
import { ProForm, useForm } from "@harbor-design/proform";
import { Input } from "@arco-design/web-vue";

export default defineComponent({
  setup() {
    const [setup] = useForm({
      schemas: [
        {
          label: "姓名",
          field: "name",
          component: Input,
        },
      ],
    });
    return () => <ProForm setup={setup} />;
  },
});
```

该示例将渲染一个指定 UI 库的 Input 组件（当前示例为 Arco）如下图
![MVP](/proform/get-started/mvp.png)

## 技术细节

必要依赖：

- Vue3
