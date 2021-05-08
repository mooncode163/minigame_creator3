
import { _decorator, Component, Node, Prefab } from 'cc';  
import { UIViewPop } from '../../../../../Common/UIKit/PopUp/UIViewPop';
import { UIView } from '../../../../../Common/UIKit/ViewController/UIView';
const { ccclass, property, type } = _decorator;

@ccclass('UIGameWin')
export class UIGameWin extends UIViewPop {
    
    onLoad () {
        super.onLoad();
        this.LayOut();
    }
    start () {
        super.start();
        this.LayOut();
    }
     

    LayOut() {
        super.LayOut();
        var ratio = 0.8;
        var w = this.GetParent().GetContentSize().width * ratio;
        var h = this.GetParent().GetContentSize().height * ratio;
        this.SetContentSize(w, h);
        super.LayOut();
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
