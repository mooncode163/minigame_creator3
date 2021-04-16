
import { _decorator, Component, Node, CCObject, resources, Texture2D } from 'cc';

const { ccclass, property } = _decorator;

// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('ResManager')
export class ResManager extends CCObject {

    
    /*
      {
          filepath:"",
          bind:any,
          success: function (tex:Texture2D) {
          },
          fail: function (p) {
          },
          progress: function (p) {
          } ,
        
      }
      */
    Load(obj: any) {
        console.log("TextureCache Load");        // load a texture
        var pic = obj.filepath+"/texture";
        resources.load(pic, Texture2D, (err: any, texture: Texture2D) => {
            if (texture == null) { 
                // Bundle resources doesn't contain 1
                console.log("Test texture err:" + err.message || err);
                if (obj.fail != null) {
                    obj.fail(obj.bind);
                }
            } else {
                console.log("Test texture is not null");
                if (obj.success != null) {
                    obj.success(obj.bind, texture);
                }
            }

        });

        //   pic = "AlertBoard/spriteFrame"
        // obj.filepath = "test"
        //  resources.load(obj.filepath, Texture2D, (err: any, texture: Texture2D) 会失败
        // resources.load(obj.filepath, (err: any, texture: Texture2D) => {
        //     console.log("TextureCache callback Load obj.filepath=", obj.filepath, " err=", err);
        //     // spriteFrame.texture = texture;
        //     if (texture != null) {
        //         console.log("TextureCache texture is not null");
        //     } else {
        //         console.log("TextureCache texture is  null");
        //     }
        //     if (obj.success != null) {
        //         obj.success(obj.bind, texture);
        //     }

        // });
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
