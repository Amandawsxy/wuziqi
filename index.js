$(function(){
    $('.kaichang').addClass('kaishi',function(){
        $('.qipai').css({
            opacity:0
        }).delay(1000).css({
            opacity:1
        })
    })
    var kongbai={};
    for(var i=0;i<15;i++){
        $('<b>').addClass('heng').appendTo('.qipai')
        $('<i>').addClass('shu').appendTo('.qipai')
        for(var j=0;j<15;j++){
            kongbai[i+'-'+j]={x:i,y:j};
            $('<div>')
                .addClass('qizi')
                .attr('id',i+'-'+j)
                .data('pos',{x:i,y:j})
                .appendTo('.qipai')
        }
    }
    var hei={};
    var bai={};
    var kaiguan=true;

    var panduan=function(pos,biao){
       var h= 1,s= 1,zx= 1,yx=1;
       var tx, ty;


        //横向
        tx=pos.x;ty=pos.y;
        while(biao[tx + '-' + (ty-1)]){
            h++;ty--;
        }
        tx=pos.x;ty=pos.y;
        while(biao[tx + '-' + (ty+1)]){
            h++;ty++;
        }


        //纵向
        tx=pos.x;ty=pos.y;
        while(biao[(tx-1) + '-' + ty]){
            s++;tx--;
        }
        tx=pos.x;ty=pos.y;
        while(biao[(tx+1)+ '-' + ty]){
            s++;tx++;
        }


        //左斜
        tx=pos.x;ty=pos.y;
        while(biao[(tx+1) + '-' + (ty-1)]){
            zx++;tx++;ty--
        }
        tx=pos.x;ty=pos.y;
        while(biao[(tx-1)+ '-' + (ty+1)]){
            zx++;tx--;ty++
        }


        //右斜
        tx=pos.x;ty=pos.y;
        while(biao[(tx+1) + '-' + (ty+1)]){
            yx++;tx++;ty++;
        }
        tx=pos.x;ty=pos.y;
        while(biao[(tx-1)+ '-' + (ty-1)]){
            yx++;tx--;ty--;
        }

         return Math.max(h,s,zx,yx)
    }
    var ai=function(){
            var max1=-Infinity;
            var zuobiao1;
        for( var i in kongbai){
            var weixie=panduan(kongbai[i],hei);
            if(weixie>max1){
                max1=weixie;
                zuobiao1=kongbai[i];
            }
        }
            var max2=-Infinity;
            var zuobiao2;
        for( var i in kongbai){
            var weixie=panduan(kongbai[i],bai);
            if(weixie>max2){
                max2=weixie;
                zuobiao2=kongbai[i];
            }
        }
        return (max1>max2)?zuobiao1:zuobiao2;
    }

    var isAi;
    //人机对战
    $(".qipai .renji").on("click",function(){
        isAi=true;
        $(this).css({background:"#19511A url(img/33.png)"});
        $(".qipai .renren").css({
            background: "#7C8C72 url(img/22.png)"
        });
    })
    //人人对战
    $(".qipai .renren").on("click",function(){
        isAi=false;
        $(this).css({background:"#19511A url(img/22.png)"});
        $(" .qipai .renji").css({
            background: "#7C8C72 url(img/33.png)"
        })
    })
    //重新开始
    $(".qipai .restart").on("click",function(){
        window.location.reload();
    })
    //游戏说明
    //var $width="600px";
    //$(".instruction").on("mouseenter",function(){
    //    $(".shuomingshu")
    //        .animate({
    //            transform:"scale(1,1)"
    //        })
    //})
    $('.qizi').on('click',function(){
        var pos=$(this).data('pos');

        if($(this).hasClass('hei')||$(this).hasClass('bai')){
           return;
        }
        if(kaiguan) {
            $(this).addClass('hei');
            hei[pos.x + '-' + pos.y] = true;
            delete kongbai[pos.x + '-' + pos.y];
            if (panduan(pos, hei)>=5) {
                $(".qipai .baiying").text("黑棋赢了☺").slideToggle(1000);
                $('.qipai .qizi').off('click');
            }
            if(isAi){
                var pos=ai();
                $('#'+ pos.x + '-' + pos.y).addClass('bai');
                bai[pos.x + '-' + pos.y] = true;
                delete kongbai[pos.x + '-' + pos.y];
                if (panduan(pos, bai)>=5) {
                    $(".qipai .baiying").text("白棋赢了☺").slideToggle(1000);
                    $('.qipai .qizi').off('click');
                }
                return;
            }
        }else {
                $(this).addClass('bai');
                bai[pos.x + '-' + pos.y] = true;
                if (panduan(pos, bai)>=5) {
                    $(".qipai .baiying").text("黑棋赢了☺").slideToggle(1000);
                    $('.qipai .qizi').off('click');
                }
            }
        kaiguan = !kaiguan;
    })
    $('.mode').on('click',function(){
        $(this).toggleClass('shouqi');
        if($(this).hasClass('shouqi')){
            $('.qiehuan').animate({height:180});
            $('.renren').css({
                display:'block',
                opacity:1
            })
            $('.renji').css({
                display:'block',
                opacity:1
            })
        }else{
            $('.qiehuan').animate({height:40});
            $('.renren').css({
                opacity:0,
                display:'none'
            })
                .delay(10)
            $('.renji').css({
                opacity:0,
                display:'none'
            })
        }

    })
})