
import { _decorator, Component, Node, CCObject, resources, Prefab, Vec4 } from 'cc';
import { Debug } from '../Debug';
import { JsonUtil } from '../File/JsonUtil';
import { ConfigInternalBase } from './ConfigInternalBase';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('ImageResInternal')
export class ImageResInternal extends ConfigInternalBase {
    public KEY_BOARD: string = "board";
    public KEY_PATH: string = "path";
    rootJson: any = null; 
    
    // 255,100,200,255 to color return Vector4 47,47,47,255
    //Vector4 (left,right,top,bottom)
    String2Vec4(str: string) {
        var x, y, z, w;
        // var rgb = str.Split(',');
        var rgb = str.split(",");
        x = Number(rgb[0]);
        y = Number(rgb[1]);
        z = Number(rgb[2]);
        w = Number(rgb[3]);
        return new Vec4(x, y, z, w);
    }
    GetBoardKey(key: string) {
        return key + "_BOARD";
    }

    FindKeyByPath(path: string) {
        var str = "";
        {
            if (this.rootJson != null) {
                for (var keytmp in this.rootJson) {
                    if (JsonUtil.GetString(this.rootJson[keytmp], this.KEY_BOARD, "") == path) {
                        str = keytmp;
                        break;
                    }
                }
            }
        }
        return str;
    }

    GetImageBoardString(key: string) {
        var str = "";
        str = JsonUtil.GetString(this.rootJson[key], this.KEY_BOARD, "");
        return str;
    }

    //9宫格图片边框参数 (left,right,top,bottom)
    //cc.Vec4 (left,right,top,bottom)
    GetImageBoard(key: string) {
        var str = JsonUtil.GetString(this.rootJson[key], this.KEY_BOARD, "");
        return this.String2Vec4(str);
    }

    IsHasKey(key: string) {
        return JsonUtil.ContainsKey(this.rootJson, key);
    }
    IsHasBoard(key: string) {
        if (!this.IsHasKey(key)) {
            return false;
        }
        return JsonUtil.ContainsKey(this.rootJson[key], this.KEY_BOARD);
    }
    GetImage(key: string) {
        if (JsonUtil.ContainsKey(this.rootJson, key)) {
            return JsonUtil.GetString(this.rootJson[key], this.KEY_PATH, "");
        }
        Debug.Log("GetImage _NO_KEY_ =" + key);
        // return "_NO_KEY_";
        return "";
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
