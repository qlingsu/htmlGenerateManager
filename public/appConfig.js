(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.appConfig = factory(global));
}(this, function (global) {
    'use strict';
    var clientWidth = 375
    if (global) {
        global.clientWidth = clientWidth; //设定宽度
    }

    var appConfig = {
        port: 8082,
        serverPath:"",
        style: {
            clientWidth: clientWidth,
            titleHeight: 56, //标题栏高度
            footerHeight: 64, //页脚高度
            menuWidth: 240,//菜单宽度
            eachMenuHeight: 40,//每个菜单高度
            backgroundGray: "#f0f2f5",//背景灰色
            boxShadow: "rgba(208, 222, 245, 0.7)",//边框
            mainColor: "#5589e3",//主要颜色
            borderColor: "#DCDFE6",//边框颜色
        },
        title: "政务管理APP后台管理系统"
    }
    return appConfig;
}))