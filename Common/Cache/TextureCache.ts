
import { _decorator, Component, Node, CCObject, resources, Prefab, Texture2D, SpriteFrame } from 'cc';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('TextureCache')
export class TextureCache extends CCObject {
    dicItem:any;
    static _main:TextureCache;
    //静态方法
    static get  main(){
        console.log("TextureCache Main");
        if(this._main==null)
        {
            this._main = new TextureCache();
        }
        return this._main;
    }
        /*
        {
            filepath:"",
            bind:any,
            success: function (tex:Texture2D) {
            },
            fail: function (res) {
            },
            progress: function (res) {
            } ,
          
        }
        */
    Load(obj:any) {
        console.log("TextureCache Load");        // load a texture
        // obj.filepath = "test"
        //  resources.load(obj.filepath, Texture2D, (err: any, texture: Texture2D) 会失败
        resources.load(obj.filepath, (err: any, texture: Texture2D) => {
            console.log("TextureCache callback Load obj.filepath=",obj.filepath," err=",err);   
            // spriteFrame.texture = texture;
            if(texture!=null)
            {
                console.log("TextureCache texture is not null");
            }else{
                console.log("TextureCache texture is  null");
            }
            if (obj.success != null) {
                obj.success(obj.bind,texture);
            }

        });
    }

    LoadFrame(obj:any) {
        console.log("TextureCache Load");        // load a texture
        // obj.filepath = "test"
        //  resources.load(obj.filepath, Texture2D, (err: any, texture: Texture2D) 会失败
        resources.load(obj.filepath, (err: any, frame: SpriteFrame) => {
            console.log("TextureCache callback Load obj.filepath=",obj.filepath," err=",err);   
            // spriteFrame.texture = texture;
            if(frame!=null)
            {
                console.log("TextureCache frame is not null");
            }else{
                console.log("TextureCache frame is  null");
            }
            if (obj.success != null) {
                obj.success(obj.bind,frame);
            }

        });
    }
    LoadNotCache(filepath:string) {

        // load a texture
        resources.load(filepath, Texture2D, (err: any, texture: Texture2D) => {

            // spriteFrame.texture = texture;

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
