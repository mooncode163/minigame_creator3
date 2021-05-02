
import { _decorator, CCObject } from 'cc';
import { Common } from '../Common';
const { ccclass, property, integer, float, boolean, string, type } = _decorator;


@ccclass('JsonUtil')
export class JsonUtil extends CCObject {

    //JsonData data, string key,   _defaultf 
    static GetItem(data: any, key: string, _default: string) {
        var ret = _default;
        if (this.ContainsKey(data, key)) {
            ret = data[key];
        } 
        return ret;
    }

    static GetString(data: any, key: string, _default: string) {
        var ret = _default;
        if (this.ContainsKey(data, key)) {
            ret = data[key];
        } 
        return ret;
    }
 
    //bool   //JsonData data, string key
    static ContainsKey(data: any, key: string) {
        if (Common.IsBlankString(key)) {
            return false;
        }
        if (data == null) {
            return false;
        }
        if (data[key] == null) {
            return false;
        }
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
