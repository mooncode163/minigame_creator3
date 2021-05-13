
import { _decorator, Component, Node } from 'cc';  
import { UIView } from '../../../../Common/UIKit/ViewController/UIView';
const { ccclass, property,type } = _decorator;
 

@ccclass('UIHomeSideBar')
export class UIHomeSideBar extends UIView {
    onLoad() {
        super.onLoad(); 
        // this.LayOut();
    }
    start() {
        
        // [3] super.LayOut();
        super.start();
        this.LayOut();
    }
    LayOut () { 
        super.LayOut();
  
    }
    OnBtnClickShare(event: Event, customEventData: string) {
 
    }
    OnBtnClickSetting(event: Event, customEventData: string) {
   
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
