
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';
import { Debug } from '../Debug';
import { FileUtil } from '../File/FileUtil';
import { JsonUtil } from '../File/JsonUtil';
import { ResManager } from '../Res/ResManager';
import { ColorConfigInternal } from './ColorConfigInternal';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('ConfigInternalBase')
export class ConfigInternalBase extends CCObject {
    rootJson: any = null;
    fileJson = "";

    /*
      { 
        isCloud:false,
        success: (p:any) => {
            
        }, 
        fail: (p:any) => {
            
        },
      }
      */
    Load(obj: any) {
        if (obj.isCloud) {
            ResManager.LoadUrl(
                {
                    url: this.fileJson,
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

            var key = FileUtil.GetFileBeforeExtWithOutDot(this.fileJson);
            ResManager.Load(
                {
                    filepath: key,
                    success: (p: any, data: any) => {
                        Debug.Log("ConfigInternalBase success key=" + key);
                        // this.OnFinish(obj);
                        this.rootJson = data.json;
                        this.ParseData();
                        if (obj.success != null) {
                            obj.success(this);
                        }
                    },
                    fail: () => {
                        Debug.Log("ConfigInternalBase fail ");
                        // this.OnFinish(obj);
                        if (obj.fail != null) {
                            // Debug.Log("ConfigInternalBase fail this");
                            obj.fail(this);
                        }
                    },
                });
        }

    }
    GetString(key: string, def: string) {
        return JsonUtil.GetItem(this.rootJson, key, def);
    }

    IsHaveKey(key: string) {
        return JsonUtil.ContainsKey(this.rootJson, key);
    }

    ParseData() {

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
