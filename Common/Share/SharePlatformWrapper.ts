
import { _decorator, Component, Node, CCObject, resources, Texture2D } from 'cc';

const { ccclass, property } = _decorator;

// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('SharePlatformWrapper')
export class SharePlatformWrapper extends CCObject {
 
    //微信小程序 菜单 “转发”按钮
    SetWeiXinMPShareMenu (title:string, pic:string) {
    }
    ShareImageText (source:string, title:string, pic:string, url:string) {

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
