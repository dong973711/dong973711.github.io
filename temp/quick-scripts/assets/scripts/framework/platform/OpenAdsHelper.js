(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/framework/platform/OpenAdsHelper.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a863aVTl61ElbDQnfX6cWdV', 'OpenAdsHelper', __filename);
// scripts/framework/platform/OpenAdsHelper.js

"use strict";

/**
 * Created by skyxu on 2019/12/17.
 *
 * 穿山甲广告sdk
 */

var PACKAGENAMEFB = "com/zygame/utils/OpenAdsHelper";
var CLASSNAME = "BuAdHelper";

var OpenAdsHelper = cc.Class({
    statics: {
        showInterstitialAds: function showInterstitialAds(placeId) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                placeId = zy.constData.OpenAdsKey[placeId];
                return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "showInteractionAds", "(Ljava/lang/String;)V", placeId);
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                placeId = zy.constData.OpenAdsKeyIOS[placeId];
                return jsb.reflection.callStaticMethod(CLASSNAME, "showInteractionAds:", placeId);
            }
        },
        isIntersitialReady: function isIntersitialReady(placeId) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                placeId = zy.constData.OpenAdsKey[placeId];
                return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "isInteractionReady", "(Ljava/lang/String;)Z", placeId);
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                placeId = zy.constData.OpenAdsKeyIOS[placeId];
                return jsb.reflection.callStaticMethod(CLASSNAME, "isInteractionReady:", placeId);
            }
        },
        loadIntersitialAds: function loadIntersitialAds(placeId) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                placeId = zy.constData.OpenAdsKey[placeId];
                return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "loadExpressAd", "(Ljava/lang/String;)V", placeId);
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                placeId = zy.constData.OpenAdsKeyIOS[placeId];
                return jsb.reflection.callStaticMethod(CLASSNAME, "loadExpressAd:", placeId);
            }
        },
        isRdAdsReady: function isRdAdsReady(placeId) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                placeId = zy.constData.OpenAdsKey[placeId];
                return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "isRewardAdsReady", "(Ljava/lang/String;)Z", placeId);
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                placeId = zy.constData.OpenAdsKeyIOS[placeId];
                return jsb.reflection.callStaticMethod(CLASSNAME, "isRewardAdsReady:", placeId);
            }

            return false;
        },
        loadRdAds: function loadRdAds(placeId) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                placeId = zy.constData.OpenAdsKey[placeId];
                return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "loadRewardAds", "(Ljava/lang/String;)V", placeId);
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                placeId = zy.constData.OpenAdsKeyIOS[placeId];
                return jsb.reflection.callStaticMethod(CLASSNAME, "loadRewardAds:", placeId);
            }
        },
        showRdAds: function showRdAds(placeId) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                placeId = zy.constData.OpenAdsKey[placeId];
                return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "showRewardAds", "(Ljava/lang/String;)V", placeId);
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                placeId = zy.constData.OpenAdsKeyIOS[placeId];
                return jsb.reflection.callStaticMethod(CLASSNAME, "showRewardAds:", placeId);
            }
        }
    }
});

zy.OpenAdsHelper = OpenAdsHelper;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=OpenAdsHelper.js.map
        