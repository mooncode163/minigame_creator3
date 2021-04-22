
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc'; 

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('ConfigPrefabInternal')
export class ConfigPrefabInternal extends CCObject {
    
    start () {
  
        // load Prefab
        resources.load("App/Prefab/Home/UIHomeMerge", Prefab, (err, prefab) => {
            // const newNode = instantiate(prefab);
        
        });
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
