var RCW = {};

(function(scope) {

    "use strict";

    var _FORWARD = 1;
    var _BACKWARD = -1;

    var _MIN_PAUSE = 500;



    var _idx = 0;
    var _inmotion = false;
    var _elm;
    var _ts;
    var _toggle;
    var _random = false;

    var words = [
        "the", "a", "do", "to", "of", "said", "says", "are", "were", "was", "is", "his", "as", "has", "I", "you", "they",
        "be", "he", "me", "we", "she", "no", "go", "so", "by", "my", "here", "there", "where", "love", "come", "some",
        "one", "once", "ask", "friend", "school", "put", "push", "pull", "full", "house", "our", "door", "floor", "poor",
        "because", "your", "today", "even", "behind", "child", "chlidren", "wild", "climb", "most", "only", "both", "old",
        "cold", "gold", "hold", "told", "every", "everybody", "everyone", "great", "break", "steak", "beautiful", "after",
        "fast", "last", "past", "father", "mother", "class", "grass", "pass", "plant", "path", "bath", "hour", "prove",
        "improve", "sure", "sugar", "eye", "could", "would", "should", "work", "whole", "any"
    ];

    var fullscreen = function(element) {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };


    var transition = function(direction) {
        if (_inmotion === true || Date.now() - _ts < _MIN_PAUSE) {
            return;
        }

        if (direction === undefined) {
            direction = _FORWARD;
        }

        _inmotion = true;

        if (_random) {
            _idx = (Math.random() * words.length);
        } else {
            _idx = (_idx + direction) % words.length;

            if (_idx < 0) _idx += words.length
        }
        _elm.innerHTML = words[_idx];
        _ts = Date.now();

        _inmotion = false;

    };

    var start = function() {

        //fullscreen(document.documentElement);

        _elm = document.getElementById("word");
        _elm.innerHTML = words[_idx];
        _ts = Date.now();

        var wordtime = new Hammer(_elm);
        //wordtime.get('swipe').set({ direction: Hammer.DIRECTION_LEFT });
        wordtime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        wordtime.on('swipe', function(ev) {
            if (ev.direction === Hammer.DIRECTION_LEFT) {
                transition(_BACKWARD);
            } else {
                transition(_FORWARD);
            }

        });
        wordtime.on('tap', function(ev) {
            transition(_FORWARD);
        });

        _toggle = document.getElementById("toggle");
        var modetime = new Hammer(_toggle);
        modetime.on('tap', function() {
            _random = !_random;
            if (_random) {
                _toggle.src = "shuffle.png"
            } else {
                _idx = 0;
                _toggle.src = "repeat.png"
            }
        });

    };

    RCW.words = words;
    RCW.start = start;

})(RCW);


