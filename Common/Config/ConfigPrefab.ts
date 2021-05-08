
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';
import { Common } from '../Common';
import { ConfigPrefabInternal } from './ConfigPrefabInternal';
import { ConfigBase } from './ConfigBase';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('ConfigPrefab')
export class ConfigPrefab extends ConfigBase {
    configPrefabApp: ConfigPrefabInternal = null;
    configPrefabAppCommon: ConfigPrefabInternal = null;
    configPrefabCommon: ConfigPrefabInternal = null;


    static _main: ConfigPrefab;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new ConfigPrefab();
            this._main.Init();
        }
        return this._main;
    }
    Init() {
        {
            var strDir = Common.RES_CONFIG_DATA + "/Prefab";
            var fileName = "ConfigPrefabApp.json";
            {
                this.configPrefabApp = new ConfigPrefabInternal();
                this.configPrefabApp.fileJson = strDir + "/" + fileName;
                this.listItem.push(this.configPrefabApp);
            }
        }
        {
            var strDir = Common.RES_CONFIG_DATA + "/Prefab";
            var fileName = "ConfigPrefabAppCommon.json";
            {
                this.configPrefabAppCommon = new ConfigPrefabInternal();
                this.configPrefabAppCommon.fileJson = strDir + "/" + fileName;
                this.listItem.push(this.configPrefabAppCommon);
            }
        }
        {

            var filepath = "Common/Prefab/ConfigPrefab.json";
            {
                this.configPrefabCommon = new ConfigPrefabInternal();
                this.configPrefabCommon.fileJson = filepath;
                this.listItem.push(this.configPrefabCommon);
            }
        }
    }


    IsContainsKey(key: string) {
        var ret = false;
        if (this.configPrefabApp != null) {
            ret = this.configPrefabApp.ContainsKey(key);
        }
        if (!ret) {
            if (this.configPrefabAppCommon != null) {
                ret = this.configPrefabAppCommon.ContainsKey(key);
            }
        }
        if (!ret) {
            if (this.configPrefabCommon != null) {
                ret = this.configPrefabCommon.ContainsKey(key);
            }
        }
        return ret;
    }
    GetPrefab(key: string) {
        var ret = "";
        if (this.configPrefabApp != null) {
            ret = this.configPrefabApp.GetPrefabSync(key);
        }
        if (!ret) {
            if (this.configPrefabAppCommon != null) {
                ret = this.configPrefabAppCommon.GetPrefabSync(key);
            }
        }
        if (!ret) {
            if (this.configPrefabCommon != null) {
                ret = this.configPrefabCommon.GetPrefabSync(key);
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
