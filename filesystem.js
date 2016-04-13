"use strict";

var myPage = new Page({
    element: document.querySelector('[data-component="mainContainer"]')
});

function onPageLoad(){
	myPage._onPageReload();
}

function onPrevClick(){
	myPage._getPrev();
}