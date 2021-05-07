
import { _decorator, Component, Node, Prefab } from 'cc';
import { GameBase } from '../../../../AppBase/Game/GameBase';
import { UIView } from '../../../../Common/UIKit/ViewController/UIView';
const { ccclass, property, type } = _decorator;

@ccclass('GameMerge')
export class GameMerge extends GameBase {
    static _main: GameMerge;
    //静态方法
    static get main() {
        return this._main;
    }
    onLoad() {
        super.onLoad();
        GameMerge._main = this;
        this.LayOut();
    }
    start() {
        super.start();
        this.LayOut();
    }
    LayOut() {
        super.LayOut();
    }
    UpdateLevel(level: number) {
        super.UpdateLevel(level);
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
