
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { AdKitCommon } from '../../Common/AdKit/AdKitCommon';
import { PrefabCache } from '../../Common/Cache/PrefabCache';
import { Config } from '../../Common/Config/Config';
import { Debug } from '../../Common/Debug';
import { UIViewController } from '../../Common/UIKit/ViewController/UIViewController';
import { UIGameBase } from './UIGameBase';
const { ccclass, property } = _decorator;


@ccclass('GameViewController')
export class GameViewController extends UIViewController {

    uiPrefab: Prefab = null;
    ui: UIGameBase = null;
    _gameBase: UIGameBase = null; 
    get gameBase() {
        // this.LoadUI();
        return this.ui;
    }


    static _main: GameViewController;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new GameViewController();
        }
        return this._main;
    }




    Init() { 
  
    }
 

    LoadUI() {
        if (this.ui == null) {
            var node = instantiate(this.uiPrefab);
            this.ui = node.getComponent(UIGameBase);
        }
    }

    CreateUI() {
        this.LoadUI();
        this.ui.SetController(this);

        AdKitCommon.main.InitAdBanner();
        AdKitCommon.main.ShowAdBanner(true);

        // insert
        AdKitCommon.main.InitAdInsert();
        AdKitCommon.main.ShowAdInsert(100);
    }

    LoadPrefabEnd() {
     
    }

    LoadPrefab() {
        var key = "UIGame" + Config.main.appType;
        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    this.uiPrefab = data;
                    this.CreateUI();
                 
                },
                fail: () => {
                    
                },
            });
 
    }


    ViewDidLoad() {
        Debug.Log("GameViewController ViewDidLoad");
        super.ViewDidLoad();
        this.LoadPrefab(); 
    }
    ViewDidUnLoad() {
        Debug.Log("GameViewController ViewDidUnLoad");
        super.ViewDidUnLoad();
        this.ui.node.destroy();
        this.ui = null;

    }
    LayOutView() {
        Debug.Log("GameViewController LayOutView");
        //  base.LayOutView();

    }

    GotoGame(name:string) {
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
