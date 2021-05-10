
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';
import { Debug } from '../Debug';
import { Device } from '../Device';
import { FileUtil } from '../File/FileUtil';
import { JsonUtil } from '../File/JsonUtil';
import { ResManager } from '../Res/ResManager';
import { LayOutGrid } from '../UIKit/LayOut/LayOutGrid';
import { ConfigInternalBase } from './ConfigInternalBase';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('ConfigInternal')
export class ConfigInternal extends ConfigInternalBase {
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

    GetString (key, def) { 
        return JsonUtil.GetItem(this.rootJson, key, def); 
    }

    GetCloudResUrl () { 
        var key = "url";
        if(Device.main.isLandscape)
        {
            key = "url_hd";
        }
        return JsonUtil.GetItem(this.rootJson.CloudRes, key, ""); 
    }


    GetShareUrl () { 
        var key = "url"; 
        return JsonUtil.GetItem(this.rootJson.Share, key, ""); 
    }

    GetShareTitle () { 
        var key = "title"; 
        return JsonUtil.GetItem(this.rootJson.Share, key, ""); 
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
