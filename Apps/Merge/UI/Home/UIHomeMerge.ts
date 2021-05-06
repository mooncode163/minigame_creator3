
import { _decorator, Component, Node, Texture2D, SpriteFrame, Sprite, resources, assetManager } from 'cc';
const { ccclass, property, integer, float, boolean, string, type } = _decorator;

import { UIHomeBase } from '../../../../AppBase/Home/UIHomeBase';
import { TextureCache } from '../../../../Common/Cache/TextureCache';
import { Config } from '../../../../Common/Config/Config';
import { UIImage } from '../../../../Common/UIKit/UIImage/UIImage';
import { Debug } from '../../../../Common/Debug';
import { Luna } from './Luna';
import { TestCallAndThis } from './TestCallAndThis';
import { DEBUG } from 'cc/env';
import { GameViewController } from '../../../../AppBase/Game/GameViewController';


@ccclass('UIHomeMerge')
export class UIHomeMerge extends UIHomeBase {
    @type(Node)
    nodeBg: Node | null = null;

    @type(UIImage)
    imageBg: UIImage = null;

    // imageBg: UIImage | null = null;
    test() {
        Debug.Log("test 2 bind");
    }
    success() {
        Debug.Log("success bind");
        this.test();
    }
    start() {
       super.start();
    }

    OnBtnClickPlay(event: Event, customEventData: string) {
        Debug.Log("OnBtnClickPlay");
        this.GotoGame();
    }

    GotoGame() {
        this.GotoGameByModeInteranl();
        // cc.LevelManager.main().StartParsePlace(function () {

        // }.bind(this)
        // );
    }

    GotoGameByModeInteranl() {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            Debug.Log("GotoGame GameViewController");
            navi.Push(GameViewController.main);
        }else{
            Debug.Log("GotoGame controller = null");
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
