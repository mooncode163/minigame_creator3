
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, Enum, UITransform, Size, Color } from 'cc';
import { AudioPlay } from '../../Audio/AudioPlay';
import { Common } from '../../Common';
import { CommonRes } from '../../CommonRes';
import { Debug } from '../../Debug';
import { UIImage } from '../UIImage/UIImage';
import { UIText } from '../UIText/UIText';
import { UIView } from '../ViewController/UIView';
 
const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

enum ButtonType {
    IMAGE = 0,// 
    IMAGE_TEXT,
    IMAGE_ICON,
    IMAGE_SWITCH,
    IMAGE_ICON_SWITCH,
}
//必须Enum设置才能在编辑器里设置enum的值
Enum(ButtonType);


// ui layer 选UI_2D 不然点击没有响应
@ccclass('UIButton')
export class UIButton extends UIView {
    public static ButtonType = ButtonType;

    @type(UIImage)
    imageBg: UIImage | null = null;

    @type(UIImage)
    imageIcon: UIImage | null = null;

    @type(UIText)
    textTitle: UIText | null = null;

    enableFitTextSize: boolean = false;
    isSwicthSelect: boolean = false;

    // 必须设置两个@type 才能在editor里修改
    @type(ButtonType)
    private _type = ButtonType.IMAGE;
    @type(ButtonType)
    //get 的用法
    get type() {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._type;
    }
    // set 的用法
    set type(value) {
        this._type = value;
        if (this.imageBg == null) {
            return;
        }
        if (this.textTitle == null) {
            return;
        }
        if (this.imageIcon == null) {
            return;
        }
        this.imageBg.node.active = true;
        switch (this._type) {
            case ButtonType.IMAGE:
            case ButtonType.IMAGE_SWITCH:
                {
                    this.imageIcon.node.active = false;
                    this.textTitle.node.active = false;

                }
                break;
            case ButtonType.IMAGE_TEXT:
                {
                    this.imageIcon.node.active = false;
                    this.textTitle.node.active = true;
                }
                break;
            case ButtonType.IMAGE_ICON:
            case ButtonType.IMAGE_ICON_SWITCH:
                {
                    this.imageIcon.node.active = true;
                    this.textTitle.node.active = false;
                }
                break;

        }
        // this.textTitle.node.active = true;

    }



    onLoad() {
        super.onLoad();
        // this.type = this._type;
    }

    start() {
        // [3]
        super.start();
    }



    //fontSize
    get fontSize() {
        if (this.textTitle == null) {
            return 12;
        }
        return this.textTitle.fontSize;
    }
    set fontSize(value) {
        if (this.textTitle == null) {
            return;
        }
        this.textTitle.fontSize = value;
        this.LayOut();
    }


    //text
    get text() {
        if (this.textTitle == null) {
            return "text";
        }
        return this.textTitle.text;
    }
    set text(value) {
        this.textTitle.text = value;
        if (this.enableFitTextSize) {
            var w = Common.GetTextSize(value, this.fontSize).width + this.fontSize;
            var size = this.node.getComponent(UITransform)?.contentSize;
            var h = size.height;
            // Debug.Log("GetTextSize w = " + w + " h=" + h); 
            this.node?.getComponent(UITransform)?.setContentSize(new Size(w, h));
        }
        this.LayOut();
    }


    //color
    get color() {
        if (this.textTitle == null) {
            return Color.BLACK;
        }
        return this.textTitle.color;
    }
    set color(value) {
        this.textTitle.color = value;
    }


    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;


    LayOut() {
        super.LayOut();
    }

    /*
           { 
               bg: "",
               icon:"",
               def: "",
               type:cc.Sprite.Type.SIMPLE,//SLICED
               left:0,
               right:0,
               top:0,
               bottom:0,
               isUpdateSize:true,
               success: function () {
               },
               fail: function () {
               }, 
           }
       */
    // UpdateImage(obj: any) {
    //     var objBg = {
    //         sprite: this.imageBg,
    //         pic: obj.bg,
    //         def: obj.def,
    //         type: obj.type,
    //         left: obj.left,
    //         right: obj.right,
    //         top: obj.top,
    //         bottom: obj.bottom,
    //         success: function () {
    //             this.LayOut();
    //             if (obj.success != null) {
    //                 obj.success();
    //             }
    //         }.bind(this),
    //         fail: obj.fail,
    //     };
    //     TextureUtil.UpdateSpriteImage(objBg);

    //     if (obj.icon) {
    //         var objIcon = {
    //             sprite: this.imageIcon,
    //             pic: obj.icon,
    //             def: obj.def,
    //             success: function () {
    //                 this.LayOut();
    //                 if (obj.success != null) {
    //                     obj.success();
    //                 }
    //             }.bind(this),
    //             fail: obj.fail,
    //         };
    //         TextureUtil.UpdateSpriteImage(objIcon);
    //     }
    // }

    UpdateSwitch(isSel: boolean) {
        this.isSwicthSelect = isSel;
        if (this.isSwicthSelect) {
            this.imageBg.UpdateImageByKey(this.imageBg.keyImage);
            this.imageIcon.UpdateImageByKey(this.imageIcon.keyImage);
        } else {
            this.imageBg.UpdateImageByKey(this.imageBg.keyImage2);
            this.imageIcon.UpdateImageByKey(this.imageIcon.keyImage2);
        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
