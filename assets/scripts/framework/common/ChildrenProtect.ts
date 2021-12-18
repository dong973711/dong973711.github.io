const UtilsOther = require("UtilsOther");
const { ccclass, property } = cc._decorator;
const KEY_GAME_T = 'game_util_';
const KEY_RECOVER_T = 'game_recover_';

@ccclass
export default class ChildrenProtect extends cc.Component {
    @property
    limitTime: number = 15; // 限制游戏时间（分钟）

    @property
    restTime: number = 10; // 强制休息时间(分钟)

    private _gameTime: number = -1;
    private _recoverTime: number = -1;
    private _enterBgTime: number = -1;
    private _bgDuration: number = -1;

    private _timeLabel: cc.Label = null;
    private _blockNode: cc.Node = null;

    private _onLimitCb: Function = null;
    private _onRecoverCb: Function = null;

    onLoad() {
        let st = cc.sys.localStorage.getItem(KEY_GAME_T);
        if (!st) {
            st = UtilsOther.time();
            cc.sys.localStorage.setItem(KEY_GAME_T, st);
        }
        this._gameTime = Number(st) + this.limitTime * 60;

        let rt = cc.sys.localStorage.getItem(KEY_RECOVER_T);
        if (!rt) {
            rt = -1;
            cc.sys.localStorage.setItem(KEY_RECOVER_T, rt);
        }
        this._recoverTime = Number(rt);

        this.createBlockNode();

        cc.game.on(cc.game.EVENT_HIDE, ()=>{
            cc.log('on game hide');
            cc.sys.localStorage.setItem(KEY_GAME_T, this._gameTime);
            cc.sys.localStorage.setItem(KEY_RECOVER_T, this._recoverTime);
            this._enterBgTime = UtilsOther.time();
        });
        cc.game.on(cc.game.EVENT_SHOW, ()=>{
            cc.log('on game show');
            this._bgDuration = this._enterBgTime > 0 ? UtilsOther.time() - this._enterBgTime : 0;
            cc.log('在后台时间:', this._bgDuration);
            if (!this._blockNode.active) {
                this._gameTime += this._bgDuration;
            }
        });
    }

    setOnLimitCb(cb: Function) {
        this._onLimitCb = cb;
    }

    setOnRecoverCb(cb: Function) {
        this._onRecoverCb = cb;
    }

    private createBlockNode() {
        let parent = cc.Canvas.instance.node;
        let node = this._blockNode = new cc.Node('blockNode');
        node.parent = parent;
        node.zIndex = cc.macro.MAX_ZINDEX - 1;
        node.addComponent(cc.BlockInputEvents);

        let sp = node.addComponent(cc.Sprite);
        cc.loader.load({uuid: '0275e94c-56a7-410f-bd1a-fc7483f7d14a'}, (err, tex)=>{
            if (err) {
                cc.log(err);
                return;
            }
            sp.spriteFrame = new cc.SpriteFrame(tex);
            node.width = parent.width;
            node.height = parent.height;
            node.color = cc.Color.GREEN;
        });
        
        let labelNode = new cc.Node('time');
        labelNode.parent = node;
        let label = this._timeLabel = labelNode.addComponent(cc.Label);
        label.fontSize = label.lineHeight = 60;
        
        let copy = cc.instantiate(labelNode);
        label = copy.getComponent(cc.Label);
        label.string = '看看窗外让眼睛休息一下吧~'
        label.fontSize = label.lineHeight = 40;
        copy.parent = node;
        copy.y = 100;

        node.active = false;
    }

    onEnable() {
        this.schedule(this.updateLimit, 0.2, cc.macro.REPEAT_FOREVER, 0);;
    }

    onDisable() {
        this.unschedule(this.updateLimit);
    }

    updateLimit(dt) {
        let now = UtilsOther.time();
        if (now < this._gameTime) {
            cc.log('游戏中，还剩余:', this._gameTime - now);
        } else {
            if (this._recoverTime < 0) {
                this._recoverTime = now + this.restTime * 60;
                cc.sys.localStorage.setItem(KEY_RECOVER_T, this._recoverTime);
            } else {
                if (now <= this._recoverTime) {
                    let remind = this._recoverTime - now;
                    cc.log('休息中，还剩余:', remind);
                    if (!this._blockNode.active) {
                        this._blockNode.active = true;
                        this._onLimitCb && this._onLimitCb();
                    }
                    this._timeLabel.string = UtilsOther.formatTime(remind);
                } else {
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
    }
}