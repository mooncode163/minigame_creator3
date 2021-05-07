
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject } from 'cc';
import { Platform } from '../../Platform';
import { AdVideoWeiXin } from './AdVideoWeiXin';

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('AdVideoPlatformWrapper')
export class AdVideoPlatformWrapper extends CCObject {
    GetPlatform() {
        var p = null;
        if (Platform.isWeiXin) {
            p = new AdVideoWeiXin();
        }
        return p;
    }

   
    SetObjectInfo(objName, objMethod) {

    }
    SetType(type) {

    }
    InitAd(source) {

    }
    PreLoad(source) {

    }

    ShowAd() {

    }
    OnClickAd() {

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