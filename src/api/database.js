var allcomponents = [
    {
        name: "饼图",
        id: 1,
        value: "pie",
        components: require("@/plugin/ChartsModel/data/pie.js").default,
    },
    {
        name: "柱状图",
        id: 2,
        value: "bar",
        components: require("@/plugin/ChartsModel/data/bar.js").default,
    },
    {
        name: "折线图",
        id: 3,
        value: "line",
        components: require("@/plugin/ChartsModel/data/line.js").default,
    },
    {
        name: "条形图",
        id: 4,
        value: "bar-hroizontal",
        components: require("@/plugin/ChartsModel/data/bar-hroizontal.js").default,
    },
    {
        name: "概览",
        id: 5,
        value: "overview",
        components: require("@/plugin/ChartsModel/data/overview.js").default,
    }
]

export default allcomponents;