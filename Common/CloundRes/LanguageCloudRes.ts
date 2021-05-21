
import { _decorator, Component, Node, CCObject, resources, Texture2D } from 'cc';
 
import { ConfigBase } from '../Config/ConfigBase';
import { Common } from '../Common';
import { LanguageInternal } from '../Language/LanguageInternal';

const { ccclass, property } = _decorator;

// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('LanguageCloudRes')
export class LanguageCloudRes extends ConfigBase { 
    languageCommon: LanguageInternal = null; 

 

    static _main: LanguageCloudRes;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new LanguageCloudRes();
            this._main.Init();
        }
        return this._main;
    }


    Init() {
        

        {
            var strDir = Common.RES_CONFIG_DATA_COMMON + "/language";
            var fileName = "language_cloudres.csv";
            {
                this.languageCommon = new LanguageInternal();
                this.languageCommon.fileJson = strDir + "/" + fileName;
                this.listItem.push(this.languageCommon);
            }
        }
 
    }


    SetLanguage(lan: any) {
        
        if (this.languageCommon != null) {
            this.languageCommon.SetLanguage(lan);
        }
    }

    GetLanguage() {
        if (this.languageCommon != null) {
            return this.languageCommon.GetLanguage();
        }
    }
    GetString(key: string) { 
        var str = "";
       
        if (str == "") {
            if (this.languageCommon != null) {
                str = this.languageCommon.GetString(key);
            }
        }

        return str;

    }


    //
    GetReplaceString(key: string, replace: string, strnew: string) {
        // string str = GetString(key);
        // str = str.Replace(replace, strnew);
        // return str;
    }

    IsContainsKey(key: string) { 
        var ret = true; 

        if (!ret) {
            if (this.languageCommon != null) {
                ret = this.languageCommon.IsContainsKey(key);
            }
        }
        return ret;
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
