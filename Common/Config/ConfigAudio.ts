
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';
import { CloudRes } from '../CloundRes/CloudRes';
import { Common } from '../Common';
import { Platform } from '../Platform';
import { ConfigAudioInternal } from './ConfigAudioInternal';
import { ConfigBase } from './ConfigBase';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('ConfigAudio')
export class ConfigAudio extends ConfigBase {
    configAudioApp: ConfigAudioInternal = null;
    configAudioCloudRes: ConfigAudioInternal = null;
    static _main: ConfigAudio;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new ConfigAudio();
            this._main.Init();
        }
        return this._main;
    }
    Init() {

        {
            var strDir = Common.RES_CONFIG_DATA + "/Audio";
            var fileName = "ConfigAudioApp.json";
            { 
                this.configAudioApp = new ConfigAudioInternal();
                this.configAudioApp.fileJson = strDir + "/" + fileName;
                this.listItem.push(this.configAudioApp);
            }
        } 
        if (!Platform.isCloudRes) {
            strDir = Common.CLOUD_RES_DIR;
            fileName = "AudioCloudRes.json";
            {
                this.configAudioCloudRes = new ConfigAudioInternal();
                this.configAudioCloudRes.fileJson = strDir + "/" + fileName;
                this.listItem.push(this.configAudioCloudRes);
            }

        }
    }

    GetAudio(key: string) {
        var ret = "";

        if (Common.BlankString(key)) {
            return ret;
        }
        this.listItem.forEach((item) => {
            var p = item as ConfigAudioInternal;
            if (Common.BlankString(ret)) {
                if (p != null) {
                    ret = p.GetAudio(key);
                    if (p == this.configAudioCloudRes) {
                        if (Platform.isCloudRes) {
                            // 从CloudRes缓存目录读取
                            ret = CloudRes.main.rootPath+"/" + ret;
                        }else{
                            // 在resoureces目录
                            ret = Common.CLOUD_RES_DIR + "/" + ret;
                        }
                    }

                }
            } else {
                return;
            }
        }); 


        return ret;
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
