
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject } from 'cc';

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('AudioPlay')
export class AudioPlay extends CCObject {
    static _main: AudioPlay;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new AudioPlay();
            // this._main.Init();
        }
        return this._main;
    }

    PlayCloudAudio(file: string) {
        // var filepath = cc.CloudRes.main().audioRootPath + "/" + file;
        // if (cc.Common.main().isWeiXin) {
        //     AudioPlay.main.PlayUrl(filepath);
        // } else {
        //     AudioPlay.main.PlayFile(filepath);
        // }
    }

    PlayUrl(url: string) {

    }
    PlayFile(filepath: string) {

    }
    PlayByKey(key: string) {

    } 
    PlayBgMusic() {

    }
    StopBgMusic() {

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
