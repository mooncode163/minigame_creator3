
import { _decorator, Component, Node, Vec2 } from 'cc';
import { Device } from '../../Device';
import { LayOutUtil } from './LayOutUtil';
const { ccclass, property,type } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer
const Align = LayOutUtil.Align;
const Direction = LayOutUtil.Direction;


@ccclass('LayOutBase')
export class LayOutBase extends Component {

    
    target: Node | null = null;
    target2: Node | null = null; 


    @property
    enableLayout = true;
    @property
    enableHide = true; //是否包含Hide true 包含 false  不包含

    // 选择横屏配置参数
    enableLandscape = false;

    isOnlyForPortrait = false;
    isOnlyForLandscape = false;

    space = Vec2.ZERO;
    @type(Align)
    align = Align.LEFT;

    directionVertical = Direction.TOP_TO_BOTTOM;
    directionHorizontal = Direction.LEFT_TO_RIGHT;

    // @property({
    //     type: Align,
    //     // displayOrder: 3,
    // })
    // public ali: Align = null!;
 
    private _offsetMin = Vec2.ZERO;
    @type(Vec2)
    //get 的用法
    get offsetMin(): Vec2 {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._offsetMin;
    }
    // set 的用法
    set offsetMin(value: Vec2) {
        this._offsetMin = value;
    }

    private _offsetMax = Vec2.ZERO;
    @type(Vec2)
    //get 的用法
    get offsetMax(): Vec2 {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._offsetMax;
    }
    // set 的用法
    set offsetMax(value: Vec2) {
        this._offsetMax = value;
    }
 

    private _offset = Vec2.ZERO;
    @type(Vec2)
    //get 的用法
    get offset(): Vec2 {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._offset;
    }
    // set 的用法
    set offset(value: Vec2) {
        this._offset = value;
    }
    
    onLoad () {   
        this.LayOut();
    }
    start() {
        // [3]
        this.LayOut();
    }

    LayOut () { 
    }

    IsUseLandscape() {
        var ret = false;
        if (Device.main.isLandscape&&this.enableLandscape)
        {
            ret = true;
        }
        return ret;
    }
 
    Enable() {
        var ret = true;
        if (!this.enableLayout)
        {
            ret = false;
        }
        if (this.isOnlyForLandscape)
        {
            if (!Device.main.isLandscape)
            {
                ret = false;
            }
        }
        if (this.isOnlyForPortrait)
        {
            if (Device.main.isLandscape)
            {
                ret = false;
            }
        }
        return ret;
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
