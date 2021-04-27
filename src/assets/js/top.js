let nav = document.querySelector('.common-header');



var scrollFunc = function (e) { 
  e = e || window.event; 
  if (e.wheelDelta) { //第一步：先判断浏览器IE，谷歌滑轮事件    
   if (e.wheelDelta > 0) { //当滑轮向上滚动时 
    let strat = -60;
    let end = 0;
    nav = document.querySelector('.common-header');
    let pos = nav.getAttribute('style')
    let position = pos.split("top:").join("").split("px").join("")
    console.log(pos);
    if(parseInt(position) == -60){
      let timer = setInterval(() => {
        nav.setAttribute('style','top:'+ strat +'px')
        strat += 2;
            if(strat > end ) {
              // 清空定时器
              clearInterval(timer)
            } 
      },8)
    }
   } 
   if (e.wheelDelta < 0) { //当滑轮向下滚动时 
    let nav = document.querySelector('.common-header');
    let strat = 0;
    let end = -60;
    
    let pos = nav.getAttribute('style')
    let position = pos.split("top:").join("").split("px").join("")
      if(parseInt(position) == 0){
        let timer = setInterval(() => {
          nav.setAttribute('style','top:'+ strat +'px')
          strat -= 2;
              if(strat < end ) {
                // 清空定时器
                clearInterval(timer)
              } 
        },8)
      }
   } 
  } 
 }
 //给页面绑定滑轮滚动事件 
 if (document.addEventListener) {//firefox 
  document.addEventListener('DOMMouseScroll', scrollFunc, false); 
 } 
 //滚动滑轮触发scrollFunc方法 //ie 谷歌 
 window.onmousewheel = document.onmousewheel = scrollFunc;