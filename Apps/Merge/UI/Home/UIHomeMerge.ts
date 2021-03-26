
import { _decorator, Component, Node, Texture2D, SpriteFrame, Sprite } from 'cc';
const { ccclass, property, integer, float, boolean, string, type } = _decorator;

import { UIHomeBase } from '../../../../AppBase/Home/UIHomeBase';
import { TextureCache } from '../../../../Common/Cache/TextureCache';


@ccclass('UIHomeMerge')
export class UIHomeMerge extends UIHomeBase {
    @type(Node)
    nodeBg: Node | null = null;

    start() {
        // [3] 

        TextureCache.Main().Load({
            filepath: "App/UI/Bg/GameBg",
            success(tex: Texture2D) {
                console.log("TextureCache success");
                const spriteFrame = new SpriteFrame();
                spriteFrame.texture = tex;
                if(tex!=null)
                {
                    console.log("TextureCache success tex is not null");
                }else{
                    console.log("TextureCache success tex is  null");
                }
                // this.nodeBg.getComponent(Sprite).spriteFrame = spriteFrame;
                if (this.nodeBg != null) {
                    var sp = this.nodeBg.getComponent(Sprite);
                    if(sp!=null)
                    {
                        console.log("TextureCache success sp is not null");
                        sp.spriteFrame = spriteFrame;
                    }else{
                        console.log("TextureCache success sp is null");
                    }
                }else{
                    console.log("TextureCache success nodeBg is null");
                }
            },
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
