
import { _decorator, Component, Node, Prefab, SystemEventType, EventTouch, UITransform, Vec3 } from 'cc';
const { ccclass, property, type } = _decorator;

@ccclass('UITouchEvent')
export class UITouchEvent extends Component {
    public static TOUCH_DOWN = 0;
    public static TOUCH_MOVE = 1;
    public static TOUCH_UP = 2;
    callBackTouch = null;


    onLoad() {
        this.Init();
    }

    Init() {

        // node layer 需要设置为UI_2D

        this.node.on(SystemEventType.TOUCH_START, this._onTouchBegan, this);
        this.node.on(SystemEventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(SystemEventType.TOUCH_END, this._onTouchEnded, this);
        this.node.on(SystemEventType.TOUCH_CANCEL, this._onTouchCancel, this);

    }

    //屏幕坐标,原点在屏幕左下角 
    GetPosition(event?: EventTouch) {
        return event.getLocation();
    }

    //Canvas UI 坐标,原点在Canvas左下角 
    GetUIPosition(event?: EventTouch) {
        return event.getUILocation();
    }
    //坐标原点在node的锚点
    GetPositionOnNode(event?: EventTouch) {
        var uiTrans = this.node.getComponent(UITransform);
        // var pos = this.GetPosition(event);
        var posui = this.GetUIPosition(event);
        // pos = event.wo  convertToNodeSpaceAR convertToWorldSpaceAR
        const localTouchPos = uiTrans.convertToNodeSpaceAR(new Vec3(posui.x, posui.y, 0));
        return localTouchPos;
        // return uiTrans.convertToWorldSpaceAR(new Vec3(pos.x, pos.y, 0));//坐标原点在node的锚点
    }


    // touch event handler
    protected _onTouchBegan(event?: EventTouch) {

        var pos = event.getLocation();//canvas坐标原点在屏幕左下角 
        // var posnode = this.node.convertToNodeSpace(pos);//坐标原点在node左下角
        // var posnodeAR = this.node.getComponent(UITransform).convertToNodeSpaceAR(pos);//坐标原点在node的锚点

        if (this.callBackTouch != null) {
            this.callBackTouch(this, UITouchEvent.TOUCH_DOWN, event);
        }
    }

    protected _onTouchMove(event?: EventTouch) {
        if (this.callBackTouch != null) {
            this.callBackTouch(this, UITouchEvent.TOUCH_MOVE, event);
        }
    }

    protected _onTouchEnded(event?: EventTouch) {
        if (this.callBackTouch != null) {
            this.callBackTouch(this, UITouchEvent.TOUCH_UP, event);
        }
    }

    protected _onTouchCancel(event?: EventTouch) {

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
