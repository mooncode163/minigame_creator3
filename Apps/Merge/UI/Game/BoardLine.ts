
import { _decorator, Component, Node, Prefab } from 'cc';  
import { UIView } from '../../../../Common/UIKit/ViewController/UIView';
import { GameData } from '../../Data/GameData';
const { ccclass, property, type } = _decorator;

@ccclass('BoardLine')
export class BoardLine extends UIView {
    
    onLoad () {
        super.onLoad();
        this.id = GameData.NameBoardLine;
    }
    start () {
        super.start();
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
