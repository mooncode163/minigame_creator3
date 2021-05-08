
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject } from 'cc';

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('FrendBoard')
export class FrendBoard extends CCObject {
    static _main: FrendBoard;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new FrendBoard();
            // this._main.Init();
        }
        return this._main;
    }
    properties: {
        platform: cc.FrendBoardPlatformWrapper,
    }
    statics: {

    }
    GetPlatform () {
        var p = null;
        if (cc.Common.main().isWeiXin) {
            //显示分享
            //  wx.showFrendBoardMenu();
            p = new cc.FrendBoardWeiXin();
        } else if (cc.Common.main().isFacebook) {
            p = new cc.FrendBoardFacebook();
        }


        return p;
    }

    Init () {
        var p = new cc.FrendBoardPlatformWrapper();
        this.platform = p.GetPlatform();
    }

    //score:string
    SaveData (score) {
        if (this.platform == null) {
            return;
        }
        this.platform.SaveData(score);
    }

    // ShowFrendBoard () {
    //     if (this.platform == null) {
    //         return;
    //     }
    //     this.platform.ShowFrendBoard();
    // }

    Show() {
        FrendBoardViewController.main().Show(null, null);
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
