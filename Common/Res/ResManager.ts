
import { _decorator, Component, Node, CCObject, resources, Texture2D, assetManager } from 'cc';
import { Debug } from '../Debug';
import { FileUtil } from '../File/FileUtil';
import { LoadTexture } from '../File/LoadTexture';

const { ccclass, property } = _decorator;

// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('ResManager')
export class ResManager extends CCObject {
    /*
      {
        filepath:"", 
        success: (p:any) => {
            
        }, 
        fail: (p:any) => {
            
        },
      }
      */
    public static Load(obj: any) {
        var key = FileUtil.GetFileBeforeExtWithOutDot(obj.filepath);
        resources.load(key, (err: any, data: any) => {
            if (data == null) {
                // Bundle resources doesn't contain 1
                console.log("ResManager Load err:" + err.message || err);
                if (obj.fail != null) {
                    obj.fail(this);
                }
            } else {
                console.log("ResManager Load is not null");
                if (obj.success != null) {
                    obj.success(this, data);
                }
            }

        });

    }


    /*
     {
       filepath:"", 
       success: (p:any,data:string) => {
           
       }, 
       fail: (p:any) => {
           
       },
     }
     */
    public static LoadText(obj: any) {
        var key = FileUtil.GetFileBeforeExtWithOutDot(obj.filepath);
        resources.load(key, (err: any, data: any) => {
            if (data == null) {
                // Bundle resources doesn't contain 1
                console.log("ResManager Load err:" + err.message || err);
                if (obj.fail != null) {
                    obj.fail(this);
                }
            } else {
                var type = typeof data;
                console.log("ResManager Load is not null type=" + type);
                if (obj.success != null) {
                    obj.success(this, data.text);
                }
            }

        });

    }

    /*
      {
          filepath:"", 
          success: function (p,tex:Texture2D) {
          },
          fail: function (p) {
          },
          progress: function (p) {
          } ,
        
      }
      */


    public static LoadTexture(obj: any) {
        // texture spriteFrame
        var pic = FileUtil.GetFileBeforeExtWithOutDot(obj.filepath) + "/texture";
        resources.load(pic, Texture2D, (err: any, texture: Texture2D) => {
            if (texture == null) {
                // Bundle resources doesn't contain 1
                console.log("ResManager texture err:" + err.message || err);
                if (obj.fail != null) {
                    obj.fail(this);
                }
            } else {
                console.log("ResManager texture is not null");
                if (obj.success != null) {
                    obj.success(this, texture);
                }
            }

        });
    }

    /*
  {
      url:"", 
      success: function (p:any,data:any) {
      },
      fail: function (p) {
      }, 
    
  }
  */
    public static LoadUrlTexture(obj: any) {
        this.LoadUrl(
            {
                url: obj.url,
                success: (p: any, tex: any) => {
                    if (obj.success != null) {


                        /*
                        let remoteUrl = "http://unknown.org/someres.png";
                    assetManager.loadRemote<ImageAsset>(remoteUrl, function (err, imageAsset) {
                        const spriteFrame = new SpriteFrame();
                        const texture = new Texture2D();
                        texture.image = imageAsset;
                        spriteFrame.texture = texture;
                        // ...
                    });
                    */
                        const texture = new Texture2D();
                        texture.image = tex;
                        obj.success(this, texture);
                    }
                },
                fail: () => {
                    if (obj.fail != null) {
                        obj.fail(this);
                    }
                },
            });
    }

    /*
  {
      url:"", 
      success: function (p:any,data:any) {
      },
      fail: function (p) {
      }, 
    
  }
  */

    //   weixin http://usr/moonma/CloudRes/Image/Star/Earth.png
    public static LoadUrl(obj: any) {
        Debug.Log("ResManager LoadUrl obj.url=" + obj.url);

        // return;
        // var pic = "/Users/moon/sourcecode/cocos/product/minigame/minigameCreator/assets/resources/App/UI/Bg/GameBg.png" 
        //    pic = "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1942783278,2082140028&fm=26&gp=0.jpg";
        // var p = this;
        assetManager.loadRemote(obj.url, function (err: any, data: any) {
            if (data == null) {
                console.log("ResManager LoadUrl is null err=", err);
                if (obj.fail != null) {
                    obj.fail(this);
                }
            } else {
                console.log("ResManager LoadUrl is not null");
                if (obj.success != null) {
                    obj.success(this, data);
                }
                // const spriteFrame = new SpriteFrame();
                // spriteFrame.texture = texture;
                // p.nodeBg.getComponent(Sprite).spriteFrame = spriteFrame;
            }
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
