
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';
import { Common } from '../Common';
import { Device } from '../Device';
import { Platform } from '../Platform';
import { Source } from '../Source';
import { ConfigInternal } from './ConfigInternal';
import { ConfigBase } from './ConfigBase';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('Config')
export class Config extends ConfigBase {
    configApp: ConfigInternal = null;
    configCommon: ConfigInternal = null;
  
    static _main: Config;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new Config();
            this._main.Init();
        }
        return this._main;
    }

    Init() {

        var strDir = Common.RES_CONFIG_DATA + "/config";
        var fileName = "config_android";
        {
            if (Platform.isAndroid) {
                fileName = "config_android";
            }
            if (Platform.isiOS) {
                fileName = "config_ios";
            }

            if (Platform.isWin) {
                fileName = "config_" + Source.WIN;
                fileName = "config_android";
            }

            if (Platform.isWeiXin) {
                fileName = "config_weixin";
            }
            if (Device.main.isLandscape) {
                fileName += "_hd";
            }

            this.configApp = new ConfigInternal();
            this.configApp.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.configApp);
        }
        {
            this.configCommon = new ConfigInternal();
            fileName = "config_common";
            this.configCommon.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.configCommon);
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
