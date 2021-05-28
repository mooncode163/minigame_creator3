
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject } from 'cc';
import { Platform } from '../../Platform';
import { AdBannerWeiXin } from '../../Platform/weixin/AdKit/AdBannerWeiXin';
import { AdBannerPlatformWrapper } from './AdBannerPlatformWrapper';
 

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('AdBanner')
export class AdBanner extends CCObject {

    platform: AdBannerPlatformWrapper = null;

    static _main: AdBanner;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new AdBanner();
            this._main.Init();
        }
        return this._main;
    }

    GetPlatform () {
        var p = null;
        if (Platform.isWeiXin||Platform.isByte)  {
            p = new AdBannerWeiXin();
        }
        return p;
    }

    Init() { 
        this.platform = this.GetPlatform();
    }



    /*
  {
    source:"", 
    success: (p:any,w:any,h:any) => {
        
    }, 
    fail: (p:any) => {
        
    },
  }
  */
    InitAd(obj: any) {

        if (this.platform == null) {
            return;
        }

        this.platform.InitAd(
            {
                source: obj.source,
                success: (p: any, w: any, h: any) => {
                    if (obj.success != null) {
                        obj.success(this, w, h);
                    }
                },
                fail: (p: any) => {

                },
            }
        );


    }

    ShowAd(isShow) {
        if (this.platform == null) {
            return;
        }
        this.platform.ShowAd(isShow);
    }


    SetScreenSize(w, h) {
        if (this.platform == null) {
            return;
        }
        this.platform.SetScreenSize(w, h);

    }
    //y 基于屏幕底部
    SetScreenOffset(x, y) {
        if (this.platform == null) {
            return;
        }
        this.platform.SetScreenOffset(x, y);

    }

    GetHeight() {
        if (this.platform == null) {
            return 0;
        }
        return this.platform.GetHeight();
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
