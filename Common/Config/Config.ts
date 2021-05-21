
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';
import { Common } from '../Common';
import { Device } from '../Device';
import { Platform } from '../Platform';
import { Source } from '../Source';
import { ConfigInternal } from './ConfigInternal';
import { ConfigBase } from './ConfigBase';
import { Debug } from '../Debug';
import { JsonUtil } from '../File/JsonUtil';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('Config')
export class Config extends ConfigBase {
    configApp: ConfigInternal = null;
    configCommon: ConfigInternal = null;
    get appKeyName() {
        return this.configCommon.GetString("APP_NAME_KEYWORD", "");
    }
    get appType() {
        return this.configCommon.GetString("APP_TYPE", "");
    }

  
    get shareUrl() {
        return this.configCommon.GetShareUrl();
    }
    get shareTitle() {
        return this.configCommon.GetShareTitle();
    }
    get version() {
        return this.configCommon.GetString("version", "");
    }


    get appId() {
        Debug.Log("GetAppIdOfStore get=");
        var key_store = Source.APPSTORE;
        if (Platform.isAndroid) {
            key_store = this.channel;
        }
        if (Platform.isWeiXin) {
            key_store = Source.WEIXIN;
        }
        Debug.Log("GetAppIdOfStore key_store=" + key_store);
        var strid = this.configApp.GetAppIdOfStore(key_store);
        return strid;
    }

    get channel() {
        var ret = Source.XIAOMI;
        if (Platform.isiOS) {
            ret = Source.APPSTORE;
        }
        if (Platform.isAndroid) {
            //ret = GetStringJson(rootJsonChannel, "channel_android", Source.XIAOMI);
        }
        // if (Common.isWeb) {
        //     ret = Source.FACEBOOK;
        // }
        return ret;
    }
    get isHaveRemoveAd() {
        var ret = true;
        if (Platform.isAndroid) {
            ret = false;
            if (this.channel == Source.GP) {
                //GP市场内购
                ret = true;
            }
        }
        if (Platform.isWin) {
            ret = false;
        }
        return ret;
    }

    get APP_FOR_KIDS() {
        return this.configCommon.GetString("APP_FOR_KIDS", "");
    }
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


    // OnFinish (obj)
    // {
    // this.countLoad++;
    // if (this.countLoad >= this.countMax) {
    //     if (obj.success != null) {
    //         obj.success(this);
    //     }
    // }
    // }

    InitValue() {

    }
 /*
     { 
       success: (p:any) => {
           
       }, 
       fail: (p:any) => {
           
       },
     }
     */
     LoadCloudConfig(obj: any) {
        if (Platform.isCloudRes) { 
            var strDir = Common.RES_CONFIG_DATA + "/config";
            var fileName = "config_common.json";
            { 
                this.configCommon.fileJson = strDir + "/" + fileName; 
                this.configCommon.Load(
                    {
                        isCloud: false,
                        success: (p: any) => {
                            // this.OnFinish(obj,false);
                            Debug.Log("Config LoadCloudConfig success=");
                            if (obj.success != null) {
                                obj.success(this);
                            }
                        },
                        fail: () => {
                            // this.OnFinish(obj,true);
                            Debug.Log("Config LoadCloudConfig fail=");
                            if (obj.fail != null) {
                                obj.fail(this);
                            }
                        },
                    });
            }

        } else {
            if (obj.success != null) {
                obj.success(this);
            }
        }
    }
    

    IsHaveKey(key) {
        return JsonUtil.ContainsKey(this.rootJson, key);
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
