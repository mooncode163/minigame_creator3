
import { _decorator, Component, Node, director, instantiate, Prefab, resources, SpriteFrame, sys } from 'cc';
import { TextureCache } from '../../Common/Cache/TextureCache';
import { UIViewController } from '../../Common/UIKit/ViewController/UIViewController';
import { NaviViewController } from '../../Common/UIKit/NaviBar/NaviViewController';
import { PrefabCache } from '../../Common/Cache/PrefabCache';
import { Language } from '../../Common/Language/Language';
import { Debug } from '../../Common/Debug';
import { HomeViewController } from '../../AppBase/Home/HomeViewController';
import { LevelManager } from '../../AppBase/Game/LevelManager';
import { Platform } from '../../Common/Platform';
import { Common } from '../../Common/Common';
 
import { CloudResVersion } from '../../Common/CloundRes/CloudResVersion';
import { Config } from '../../Common/Config/Config';
import { CloudResViewController } from '../../Common/CloundRes/CloudResViewController';
import { ImageRes } from '../../Common/Config/ImageRes';
import { MainViewController } from '../../Apps/Main/MainViewController';
import { AppScene } from '../AppScene';
import { AppSceneBase } from './AppSceneBase';
import { CommonRes } from '../../Common/CommonRes';
import { ConfigAudio } from '../../Common/Config/ConfigAudio';
import { AppPreLoad } from '../../Common/AppPreLoad';
import { MusicBgPlay } from '../../Common/Audio/MusicBgPlay';
const { ccclass, property } = _decorator;


@ccclass('InitViewController')
export class InitViewController extends NaviViewController {
    static _main: InitViewController;
    //静态方法
    static get main() {
        console.log("AppScene InitViewController Main");
        if (this._main == null) {
            this._main = new InitViewController();
        }
        return this._main;
    }
    ViewDidLoad() {
        super.ViewDidLoad(); 
        this.InitLoad(); 
    }


    InitLoad() {  
        var isShowClound = false;
        if (Platform.isCloudRes) {
            Debug.Log("InitViewController 1");
            var isDownload = Common.GetBoolOfKey(CommonRes.KEY_DOWNLOAD_CLOUNDRES, false);
            if (!isDownload) {
                Debug.Log("InitViewController 2");
                //第一次 下载资源
                isShowClound = true;
            } else {
                Debug.Log("InitViewController 3")

                CloudResVersion.main.LoadVersion(
                    {
                        success: (p: any, data: any) => {
                            var versionNet = CloudResVersion.main.versionNet;
                            var versionLocal = CloudResVersion.main.versionLocal;
                            Debug.Log("InitViewController version: versionNet=" + versionNet + " versionLocal=" + versionLocal);
                            if (versionNet > versionLocal) {
                                //需要更新资源 
                                isShowClound = true;
                            }
                        },
                        fail: () => {

                        },
                    });
            }
        }
        // isShowClound = true;
        if (isShowClound) {
            this.GotoCloundRes();
        } else {
            this.RunGame();
        }

        // ImageRes.main.LoadCloudConfig(
        //     {
        //         success: (p: any) => {
        //             this.StartParsePlace();
        //         },
        //         fail: () => {
        //             this.StartParsePlace();
        //         },
        //     });

    }

    RunGame() { 
        AppPreLoad.main.Load(
            {
                success: (p: any) => {
                    this.OnAppPreLoadFinish();
                },
                fail: (p: any) => { 
                    this.OnAppPreLoadFinish();
                },
            });
    }

    OnAppPreLoadFinish()
    {
        var isFirstRun = !Common.GetBoolOfKey(CommonRes.STR_KEY_NOT_FIRST_RUN,false); 
        if (isFirstRun)
        {
            // Common.gold = AppRes.GOLD_INIT_VALUE;
            //第一次安装
            Common.SetBoolOfKey(CommonRes.STR_KEY_NOT_FIRST_RUN, true);

            Common.SetBoolOfKey(CommonRes.KEY_BTN_SOUND, true);
            Common.SetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, true);

            //languageCode
            var lan = sys.language; 
            Common.SetItemOfKey(CommonRes.KEY_LANGUAGE, lan);  
            Language.main.SetLanguage(lan);
        }
        else
        {

            var lan = Common.GetItemOfKey(CommonRes.KEY_LANGUAGE,sys.LANGUAGE_CHINESE); 
            Language.main.SetLanguage(lan);

        }

        this.StartParsePlace();
    }

    StartParsePlace() { 
        Debug.Log("HomeViewController StartParsePlace");
        LevelManager.main.StartParsePlace(
            {
                success: (p: any) => {
                    this.StartParseGuanka();
                },
                fail: () => {
                    this.StartParseGuanka();
                },
            });
    }

    StartParseGuanka() {
        Debug.Log("HomeViewController StartParseGuanka");
        LevelManager.main.StartParseGuanka(
            {
                success: (p: any) => {
                    this.ParseLevelFinish();
                },
                fail: () => {
                    this.ParseLevelFinish();
                },
            });
    }

    

    GotoCloundRes() {  
        CloudResViewController.main.Show(
            {
                controller:this, 
                close: (p: any) => { 
                    this.RunGame();
                }, 
            });
    }

    OnImageResFinish() {
        // ConfigAudio.main.LoadCloudConfig(
        //     {
        //         success: (p: any) => {
        //             this.OnConfigAudioFinish();
        //         },
        //         fail: () => {
        //             this.OnConfigAudioFinish();
        //         },
        //     });

           
    }

    OnConfigAudioFinish() {
        this.GotoGame();
    }

    ParseLevelFinish() {

        this.GotoGame();

        // ImageRes.main.LoadCloudConfig(
        //     {
        //         success: (p: any) => {
        //             this.OnImageResFinish();
        //         },
        //         fail: () => {
        //             this.OnImageResFinish();
        //         },
        //     });
      
    }

    GotoGame() {
        var p = MainViewController.main;
        // this.Push(MainViewController.main); 

        AppSceneBase.main.SetRootViewController(p);


        var ret = Common.GetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC,false);
        Debug.Log("MusicBgPlay Start");
        if (ret)
        {
            MusicBgPlay.main.PlayBgMusic();
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
