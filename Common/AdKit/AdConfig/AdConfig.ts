
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';
import { Common } from '../../Common';
import { ConfigBase } from '../../Config/ConfigBase';
import { Device } from '../../Device';
import { Platform } from '../../Platform';
import { AdConfigInternal } from './AdConfigInternal';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('AdConfig')
export class AdConfig extends ConfigBase {

    adConfigApp: AdConfigInternal = null;

    static _main: AdConfig;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new AdConfig();
            this._main.Init();
        }
        return this._main;
    }
    Init() {

        var strDir = Common.RES_CONFIG_DATA + "/adconfig";
        var fileName = "ad_config_ios";
        {
            if (Platform.isAndroid) {
                fileName = "ad_config_android";
            }
            if (Platform.isiOS) {
                fileName = "ad_config_ios";
            }

            if (Platform.isWin) {
                // fileName = "ad_config_" + Source.WIN;
                fileName = "ad_config_win";
            }

            if (Platform.isWeiXin) {
                fileName = "ad_config_weixin";
            }
            if (Device.main.isLandscape) {
                fileName += "_hd";
            }

            this.adConfigApp = new AdConfigInternal();
            this.adConfigApp.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.adConfigApp);
        }


    }

    GetAppId(source: string) {
        return this.adConfigApp.GetAppId(source);
    }

    GetAdKey(source: string, type: number) {
        return this.adConfigApp.GetAdKey(source, type);
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
