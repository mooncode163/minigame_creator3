
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';
import { FileUtil } from '../File/FileUtil';
import { JsonUtil } from '../File/JsonUtil';
import { ResManager } from '../Res/ResManager'; 
import { ConfigInternal } from '../Config/ConfigInternal';
import { ConfigInternalBase } from '../Config/ConfigInternalBase';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('LanguageInternal')
export class LanguageInternal extends ConfigInternalBase {
    rootJson: any = null;
    fileJson = "";

    /*
      { 
        success: (p:any) => {
            
        }, 
        fail: (p:any) => {
            
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
                    if (obj.fail != null) { 
                        obj.fail(this);
                    }
                },
            });
    }
    GetString(key: string) {
        return JsonUtil.GetItem(this.rootJson, key, "def");
    }

    IsHaveKey(key: string) {
        return JsonUtil.ContainsKey(this.rootJson, key);
    }
    SetLanguage (lan:any) { 
        
    }
    GetLanguage() {
     
    }
    
    IsContainsKey(key:string) { 

        return true;
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
