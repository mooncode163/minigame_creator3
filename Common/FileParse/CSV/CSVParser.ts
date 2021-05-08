
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';
import { Debug } from '../../Debug';
const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('CSVParser')
export class CSVParser extends CCObject {
    public KEY_WORD_YINHAO = "\"";//英文输入法下的引号
    public KEY_WORD_YINHAO2 = "”";//中文输入法下的引号
    public KEY_WORD_SPLIT = ",";
    public KEY_WORD_CANCEL = "#";//分割符

    rootJson: any = null;
    fileJson = "";
    listLine: any[] = [];//当前行数组
    listTable: any[] = [];//整个内容表

    ReadData(str: string) {
        this.SplitAllLine(str);
    }
    SplitAllLine(str: string) {
        Debug.Log("SplitAllLine=" + str); 
        var list = str.split("\n");
        // var list = str.split("\n");
        // var list = str.split(",");
        // list.forEach(function (value, index) {
        //     Debug.Log("line "+index+" =" + value);
        // }.bind(this));

        var index = 0;
        for (let value of list) {
            // Debug.Log("line " + index + " =" + value);
            if (value.length > 0) {
                if (value[0] == this.KEY_WORD_CANCEL) {
                    // 去掉注释
                    continue;
                }
            }
            //删除回车符号\r
            var v_new = value.replace("\r", "");
            this.SplitLine(v_new);
            index++;
        }
    }

    //按,分割一行
    SplitLine(str: string) {

        //var list = str.split(this.KEY_WORD_SPLIT);
        var list = new Array();
        var pos = 0;
        var ishas_split = false;//是否有分割符
        var yinhao_pos_start = -1;
        var yinhao_pos_end = -1;
        var strYinhao = "";
        for (var i = 0; i < str.length; i++) {
            //Debug.Log("SplitLine:"+str[i]);
            var word = str[i];

            if (yinhao_pos_start >= 0) {
                //skip 引号
                if ((i <= yinhao_pos_end) && (i != str.length - 1)) {
                    continue;
                }
            }


            if (word == this.KEY_WORD_SPLIT) {
                ishas_split = true;
                //substring:pos to (i-1)
                var len = (i - 1) - pos + 1;
                var strtmp = str.substr(pos, len);
                //Debug.Log("SplitLine:" + strtmp);
                list.push(strtmp);
                pos = i + 1;
            }

            if ((word == this.KEY_WORD_YINHAO) || (word == this.KEY_WORD_YINHAO2)) {
                strYinhao = word;
                var skip_step = 0;
                //查找下一个引号
                //"亲,好玩,现在就去赞一个？","Pro, fun, and now to praise a?"
                var postmp = str.indexOf(strYinhao, i + 1);
                if (postmp >= 0) {
                    yinhao_pos_start = i;
                    yinhao_pos_end = postmp;
                    //has found
                    skip_step = postmp - i + 1;
                    //Debug.Log("postmp=" + postmp + " skip_step=" + skip_step);
                }
                // i += skip_step;
            }
            if (i == str.length - 1) {
                if (ishas_split == true) {
                    //添加最后一个分割符后的子串

                    var len = i - pos + 1;
                    var strtmp = str.substr(pos, len);
                    //Debug.Log("SplitLine:" + strtmp);
                    list.push(strtmp);

                } else {
                    //整个
                    Debug.Log("SplitLine add all:str=" + str);
                    list.push(str);
                }
            }

        }
        var index = 0;
        for (let value of list) {
            //  Debug.Log("SplitLine list=" + value);
            index++;
        }
        this.listTable.push(list);
    }

    GetText(row: number, col: number) {
        var str = "";
        var list = this.listTable[row];
        str = list[col];
        // str = this.listTable[row][col];
        return str;
    }

    GetRowCount() {
        return this.listTable.length;
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
