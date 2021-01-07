

export default {
    getComponentsGroup() {
        return new Promise((resolve, reject) => {
            const all = require("./database").default;
            resolve(all);
        })
    },
    //获取基础组件
    getComponentsByGroup(params) {

        return new Promise((resolve, reject) => {
            const all = require("./database").default;
            var result = "";
            if (params && params.groupId) {
                all.forEach((component) => {
                    if (component.id == params.groupId) {
                        result = component;
                    }
                })
            }
            console.log("getComponentsByGroup", params, result);
            resolve(result);
        })
    }
} 