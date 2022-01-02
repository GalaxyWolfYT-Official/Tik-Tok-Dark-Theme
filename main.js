// ==UserScript==
// @name         Tik Tok Dark Mode
// @namespace    https://github.com/GalaxyWolfYT-Official/Tik-Tok-Dark-Theme/
// @version      2.1
// @description  Discord: GalaxyWolfYT#0788
// @author       GalaxyWolfYT
// @match        https://www.tiktok.com/*
// @icon         https://www.google.com/s2/favicons?domain=tiktok.com
// @run-at       document-end
// @license      MIT
// @grant        none
// ==/UserScript==

//Colors
var darkGray = 'rgb(28, 28, 28)';
var lighterGray = 'rgb(50, 50, 50)';
var white = 'rgb(255, 255, 255)';
var invisColor = 'rgb(255 255 255 / 0%)';

//Border settings
var borderRadiusSetting = '10px';

//Handling lists
var whiteList = ['DivSeekBarProgress'];
var lighterGrayList = ['DivVolumeControlBar', 'DivVolumeControlCircle', 'DivSeekBar', 'DivSeekBarCircle', 'DivVolumeControlProgress'];
var borderList = ['ButtonVoiceControlNew'];
var invisibilityList = ['DivSeekBarContainer','DivVideoControlContainer', 'DivVideoControlBottom', 'DivVideoControlTop', 'DivVoiceControlContainer', 'DivSeekBarTimeContainer', 'DivBasicPlayerWrapper', 'DivPlayIconContainer', 'DivMuteIconContainer', 'VideoBasic', 'DivContainer', 'ImgPoster', 'DivVideoWrapper'];
var invistStuffList = ['PReportText', 'DivSeekBarTimeContainer']
var xlinkList = ['#svg-pc-share', '#svg-heart-fill', 'fill-rule'];

function removeTikTokImage(div) {
    if (div.getAttribute('alt') == 'TikTok') {
        div.remove()
    }
}

function getActualName(classFromList) {
    if (classFromList != null) {
        var actualName = classFromList.split('-')[2];
        return actualName
    }
}

function colorHandler(div, classList) {
    if (whiteList.includes(getActualName(classList[0]))) {
        //white handler
        div.style.color = darkGray;
        div.style.backgroundColor = white;
    } else if (lighterGrayList.includes(getActualName(classList[0]))) {
        //lighter gray handler
        div.style.color = white;
        div.style.backgroundColor = lighterGray;
    } else {
        //default handler
        div.style.color = white;
        div.style.backgroundColor = darkGray;
    }
}

function borderHandler(div, classList) {
    if (getActualName(classList[0]) == 'ButtonVoiceControlNew') {
        div.style.borderRadius = borderRadiusSetting;
        div.children[0].style.borderRadius = borderRadiusSetting;
    } else if (borderList.includes(getActualName(classList[0]))) {
        div.style.borderRadius = borderRadiusSetting;
    }
}

function invisibleHandler(div, classList) {
    if (invistStuffList.includes(getActualName(classList[0]))) {
        div.style.color = white;
        div.style.backgroundColor = invisColor;
    } else if (invisibilityList.includes(getActualName(classList[0]))) {
        div.style.color = invisColor;
        div.style.backgroundColor = invisColor;
    }
}

function xlinkHandler(div) {
    var xlink = div.getAttributeNS('http://www.w3.org/1999/xlink', 'href')
    if (xlinkList.includes(xlink)) {
        div.style.filter = 'brightness(0) invert(1)';
    }
}

function svgHandler(div) {
    if (div.tagName == 'svg') {
        div.style.color = white;
        div.style.backgroundColor = invisColor;
        div.style.fill = '#fff';
    }
}

function initHandlers(div) {
    var classList = div.classList
    colorHandler(div, classList);
    borderHandler(div, classList);
    invisibleHandler(div, classList);
    xlinkHandler(div);
    svgHandler(div);
}

function darkMode(div) {
    initHandlers(div)
    removeTikTokImage(div)
}

function main() {
    var divs = document.querySelectorAll('*')

    divs.forEach(function(div) {
        darkMode(div)
    })
}

new MutationObserver(function(mutations) {
    main();
}).observe(document, {childList: true, subtree: true});
