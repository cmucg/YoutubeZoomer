
// Chrome-extension by Dr.CHEN Guang, Press E to zoom-out video to make margin for subtitle, press D to zoom-in.

var cgItem
var cgY=0, cgRatio=100, cgYstep=5 // present
var ee, videos, cgTitles, cgSubTitleCtls

function funMove(){
    cgRatio= cgY*2 + 100
    for(cgItem of videos) cgItem.style.transform=`translate(0px,${cgY}%) scale(${cgRatio/100})`
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function subTitleOffOn() {
    var cgSubTitleCtls=document.getElementsByClassName('ytp-subtitles-button')
    if(cgSubTitleCtls.length<=0) {console.log('cgSubTitleCtls not found. '); return}
    for(cgSubTitleCtl of cgSubTitleCtls) cgSubTitleCtl.click()
    await sleep(100)
    cgSubTitleCtls=document.getElementsByClassName('ytp-subtitles-button')
    for(cgSubTitleCtl of cgSubTitleCtls) { 
        if(cgSubTitleCtl.getAttribute('aria-pressed')=='false') cgSubTitleCtl.click()
    }
}

function funcKey(e){
    ee=e
    // console.log(ee.key)
    if('DdEe'.indexOf(e.key)<0) return
    videos=document.getElementsByClassName("video-stream")
    if(videos.length<=0) {console.log('videos not found. '); return}
    if(videos[0].style.transform.trim().length<=0) cgY=0
    if('Ee'.indexOf(e.key)>=0 && cgY>-45) {cgY -= 5; funMove()} 
    if('Dd'.indexOf(e.key)>=0 && cgY<=-5) {cgY += 5; funMove()}

    var cgTitles=document.getElementsByClassName('ytp-chrome-top') // title-text
    for(cgTitle of cgTitles) cgTitle.style.visibility='hidden'  // hide title-text

    subTitleOffOn()
}
document.onkeydown = funcKey

// The lower part shows the control-bar when mouse cursor is closed to the video-bottom
var cgVideo, cgControlBar, cgMask1, cgMask2, cgMask3
const classNames = 'video-stream ytp-chrome-bottom ytp-gradient-top ytp-chrome-top ytp-gradient-bottom'.split(' ')
function findDoms(){
    const doms = []
    for(c of classNames){
        doms.unshift(document.getElementsByClassName(c))
        if(doms[0].length<=0){console.log('cg Not found class: '+c); setTimeout(findDoms,1000); return 0 } //
    }
    cgVideo = doms[4][0]
    cgControlBar=doms[3][0]
    cgMask1 = doms[2][0]
    cgMask2 = doms[1][0]
    cgMask3 = doms[0][0]

    document.onmousemove=funcMouseMove
    return 1
}
findDoms()

function funcMouseMove(e){
    const cgVideoRect = cgVideo.getBoundingClientRect()
    const videoBottom = cgVideoRect.top+cgVideoRect.height
    if (videoBottom - e.clientY < 100) { // when distance between mouse and bottom < 100px
        cgControlBar.style.display='' // show control-bar
        cgMask1.style.display=''
        cgMask2.style.display=''
        cgMask3.style.display=''
    } else {
        cgControlBar.style.display='none' // hide control
        cgMask1.style.display='none'
        cgMask2.style.display='none'
        cgMask3.style.display='none'
    }
}

