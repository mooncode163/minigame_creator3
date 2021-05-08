
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject } from 'cc';
import { UIView } from '../ViewController/UIView';

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('UIViewPop')
export class UIViewPop extends UIView {
    static _main: UIViewPop;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new UIViewPop();
            // this._main.Init();
        }
        return this._main;
    }
 

    onLoad () {
        super.onLoad();
        this.LayOut();
    }
    start () {
        super.start();
        this.LayOut();
        this.node.active = false;
        this.scheduleOnce(this.ShowInitAnimate, 0.1); 
    }
    update () { 
        // this.LayOut();
    }

    ShowInitAnimate () { 
        var nodePop = this.node;
        this.node.active = true;
        nodePop.scaleX = 0;
        nodePop.scaleY = 0;
           //delay延时
        // var time = cc.delayTime(2);
        var duration = cc.PopUpManager.ANIMATE_DURATION;
        var actionTo1 = cc.scaleTo(duration / 2, 1.2);
        var actionTo2 = cc.scaleTo(duration / 2, 1); 
        var seq = cc.sequence([actionTo1, actionTo2, cc.callFunc(function () {
            // this.DoClickItem(event, customEventData);
            this.LayOut();
        }.bind(this))]);
        nodePop.runAction(seq);
    }

    Close() {
        // AudioPlay.main.PlayFile(AppRes.Audio_PopupClose);
        // if (onClose != null) {
        //     onClose.Invoke();
        // } 
        // PopUpManager.main.ClosePopup();
        // if (animator != null) {
        //     animator.Play("Close");
        //     StartCoroutine(DestroyPopup());
        // }
        // else {
        //     DoClose();
        // }

        cc.PopUpManager.main().ClosePopup();
     
    }


    DoClose() {
        // PopUpManager.main.OnClose();
        // DestroyImmediate(gameObject);
        this.node.destroy();
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
