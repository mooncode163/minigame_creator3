
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

            if (border != Vec4.ZERO) 
            {
                // Debug.Log("pic=" + pic + " spf=" + spf + " obj.top=" + obj.top);
                image.type = Sprite.Type.SLICED; 
             
                // 纹理的四个边距
                spriteFrame.insetLeft = border.x;
                spriteFrame.insetRight = border.y;
                
                spriteFrame.insetTop = border.z;
                spriteFrame.insetBottom = border.w;

                // spriteFrame.insetLeft = 32;
                // spriteFrame.insetRight = 32;
                // spriteFrame.insetTop = 32;
                // spriteFrame.insetBottom = 32;
              
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
