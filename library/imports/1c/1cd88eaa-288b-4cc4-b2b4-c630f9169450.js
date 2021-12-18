"use strict";
cc._RF.push(module, '1cd886qKItMxLK0xjD5FpRQ', 'ChildrenProtect');
// scripts/framework/common/ChildrenProtect.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UtilsOther = require("UtilsOther");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var KEY_GAME_T = 'game_util_';
var KEY_RECOVER_T = 'game_recover_';
var ChildrenProtect = /** @class */ (function (_super) {
    __extends(ChildrenProtect, _super);
    function ChildrenProtect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.limitTime = 15; // 限制游戏时间（分钟）
        _this.restTime = 10; // 强制休息时间(分钟)
        _this._gameTime = -1;
        _this._recoverTime = -1;
        _this._enterBgTime = -1;
        _this._bgDuration = -1;
        _this._timeLabel = null;
        _this._blockNode = null;
        _this._onLimitCb = null;
        _this._onRecoverCb = null;
        return _this;
    }
    ChildrenProtect.prototype.onLoad = function () {
        var _this = this;
        var st = cc.sys.localStorage.getItem(KEY_GAME_T);
        if (!st) {
            st = UtilsOther.time();
            cc.sys.localStorage.setItem(KEY_GAME_T, st);
        }
        this._gameTime = Number(st) + this.limitTime * 60;
        var rt = cc.sys.localStorage.getItem(KEY_RECOVER_T);
        if (!rt) {
            rt = -1;
            cc.sys.localStorage.setItem(KEY_RECOVER_T, rt);
        }
        this._recoverTime = Number(rt);
        this.createBlockNode();
        cc.game.on(cc.game.EVENT_HIDE, function () {
            cc.log('on game hide');
            cc.sys.localStorage.setItem(KEY_GAME_T, _this._gameTime);
            cc.sys.localStorage.setItem(KEY_RECOVER_T, _this._recoverTime);
            _this._enterBgTime = UtilsOther.time();
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            cc.log('on game show');
            _this._bgDuration = _this._enterBgTime > 0 ? UtilsOther.time() - _this._enterBgTime : 0;
            cc.log('在后台时间:', _this._bgDuration);
            if (!_this._blockNode.active) {
                _this._gameTime += _this._bgDuration;
            }
        });
    };
    ChildrenProtect.prototype.setOnLimitCb = function (cb) {
        this._onLimitCb = cb;
    };
    ChildrenProtect.prototype.setOnRecoverCb = function (cb) {
        this._onRecoverCb = cb;
    };
    ChildrenProtect.prototype.createBlockNode = function () {
        var parent = cc.Canvas.instance.node;
        var node = this._blockNode = new cc.Node('blockNode');
        node.parent = parent;
        node.zIndex = cc.macro.MAX_ZINDEX - 1;
        node.addComponent(cc.BlockInputEvents);
        var sp = node.addComponent(cc.Sprite);
        cc.loader.load({ uuid: '0275e94c-56a7-410f-bd1a-fc7483f7d14a' }, function (err, tex) {
            if (err) {
                cc.log(err);
                return;
            }
            sp.spriteFrame = new cc.SpriteFrame(tex);
            node.width = parent.width;
            node.height = parent.height;
            node.color = cc.Color.GREEN;
        });
        var labelNode = new cc.Node('time');
        labelNode.parent = node;
        var label = this._timeLabel = labelNode.addComponent(cc.Label);
        label.fontSize = label.lineHeight = 60;
        var copy = cc.instantiate(labelNode);
        label = copy.getComponent(cc.Label);
        label.string = '看看窗外让眼睛休息一下吧~';
        label.fontSize = label.lineHeight = 40;
        copy.parent = node;
        copy.y = 100;
        node.active = false;
    };
    ChildrenProtect.prototype.onEnable = function () {
        this.schedule(this.updateLimit, 0.2, cc.macro.REPEAT_FOREVER, 0);
        ;
    };
    ChildrenProtect.prototype.onDisable = function () {
        this.unschedule(this.updateLimit);
    };
    ChildrenProtect.prototype.updateLimit = function (dt) {
        var now = UtilsOther.time();
        if (now < this._gameTime) {
            cc.log('游戏中，还剩余:', this._gameTime - now);
        }
        else {
            if (this._recoverTime < 0) {
                this._recoverTime = now + this.restTime * 60;
                cc.sys.localStorage.setItem(KEY_RECOVER_T, this._recoverTime);
            }
            else {
                if (now <= this._recoverTime) {
                    var remind = this._recoverTime - now;
                    cc.log('休息中，还剩余:', remind);
                    if (!this._blockNode.active) {
                        this._blockNode.active = true;
                        this._onLimitCb && this._onLimitCb();
                    }
                    this._timeLabel.string = UtilsOther.formatTime(remind);
                }
                else {
                    cc.log('恢复游戏');
                    this._blockNode.active = false;
                    this._onRecoverCb && this._onRecoverCb();
                    this._gameTime = now + this.limitTime * 60;
                    this._recoverTime = -1;
                    cc.sys.localStorage.setItem(KEY_GAME_T, this._gameTime);
                    cc.sys.localStorage.setItem(KEY_RECOVER_T, this._recoverTime);
                }
            }
        }
    };
    __decorate([
        property
    ], ChildrenProtect.prototype, "limitTime", void 0);
    __decorate([
        property
    ], ChildrenProtect.prototype, "restTime", void 0);
    ChildrenProtect = __decorate([
        ccclass
    ], ChildrenProtect);
    return ChildrenProtect;
}(cc.Component));
exports.default = ChildrenProtect;

cc._RF.pop();