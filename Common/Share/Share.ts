
import { _decorator, Component, Node, CCObject, resources, Texture2D } from 'cc';
import { Platform } from '../Platform';
import { SharePlatformWrapper } from './SharePlatformWrapper';
import { ShareWeiXin } from './ShareWeiXin';

const { ccclass, property } = _decorator;

// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('Share')
export class Share extends CCObject {

    platform: SharePlatformWrapper = null;

    statics: {

    }
    GetPlatform() {
        var p = null;
        if (Platform.isWeiXin) {
            //显示分享
            //  wx.showShareMenu();
            p = new ShareWeiXin();
        }
        return p;
    }
    Init() {
        this.platform = this.GetPlatform();
    }


    SetWeiXinMPShareMenu(title: string, pic: string) {
        if (this.platform == null) {
            return;
        }
        this.platform.SetWeiXinMPShareMenu(title, pic);
    }
    ShareImageText(source: string, title: string, pic: string, url: string) {
        if (this.platform == null) {
            return;
        }
        this.platform.ShareImageText(source, title, pic, url);
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
