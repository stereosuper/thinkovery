!function n(e,i,o){function t(u,w){if(!i[u]){if(!e[u]){var a="function"==typeof require&&require;if(!w&&a)return a(u,!0);if(r)return r(u,!0);var f=new Error("Cannot find module '"+u+"'");throw f.code="MODULE_NOT_FOUND",f}var m=i[u]={exports:{}};e[u][0].call(m.exports,function(n){var i=e[u][1][n];return t(i?i:n)},m,m.exports,n,e,i,o)}return i[u].exports}for(var r="function"==typeof require&&require,u=0;u<o.length;u++)t(o[u]);return t}({1:[function(n,e,i){"use strict";$(function(){var e=($("body"),$(window).width()),i=$(window).height();window.requestAnimFrame=n("./requestAnimFrame.js"),$(window).on("resize",function(){e=$(window).width(),i=$(window).height()}).on("load",function(){}),$(document).on("scroll",function(){})})},{"./requestAnimFrame.js":2}],2:[function(n,e,i){e.exports=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(n){window.setTimeout(n,1e3/60)}}()},{}]},{},[1]);