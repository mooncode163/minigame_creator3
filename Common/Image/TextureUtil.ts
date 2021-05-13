
import { _decorator, Component, Node, Sprite, CCObject, resources, Prefab, Vec4, Texture2D, SpriteFrame } from 'cc';
import { TextureCache } from '../Cache/TextureCache';
import { Debug } from '../Debug';


const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('TextureUtil')
export class TextureUtil extends CCObject {
    // static UpdateImageTexture(image: Sprite, filepath: string, isUpdateSize: boolean) {
    //     this.UpdateImageTexture(image, filepath, isUpdateSize, Vec4.ZERO);
    // }

    // static UpdateImageTexture(image: Sprite, filepath: string, isUpdateSize: boolean, border: Vec4) {
    //     var tex = TextureUtil.main.Load(filepath);
    //     this.UpdateImageTexture(image, tex, isUpdateSize, border);
    // }
    // static UpdateImageTexture(image: Sprite, tex: Texture2D, isUpdateSize: boolean) {
    //     this.UpdateImageTexture(image, tex, isUpdateSize, Vec4.ZERO);
    // }


    /*
{


  sprite:cc.Sprite,
    pic: "",
    isCloud:false,
    def: "",
    type:cc.Sprite.Type.SIMPLE,//SLICED
    left:0,
    right:0,
    top:0,
    bottom:0,
     success: (p:any) => {
   
}, 
fail: (p:any) => {
   
}, 
 
}
*/

    static UpdateSpriteImage(obj: any) {
        var pic = obj.pic;
        Debug.Log("UpdateSpriteImage pic=" + pic);

        TextureCache.main.LoadWithCloud(
            {
                url: pic,
                isCloud: obj.isCloud,
                success: function (p, data) {
                    var tex = data;
                    Debug.Log("UpdateSpriteImage success");
                    obj.sprite.spriteFrame = new cc.SpriteFrame(tex);
                    var spf = obj.sprite.spriteFrame;

                    if (obj.type == cc.Sprite.Type.SLICED) {
                        cc.Debug.Log("pic=" + pic + " spf=" + spf + " obj.top=" + obj.top);
                        spf.type = obj.type;
                        // 纹理的四个边距
                        spf.insetBottom = obj.bottom;
                        spf.insetTop = obj.top;
                        spf.insetLeft = obj.left;
                        spf.insetRight = obj.right;
                    }

                    // spf.type = cc.Sprite.Type.SLICED;
                    // spf.insetBottom = 64;
                    // spf.insetTop = 64;
                    // spf.insetLeft = 64;
                    // spf.insetRight = 64;
                    if (obj.sprite.node != null) {
                        obj.sprite.node.setContentSize(tex.width, tex.height);
                        var lyscale = obj.sprite.node.getComponent(cc.LayOutScale);
                        if (lyscale) {
                            lyscale.LayOut();
                        }
                    }

                    if (obj.success != null) {
                        obj.success(tex);
                    }


                    // if (obj.success) {
                    //     obj.success(this, data);
                    // }
                }.bind(this),
                fail: function (p) {
                    if (obj.fail) {
                        obj.fail();
                    }
                }.bind(this),
            });

    }




    static UpdateImageTexture(image: Sprite, tex: Texture2D, isUpdateSize: boolean, border: Vec4) {
        if (tex) {
            const spriteFrame = new SpriteFrame();
            spriteFrame.texture = tex;
            if (tex != null) {
                console.log("TextureUtil success tex is not null");
            } else {
                console.log("TextureUtil success tex is  null");
            }
            if (image != null) {
                console.log("TextureUtil success sp is not null");
                image.spriteFrame = spriteFrame;
            } else {
                console.log("TextureUtil success sp is null");
            }


            // RectTransform rctranOrigin = image.GetComponent<RectTransform>();
            // Vector2 offsetMin = rctranOrigin.offsetMin;
            // Vector2 offsetMax = rctranOrigin.offsetMax;
            // Sprite sp = CreateSpriteFromTex(tex, border);
            // image.sprite = sp;
            // if (border != Vector4.zero)
            // {
            //     image.type = Image.Type.Sliced;
            // }
            // if (isUpdateSize)
            // {
            //     RectTransform rctran = image.GetComponent<RectTransform>();

            //     rctran.sizeDelta = new Vector2(tex.width, tex.height);

            //     if ((rctran.anchorMin == new Vector2(0.5f, 0.5f)) && (rctran.anchorMax == new Vector2(0.5f, 0.5f)))
            //     {
            //     }
            //     else
            //     {
            //         //sizeDelta 会自动修改offsetMin和offsetMax 所以需要还原
            //         rctran.offsetMin = offsetMin;
            //         rctran.offsetMax = offsetMax;
            //     }
            //     // Debug.Log("rctranOrigin rctran.offsetMin=" + rctran.offsetMin + " rctran.offsetMax=" + rctran.offsetMax);

            // }

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
