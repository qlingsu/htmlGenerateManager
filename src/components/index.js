const ZqComponent = {};
ZqComponent.install = function (Vue, options) {

    console.log("", options)
    if (options && options.theme) {

    }
    //基础组件
    var getBaseComponents = require.context("./", true, /\.vue$/);
    getBaseComponents.keys().forEach((path) => {
        let component = getBaseComponents(path).default;
        Vue.component(component.name, component);
    })
 
    Vue.mixin({
        created: function () {
            // 逻辑...
        }
    })

}
export default ZqComponent;