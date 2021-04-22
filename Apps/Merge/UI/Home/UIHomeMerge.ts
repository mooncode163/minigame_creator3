
import { _decorator, Component, Node, Texture2D, SpriteFrame, Sprite, resources, assetManager } from 'cc';
const { ccclass, property, integer, float, boolean, string, type } = _decorator;

import { UIHomeBase } from '../../../../AppBase/Home/UIHomeBase';
import { TextureCache } from '../../../../Common/Cache/TextureCache';
import { UIImage } from '../../../../Common/UIKit/UIImage/UIImage';


@ccclass('UIHomeMerge')
export class UIHomeMerge extends UIHomeBase {
    @type(Node)
    nodeBg: Node | null = null;

    @type(UIImage)
    imageBg: UIImage = null;
    // imageBg: UIImage | null = null;

    start() {
        // [3] 
       
        // default GameBg
        // TextureCache.Main().Load({
        //     filepath: "App/UI/Bg/GameBg",
        //     bind:this,
        //     success(bind:any,tex: Texture2D) {
        //         console.log("TextureCache success");
        //         const spriteFrame = new SpriteFrame();
        //         spriteFrame.texture = tex;
        //         if (tex != null) {
        //             console.log("TextureCache success tex is not null");
        //         } else {
        //             console.log("TextureCache success tex is  null");
        //         } 
        //         if (bind.nodeBg != null) {
        //             console.log("TextureCache success nodeBg is not null");
        //             var sp = bind.nodeBg.getComponent(Sprite);
        //             if (sp != null) {
        //                 console.log("TextureCache success sp is not null");
        //                 sp.spriteFrame = spriteFrame;
        //             } else {
        //                 console.log("TextureCache success sp is null");
        //             }
        //         } else {
        //             console.log("TextureCache success nodeBg is null");
        //         }
        //     },
        // });
        // App/UI/Bg/GameBg default_pannel
//         resources.load("default_pannel",SpriteFrame, (err, spriteFrame) => {
//             if (spriteFrame== null) 
//             {
// console.log("spriteFrame is null err=",err);
//             }
//             // if (this.nodeBg != null) 
//             {
//                 this.nodeBg.getComponent(Sprite).spriteFrame = spriteFrame;
//             } 
//         });

    //    var pic = "/Users/moon/sourcecode/cocos/product/minigame/minigameCreator/assets/resources/App/UI/Bg/GameBg.png" 
    //    pic = "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1942783278,2082140028&fm=26&gp=0.jpg";
    //     var p = this;
    //     assetManager.loadRemote(pic, function (err:any, texture:Texture2D) {
    //         // Use texture to create sprite frame
    //         if (texture == null) {
    //             console.log("Test loadRemote is null err=", err);

    //             // Bundle resources doesn't contain 1
    //             // console.log("Test loadRemote err:" + err.message || err);
    //         } else {
    //             console.log("Test loadRemote is not null");
    //             const spriteFrame = new SpriteFrame();
    //             spriteFrame.texture = texture;
    //             p.nodeBg.getComponent(Sprite).spriteFrame = spriteFrame;
    //         }
    //     }.bind(this));

 

        // TextureCache.Main().LoadFrame({
        //     filepath: "App/UI/Bg/GameBg",
        //     bind:this,
        //     success(bind:any,frame: SpriteFrame) {
        //         console.log("TextureCache success");
               
        //         if (frame != null) {
        //             console.log("TextureCache success frame is not null");
        //         } else {
        //             console.log("TextureCache success frame is  null");
        //         } 
        //         if (bind.nodeBg != null) {
        //             console.log("TextureCache success nodeBg is not null");
        //             var sp = bind.nodeBg.getComponent(Sprite);
        //             if (sp != null) {
        //                 console.log("TextureCache success sp is not null");
        //                 // sp.spriteFrame = frame;
        //             } else {
        //                 console.log("TextureCache success sp is null");
        //             }
        //         } else {
        //             console.log("TextureCache success nodeBg is null");
        //         }
        //     },
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
