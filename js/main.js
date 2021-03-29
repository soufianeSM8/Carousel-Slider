let container =  document.querySelector('.container'),
    leftBtn =  document.querySelector("#left"),
    rightBtn =  document.querySelector("#right"),
    prods =  document.querySelectorAll('.prod'),
    ProdMrg = getComputedStyle(prods[0]),
    fullProdsWidth = 0,
    counter  = 0 ,
    newArray = [...prods],
    check = true;

  // this for reset slider counter when refresh or resize page
  // start
 let events ={
   event_1 : "resize",
   event_2 : "load"
 }
 for (const key in events) {
  this.addEventListener(events[key],()=>{
      // full element width
    fullProdsWidth = Math.round(parseFloat(ProdMrg.width) + parseFloat(ProdMrg.marginLeft) + parseFloat(ProdMrg.marginRight));
    // counter width
    counter = container.clientWidth;

    container.style.transform =`translateX(-${counter}px)`;
    if(this.outerWidth > 767 && this.outerWidth <= 1024){
      counter /=2
     container.style.transform =`translateX(-${counter}px)`;
    }
    container.style.transform =`translateX(-${counter}px)`;
  })

 }
 // end
 // this for move and calc counter
 function SliderAction(checkBtnRun,plusCounter,btnEnable) {
   // this for make button left or right disabled when click
   btnEnable.disabled = true;
  // this for move
  // start
    function move() {
      plusCounter;
      container.style =`transform : translateX(-${counter}px);
                        transition : .8s;`;

    }
  // end
  // this for run move func and outer
    function test(containerCounter,counterReset) {
        // check and run move func
      if(check == true){
        move()
      }
      // stop action
      check = false
      // event for container
    container.addEventListener('transitionend',()=>{
      // for right btn
      if(checkBtnRun === "right"){
        if(counter >= containerCounter){
              counter = counterReset
              container.style =`transform : translateX(-${counter}px);`

            }

      }
      // for left btn
      else if(checkBtnRun === "left"){
        if(counter <= 0){
          counter = containerCounter
          container.style =`transform : translateX(-${counter}px);`
      }

      }
      // turn on action
    check = true
    // enable btn
    btnEnable.disabled = false;

    })
  }

    if(this.outerWidth > 320 && this.outerWidth <= 767){
      if(checkBtnRun === "right"){
           test((container.clientWidth * prods.length-2) -2,container.clientWidth )
      }
      else if(checkBtnRun === "left"){
        test(container.clientWidth*(prods.length-3))
      }
    }
    else if(this.outerWidth > 767 && this.outerWidth <= 1024){
      if(checkBtnRun === "right"){
        test(((container.clientWidth /2)*(prods.length-2)),container.clientWidth /2)
      }
      else if(checkBtnRun === "left"){
        test((container.clientWidth /2)*(prods.length-3))
      }
    }
    else if( this.outerWidth > 1024){
      if(checkBtnRun === "right" ){
        test((container.clientWidth*2),0)
      }
      else if(checkBtnRun === "left"){
        test(container.clientWidth*2)
      }
    }
 }

  rightBtn.onclick = ()=>{
     SliderAction("right",(counter +=fullProdsWidth),rightBtn)
  }

  leftBtn.onclick = ()=>{
    SliderAction("left",(counter -=fullProdsWidth),leftBtn)
 }
