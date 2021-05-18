
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject, AudioSource, AudioClip } from 'cc';
import { Common } from '../Common';
import { ResManager } from '../Res/ResManager';
import { DEBUG } from 'cc/env';
import { Debug } from '../Debug';
import { Platform } from '../Platform';
import { ImageRes } from '../Config/ImageRes';
import { CloudRes } from '../CloundRes/CloudRes';
import { ConfigAudio } from '../Config/ConfigAudio';

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('AudioPlay')
export class AudioPlay extends Component {
    STR_KEY_BACKGROUND_MUSIC = "KEY_BACKGROUND_MUSIC";
    KEY_ENABLE_PLAYSOUND = "KEY_ENABLE_PLAYSOUND";
    @type(AudioSource)
    audioSource: AudioSource = null;
    static _main: AudioPlay;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new AudioPlay();
            // this._main.Init();
        }
        return this._main;
    }

    onLoad() {
        // super.onLoad();
        AudioPlay._main = this;
        this.audioSource = this.node.addComponent(AudioSource);
        Debug.Log("  LoadAudio onLoad");
        // var AUDIO_Merge = Common.CLOUD_RES_DIR+"/Audio/bg3.ogg";
        // AudioPlay.main.PlayFile(AUDIO_Merge);

    }
    start() {
        // super.start();
    }
    PlayAudioClip(clip: AudioClip) {
        var ret = Common.GetBoolOfKey(this.KEY_ENABLE_PLAYSOUND, false);
        // if (!ret) {
        //     return;
        // }
        if (clip == null) {
            return;
        }
        Debug.Log("  LoadAudio PlayAudioClip play");
        this.audioSource.playOneShot(clip, 1);
        this.audioSource.play();

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
        ResManager.LoadUrlAudio(
            {
                url: url,
                success: (p: any, clip: AudioClip) => {
                    this.PlayAudioClip(clip);
                },
                fail: (p: any) => {

                },
            });
    }
    PlayFile(filepath: string) {
        console.log("  LoadAudio PlayFile=" + filepath);
        ResManager.LoadAudio(
            {
                filepath: filepath,
                success: (p: any, clip: AudioClip) => {
                    this.PlayAudioClip(clip);
                },
                fail: (p: any) => {
                    //this.PlayUrl(filepath);
                },
            });
    }
    PlayByKey(key: string) {
        var dir = "";
        if (Platform.isCloudRes) {
            // 从CloudRes缓存目录读取
            dir = CloudRes.main.rootPath;
        } else {
            // 在resoureces目录
            dir = Common.CLOUD_RES_DIR;
        }
        var filepath = dir + "/" + ConfigAudio.main.GetAudio(key);

        ResManager.LoadAudio(
            {
                filepath: filepath,
                success: (p: any, clip: AudioClip) => {
                    this.PlayAudioClip(clip);
                },
                fail: (p: any) => {
                    this.PlayUrl(filepath);
                },
            });
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
