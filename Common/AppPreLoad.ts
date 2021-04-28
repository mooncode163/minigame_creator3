
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';
import { ColorConfig } from './Config/ColorConfig';
import { Config } from './Config/Config';
import { ConfigAudio } from './Config/ConfigAudio';
import { ConfigPrefab } from './Config/ConfigPrefab';
import { ImageRes } from './Config/ImageRes';
import { Debug } from './Debug';
import { Language } from './Language/Language';
const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('AppPreLoad')
export class AppPreLoad extends CCObject {
    countLoad = 0;
    countMax = 2;

    listItem: CCObject[] = [];


    static _main: AppPreLoad;
    //静态方法
    static Main() {
        if (this._main == null) {
            this._main = new AppPreLoad();
        }
        return this._main;
    }

    /*
       { 
         success: (p:any) => {
             
         }, 
         fail: (p:any) => {
             
         },
       }
       */
    Load(obj: any) {
        this.countLoad = 0;
        Config.Main().Load(
            {
                success: (p: any) => {
                    Debug.Log("AppPreLoad Config success");
                    this.OnFinish(obj);
                },
                fail: () => {
                    // this.OnFinish(obj);
                    Debug.Log("AppPreLoad Config fail");
                },

            });

        ColorConfig.Main().Load(
            {
                success: (p: any) => {
                    Debug.Log("AppPreLoad ColorConfig success");
                    this.OnFinish(obj);
                },
                fail: () => {
                    // this.OnFinish(obj);
                    Debug.Log("AppPreLoad ColorConfig fail");
                },
            });


        //language
        // this.countMax++;
        Language.Main().Load(
            {
                success: (p: any) => {
                    Debug.Log("AppPreLoad Language success");
                    this.OnFinish(obj);
                },
                fail: () => {
                    // this.OnFinish(obj);
                    Debug.Log("AppPreLoad Language fail");
                },
            });
        // {
        //     var info = new cc.LoadItemInfo();
        //     info.id = cc.LoadItemInfo.LANGUAGE;
        //     info.isLoad = false;
        //     this.listProLoad.push(info);

        //     var lan = cc.Language.main();
        //     lan.SetLoadFinishCallBack(this.AppPreLoadDidFinish.bind(this), info);
        // }


        //image
        // this.countMax++;
        ImageRes.Main().Load(
            {
                success: (p: any) => {
                    Debug.Log("AppPreLoad ImageRes success");
                    this.OnFinish(obj);
                },
                fail: () => {
                    // this.OnFinish(obj);
                    Debug.Log("AppPreLoad ImageRes fail");
                },
            });

        // prefab
        // this.countMax++;
        ConfigPrefab.Main().Load(
            {
                success: (p: any) => {
                    Debug.Log("AppPreLoad ConfigPrefab success");
                    this.OnFinish(obj);
                },
                fail: () => {
                    // this.OnFinish(obj);
                    Debug.Log("AppPreLoad ConfigPrefab fail");
                },

            });


        // Audio
        // this.countMax++;
        ConfigAudio.Main().Load(
            {
                success: (p: any) => {
                    Debug.Log("AppPreLoad ConfigAudio success");
                    this.OnFinish(obj);
                },
                fail: () => {
                    // this.OnFinish(obj);
                    Debug.Log("AppPreLoad ConfigAudio fail");
                },
            });


    }

    OnFinish(obj: any) {
        this.countLoad++;
        if (this.countLoad >= this.countMax) {
            if (obj.success != null) {
                obj.success(this);
            }
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
