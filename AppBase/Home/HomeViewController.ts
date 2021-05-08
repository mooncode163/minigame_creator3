
import { _decorator, Component, Node, Prefab, instantiate } from 'cc'; 
import { PrefabCache } from '../../Common/Cache/PrefabCache';
import { Debug } from '../../Common/Debug';
import { UIViewController } from '../../Common/UIKit/ViewController/UIViewController';
import { UIHomeBase } from './UIHomeBase';
const { ccclass, property } = _decorator;
 

@ccclass('HomeViewController')
export class HomeViewController extends UIViewController {

    uiPrefab: Prefab;
    ui: UIHomeBase; 
    runCount= 0;

    static _main:HomeViewController;
    //静态方法
    static get  main(){ 
        if(this._main==null)
        {
            this._main = new HomeViewController();
        }
        return this._main;
    }

    ViewDidLoad () {
        Debug.Log("HomeViewController ViewDidLoad");
        super.ViewDidLoad();
        //提前加载game prefab
        // if (!HomeViewController.isGameHasInit) {
        //     var game = GameViewController.main();
        //     game.SetLoadFinishCallBack(this.AppPreLoadDidFinish.bind(this), null);
        // } else {
        //     this.LoadPrefab();
        // }
        this.LoadPrefab();
    }
    ViewDidUnLoad () {
        Debug.Log("HomeViewController ViewDidUnLoad");
        super.ViewDidUnLoad();

    }
    LoadPrefab () {
        // var strPrefab = "App/Prefab/Home/UIHome" + cc.Config.main().appType;
        // var key = "UIHome" + cc.Config.main().appType;
        // // var strPrefab = cc.ConfigPrefab.main().GetPrefab(key);
        // // Debug.Log("HomeViewController LoadPrefab=" + strPrefab);
        // cc.PrefabCache.main.LoadByKey(key, function (err, prefab) {
        //     if (err) {
        //         Debug.Log("LoadPrefab err:" + err.message || err);
        //         this.LoadPrefabDefault();
        //         return;
        //     }
        //     this.uiPrefab = prefab;
        //     this.CreateUI();
        // }.bind(this)
        // );

        PrefabCache.main.Load(
            {
                filepath: "App/Prefab/Home/UIHomeMerge",
                success: (p: any, data: any) => {
                    this.uiPrefab = data;
                    this.CreateUI();
                 
                },
                fail: () => {

                },
            });
    }


    CreateUI () {
        Debug.Log("HomeViewController CreateUI");
        // cc.LevelManager.main().StartParsePlace(function () { 
        //     cc.LevelManager.main().StartParseGuanka(function () {
        //         this.CreateUIInternal();
        //     }.bind(this)
        //     ); 
        // }.bind(this)
        // );
        this.CreateUIInternal();
    }
    CreateUIInternal () { 
        const newNode = instantiate(this.uiPrefab);
        this.ui = newNode.getComponent(UIHomeBase); 
        this.ui.SetController(this);

         // CloudResViewController.main().Show(null, null);
         if (this.runCount == 0) {
            //至少在home界面显示一次视频广告
            //AdKitCommon.main.callbackAdVideoFinish = OnAdKitAdVideoFinish;
            //   if (uiHome != null)
            // {
            //     uiHome.OnClickBtnAdVideo();
            // }

            //至少在home界面显示一次开机插屏
            // var type = AdConfigParser.SOURCE_TYPE_INSERT;
            // var source = cc.Source.GDT;
            // cc.AdInsert.main().InitAd(source); 
            // cc.AdKitCommon.main.ShowAdInsert(100);

        }
        this.runCount++;
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
