
import { _decorator, Component, Node, CCObject, resources, Prefab, Texture2D, SpriteFrame } from 'cc';
import { Debug } from '../Debug';
import { Dictionary } from '../Dictionary';
import { ResManager } from '../Res/ResManager';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('TextureCache')
export class TextureCache extends CCObject {
    dicItem: any;
    static _main: TextureCache;
    //静态方法
    static get main() {
        console.log("TextureCache Main");
        if (this._main == null) {
            this._main = new TextureCache();
            this._main.Init();
        }
        return this._main;
    }
    Init() {
        this.dicItem = new Dictionary();
    }

   
    /*
{ 
     filepath:"", 
     isCloud:false,
  success: (p:any,tex:Texture2D) => {
      
  }, 
  fail: (p:any) => {
      
  },
}
*/
    Load(obj: any) {
        var key = obj.filepath;
        if (this.dicItem.Contains(key) == true) {
            var tex = this.dicItem.Get(key);
            Debug.Log("TextureCache  load  from cache key="+key);
            if (obj.success != null) {
                obj.success(this, tex);
            }
        } else 
        {
            this.LoadNotCache(obj);
        }

        
    }

    LoadFrame(obj: any) {

    }

    /*
{ 
   filepath:"", 
   isCloud:false,
success: (p:any,tex:Texture2D) => {
    
}, 
fail: (p:any) => {
    
},
}
*/
    LoadNotCache(obj: any) {
        // if(obj.isCloud)
        // {
        //     this.LoadWithCloud(obj);
        //     return;
        // }

        ResManager.LoadTexture(
            {
                filepath: obj.filepath,
                success: (p: any, tex: any) => {
                    var key = obj.filepath;
                     this.dicItem.Add(key, tex);
                    if (obj.success != null) {
                        obj.success(this, tex);
                    }
                },
                fail: (p: any) => {
                    // if (obj.fail != null) {
                    //     obj.fail(this);
                    // }
                    if(obj.isCloud)
                    {
                        this.LoadWithCloud(obj);
                    }
                },
            });
    }


    /*
{ 
filepath:"", 
isCloud:false,
success: (p:any,tex:Texture2D) => {
 
}, 
fail: (p:any) => {
 
},
}
*/
    LoadWithCloud(obj: any) {

        if (obj.isCloud) {
            ResManager.LoadUrlTexture(
                {
                    url: obj.filepath,
                    success: (p: any, tex: any) => {
                        var key = obj.filepath;
                        this.dicItem.Add(key, tex);
                        if (obj.success != null) {
                            obj.success(this, tex);
                        }
                    },
                    fail: (p: any) => {
                        if (obj.fail != null) {
                            obj.fail(this);
                        }
                    },
                });
        } else {

            ResManager.LoadTexture(
                {
                    filepath: obj.filepath,
                    success: (p: any, tex: any) => {
                        var key = obj.filepath;
                        this.dicItem.Add(key, tex);
                        if (obj.success != null) {
                            obj.success(this, tex);
                        }
                    },
                    fail: (p: any) => {
                        if (obj.fail != null) {
                            obj.fail(this);
                        }
                    },
                });

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
