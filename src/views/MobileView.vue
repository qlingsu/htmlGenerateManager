<template>
  <div>
    <dom-list :components="components"></dom-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      components: [],
    };
  },
  mounted() {
    const self = this;
    self.components = [
      {
        name: "widget-frame-a",
        props: {
          widgetArr: [
            {
              id: "a0", //id一定要设置，否则不起作用
              components: [
                {
                  name: "div",
                  slot: "图表1",
                  class: "widget-position",
                },
              ],
            },
            {
              id: "a1",
              components: [
                {
                  name: "div",
                  slot: "图表2",
                  class: "widget-position",
                },
              ],
            },
            {
              id: "a2",
              components: [
                {
                  name: "div",
                  slot: "图表3",
                  class: "widget-position",
                },
              ],
            },
            {
              id: "a3",
              components: [
                {
                  name: "div",
                  slot: "图表4",
                  class: "widget-position",
                },
              ],
            },
            {
              id: "a4",
              components: [
                {
                  name: "div",
                  slot: "图表5",
                  class: "widget-position",
                },
              ]
            }
          ]
        }
      }
    ];
  },
};
</script>