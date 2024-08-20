
// Chrome-extension by Dr.CHEN Guang, Press E to zoom-out video to make margin for subtitle, press D to zoom-in.

var cgItem
var cgY=0, cgRatio=100, cgYstep=5 // present
function funMove(){
    cgRatio= cgY*2 + 100
    for(cgItem of videos) cgItem.style.transform=`translate(0px,${cgY}%) scale(${cgRatio/100})`
}
var ee, videos, cgTitle
function funcKey(e){
    ee=e
    // console.log(ee.key)
    if('DdEe'.indexOf(e.key)<0) return
    videos=document.getElementsByClassName("video-stream")
    if(videos.length<=0) return
    if(videos[0].style.transform.trim().length<=0) cgY=0
    if('Ee'.indexOf(e.key)>=0 && cgY>-45) {cgY -= 5; funMove()} 
    if('Dd'.indexOf(e.key)>=0 && cgY<=-5) {cgY += 5; funMove()}

    cgTitle=document.getElementsByClassName('ytp-chrome-top') // title-text
    for(cgItem of cgTitle) cgItem.style.visibility='hidden'  // hide title-text
}
document.onkeydown = funcKey
