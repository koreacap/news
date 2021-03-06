/* 2017 05 20 SJW */

// 카카오 세팅
function kakaoinit(kakaoappkey){
	Kakao.init(kakaoappkey);
}

// 카카오톡 공유하기
function sendKakaoTalk(strURL, strTitle, strDesc, image) {
	
	/* 카카오톡링크 v2 2017 05 19 */
	Kakao.Link.sendDefault({
		objectType: 'feed',
		content: {
			title: decodeURIComponent(strTitle),
			description: decodeURIComponent(strDesc),
			imageUrl: image,
			link: {
				mobileWebUrl: decodeURIComponent(strURL),
				webUrl: decodeURIComponent(strURL)
			}
		},
		buttons: [
			{
				title: '자세히보기',
				link: {
					mobileWebUrl: decodeURIComponent(strURL),
					webUrl: decodeURIComponent(strURL)
				}
			}
		]
	});
}

// 카카오스토리 공유하기
function shareStory(strURL, strTitle, strDesc, image) {

	if(site_ismobile) { //모바일 디바이스경우...
		Kakao.Story.open({
			url: decodeURIComponent(strURL),
			text: decodeURIComponent(strTitle),
			urlInfo: {
				title: decodeURIComponent(strTitle),
				desc: decodeURIComponent(strDesc),
				images: [image]
			}
		});
	}else{	//웹일경우...
		Kakao.Story.share({
			url: decodeURIComponent(strURL),
			text: decodeURIComponent(strTitle)
		});
	}
}

function shareBand(strURL, strTitle) {

	if(site_ismobile) { //모바일 디바이스경우...
		var param = "create/post?text=" + strTitle + "  " + strURL + "&route=" + strURL;
		 
		if(navigator.userAgent.match(/android/i)) {
			location.href = 'intent:bandapp://' + param + '#Intent;package=com.nhn.android.band;end';
		}else if(navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i)) {
			setTimeout(function(){
				location.href = 'itms-apps://itunes.apple.com/app/id542613198?mt=8';
			}, 200);
			setTimeout(function(){
				location.href = 'bandapp://' + param;
			}, 100);
		}else{
			var contents = "http://band.us/plugin/share?body=" + strTitle + "  " + strURL + "&route=" + strURL;
			window.open(contents, "SNSSHARE", "width=800, height=700");
		}
	}else{
		var contents = "http://band.us/plugin/share?body=" + strTitle + "  " + strURL + "&route=" + strURL;
		window.open(contents, "SNSSHARE", "width=800, height=700");
	}
}


function shareOtherSNS(sns, strTitle, strURL, image) {

	var snsArray = new Array();
 
	snsArray['twitter']		= "http://twitter.com/intent/tweet?text="+strTitle+ ' ' + strURL;
	snsArray['facebook']	= "http://www.facebook.com/share.php?u=" + strURL;
	snsArray['pinterest']	= "http://www.pinterest.com/pin/create/button/?url=" + strURL + "&media=" + image + "&description=" + strTitle;
	snsArray['blog']		= "http://blog.naver.com/openapi/share?url=" + strURL + "&title=" + strTitle;
	snsArray['line']		= "http://line.me/R/msg/text/?" + strTitle + " " + strURL;
	snsArray['pholar']		= "http://www.pholar.co/spi/rephol?url=" + strURL + "&title=" + strTitle;
	snsArray['google']		= "https://plus.google.com/share?url=" + strURL + "&t=" + strTitle;
	
	window.open(snsArray[sns], "SNSSHARE", "width=800, height=700");
}