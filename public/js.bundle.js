(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

	
var pacprogress = require("../../public/js/pacprogress.js");


// console.log("PacProgress --- ",PacProgress);


 
// define(['pacprogress'], function(PacProgress) {
  // Your codes 
  	var pacProgress1 = new pacprogress('#pac-progressbar', {
	  width: 800,
	  height: 20,
	  totalDots: 30
	});

	pacProgress1.draw(25);

// });

// var pacProgress = window.PacProgress('#pac-progressbar', {
//   width: 800,
//   height: 20,
//   totalDots: 30
// });

// pacProgress.draw(25);
},{"../../public/js/pacprogress.js":2}],2:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return (root.PacProgress = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    module.exports = (root.PacProgress = factory());
  } else {
    root.PacProgress = factory(root.postal);
  }
}(this, function() {
  function PacProgress(selector, options) {
    this.selector = selector;
    this.canvasWidth = options.width;
    this.canvasHeight = options.height;
    this.pacmanColor = options.pacmanColor || '#fffb00';
    this.totalDots = options.totalDots || 50;
    this.dotsGap = this.canvasWidth / this.totalDots;
    this.pacmanRadius = this.canvasHeight / 2 < this.dotsGap
      ? this.canvasHeight / 2
      : this.dotsGap - 2;
    this.dotRadius = this.pacmanRadius >= 8 ? 2 : 1;
  }

  PacProgress.prototype.draw = function(percentage) {
    var canvas = $(this.selector)[0];
    var getLatestDotOriginX = function(i) {
      return (i + 0.5) * this.dotsGap - this.dotRadius;
    }.bind(this);

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d'),
        pacmanOriginX = -this.pacmanRadius / 2 +
          percentage * this.canvasWidth / 100;
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      // Pac-dots
      ctx.save();
      ctx.translate(this.dotsGap / 2, this.canvasHeight / 2);
      for (var i = 0; i < this.totalDots; i++) {
        if (percentage % 2 === 0 &&
          getLatestDotOriginX(i) < pacmanOriginX + this.pacmanRadius
        ) {
          continue;
        } else if (percentage % 2 === 1 &&
          getLatestDotOriginX(i) < pacmanOriginX
        ) {
          continue;
        }
        ctx.save();
        ctx.translate(i * this.dotsGap, 0);
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();

      // Pacman
      ctx.save();
      ctx.translate(
        pacmanOriginX,
        this.canvasHeight / 2
      );
      ctx.fillStyle = this.pacmanColor;
      ctx.beginPath();
      if (percentage % 2 === 0) {
        ctx.arc(0, 0, this.pacmanRadius, 0, Math.PI * 2);
      } else {
        ctx.arc(0, 0, this.pacmanRadius, Math.PI / 7, -Math.PI / 7);
      }
      ctx.lineTo(0, 0);
      ctx.fill();
      ctx.restore();
    }
  };

  return PacProgress;
}));

},{}]},{},[1]);
