
// 常量定义  ================================================================================================
var _userData_=null;
var _token_="";
// BASE64  ================================================================================================
var iBase64=function(){return{encode:function(a){var b="",d,c,f,g,h,e,k,l=0;do d=a.charCodeAt(l++),c=a.charCodeAt(l++),f=a.charCodeAt(l++),g=d>>2,h=(d&3)<<4|c>>4,e=(c&15)<<2|f>>6,k=f&63,isNaN(c)?(h=(d&3)<<4,e=k=64):isNaN(f)&&(k=64),b=b+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(g)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(h)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(e)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(k);while(l<a.length);return b},decode:function(a){var b="",d,c,f,g,h,e=0;a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");do d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(e++)),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(e++)),g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(e++)),h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(e++)),d=d<<2|c>>4,c=(c&15)<<4|g>>2,f=(g&3)<<6|h,b+=String.fromCharCode(d),64!=g&&(b+=String.fromCharCode(c)),64!=h&&(b+=String.fromCharCode(f));while(e<a.length);return b}}}();
//=========================================================================================================
// 添加系统方法format格式化时间  ============================================================================
Date.prototype.format=function(format){var args={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),"S":this.getMilliseconds()};if(/(y+)/.test(format))format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));for(var i in args){var n=args[i];if(new RegExp("("+i+")").test(format))format=format.replace(RegExp.$1,RegExp.$1.length==1?n:("00"+n).substr((""+n).length));};return format;};
//=========================================================================================================


var CF = {
	BROSWER:{
		"weixin":((/MicroMessenger/i.test(navigator.userAgent)) ? true : false),
		"qqBroswer":((/MQQBrowser/i.test(navigator.userAgent)) ? true : false),
		"ucBrowser":((/UCBrowser/i.test(navigator.userAgent)) ? true : false)
	},
	SYS:{
		"ios":((/iphone|ipad|ipod/i.test(navigator.userAgent)) ? true : false),
		"android":((/Android/i.test(navigator.userAgent)) ? true : false)
	},
	//存储读取缓存，有第二个参数值就写入，否则读出
	localData: function(skey, svalue) {
		var result_val=null;
		if (window.localStorage) {
			var storageObj=window.localStorage;
			if(svalue!=undefined&&svalue!=null){
				storageObj.setItem(skey, svalue);
				result_val = svalue;
			}else{
				result_val = storageObj.getItem(skey);
			};			
		}else console.log("!!broswer no support storage!!");
		return result_val;
	},
	//json转url参数
	parseParam:function(param, key) {
	    var paramStr = "";
	    if (param instanceof String || param instanceof Number || param instanceof Boolean) {
	        paramStr += "&" + key + "=" + encodeURIComponent(param);
	    } else {
	        $.each(param, function(i) {
	            var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
	            paramStr += '&' + CF.parseParam(this, k);
	        });
	    }
	    return paramStr.substr(1);
	},
	//显示提示
    showTips:function(msg,params,closeCallback){//显示提示
    	var top="40%";
    	var delay=1500;
    	var em="";
    	if(params){
    		if(params.top) top=params.top;
    		if(params.delay) delay=params.delay;
    	};    	
		var htm='<div style="z-index:391;background:rgba(0,0,0,0);position:fixed;top:0;left:0;width:100%;height:100%;" id="tips_coverlay">'+
		'<div style="position:absolute;top:'+top+';width:100%;text-align:center">'+
		'<div class="anim-InOut" style="display:inline-block;max-width:240px;margin:0 auto;padding:9px 11px;background:rgba(66,66,66,0.94);color:#FFF;font-size:15px;line-height:25px;text-align:center;border-radius:6px;-webkit-border-radius:6px;word-wrap:break-word;word-break:break-all;">'+em+msg+
		'</div></div></div>';
		var tipsObj=$(htm);
		$(document.body).append(tipsObj);
		function closeTips(){
			tipsObj.remove();
			if(closeCallback) closeCallback();
		};
		setTimeout(function(){closeTips();},delay);
		tipsObj.click(function(){closeTips();});		
		return tipsObj;
	},
	//单按钮提示
	showOkTips:function(msg,closeCallback,btntxt){
		if($("#okTips").length>0) return;
		var btntxt=btntxt?btntxt:"好的";
		var htm='<div id="okTips" style="position:fixed;z-index:188;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);">';
		htm+='<div style="width:75%;min-height:100px;overflow:hidden;border-radius:5px;-webkit-border-radius:5px;background:#FFF;margin:45% auto 0 auto">';
		htm+='<p style="line-height:24px;font-size:16px;text-align:center;padding:5px 15px 5px 15px;margin:10px 0;color:#333;min-height:24px;">'+msg+'</p>';
		htm+='<div><div id="btn_tips_cancel" style="width:100%;height:50px;line-height:50px;text-align:center;margin:15px auto 0 auto;border-top:1px solid #DDD;background:transparent;font-size:15px;box-sizing:border-box;color:#999;">'+btntxt+'</div>';
		htm+='</div></div>';
		var htmElm=$(htm);
		$(document.body).append(htmElm);
		htmElm.find("#btn_tips_cancel").unbind("click").click(function(){
			htmElm.remove();
			if(closeCallback) closeCallback();
		});
		return htmElm;
	},
	//确定提示
	showConfirmTips:function(msg,callback,btn1txt,btn2txt){
		var b1txt=btn1txt?btn1txt:"取消";
		var b2txt=btn2txt?btn2txt:"确认";
		var htm='<div id="upgradeTips" style="position:fixed;z-index:188;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);">';
		htm+='<div style="width:75%;min-height:100px;overflow:hidden;border-radius:5px;-webkit-border-radius:5px;background:#FFF;margin:45% auto 0 auto">';
		htm+='<p style="line-height:24px;font-size:15px;text-align:center;padding:5px 25px;margin-top:15px;color:#333;min-height:45px;">'+msg+'</p>';
		htm+='<div><div id="btn_cf_cancel" style="width:50%;height:50px;line-height:50px;text-align:center;margin:15px auto 0 auto;border-top:1px solid #DDD;background:transparent;font-size:14px;box-sizing:border-box;display:inline-block;">'+b1txt+'</div>';
		htm+='<div id="btn_cf_confirm" style="width:49%;height:50px;line-height:50px;text-align:center;margin:15px auto 0 auto;border-top:1px solid #DDD;background:transparent;font-size:14px;box-sizing:border-box;display:inline-block;border-left:1px solid #DDD;">'+b2txt+'</div>';
		htm+='</div></div>';
		var htmElm=$(htm);
		$(document.body).append(htmElm);
		htmElm.find("#btn_cf_cancel").unbind("click").click(function(){
			htmElm.remove();
		});
		htmElm.find("#btn_cf_confirm").unbind("click").click(function(){
			if(callback) callback();
			htmElm.remove();
		});
	},
	//加载动画
	showLoading:function(showOrClose){
		var top="40%";
		var loadingObj;
		if(showOrClose){
			if($(".page-loading-coverlay").length>0) return false;
			var htm='<div style="z-index:381;background:rgba(0,0,0,0);position:fixed;top:0;left:0;width:100%;height:100%;" class="page-loading-coverlay" id="loading_coverlay">'+
			'<div style="position:absolute;top:'+top+';width:100%;text-align:center">'+
			'<div class="page-loading"><div></div></div>'+
			'</div></div>';
			loadingObj=$(htm);
			$(document.body).append(loadingObj);
		}else{
			$(".page-loading-coverlay").remove();
		};
		return loadingObj;
	},
	// 滚动到距离底部多少px的时加载函数,用于滑动到底部加载下一页
	scrollBottomCallback:function(fn, number, ObjSelector, ObjChildren) {
		var a = number ? parseInt(number) : 0 ;
		ObjSelector=ObjSelector?ObjSelector : window ;
		ObjChildren=ObjChildren?ObjChildren : $(ObjSelector).children().eq(0)[0] ;
		$(ObjSelector).scroll(function() {
			if ($(ObjSelector).scrollTop() + $(ObjSelector).height() >= $(ObjChildren).height() - a) {
				if (fn) fn();
			};
		});
	},
	//时间到当前天数，参数例如"2018-7-14 15:46:37"
	unixDateToNow:function(string) {
		var f = string.split(' ', 2);
		var d = (f[0] ? f[0] : '').split('-', 3);
		var t = (f[1] ? f[1] : '').split(':', 3);
		var strDate=(new Date(
			parseInt(d[0], 10) || null,
			(parseInt(d[1], 10) || 1) - 1,
			parseInt(d[2], 10) || null,
			parseInt(t[0], 10) || null,
			parseInt(t[1], 10) || null,
			parseInt(t[2], 10) || null
		)).getTime() / 1000;
		var nowDate = Math.floor(new Date().getTime() / 1000);
		return (strDate-nowDate)/(24*60*60);
	},
	//时间戳转日期
	unixToDate: function(unixTime, isFull, timeZone) {
		if (typeof(timeZone) == 'number') {
			unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
		};
		if(String(unixTime).length<11) unixTime=unixTime* 1000;
		var time = new Date(unixTime);
		var ymdhis = "";
		ymdhis += time.getUTCFullYear() + "-";
		ymdhis += (time.getUTCMonth() + 1) + "-";
		ymdhis += time.getUTCDate();
		if (isFull){
			var hh=time.getHours();
			var mm=time.getUTCMinutes();
			var ss=time.getUTCSeconds();
			hh=String(1000+hh).substr(-2);
			mm=String(1000+mm).substr(-2);
			ss=String(1000+ss).substr(-2);
			if (isFull === true) {
				ymdhis += " " + hh + ":";
				ymdhis += mm + ":";
				ymdhis += ss;
			}else if(isFull == "hhmm"){
				ymdhis += " " + hh + ":";
				ymdhis += mm;
			};
		};
		return ymdhis;
	},
	//取页面文件名
	getFileName:function(cururl) {
		var curFile = cururl?cururl:window.location.href;
		curFile = curFile.replace(/\?.*$/, '');
		curFile = curFile.replace(/^.*\//, '');
		return curFile;
	},
	//时间戳到当前
	TimeStampDiff: function(dateTimeStamp,notoday) {
		var timestamp=parseInt(String(dateTimeStamp+"0000000000").substr(0,10));
		var unixTime=(String(timestamp).length<11) ? timestamp*1000 : timestamp;
		var ntime = new Date(unixTime);
		var now = new Date();
		if (ntime.toDateString() === now.toDateString() && !notoday) {
			return "今天";
		}else{
			var ymdhis = "";
			if(ntime.getUTCFullYear()==now.getUTCFullYear()){
				ymdhis += (ntime.getUTCMonth() + 1) + "月";
				ymdhis += ntime.getUTCDate() + "日";
			}else{
				ymdhis += ntime.getUTCFullYear() + "-";
				ymdhis += (ntime.getUTCMonth() + 1) + "-";
				ymdhis += ntime.getUTCDate();
			};			
			return ymdhis;
		};
	},
	//时间戳到当前
	getDateDiff: function(dateTimeStamp) {
		var minute = 1 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var halfamonth = day * 15;
		var month = day * 30;
		var d = new Date();
		var now = Math.floor(new Date().getTime() / 1000);
		var diffValue = now - dateTimeStamp;
		if (diffValue < 0) {
			if (diffValue > -60) return "刚刚";
			// return null;
		};
		var monthC = diffValue / month;
		var weekC = diffValue / (7 * day);
		var dayC = diffValue / day;
		var hourC = diffValue / hour;
		var minC = diffValue / minute;
		if (monthC >= 1) {
			result = "" + parseInt(monthC) + "个月前";
		} else if (weekC >= 1) {
			result = "" + parseInt(weekC) + "周前";
		} else if (dayC >= 1) {
			result = "" + parseInt(dayC) + "天前";
		} else if (hourC >= 1) {
			result = "" + parseInt(hourC) + "个小时前";
		} else if (minC >= 1) {
			result = "" + parseInt(minC) + "分钟前";
		} else {
			result = "刚刚";
		};
		return result;
	},
	// 是否微信打开
	isWeiXin: (/MicroMessenger/i.test(navigator.userAgent)) ? true : false,
	// 微信分享
	WXShare: function(data,title,img,desc){
    	wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: data.appId, // 必填，公众号的唯一标识
		    timestamp: data.timestamp , // 必填，生成签名的时间戳
		    nonceStr: data.nonceStr, // 必填，生成签名的随机串
		    signature: data.signature,// 必填，签名，见附录1
		    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});

		wx.ready(function () {
			console.log(title,img,desc)
			var link=decodeURIComponent(location.href.split('#')[0]);
			var ShareTitle=title?title:"51来战";
			var ShareImg=img?img:"http://test.51laizhan.com/user/imgs/lz_logo1.png";
			var ShareDesc=desc?desc:"来战-电竞圈社交约战平台";
			// 分享到朋友圈
		    wx.onMenuShareTimeline({
		    	title: ShareTitle, // 分享标题
			    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			    imgUrl: ShareImg, // 分享图标
			    success: function () { 
			        // 用户确认分享后执行的回调函数
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    }
		    })
		    // 分享给朋友
		    wx.onMenuShareAppMessage({
				title: ShareTitle, // 分享标题
			    desc: ShareDesc, // 分享描述
			    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			    imgUrl: ShareImg, // 分享图标
			    success: function () { 
			        // 用户确认分享后执行的回调函数
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    }
		    });
		});
    }
};

/********************我的**********************/
function initUserData(){
	_token_=CF.localData("onet_token");
	var userData=CF.localData("onet_userData");
	_userData_=userData?JSON.parse(userData):"";
};


/************* 初始化根文本尺寸 **/
(function(){var ww=document.documentElement.clientWidth; ww=ww>1024?1024:ww; var fs=Math.floor(ww/24); var ro=document.getElementsByTagName("html")[0]; ro.style.cssText='font-size:'+fs+'px;'; })();
/******************************************/

/******************************************/
$(function(){
	/*按屏幕修改根文本尺寸*/
	var setRootFont=function(){
		var ww=$(document.body).width();
		ww=ww>1024?1024:ww;
		var f=Math.floor(ww/ 24);
		$("html").css("font-size",f+"px");
		$("body").css("font-size",f+"px");
		console.log("RFS:"+f+"  ("+$("body").width()+"x"+$("body").height()+")");
	};
	setRootFont();
	$(window).resize(function(){setRootFont();});
	/******************/
	initUserData();
});
/******************************************/


