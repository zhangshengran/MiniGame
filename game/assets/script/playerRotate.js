// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(e){
                
            console.log(e.getDelta())//获取鼠标距离上一次事件移动的距离对象，对象包含 x 和 y 属性
            // this.node.x +=event.getDelta().x
            // this.node.y +=event.getDelta().y//代码需改进
            console.log(e);
            
            if(e.currentTarget._name=='rightgebo' || e.currentTarget._name=='righthand'){
                this.node.rotation-=e.getDelta().y;//控制又肢体旋转
            }else{

                this.node.rotation+=e.getDelta().y;//控制左肢体旋转
            }
            e.stopPropagation();
      },this)
    },


    start () {

    },

    // update (dt) {},
});
