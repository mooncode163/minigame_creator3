
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('Common')
export class Common extends CCObject {
    public static GAME_DATA_DIR = "GameData";//streamingAssetsPath下的游戏配置等数据
    public static GAME_DATA_DIR_COMMON = "GameData/common";
    public static GAME_RES_DIR = "GameRes";//streamingAssetsPath 下的游戏图片等资源
    public static CLOUD_RES_DIR_NAME = "CloudRes";//放在云端的资源
    public static CLOUD_RES_DIR = "GameRes/CloudRes";//放在云端的资源
    public static RES_CONFIG_DATA = "ConfigData";
    public static RES_CONFIG_DATA_COMMON = "ConfigDataCommon";
    public static THUMB_SUFFIX = "_thumb";
    public static TOUCH_MOVE_STEP_MIN = 3.0;//6.0f
    static IsBlankString(str: string) {
        if (typeof str == "undefined" || str == null || str == "") {
            return true;
        } else {
            return false;
        }
    }
    static BlankString(str: string) {
        return this.IsBlankString(str);
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
