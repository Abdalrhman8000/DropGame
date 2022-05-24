window.onload = function () {
    var cont_start_blur = document.querySelector('.cont_start_blur');
    var start_btn = document.querySelector(".start_btn");
    var audio = document.querySelector('audio');
    cont_start_blur.classList.add('active_start');
    cont_start_blur.addEventListener('click', hide);
    start_btn.addEventListener('click', hide);
    function hide() {
        cont_start_blur.classList.remove('active_start');
        audio.play();
    }
    checkDevice();
};
var randomer = {
    Randomiser: function (arr) {
        var currentIndex = arr.length, randomIndex, currentArr;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            currentArr = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = currentArr;
        }
        return arr;
    }
};
var data = {
    src_data: randomer.Randomiser([
        './assets/bee.png',
        './assets/dinosaur.png',
        './assets/dog.png',
        './assets/elephant.png',
        './assets/hen.png',
        './assets/lion.png',
        './assets/octopus.png',
        './assets/turtle.png',
        './assets/whale.png'
    ]),
    names: randomer.Randomiser([
        'bee',
        'dinosaur',
        'hen',
        'elephant',
        'dog',
        'lion',
        'octopus',
        'turtle',
        'whale'
    ])
};
var timer_start = 30;
var DrawUi = /** @class */ (function () {
    function DrawUi(_a) {
        var srcs = _a.srcs, names = _a.names;
        this.srcs = srcs;
        this.names = names;
        this.slider_images = document.querySelector('.slider_images');
    }
    DrawUi.prototype.drawer = function () {
        var _this = this;
        timer_start = 30;
        var drop_images = document.querySelector(".drop_images");
        drop_images.innerHTML = '';
        this.slider_images.innerHTML = '';
        this.names.forEach(function (ele, index) {
            var drop_images_elements = drop_images.children;
            drop_images.innerHTML += "<div class=\"card\">".concat(ele, "</div>");
            drop_images_elements[index].setAttribute('class', "card ".concat(ele));
        });
        this.srcs.forEach(function (ele, index) {
            var dom_element = document.createElement('img');
            dom_element.setAttribute('src', ele);
            dom_element.setAttribute('name', ele.slice(9, ele.length - 4));
            _this.slider_images.appendChild(dom_element);
        });
    };
    return DrawUi;
}());
var Droper = /** @class */ (function () {
    function Droper() {
    }
    Droper.prototype.drop = function () {
        var _this = this;
        var slider_images = document.querySelector('.slider_images').children;
        var dropper = null;
        document.addEventListener('dragstart', function (e) {
            dropper = e.target;
        });
        document.addEventListener('dragend', function () {
            if (slider_images.length == 0) {
                _this.end();
            }
        });
        document.addEventListener('dragover', function (e) {
            e.preventDefault();
        });
        document.addEventListener('drop', function (e) {
            e.preventDefault();
            var ele = e.target;
            if (ele.classList.contains(dropper.getAttribute('name'))) {
                dropper.parentNode.removeChild(dropper);
                ele.innerText = '';
                ele.classList.add("true");
                ele.appendChild(dropper);
            }
            else {
                if (ele.classList.contains('card')) {
                    ele.classList.add("false");
                    setTimeout(function () {
                        ele.classList.remove("false");
                    }, 1000);
                }
            }
        });
    };
    Droper.prototype.end = function () {
        location.reload();
    };
    return Droper;
}());
function Timer() {
    var slider_images = document.querySelector('.slider_images').children;
    var timer = document.querySelector('.timer');
    timer.innerText = timer_start.toString();
    if (timer_start > 0) {
        timer_start--;
        setTimeout(Timer, 500);
    }
    else {
        if (slider_images.length == 0) {
            location.reload();
        }
        else {
            var draw = new DrawUi({ srcs: data.src_data, names: data.names });
            draw.drawer();
            checkDevice();
        }
    }
}
function checkDevice() {
    var ua = navigator.userAgent;
    var ops = document.querySelector('.ops');
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        ops.classList.remove("hidden");
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        ops.classList.remove("hidden");
    }
    else {
        ops.classList.add("hidden");
        var droper = new Droper();
        droper.drop();
        var draw = new DrawUi({ srcs: data.src_data, names: data.names });
        draw.drawer();
        Timer();
        window.addEventListener("resize", function () {
            ops.classList.remove("hidden");
        });
    }
}
