
import { _decorator, Component, Node, director, instantiate, Prefab, resources, SpriteFrame } from 'cc';
import { TextureCache } from '../../Common/Cache/TextureCache';
import { UIViewController } from '../../Common/UIKit/ViewController/UIViewController';
import { NaviViewController } from '../../Common/UIKit/NaviBar/NaviViewController';
import { PrefabCache } from '../../Common/Cache/PrefabCache';
import { Language } from '../../Common/Language/Language';
import { Debug } from '../../Common/Debug';
import { HomeViewController } from '../../AppBase/Home/HomeViewController';
import { LevelManager } from '../../AppBase/Game/LevelManager';
import { Platform } from '../../Common/Platform';
import { Common } from '../../Common/Common';
import { CloudResVersion } from '../../Common/CloundRes/CloudResVersion';
import { Config } from '../../Common/Config/Config';
import { CloudResViewController } from '../../Common/CloundRes/CloudResViewController';
import { ImageRes } from '../../Common/Config/ImageRes';
const { ccclass, property } = _decorator;


@ccclass('MainViewController')
export class MainViewController extends NaviViewController {
    static _main: MainViewController;
    //静态方法
    static get main() { 
        if (this._main == null) {
            this._main = new MainViewController();
        }
        return this._main;
    }
    ViewDidLoad() {
        super.ViewDidLoad();
        this.Push(HomeViewController.main);//HomeViewController
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
