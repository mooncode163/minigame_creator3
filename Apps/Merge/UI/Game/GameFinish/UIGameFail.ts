
import { _decorator, Component, Node, Prefab } from 'cc';  
import { UIView } from '../../../../../Common/UIKit/ViewController/UIView';
import { UIViewPop } from '../../../../../Common/UIKit/PopUp/UIViewPop';
const { ccclass, property, type } = _decorator;

@ccclass('UIGameFail')
export class UIGameFail extends UIViewPop {
    
    properties: {
        textTitle: cc.Component,
        textMsg: cc.Component,
        textAgain: cc.Component,
       
    },
    onLoad: function () {
        this._super(); 
         this.LayOut();  

        this.textTitle.text = cc.Language.main().GetString("STR_GameFail_TITLE");
        this.textMsg.text = cc.Language.main().GetString("STR_GameFail_Detail");
        this.textAgain.text = cc.Language.main().GetString("Restart");
    },
    start: function () {
        this._super();
        this.LayOut();

        
    },

    LayOut: function () {
        this._super();
        var ratio = 0.8;
        var w = this.node.parent.getContentSize().width*ratio;
        var h = this.node.parent.getContentSize().height*ratio;
        this.node.setContentSize(new cc.size(w,h));
        // this.node.setContentSize(this.node.parent.getContentSize()*ratio);
        this._super();
    },
   
   
    OnClickBtnAgain: function (event, customEventData) {
        this.Close();
        cc.GameManager.main().GotoPlayAgain();
    },
 

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
