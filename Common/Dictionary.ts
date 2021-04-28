
import { _decorator, Component, Node, CCObject, resources, Texture2D } from 'cc';
import { Debug } from './Debug';
 

const { ccclass, property } = _decorator;

// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('Dictionary')
export class Dictionary extends CCObject {
    datastore: any[] = []; 
    Init () {
     
    } 
    Add (key:string, value:any) {
        this.datastore[key] = value;
    }

    Get (key:string) {
        return this.datastore[key];
    }

    Remove (key:string) {
        delete this.datastore[key];
    }

    ShowAll () {
        var str = "";
        for (var key in this.datastore) {
            str += key + " -> " + this.datastore[key] + ";  "
        }
        Debug.Log(str);
    }

    Count () {
        /*var ss = Object.keys(this.datastore).length;
        console.log("ssss   "+ss);
        return Object.keys(this.datastore).length;*/
        /**/
        var n = 0;
        for (var key in Object.keys(this.datastore)) {
            ++n;
        }
        // Debug.Log(n);
        return n;
    }

    Clear () {
        for (var key in this.datastore) {
            delete this.datastore[key];
        }
    }

    Contains (key:string) {
        var v = this.Get(key);
        if (v == null) {
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
