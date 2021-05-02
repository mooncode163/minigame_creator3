
import { _decorator, Component, Node, Sprite, Texture2D, Vec4 } from 'cc';
import { Common } from '../../Common';
import { ImageRes } from '../../Config/ImageRes';
import { Device } from '../../Device';
import { FileUtil } from '../../File/FileUtil';
import { UIView } from '../ViewController/UIView';
import { TextureUtil } from '../../Image/TextureUtil';
import { TextureCache } from '../../Cache/TextureCache';
const { ccclass, property, type } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('UIImage')
export class UIImage extends UIView {

    @type(Sprite)
    image: Sprite | null = null;
    isCache: boolean = true;


    onLoad() {
        super.onLoad();
        var keyPic = this.keyImage;
        if (Device.main.isLandscape) {
            if (!Common.BlankString(this.keyImageH)) {
                keyPic = this.keyImageH;
            }
        }

        var pic = ImageRes.main.GetImage(keyPic);

        if (!FileUtil.FileExist(pic)) {

            if (Device.main.isLandscape) {
                keyPic = this.keyImageH2;
            }
            else {
                keyPic = this.keyImage2;
            }
        }
        this.UpdateImageByKey(keyPic);
    }

    start() {
        // [3]
        super.start();
    }

    UpdateImageByKey(key: string) {
        var pic = "";
        if (!Common.BlankString(key)) {
            pic = ImageRes.main.GetImage(key);
        }

        if (!Common.BlankString(pic)) {
            this.UpdateImage(pic, key);
        }
    }

    UpdateImageTexture(tex: Texture2D) {
        TextureUtil.UpdateImageTexture(this.image, tex, true, Vec4.ZERO);
        // RectTransform rctan = this.GetComponent<RectTransform>();
        // rctan.sizeDelta = new Vector2(tex.width, tex.height);
    }
    // 绝对路径
    UpdateImage(pic: string, key: string) {
        var strKey = key;
        if (Common.BlankString(key)) {
            strKey = this.keyImage;
        }
        if (Common.BlankString(pic)) {
            return;
        }
        var isBoard = ImageRes.main.IsHasBoard(strKey);
        var board = Vec4.ZERO;
        if (isBoard) {
            board = ImageRes.main.GetImageBoard(strKey);
        }
        if (board != Vec4.ZERO) {
            //  image.imagety
        }
        // RectTransform rctranOrigin = this.GetComponent<RectTransform>();
        // Vector2 offsetMin = rctranOrigin.offsetMin;
        // Vector2 offsetMax = rctranOrigin.offsetMax;


        TextureCache.main.Load(
            {
                filepath: pic,
                success: (p: any, tex: Texture2D) => {
                    TextureUtil.UpdateImageTexture(this.image, tex, true, board);
                },
                fail: (p: any) => {

                },
            });

      
        // RectTransform rctan = this.GetComponent<RectTransform>();
        // rctan.sizeDelta = new Vector2(tex.width, tex.height);
        // Debug.Log("UpdateImage pic=" + pic + "isBoard=" + isBoard + " keyImage=" + strKey + " tex.width=" + tex.width);
        // if ((rctan.anchorMin == new Vector2(0.5f, 0.5f)) && (rctan.anchorMax == new Vector2(0.5f, 0.5f))) {
        // }
        // else {
        //     //sizeDelta 会自动修改offsetMin和offsetMax 所以需要还原
        //     rctan.offsetMin = offsetMin;
        //     rctan.offsetMax = offsetMax;
        // }
        this.LayOut();
    }

    LayOut() {
        super.LayOut();
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
