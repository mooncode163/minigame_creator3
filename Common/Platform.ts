
import { _decorator, CCObject, sys } from 'cc';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('Platform')
export class Platform extends CCObject {

    public static get isAndroid(): boolean {
        return (sys.platform == sys.OS_ANDROID) ? true : false;
    }
    public static get isiOS(): boolean {
        return (sys.platform == sys.OS_IOS) ? true : false;
    }

    public static get isWin(): boolean {
        return (sys.platform == sys.OS_WINDOWS) ? true : false;
    }
    public static get isWeiXin(): boolean {
        return (sys.platform == sys.WECHAT_GAME) ? true : false;
    }
    public static get isFacebook(): boolean {
        return (sys.platform == sys.FB_PLAYABLE_ADS) ? true : false;
    }

    public static get isByteDance(): boolean {
        return (sys.platform == sys.BYTEDANCE_MINI_GAME) ? true : false;
    }

}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
