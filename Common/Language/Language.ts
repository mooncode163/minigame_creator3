
import { _decorator, Component, Node, CCObject, resources, Texture2D } from 'cc';
import { LanguageInternal } from './LanguageInternal';
import { ConfigBase } from '../Config/ConfigBase';
import { Common } from '../Common';

const { ccclass, property } = _decorator;

// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('Language')
export class Language extends ConfigBase {
    languageApp: LanguageInternal = null;
    languageAppCommon: LanguageInternal = null;
    languageCommon: LanguageInternal = null;
    languageGame: LanguageInternal = null;


    // defaultLanId:
    // {
    //     get () {
    //         var ret = cc.sys.LANGUAGE_CHINESE;
    //         if (cc.sys.platform == cc.sys.MOBILE_BROWSER) {
    //             ret = cc.sys.LANGUAGE_ENGLISH;
    //         }
    //         return ret;
    //     }
    // }

    static _main: Language;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new Language();
            this._main.Init();
        }
        return this._main;
    }


    Init() {

        var strDir = Common.RES_CONFIG_DATA + "/language";
        var fileName = "language.json";
        {
            this.languageApp = new LanguageInternal();
            this.languageApp.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.languageApp);
        }


    }

    GetLoadInfoById(id: string) {
        for (let info of Language.listLoad) {
            if (info.id == id) {
                return info;
            }
        }
        return null;
    }
    SetLanguage(lan: any) {
        if (this.languageApp != null) {
            this.languageApp.SetLanguage(lan);
        }
        if (this.languageGame != null) {
            this.languageGame.SetLanguage(lan);
        }
        if (this.languageAppCommon != null) {
            this.languageAppCommon.SetLanguage(lan);
        }
        if (this.languageCommon != null) {
            this.languageCommon.SetLanguage(lan);
        }
    }

    GetLanguage() {
        if (this.languageApp != null) {
            return this.languageApp.GetLanguage();
        }
    }
    GetString(key: string) {
        var str = this.languageApp.GetString(key);
        if (str == "") {
            if (this.languageAppCommon != null) {
                str = this.languageAppCommon.GetString(key);
            }
        }

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

        var ret = this.languageApp.IsContainsKey(key);
        if (!ret) {
            if (this.languageAppCommon != null) {
                ret = this.languageAppCommon.IsContainsKey(key);
            }
        }

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
