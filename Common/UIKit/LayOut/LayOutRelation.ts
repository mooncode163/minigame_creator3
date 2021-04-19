
import { _decorator, Component, Node } from 'cc';
import { LayOutBase } from './LayOutBase';
const { ccclass, property } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer
 

@ccclass('LayOutRelation')

// const RelationType = LayOutRelation.RelationType;
enum RelationType {
    NONE,// 
    PARENT,//相对父窗口 
    TARGET,//相对目标 
    ALL,
}

// enum CustomerState {
//     NONE,
//     GREETING,
//     GOODBYE,
// }

// enum EventName {
//     GREETING = 'greeting',
//     GOODBYE = 'goodbye', 
// }

export class LayOutRelation extends LayOutBase {
    public static RelationType = RelationType;
	private _tpye = RelationType.NONE;
	//get 的用法
	get tpye(): number{           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
		return this._tpye;
	}
    // set 的用法
    set tpye(value: number) { 
		this._tpye = value;
	} 
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
  

    start () {
        // [3]
        // this.tpye = RelationType.NONE;
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
