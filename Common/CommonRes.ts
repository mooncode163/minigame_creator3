
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('CommonRes')
export class CommonRes extends CCObject {
    public static STR_KEY_NOT_FIRST_RUN: string = "STR_KEY_NOT_FIRST_RUN"; 
    public static KEY_BACKGROUND_MUSIC: string = "KEY_BACKGROUND_MUSIC"; 
    public static KEY_BTN_SOUND: string = "KEY_BTN_SOUND";
    public static KEY_LANGUAGE: string = "KEY_LANGUAGE";
    public static KEY_FIRST_RUN: string = "KEY_FIRST_RUN";

    public static KEY_COMMENT_VERSION: string = "key_comment_";
    public static KEY_COMMENT_LAST_TIME: string = "key_comment_last_time";
    public static KEY_USER_GUIDE: string = "key_comment_user_guide_";
    public static KEY_DOWNLOAD_CLOUNDRES: string = "KEY_DOWNLOAD_CLOUNDRES";
    //image
    public static IMAGE_BLANK: string = "Common/UI/Blank";
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
