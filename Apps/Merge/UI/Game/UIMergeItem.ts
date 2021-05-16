
import { _decorator, Component, Node, Prefab, director, RigidBody, UITransform, RigidBody2D, ERigidBody2DType, EventTouch, tween } from 'cc';
import { Debug } from '../../../../Common/Debug';
import { UISprite } from '../../../../Common/UIKit/UIImage/UISprite';
import { UITouchEvent } from '../../../../Common/UIKit/UITouchEvent';
import { UIView } from '../../../../Common/UIKit/ViewController/UIView';
import { GameData, GameStatus } from '../../Data/GameData';
import { GameMerge } from './GameMerge';
import { UIGameMerge } from './UIGameMerge';
import { UIImage } from '../../../../Common/UIKit/UIImage/UIImage';
import { PropType } from './UIPopProp';
const { ccclass, property, type } = _decorator;

@ccclass('UIMergeItem')
export class UIMergeItem extends UIView {
    @type(UIImage)
    imageItem: UIImage | null = null;
    isNew = false;
    type = 0;
    t = 0;
    hasGoDownDeadLine = false;

    onLoad() {
        super.onLoad();
        this.t = 0;
        // this.node.zIndex = 100;
        // var manager = director.getCollisionManager();
        // manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // var collider = this.node.getComponent(PhysicsBoxCollider);
        var ev = this.node.addComponent(UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);
    }
    start() {
        super.start();
    }

    update() {
        if (!this.isNew) {
            // 游戏失败判断  onCollisionEnter 碰撞检测失效 直接判断位置
            this.IsCollisionDeadLine();
            // this.t += director.getDeltaTime();
            // if (this.t > 2.0) {
            // this.t = 0;
            // var pos = GameMerge.main.nodeDeadline.getPosition();
            // var y_top = this.node.getPosition().y + this.node.getBoundingBox().height / 2;
            // if (y_top >= pos.y) {
            //     Debug.Log("UIMergeItem this.hasGoDownDeadLine="+this.hasGoDownDeadLine);
            //     if (this.hasGoDownDeadLine) {
            //         if (!GameData.main.isGameFail) {

            //             GameData.main.isGameFail = true;
            //             Debug.Log("UIMergeItem game over");
            //             UIGameMerge.main.OnGameFinish(true);
            //         }
            //     }

            // } else {
            //     this.hasGoDownDeadLine = true;
            // }


            // }

        }
    }

    // 碰撞线检测
    IsCollisionDeadLine() {
        var pos = GameMerge.main.nodeDeadline.getPosition();
        var y1 = this.node.getPosition().y + this.GetBoundingBox().height / 2;
        var y2 = this.node.getPosition().y - this.GetBoundingBox().height / 2;
        if ((pos.y > y2) && (pos.y < y1)) {
            this.t += director.getDeltaTime();
            if (this.t > 2.0) {
                this.t = 0;
                if (!GameData.main.isGameFail) {
                    GameData.main.isGameFail = true;
                    Debug.Log("UIMergeItem game over");
                    UIGameMerge.main.OnGameFinish(true);
                }
            }

            return true;
        }
        return false;
    }

    UpdateImage(pic) {
        this.imageItem.UpdateImage(pic);
    }

    EnableGravity(isEnable) {
        var bd = this.node.getComponent(RigidBody2D);
        bd.type = isEnable ? ERigidBody2DType.Dynamic : ERigidBody2DType.Static;
        // bd.type = isEnable ?ERigidBody2DType.DYNAMIC:ERigidBody2DType.STATIC;// RigidBodyType.Dynamic : RigidBodyType.Static;
    }

    OnTouchDown(pos) {
    }
    OnTouchMove(pos) {
    }
    OnTouchUp(pos) {



    }
    OnUITouchEvent(ui: UITouchEvent, status: number, event?: EventTouch) {

        var pos = ui.GetPosition(event);
        var posnodeAR = ui.GetPositionOnNode(event);//坐标原点在node的锚点
        var posui = ui.GetUIPosition(event);

        var imageProp = UIGameMerge.main.game.imageProp;
        var duration = 0.5;
        var toPos = posnodeAR;
        switch (status) {
            case UITouchEvent.TOUCH_DOWN:
                this.OnTouchDown(posnodeAR);
                break;

            case UITouchEvent.TOUCH_MOVE:
                this.OnTouchMove(posnodeAR);
                break;

            case UITouchEvent.TOUCH_UP:
                this.OnTouchUp(posnodeAR);
                {
                    if (GameData.main.status == GameStatus.Prop) {
                        if (UIGameMerge.main.typeProp == PropType.Hammer) {
                            tween(this.node)
                                .to(duration / 2, { position: toPos })
                                .call(() => {
                                    GameMerge.main.DeleteItem(this);
                                })
                                .start()
                        }

                        if (UIGameMerge.main.typeProp == PropType.Bomb) {

                            tween(this.node)
                                .to(duration / 2, { position: toPos })
                                .call(() => {
                                    GameMerge.main.DeleteAllItemsOfId(this.id);
                                })
                                .start() 

                        }
                    }

                }
                break;
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
