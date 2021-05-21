
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc'; 
import { ConfigBase } from '../Config/ConfigBase';
import { Debug } from '../Debug';
import { ConfigCloudRes } from './ConfigCloudRes';
import { ImageResCloudRes } from './ImageResCloudRes';
import { LanguageCloudRes } from './LanguageCloudRes';
const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('CloudResPreLoad')
export class CloudResPreLoad extends CCObject {
    countLoad = 0; 

    listItem: ConfigBase[] = [];

    static _main: CloudResPreLoad;
    //get 的用法
    static get main() {
        if (this._main == null) {
            this._main = new CloudResPreLoad();
            this._main.Init();
        }
        return this._main;
    } 

    Init() {
 
        this.listItem.push(ConfigCloudRes.main);
        this.listItem.push(LanguageCloudRes.main);
        this.listItem.push(ImageResCloudRes.main);
        
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
        this.countLoad = 0;
        this.listItem.forEach((item) => {
            item.Load(
                {
                    isCloud:false,
                    success: (p: any) => {
                        Debug.Log("CloudResPreLoad success this.countLoad="+this.countLoad);
                        this.OnFinish(obj,false);
                        
                    },
                    fail: (p:any) => {
                        Debug.Log("CloudResPreLoad fail this.countLoad="+this.countLoad);
                        this.OnFinish(obj,true);
                        
                    },
                });
        }); 

     

    } 

    OnFinish(obj: any,isFail:boolean) {
        this.countLoad++;
        if (this.countLoad >= this.listItem.length) {
          
            if(isFail)
            {
                if (obj.fail != null) {
                    obj.fail(this);
                }
            }else{
                if (obj.success != null) {
                    obj.success(this);
                }
            }
        }
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
