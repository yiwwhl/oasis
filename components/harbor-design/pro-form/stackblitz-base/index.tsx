import { defineComponent, onMounted, ref } from "vue";
import styles from "./index.module.scss";
import sdk from "@stackblitz/sdk";

export default defineComponent({
  setup() {
    const stackblitzRef = ref();

    onMounted(() => {
      sdk.embedProjectId(stackblitzRef.value, "proform", {
        forceEmbedLayout: true,
        openFile: "src/App.tsx",
      });
    });

    return () => {
      return <div class={styles.stackblitzWrapper} ref={stackblitzRef}></div>;
    };
  },
});
