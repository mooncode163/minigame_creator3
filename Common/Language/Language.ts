
import { _decorator, Component, Node, CCObject, resources, Texture2D } from 'cc';
import { LanguageInternal } from './LanguageInternal';
import { ConfigBase } from '../Config/ConfigBase';
import { Common } from '../Common';

const { ccclass, property } = _decorator;

// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('Language')
export class Language extends ConfigBase {
    countLoad = 0;
    listItem: LanguageInternal[] = []; 
    static _main: Language;
    //静态方法
    static Main() {
        if (this._main == null) {
            this._main = new Language();
            this._main.Init();
        }
        return this._main;
    }
    Init() {

        var strDir = Common.RES_CONFIG_DATA + "/config";
        var fileName = "config_android";
        
        {
            // this.configCommon = new LanguageInternal();
            // fileName = "config_common";
            // this.configCommon.fileJson = strDir + "/" + fileName;
            // this.listItem.push(this.configCommon);
        }

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
                    success: (p: any) => {
                        this.OnFinish(obj);
                    },
                    fail: () => {
                        // this.OnFinish(obj);
                    },
                });
        });

    }

    OnFinish(obj: any) {
        this.countLoad++;
        if (this.countLoad >= this.listItem.length) {
            if (obj.success != null) {
                obj.success(this);
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
