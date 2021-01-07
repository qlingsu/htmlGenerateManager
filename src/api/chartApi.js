

export default {
    //获取主题
    getFrames() {
        return new Promise((resolve, reject) => {
            const result = require("@/plugin/ChartsModel/data/frame.js").default;
            resolve(result);
        })
    },
    getChartsGroup() {
        return new Promise((resolve, reject) => {
            const catalog = require("./database").default;
            resolve(catalog);
        })
    },
    //获取图表---就是组件带数据
    getCharts(params) {
        console.log("getCharts", params);
        return new Promise((resolve, reject) => {
            var data = require("@/plugin/ChartsModel/data/data.json");
            if (
                data["employment001_head_10"].length > 0 &&
                data["employment001_body_10"].length > 0 &&
                data["employment001_body_20"].length > 0 &&
                data["employment001_body_30"].length > 0 &&
                data["employment001_body_40"].length > 0
            ) {
                const catalogs = require("./database.js").default;
                var result = []
                catalogs.forEach((item) => {
                    item.components.forEach((component) => {
                        component.props = {
                            ...component.props,
                            // data: [],
                            // title:""
                        }
                    })
                    if (item.value == params.groupId) {
                        result = item.components;
                    } else if (params.groupId == "all") {
                        result = [...result, ...item.components];
                    }
                })
                resolve(result);
            }
        })
    }
}

function setChartData(d) {
    let data = [];
    if (Array.isArray(d)) {
        d.forEach((res) => {
            data.push({
                name: res["AJX261"] ||
                    res["AAB302"] ||
                    res["AJX231"] ||
                    res["AJX112"] ||
                    res["RMA101"] ||
                    res["ABBREVIATION"],
                count: res["AJX262_NOW"] ||
                    res["AJX232"] ||
                    res["AJX151"] ||
                    res["RMB001"] ||
                    res["RMB002_RISK"] ||
                    res["RMB002"],
                value: "",
                scale: res["RMB001"],
            });
        });
        return data;
    } else {
        return false;
    }


}

function setChartData1(d) {
    var chartData1 = [
        { value: d["AJX271"], name: "单位就业", scale: d["AJX271_PR"] },
        { value: d["AJX272"], name: "灵活就业", scale: d["AJX272_PR"] },
        { value: d["AJX274"], name: "其他形式就业", scale: d["AJX274_PR"] },
    ];
    return chartData1;
}