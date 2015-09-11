;(function($){

    var replyBox = function(){
        var self = this;

        //创建遮罩和弹出框
        this.zMask = $('<div id="">');
        this.zWin  = $('<div id="">');

        this.bodyNode = $(document.body);

        // 渲染DOM
        this.renderDOM();
        this.replyAtBtn();
    };

    replyBox.prototype = {

        renderDOM:function(){
            console.log("red");
            var strDom = '<div class="lightbox-view">'+

                '</div>';
            this.zWin.html(strDom);

            this.bodyNode.append(this.zMask,this.zWin);
        },
        renderCss:function(){
            console.log("css");
        },
        replyAtBtn:function(){
            $(".replyAtBtn").on("click",function(){
                var _t = $(this),
                    _p = _t.parents(".media"),
                    inputText = $("#qtitle"),
                    atName = _p.find(".uName").text(),
                    atText = '回复 '+ atName + ' 的评论: ';

                inputText.val(atText)
                    .attr("data-at",atText)
                    .focus();
                inputText.on("input propertychange",function(){
                    if(inputText.attr('data-at') != ""){
                        saveWriteVal(inputText);
                        vefiVal($(this).val(),atText,inputText);
                    }

                });
            });

        }

    };

    window['replyBox'] = replyBox;
    /*
    * 验证是否清空
    * */
    function vefiVal(v,atV,obj){
       var orderAt= v.substr(0,atV.length);
        if(orderAt != atV){
            obj.val("");
        }
    };
    /*
    * 保存每次输入的值
    * */
    function saveWriteVal(obj){
        var wVal = obj.val();
        if (localStorage.writeVal){
            var writeVal = localStorage.writeVal;
            var writeValArray = eval('('+writeVal+')');

            var oldVal = "",
                newVal = obj.val();
            var JoLen = writeValArray.length;
            /*var JoEndLen = writeValArray[JoLen-1].len;
            console.log( JoEndLen);
            var wVal = newVal.substr(newVal.length - JoEndLen,newVal.length);*/
        }else{
            var writeValArray = [];

        }

        var time = new Date().getTime();
        var arr  ={
            "val" : wVal,
            "time" : time,
            "len" : wVal.length
        }
        writeValArray.push(arr);

        seVa();
        localStorage.writeVal = JSON.stringify(writeValArray);
        var  writeValJson = JSON.parse(localStorage.writeVal);
       // console.log(writeValJson);
    };

    /*
    * 获取 上次输入的
    * */
    function seVa(){
        var writeVal = localStorage.writeVal;
        var writeValArray = eval('('+writeVal+')');

        var JoLen = writeValArray.length;

        var JoEndVal = writeValArray[JoLen-1].val;
        var JoEndLenTVal = writeValArray[JoLen-2].val;

        console.log( JoEndVal);
        console.log(JoEndLenTVal);


    };

})(jQuery);