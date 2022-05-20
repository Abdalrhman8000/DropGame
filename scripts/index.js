window.onload = ()=> {
    const cont_start_blur = document.querySelector('.cont_start_blur');
    const start_btn       = document.querySelector(".start_btn");
    const audio = document.querySelector('audio');
    cont_start_blur.classList.add('active_start');
    cont_start_blur.addEventListener('click',hide)
    start_btn.addEventListener('click',hide)
    function hide(){
        cont_start_blur.classList.remove('active_start');
        audio.play();
    }
    checkDevice();
}

const randomer = {
    Randomiser : function (arr){
        let currentIndex = arr.length,randomIndex,currentArr;
        while(0 !== currentIndex){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            currentArr = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = currentArr;
        }
        return arr;
    },
}

const data = {
    src_data:randomer.Randomiser([
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
    names:randomer.Randomiser([
        'bee',
        'dinosaur',
        'hen',
        'elephant',
        'dog',
        'lion',
        'octopus',
        'turtle',
        'whale'
    ]),
}



let timer_start = 30;
class DrawUi {
    constructor({srcs,names}) {
        this.srcs = srcs;
        this.names = names;
        this.slider_images = document.querySelector('.slider_images');
    }


    drawer(){
        timer_start = 30;
        const drop_images= document.querySelector(".drop_images");

        drop_images.innerHTML = '';
        this.slider_images.innerHTML = '';

        this.names.forEach((ele,index)=> {
            const drop_images_elements = drop_images.children;
            drop_images.innerHTML += `<div class="card">${ele}</div>`;
            drop_images_elements[index].setAttribute('class',`card ${ele}`)
        })



        this.srcs.forEach((ele,index) => {
            const dom_element = document.createElement('img');
            dom_element.setAttribute('src',ele);
            dom_element.setAttribute('name',ele.slice(9,ele.length-4))
            this.slider_images.appendChild(dom_element)
        })
    }
}

class Droper{

    drop(){
        const slider_images = document.querySelector('.slider_images').children;
        let dropper = null;
        document.addEventListener('dragstart',(e)=>{
            dropper = e.target;
        });

        document.addEventListener('dragend',() => {
            if(slider_images.length == 0){
                this.end();
            }
        })

        document.addEventListener('dragover',(e) =>{
            e.preventDefault();
        })

        document.addEventListener('drop',(e) =>{
            e.preventDefault();
            if(e.target.classList.contains(dropper.getAttribute('name'))){
                dropper.parentNode.removeChild(dropper);
                e.target.innerText ='';
                e.target.classList.add("true");
                e.target.appendChild(dropper);

            }else{
                if(e.target.classList.contains('card')){
                    e.target.classList.add("false");
                    setTimeout(() => {
                     e.target.classList.remove("false");
                    },1000);
                }
            }
        })
    }

    end(){
        location.reload();
    }
    
}


function Timer(){
    const slider_images = document.querySelector('.slider_images').children;
    const timer = document.querySelector('.timer');
    timer.innerText = timer_start;
    if(timer_start > 0){
        timer_start--
        setTimeout(Timer,500)
    }else{
        if(slider_images.length == 0){
           location.reload();
        }else{
            const draw = new DrawUi({srcs:data.src_data,names:data.names});
            draw.drawer();
            checkDevice();
        }
    }
}


function checkDevice(){
    const ua = navigator.userAgent;
    const ops = document.querySelector('.ops');
    
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        ops.classList.remove("hidden");
        draw.drawer(false);
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        ops.classList.remove("hidden");
    
    }else{
        ops.classList.add("hidden");
        const droper = new Droper();
        droper.drop();
        const draw = new DrawUi({srcs:data.src_data,names:data.names});
        draw.drawer();
        Timer();
        window.addEventListener("resize",() => {
            ops.classList.remove("hidden");
        })
    }
}
