
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject, AudioSource, AudioClip } from 'cc';
import { Common } from '../Common';
import { ResManager } from '../Res/ResManager';
import { DEBUG } from 'cc/env';
import { Debug } from '../Debug';
import { Platform } from '../Platform';
import { ImageRes } from '../Config/ImageRes';
import { CloudRes } from '../CloundRes/CloudRes';
import { ConfigAudio } from '../Config/ConfigAudio';
import { AudioPlay } from './AudioPlay';

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('MusicBgPlay')
export class MusicBgPlay extends AudioPlay {  
    static _main: MusicBgPlay;
    //静态方法
    static get main() {
        if (this._main == null) {
            // this._main = new MusicBgPlay();
            // this._main.Init();
        }
        return this._main;
    }

    onLoad() {
        super.onLoad();
        MusicBgPlay._main = this; 

    }
    start() {
        super.start();
    } 
   
    PlayBgMusic() { 
        this.audioSource.loop= true;
        this.PlayByKey("Bg");

        // this.scheduleOnce(this.OnDidFinish, 1);
    }

    OnDidFinish() {
        // this.audioSource.loop= false;
        // this.audioSource.play();
        this.Stop();
    }
    StopBgMusic() {
        // this.audioSource.loop= false;
        // this.audioSource.play();
        this.Stop();
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
