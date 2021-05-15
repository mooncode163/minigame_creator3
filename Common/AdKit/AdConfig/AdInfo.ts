
import { _decorator, CCObject, Node, Enum } from 'cc';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

export enum AdType {
    SPLASH= 0,
    BANNER,
    INSERT,
    SPLASH_INSERT,
    NATIVE, 
    VIDEO,
    INSERT_VIDEO,
}
Enum(AdType);

@ccclass('AdInfo')
export class AdInfo extends CCObject {
    // public static AdType = AdType;
    source = '';
    appid = '';
    appkey = '';
    key_splash = '';
    key_splash_insert = '';
    key_banner = '';
    key_insert = '';
    key_native = '';
    key_video = '';
    key_insert_video = ''; 
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
