
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject } from 'cc';
import { Source } from '../../Source';
import { AdConfig } from '../AdConfig/AdConfig';
import {AdType } from '../AdConfig/AdInfo';
import { AdInsertPlatformWrapper } from './AdInsertPlatformWrapper';
 

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer 
@ccclass('AdInsertWeiXin')
export class AdInsertWeiXin extends AdInsertPlatformWrapper {

    interstitialAd = null;
    InitAd(source) { 
        var adkey = AdConfig.main.GetAdKey(Source.WEIXIN, AdType.INSERT);
        // 在页面中定义插屏广告 
        // 在页面onLoad回调事件中创建插屏广告实例
        if (wx.createInterstitialAd) {
            this.interstitialAd = wx.createInterstitialAd({
                adUnitId: adkey
            })

            this.interstitialAd.onError(res => {

            }) 
            this.interstitialAd.onClose(res => {

            }) 


        }

    }
    SetObjectInfo(objName) {

    }

    ShowAd() {
        // 在适合的场景显示插屏广告
        if (this.interstitialAd) {
            this.interstitialAd.show().catch((err) => {
                console.error(err)
            })
        }
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
