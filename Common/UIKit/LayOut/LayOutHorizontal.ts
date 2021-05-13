
import { _decorator, Component, Node } from 'cc';
import { Debug } from '../../Debug';
import { LayOutBase } from './LayOutBase';
import { LayOutUtil } from './LayOutUtil';
import { HorizontalOrVerticalLayoutBase } from './HorizontalOrVerticalLayoutBase';
const { ccclass, property } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer
 

@ccclass('LayOutHorizontal')
export class LayOutHorizontal extends HorizontalOrVerticalLayoutBase {
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
       
        if (!this.Enable()) {
            return;
        }
        super.LayOut();
        this.row = 1;
        this.col = LayOutUtil.main.GetChildCount(this.node, this.enableHide);
        Debug.Log("LayOutHorizontal LayOut");
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
