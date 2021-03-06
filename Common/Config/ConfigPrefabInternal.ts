
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc'; 
import { JsonUtil } from '../File/JsonUtil';
import { ConfigInternalBase } from './ConfigInternalBase';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('ConfigPrefabInternal')
export class ConfigPrefabInternal extends ConfigInternalBase { 
    ContainsKey(key:string)
    { 
        return JsonUtil.ContainsKey(this.rootJson, key);
    }
    //同步 synchronization
   
    GetPrefabSync(key:string) {
        return JsonUtil.GetItem(this.rootJson, key, ""); 
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
