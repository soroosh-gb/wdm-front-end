document.addEventListener("DOMContentLoaded", () => {
   
 let playBack;
 

 const tempoIncrease = () => {
    let bpm = document.querySelector("#bpm")
    let currentBpm = parseInt(bpm.innerText)
    let newBpm = currentBpm + 1
    if(newBpm <= 150){
        bpm.innerText = newBpm
        // updateBpm(newBpm)
        
    }
}
  const tempoDecrease = () => {
    let bpm = document.querySelector("#bpm")
    let currentBpm = parseInt(bpm.innerText)
    let newBpm = currentBpm - 1
    if(newBpm >= 60){
        bpm.innerText = newBpm
        // updateBpm(newBpm)
    }
}

// const updateBpm = newBpm => {
//     console.log(newBpm)
//     let interval = Math.floor((60000 / parseInt(bpm)) / 4)
//     console.log(interval)
// }
let bpm = (document.querySelector("#bpm")).innerText
    console.log(bpm)
    

 let interval = (60000 / parseInt(bpm)) / 4;
 console.log(interval)
 let stepCount = 1

 const play = () =>{
   playBack = setInterval(function() {
       runSequencer()
       playKick()
       playSnare()
       playClosehat()
       playOpenhat()
       
       stepCount++
       if(stepCount > 16) {
           stepCount = 1
        }
    }, interval)
 }

function runSequencer() {
    let stringStep = stepCount.toString();
    let step = document.querySelector(`#status-light-${stringStep}`)
    step.classList.toggle("status-light-lit")
    
 }

    
 const stopPlay = () => {
    clearInterval(playBack)
    stepCount = 1
}

const playKick = () => {
    let stringStep = stepCount.toString();
    let kickStep = document.querySelector(`#kick-${stringStep}`)
    let checkMute = document.querySelector("#kick-mute").innerText
    if(kickStep.className === "sequencer-kick-lit" && checkMute === "MUTE") {
        const audio = document.getElementById("909-kick")
        if(!audio) return; 
        audio.currentTime= 0
        audio.play()
    }
}
const playSnare = () => {
    let stringStep = stepCount.toString();
    let snareStep = document.querySelector(`#snare-${stringStep}`)
    let checkMute = document.querySelector("#snare-mute").innerText
    if(snareStep.className === "sequencer-snare-lit" && checkMute === "MUTE") {
        const audio = document.getElementById("909-snare")
        if(!audio) return; 
        audio.currentTime= 0
        audio.play()
    }
}
const playClosehat= () => {
    let stringStep = stepCount.toString();
    let closehatStep = document.querySelector(`#closehat-${stringStep}`)
    let checkMute = document.querySelector("#closehat-mute").innerText
    if(closehatStep.className === "sequencer-closehat-lit" && checkMute === "MUTE") {
        const audio = document.getElementById("909-closehat")
        if(!audio) return; 
        audio.currentTime= 0
        audio.play()
    }
}
const playOpenhat= () => {
    let stringStep = stepCount.toString();
    let openhatStep = document.querySelector(`#openhat-${stringStep}`)
    let checkMute = document.querySelector("#openhat-mute").innerText
    if(openhatStep.className === "sequencer-openhat-lit" && checkMute === "MUTE") {
        const audio = document.getElementById("909-openhat")
        if(!audio) return; 
        audio.currentTime= 0
        audio.play()
    }
}
    
 
    
   

    
    const clickHandler = () => {
        document.addEventListener("click", e => {
            if(e.target.matches("#play-stop-button")) {
                if ((e.target.innerText) === "PLAY") {
                    e.target.innerText = "STOP"
                    play()
                } else if((e.target.innerText) === "STOP") {
                    e.target.innerText = "PLAY"
                    stopPlay()
                }
            
            }
            else if(e.target.matches("#kick-trigger")){
                // play kick sample from library
                const audio = document.getElementById("909-kick")
                if(!audio) return; //stop the function from running all together
                audio.currentTime= 0 //rewind to the start
                audio.play()
            }
            else if(e.target.matches("#snare-trigger")){
                // play snare sample from library
                const audio = document.getElementById("909-snare")
                if(!audio) return; 
                audio.currentTime= 0 
                audio.play()
            }
            else if(e.target.matches("#closehat-trigger")){
                // play close hat sample from library
                const audio = document.getElementById("909-closehat")
                if(!audio) return; 
                audio.currentTime= 0 
                audio.play()
            }
            else if(e.target.matches("#openhat-trigger")){
                // play open hat sample from library
                const audio = document.getElementById("909-openhat")
                if(!audio) return; 
                audio.currentTime= 0 
                audio.play()
            }
            else if(e.target.matches("#kick-mute")){
                if(e.target.innerText === "MUTE"){
                    // mute kick
                    e.target.innerText = "UNMUTE"
                }else if(e.target.innerText === "UNMUTE"){
                    // Unmute kick
                    e.target.innerText = "MUTE"
                }
                console.log("kick=m")
            }
            else if(e.target.matches("#snare-mute")){
                if(e.target.innerText === "MUTE"){
                    // mute snare
                    e.target.innerText = "UNMUTE"
                }else if(e.target.innerText === "UNMUTE"){
                    // Unmute snare
                    e.target.innerText = "MUTE"
                }
                
                console.log("snare=m")
            }
            else if(e.target.matches("#closehat-mute")){
                if(e.target.innerText === "MUTE"){
                    // mute close hat
                    e.target.innerText = "UNMUTE"
                }else if(e.target.innerText === "UNMUTE"){
                    // Unmute close hat
                    e.target.innerText = "MUTE"
                }
                console.log("chat=m")
            }
            else if(e.target.matches("#openhat-mute")){
                if(e.target.innerText === "MUTE"){
                    // mute open hat
                    e.target.innerText = "UNMUTE"
                }else if(e.target.innerText === "UNMUTE"){
                    // Unmute open hat
                    e.target.innerText = "MUTE"
                }
                console.log("ohat=m")
            }
            else if(e.target.matches("#bpm-up")) {
                tempoIncrease()
            }
            else if(e.target.matches("#bpm-down")) {
                tempoDecrease()
            }
            
            if(e.target.matches(".sequencer-kick") || (".sequencer-kick-lit")) {
                // e.target.classList.toggle("sequencer-kick-lit")
                if(e.target.className === "sequencer-kick"){
                    e.target.classList.remove("sequencer-kick")
                    e.target.classList.add("sequencer-kick-lit")
                }
                else if(e.target.className === "sequencer-kick-lit"){
                    e.target.classList.remove("sequencer-kick-lit")
                    e.target.classList.add("sequencer-kick")
                }
            }
            
            if(e.target.matches(".sequencer-snare") || (".sequencer-snare-lit")){
                if(e.target.className === "sequencer-snare"){
                    e.target.classList.remove("sequencer-snare")
                    e.target.classList.add("sequencer-snare-lit")
                }
                else if(e.target.className === "sequencer-snare-lit"){
                    e.target.classList.remove("sequencer-snare-lit")
                    e.target.classList.add("sequencer-snare")
                }
            }
            
            if(e.target.matches(".sequencer-closehat") || (".sequencer-closehat-lit")){
                if(e.target.className === "sequencer-closehat"){
                    e.target.classList.remove("sequencer-closehat")
                    e.target.classList.add("sequencer-closehat-lit")
                }
                else if(e.target.className === "sequencer-closehat-lit"){
                    e.target.classList.remove("sequencer-closehat-lit")
                    e.target.classList.add("sequencer-closehat")
                }
            }
            if(e.target.matches(".sequencer-openhat") || (".sequencer-openhat-lit")){
                if(e.target.className === "sequencer-openhat"){
                    e.target.classList.remove("sequencer-openhat")
                    e.target.classList.add("sequencer-openhat-lit")
                }
                else if(e.target.className === "sequencer-openhat-lit"){
                    e.target.classList.remove("sequencer-openhat-lit")
                    e.target.classList.add("sequencer-openhat")
                }
            }
                
        })
    }

   

    clickHandler()
})
