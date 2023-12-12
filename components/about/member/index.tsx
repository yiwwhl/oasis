import { defineComponent } from "vue";
import { VPTeamMembers } from "vitepress/theme";

export default defineComponent({
  setup() {
    const members = [
      {
        avatar: "https://www.github.com/yiwwhl.png",
        name: "Evan Huang",
        title: "Owner",
        links: [
          { icon: "github", link: "https://github.com/yiwwhl" },
          { icon: "twitter", link: "https://twitter.com/yiwwhl" },
        ],
      },
    ];
    return () => {
      // @ts-expect-error
      return <VPTeamMembers members={members} />;
    };
  },
});
