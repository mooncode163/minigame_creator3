

import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject } from 'cc';
import { AdConfig } from '../../../AdKit/AdConfig/AdConfig';
import { AdType } from '../../../AdKit/AdConfig/AdInfo';
import { AdBannerPlatformWrapper } from '../../../AdKit/Banner/AdBannerPlatformWrapper';
import { Debug } from '../../../Debug';
import { Source } from '../../../Source';
const { ccclass, property, type, string } = _decorator;
 
// TypeScript自动引入脚本插件
// https=//blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer 
@ccclass('AdBannerWeiXin')
export class AdBannerWeiXin extends AdBannerPlatformWrapper {
    bannerAd = null;
    width = 0;
    height = 0;
    objAd = null;
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
        let adkey = AdConfig.main.GetAdKey(Source.WEIXIN, AdType.BANNER); 
        Debug.Log("AdBannerWeiXin adkey="+adkey);
        
        let winSize = wx.getSystemInfoSync();
        this.objAd = obj;
        console.log(winSize);
        let bannerHeight = 80;
        let bannerWidth = 300;
        this.height = bannerHeight;
        this.bannerAd = wx.createBannerAd({
            adUnitId: adkey, //填写广告id
            style: {
                left: (winSize.windowWidth-bannerWidth)/2,
                top: winSize.windowHeight - bannerHeight,
                width: bannerWidth,
            }
        });

        this.bannerAd.onError((res) => {
        
         }) 

    }

    ShowAd(isShow:boolean) {
        let winSize = wx.getSystemInfoSync();
        this.bannerAd.show(); //banner 默认隐藏(hide) 要打开
        //微信缩放后得到banner的真实高度，从新设置banner的top 属性
        this.bannerAd.onResize((res) => {
            this.bannerAd.style.top = winSize.windowHeight - this.bannerAd.style.realHeight;

            // 屏幕单位
            this.width = this.bannerAd.style.realWidth * winSize.pixelRatio;
            this.height = this.bannerAd.style.realHeight * winSize.pixelRatio;
            Debug.Log("screen winSize.windowWidth ="+winSize.windowWidth+" winSize.windowHeight ="+winSize.windowHeight+" winSize.pixelRatio="+winSize.pixelRatio);
            if (this.objAd.success != null) {
                this.objAd.success(this, this.width, this.height);
            }
        })
    }


    GetHeight() {
        return this.height;
    }
    SetScreenSize(w:any, h:any) {

    }
    //y 基于屏幕底部
    SetScreenOffset(w:any, h:any) {

    }
}


/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting= https=//docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass= https=//docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks= https=//docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
