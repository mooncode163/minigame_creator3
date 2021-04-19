
import { _decorator, Component, Node, Vec2 } from 'cc';
import { Device } from '../../Device';
const { ccclass, property } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

enum DispLayVertical {
    TOP_TO_BOTTOM = 0,
    BOTTOM_TO_TOP,
}

enum DispLayHorizontal {
    LEFT_TO_RIGHT = 0,
    RIGHT_TO_LEFT,
}


enum Align {
    UP = 0,
    DOWN,
    LEFT,
    RIGHT,
    CENTER,
    UP_LEFT,
    UP_RIGHT,
    DOWN_LEFT,
    DOWN_RIGHT,
    Horizontal,
    Vertical,
    SAME_POSTION,
}


enum Direction {
    //区分大小写
    TOP_TO_BOTTOM=0,
    BOTTOM_TO_TOP,
    LEFT_TO_RIGHT,
    RIGHT_TO_LEFT,

}

@ccclass('LayOutBase')
export class LayOutBase extends Component {
    public static Align = Align;
    public static DispLayVertical = DispLayVertical;
    public static DispLayHorizontal = DispLayHorizontal;
    public static Direction = Direction;
    
    target: Node | null = null;



    enableLayout = true;
    enableHide = true; //是否包含Hide true 包含 false  不包含

    // 选择横屏配置参数
    enableLandscape = false;

    isOnlyForPortrait = false;
    isOnlyForLandscape = false;

    space = Vec2.ZERO;
    align = Align.Horizontal;
    directionVertical = Direction.TOP_TO_BOTTOM;
    directionHorizontal = Direction.LEFT_TO_RIGHT;

    // @property({
    //     type: Align,
    //     // displayOrder: 3,
    // })
    // public ali: Align = null!;
 
    private _offsetMin = Vec2.ZERO;
    //get 的用法
    get offsetMin(): Vec2 {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._offsetMin;
    }
    // set 的用法
    set offsetMin(value: Vec2) {
        this._offsetMin = value;
    }

    private _offsetMax = Vec2.ZERO;
    //get 的用法
    get offsetMax(): Vec2 {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._offsetMax;
    }
    // set 的用法
    set offsetMax(value: Vec2) {
        this._offsetMax = value;
    }

    start() {
        // [3]
    }


    IsUseLandscape() {
        var ret = false;
        if (Device.Main().isLandscape&&this.enableLandscape)
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
            if (!Device.Main().isLandscape)
            {
                ret = false;
            }
        }
        if (this.isOnlyForPortrait)
        {
            if (Device.Main().isLandscape)
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
