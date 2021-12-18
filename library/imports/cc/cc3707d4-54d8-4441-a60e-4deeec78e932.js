"use strict";
cc._RF.push(module, 'cc370fUVNhEQaYOTe7seOky', 'DebugPop');
// scripts/pop/DebugPop.js

"use strict";

/**
 * Created by skyxu on 2019/12/26.
 */

cc.Class({
    extends: cc.Component,
    properties: {
        p1: cc.Node,
        p2: cc.Node
    },

    start: function start() {
        this.pp1 = this.p1.getComponent("ProgressBar");
        this.pp2 = this.p2.getComponent("ProgressCircle");
    },
    btnCb: function btnCb(sender, name) {
        switch (name) {
            case "d1":
                {
                    zy.ui.alert.show({
                        okText: i18n.t("btn_ok"),
                        cancleText: i18n.t("btn_cancle"),
                        okCb: function okCb() {
                            zy.ui.tip.show("ok");
                        },
                        cancleCb: function cancleCb() {
                            zy.ui.tip.show("cancle");
                        },
                        text: "这是单行文本样式"
                    });
                    break;
                }
            case "d2":
                {
                    zy.ui.alert.show({
                        okText: i18n.t("btn_ok"),
                        okCb: function okCb() {
                            zy.ui.tip.show("ok");
                        },
                        cancleCb: function cancleCb() {
                            zy.ui.tip.show("cancle");
                        },
                        text: "这是多行文本显示样式这是多行文本显示样式这是多行文本显示样式这是多行文本显示样式这是多行文本"
                    });
                    break;
                }
            case "d3":
                {
                    zy.ui.tip.show("我是tips，我是tips");
                    break;
                }
            case "d4":
                {
                    this.pp1.progress = 0;
                    this.pp1.setProgressBarToPercent(1, 1, function () {
                        zy.ui.tip.show("完成");
                    });

                    break;
                }
            case "d5":
                {
                    this.pp2.progress = 0;
                    this.pp2.setProgressBarToPercent(1, 1, function () {
                        zy.ui.tip.show("完成");
                    });

                    break;
                }
            default:
                break;
        }

        // zy.ui.tip.show(name);
    },
    closeCallback: function closeCallback() {
        zy.director.closePop(this.popName);
    }
});

cc._RF.pop();