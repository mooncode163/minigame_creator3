
import { _decorator, Component, Node, CCObject, resources, Prefab, sys } from 'cc';
import { FileUtil } from '../File/FileUtil';
import { JsonUtil } from '../File/JsonUtil';
import { ResManager } from '../Res/ResManager'; 
import { ConfigInternal } from '../Config/ConfigInternal';
import { ConfigInternalBase } from '../Config/ConfigInternalBase';
import { LTLocalization } from './LTLocalization';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('LanguageInternal')
export class LanguageInternal extends ConfigInternalBase {
    rootJson: any = null;
    fileJson = "";
    ltLocalization: LTLocalization = null; 
    //get 的用法
    get defaultLanId(): string {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        var ret = sys.LANGUAGE_CHINESE;
        if (sys.platform == sys.MOBILE_BROWSER) {
            ret = sys.LANGUAGE_ENGLISH;
        }
        return ret;
    } 
 
    /*
      { 
        success: (p:any) => {
            
        }, 
        fail: (p:any) => {
            
        },
      }
      */
    Load(obj: any) {
        this.ltLocalization = new LTLocalization();
        var key = FileUtil.GetFileBeforeExtWithOutDot(this.fileJson);
        ResManager.LoadText(
            {
                filepath: key,
                success: (p: any, data: string) => {
                    // this.OnFinish(obj); 
                    this.ltLocalization.ReadData(data);
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
        var str = "";
        if (this.IsContainsKey(key)) {
            // cc.Debug.Log("GetString: IsContainsKey key=" + key);
            str = this.ltLocalization.GetText(key);
        }
        return str;
    }

    IsHaveKey(key: string) {
        return JsonUtil.ContainsKey(this.rootJson, key);
    }
    SetLanguage (lan:string) { 
        this.ltLocalization.SetLanguage(lan);
    }
    GetLanguage() {
     return this.ltLocalization.GetLanguage();
    }
    
    IsContainsKey(key:string) { 
        return this.ltLocalization.IsContainsKey(key);
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
