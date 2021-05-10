
import { _decorator, Component, Node, Prefab, CCObject } from 'cc';
import { ItemInfo } from '../../Common/ItemInfo';
import { GameViewController } from './GameViewController';
import { LevelManager } from './LevelManager';
const { ccclass, property, type } = _decorator;


@ccclass('GameManager')
export class GameManager extends CCObject {
    static gameMode = 0;
    uiPrefab:Prefab=null; 

    static _main: GameManager;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new GameManager();
            this._main.Init();
        }
        return this._main;
    }

    Init () {
        //this.ParseGuanka();
    }
    LoadPrefab () {

    }
 

    //UIViewController
    GotoGame (fromController) {
        var navi = fromController.naviController;
        if (navi != null) {
            navi.Push(GameViewController.main);
        }
    }  
 
    GotoPlayAgain () {
        GameViewController.main.gameBase.UpdateGuankaLevel(LevelManager.main.gameLevel);
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
