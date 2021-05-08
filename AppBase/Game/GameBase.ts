
import { _decorator, Component, Node, Prefab } from 'cc'; 
import { UIView } from '../../Common/UIKit/ViewController/UIView'; 
const { ccclass, property, type } = _decorator;

@ccclass('GameBase')
export class GameBase extends UIView {
    
    onLoad() {
        super.onLoad(); 
        this.LayOut();
    }
    start() {
        super.start();
        this.LayOut();
    }
    UpdateLevel (level:number) { 
    }
    properties: {
        gameStatus: 0,
        callbackGameWin: null,
        callbackGameFail: null,

        /*
    `   { 
            onWin (ui) {
            }
            onFail (ui) {
            } 
        }
        */
        objGameFinish: null,
    }
    OnGameFail () {
        if (this.objGameFinish != null) {
            if (this.objGameFinish.onFail != null) {
                this.objGameFinish.onFail(this);
            }
        }
    }

    OnGameWin () {
        if (this.objGameFinish != null) {
            if (this.objGameFinish.onWin != null) {
                this.objGameFinish.onWin(this);
            }
        }
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
