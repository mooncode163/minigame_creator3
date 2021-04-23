
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';
import { Debug } from '../Debug';
import { FileUtil } from '../File/FileUtil';
import { JsonUtil } from '../File/JsonUtil';
import { ResManager } from '../Res/ResManager';
import { LayOutGrid } from '../UIKit/LayOut/LayOutGrid';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('ConfigInternal')
export class ConfigInternal extends CCObject {

    rootJson: any = null;
    fileJson = ""; 
    /*
   {   
   success: function (p) {
   },
   fail: function () {
   }, 
   }
   */
    Load(obj: any) {
        var key = FileUtil.GetFileBeforeExtWithOutDot(this.fileJson);
        ResManager.Load(
            {
                filepath: key,
                success: (p: any, data: any) => {
                    // this.OnFinish(obj);
                    this.rootJson = data.json;
                    if (obj.success != null) {
                        obj.success(this);
                    }
                },
                fail: () => {
                    // this.OnFinish(obj);
                },
            });

        // resources.load(key, (err: any, rootJson: any) => {
        //     console.log("rootJson callback Load obj.filepath=",this.fileJson," err=",err);   
        //     // spriteFrame.texture = texture;
        //     if(rootJson!=null)
        //     {
        //         console.log("rootJson texture is not null");
        //     }else{
        //         console.log("rootJson texture is  null");
        //     }
        //     if (obj.success != null) {
        //         obj.success(this);
        //     }

        //     this.rootJson = rootJson.json;

        // });

    }
    GetString(key: string, def: string) {
        return JsonUtil.GetItem(this.rootJson, key, def);
    }
    GetAppIdOfStore(store: string) {
        Debug.Log("GetAppIdOfStore store=" + store);
        var appid = this.rootJson.APPID;
        var strid = "0";
        if (appid.store != null) {
            strid = appid.store;
        }
        Debug.Log("GetAppIdOfStore appid= " + strid + "store=" + store);
        return strid;
    }

    IsHaveKey(key: string) {
        return JsonUtil.ContainsKey(this.rootJson, key);
    }

    ParseData(json: string) {
        if (json == null) {
            Debug.Log("ConfigInternal:ParseData=null");
        }
        this.rootJson = json;
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
