
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { UIViewController } from "./UIViewController";
import { AppScene } from '../../../AppBase/AppScene';
import { AppSceneBase } from '../../../AppBase/Common/AppSceneBase';

@ccclass('PopViewController')
export class PopViewController extends UIViewController {
    // iDelegate: IPopViewControllerDelegate,
        // _closeCallback: null,
        objCallback=null;
     /*
      {
        controller:any, 
        close: (p:any) => {
            
        },  
    }
      */
    Show (obj:any) { 
        this.objCallback = obj;
        //this.iDelegate = dele;
        var root = obj.controller;
        if (root == null) {
            root = AppSceneBase.main.rootViewController;
        }
        // this.SetViewParent(root.objController);
        this.SetViewParent(AppSceneBase.main.rootNode);
    }

    Close () { 
        if(this.objCallback.close){
            this.objCallback.close(this);
        }
        this.DestroyObjController();
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
