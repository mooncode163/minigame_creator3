
import { _decorator, Component, Node, Prefab } from 'cc';
import { UIView } from '../../Common/UIKit/ViewController/UIView';
import { Debug } from '../Debug';
import { Platform } from '../Platform';
import { CloudRes } from './CloudRes';
import { ResManager } from '../Res/ResManager';
const { ccclass, property, type } = _decorator;

@ccclass('CloudResVersion')
export class CloudResVersion {
    static _main: CloudResVersion;
    //静态方法
    static get main() { 
        if (this._main == null) {
            this._main = new CloudResVersion();
        }
        return this._main;
    }
    rootJson = null;
    get version() {

        if (this.rootJson != null) {
            return this.rootJson.version;
        }
        return "0.0.0";

    }

    /*
        {  
          success: (p:any) => {
              
          }, 
          fail: (p:any) => {
              
          },
        }
        */
    Load(obj:any) {
        // this.callbackFinish = cbFinish;
        // if (this.rootJson != null) {
        //     if (this.callbackFinish != null) {
        //         this.callbackFinish();
        //     }
        //     return;
        // }
        // var dirRoot = Common.CLOUD_RES_DIR;
        // if (Common.main().isWeiXin) {
        //     dirRoot = FileSystemWeixin.main().GetRootDirPath() + "/" + Common.CLOUD_RES_DIR_NAME;
        // }
        var dirRoot = CloudRes.main.rootPath;
        var filepath = dirRoot + "/version.json";

        // if (Platform.isWeiXin) {
        //     // 加载json文件 { ext: ".json" }
        //     assetManager.loadRemote(filepath, function (err, rootJson) {
        //         this.LoadFinish(err, rootJson);
        //     }.bind(this));
        // } else {
        //     //JsonAsset   loader.load
        //     //去除后缀
        //     filepath = FileUtil.GetFileBeforeExtWithOutDot(filepath);
        //     resources.load(filepath, function (err, rootJson) {
        //         this.LoadFinish(err, rootJson);
        //     }.bind(this));
        // }

        if (Platform.isWeiXin) {
            ResManager.LoadUrl(
                {
                    url: filepath,
                    success: (p: any, data: any) => {
                        this.rootJson = data.json;
                        this.ParseData();
                        if (obj.success != null) {
                            obj.success(this);
                        }
                    },
                    fail: () => {
                        if (obj.fail != null) {
                            obj.fail(this);
                        }
                    },
                });

        } else {


            ResManager.Load(
                {
                    filepath: filepath,
                    success: (p: any, data: any) => {
                        this.rootJson = data.json;
                        this.ParseData();
                        if (obj.success != null) {
                            obj.success(this);
                        }
                    },
                    fail: () => {
                        if (obj.fail != null) {
                            obj.fail(this);
                        }
                    },
                });
        }

    }

    ParseData() {
        // var word = this.rootJson.words;

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
