
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject, Enum } from 'cc';
import { AppSceneBase } from '../../AppBase/Common/AppSceneBase';
import { Common } from '../Common';
import { Debug } from '../Debug';
import { Source } from '../Source';
import { AdBanner } from './Banner/AdBanner';
import { AdInsert } from './Insert/AdInsert';
import { AdVideo } from './Video/AdVideo';

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer
  
enum AdType {
    BANNER = 0,
    INSERT,
    VIDEO,
}
//必须Enum设置才能在编辑器里设置enum的值
Enum(AdType);


enum AdStatus {
    FAIL = 0,
    SUCCESFULL,
    START,
    CLOSE,
}
//必须Enum设置才能在编辑器里设置enum的值
Enum(AdStatus);

@ccclass('AdKitCommon')
export class AdKitCommon extends CCObject {

    public static AdType = AdType;
    public static AdStatus = AdStatus; 
    widthAdBanner=0; 
    heightAdBanner=0; //screen
    heightCanvasAdBanner=160; //canvas

    static _main: AdKitCommon;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new AdKitCommon();
            // this._main.Init();
        }
        return this._main;
    } 

      //banner
    	/*
	{   
	success (p,w,h) {
	}
	fail () {
	} 
	}
	*/
    InitAdBanner () {
        if (Common.noad) {
            return;
        }
        var isShowAdBanner = true;
        // if (Common.isiOS) {
        //     if (!AppVersion.appCheckHasFinished) {
        //         //ios app审核不显示banner
        //         isShowAdBanner = false;
        //     }
        // }

        // if (Common.isAndroid) {

        //     if (!AppVersion.appCheckHasFinished) {
        //         //xiaomi app审核不显示banner
        //         isShowAdBanner = false;
        //     }
        // }

        if (isShowAdBanner) {
            // AdBanner.main.SetScreenSize(Screen.width, Screen.height);
            // AdBanner.main.SetScreenOffset(0, cc.Device.main.heightSystemHomeBar);
            {
                // var type =cc.AdConfigParser.SOURCE_TYPE_BANNER;
                // var source = cc.AdConfig.main().GetAdSource(type); 

                AdBanner.main.InitAd(
                    {
                        source: Source.WEIXIN,
                        success: (p: any, w: any, h: any) => {
                            this.widthAdBanner = w;
                            this.heightAdBanner = h; 
                            this.heightCanvasAdBanner = Common.ScreenToCanvasHeigt(AppSceneBase.main.sizeCanvas,h);
                            Debug.Log("this.heightCanvasAdBanner="+this.heightCanvasAdBanner+ " h="+h);
                            AppSceneBase.main.LayOut();
                        },
                        fail: (p: any) => {
        
                        },
                    }
                );

            

                AdBanner.main.ShowAd(true);
            }
        }


    }

    //insert
    InitAdInsert () {
        if (Common.noad) {
            return;
        }
        var isShowAdInsert = false;
        // if (AppVersion.appCheckHasFinished) {
        //     isShowAdInsert = true;
        // }
        isShowAdInsert = true;
        if (isShowAdInsert) {
            // AdInsert.SetObjectInfo(this.gameObject.name);
            // var type = cc.AdConfigParser.SOURCE_TYPE_INSERT;
            // var source = cc.AdConfig.main().GetAdSource(type);
            var source = Source.WEIXIN;
            AdInsert.main.InitAd(source);
        }
    }


    //Video
    InitAdVideo () {
        if (Common.noad) {
            return;
        }
        // if (AppVersion.appCheckHasFinished) {
            AdVideo.main.SetType(AdVideo.ADVIDEO_TYPE_REWARD);
            // var type = cc.AdConfigParser.SOURCE_TYPE_VIDEO;
            // var source = cc.AdConfig.main().GetAdSource(type);
            var source = Source.WEIXIN;
            Debug.Log("InitAdVideo AdVideo.InitAd =" + source);
            AdVideo.main.InitAd(source);
        // }
    }



    ShowAdBanner(isShow) {
        AdBanner.main.ShowAd(isShow);
    }
    ShowAdVideo() {
        //show 之前重新设置广告
        this.InitAdVideo();
        AdVideo.main.ShowAd();
    }

    ShowAdInsert(rate) {

        // if (!AppVersion.appCheckHasFinished) {
        //     return;
        // }

        if (Common.noad) {
            return;
        } 

        var randvalue = Common.RandomRange(0, 100); 
        if (randvalue > rate) {
            return;
        }
        //show 之前重新设置广告
        //InitAdInsert();
        AdInsert.main.ShowAd();

    }


    AdBannerDidReceiveAd(str) {
   
    }
    AdBannerDidReceiveAdFail(adsource) {
 
    }

    AdBannerDidClick(adsource) {

    }
    AdInsertWillShow(str) { 
        // if (callbackFinish != null) {
        //     callbackFinish(AdType.INSERT, AdStatus.START, null);
        // }
    }
    AdInsertDidClose(str) { 
        // if (callbackFinish != null) {
        //     callbackFinish(AdType.INSERT, AdStatus.CLOSE, null);
        // }
    }

    AdInsertDidFail(adsource) {
 

    }


    AdVideoDidFail(str) {
         
    }

    AdVideoDidStart(str) {
         

    }

 

    AdVideoDidFinish(str) {

        // this.DoAdVideoDidFinish();

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
