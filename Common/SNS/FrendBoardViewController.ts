
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject } from 'cc';

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('FrendBoardViewController')
export class FrendBoardViewController extends CCObject {
    static _main: FrendBoardViewController;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new FrendBoardViewController();
            // this._main.Init();
        }
        return this._main;
    }
    properties: {
        uiPrefab: {
            default: null,
            type: Prefab
        }
        ui: {
            default: null,
            type: UIFrendBoard
        }


    } 
    CreateUI () {
        var node = instantiate(this.uiPrefab);
        this.ui = node.getComponent(UIFrendBoard);
        this.ui.SetController(this);
    }

    LoadPrefab () {
        var strPrefab = "Common/Prefab/FrendBoard/UIFrendBoard"; 
        PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                Debug.Log("LoadPrefab err:" + err.message || err);
                return;
            }
            this.uiPrefab = prefab;
            this.CreateUI();
        }.bind(this)
        );
    }

    ViewDidLoad () {
        Debug.Log("FrendBoardViewController ViewDidLoad");
        super.ViewDidLoad();
        this.LoadPrefab();
    }
    ViewDidUnLoad () {
        Debug.Log("FrendBoardViewController ViewDidUnLoad");
        super.ViewDidUnLoad();

    }
    LayOut () {
        Debug.Log("FrendBoardViewController LayOutView");
        //  base.LayOutView();

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
