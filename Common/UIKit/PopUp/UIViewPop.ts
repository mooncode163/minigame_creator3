
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject, Vec2 } from 'cc';
import { UIView } from '../ViewController/UIView';
import { PopUpManager } from './PopUpManager';

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('UIViewPop')
export class UIViewPop extends UIView {  
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

    OnAnimateFinish() { 
        var nodePannel =PopUpManager.main.nodePannel;
        if(nodePannel!=null)
        {
            nodePannel.active = true;
        }

        this.LayOut();
    }

    ShowInitAnimate () { 
        var nodePop = this.node;
        this.node.active = true; 
        nodePop.scale = new Vec3(0,0,1); 
           //delay延时
        // var time = delayTime(2);
        var duration = PopUpManager.ANIMATE_DURATION;

        var scale1 = 1.2;
        var scale2 = 1;

        tween(nodePop) 
            .to(duration / 2, { scale: new Vec3(scale1, scale1, 1) })
            .to(duration / 2, { scale: new Vec3(scale2, scale2, 1) })
            .call(() => {
                this.OnAnimateFinish();
            })
            .start() 
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

        PopUpManager.main.ClosePopup();
     
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
