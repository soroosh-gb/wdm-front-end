document.addEventListener("DOMContentLoaded", () => {
    

    const clickHandler = () => {
        document.addEventListener("click", e => {
            if(e.target.matches("#play-stop-button")) {
                if ((e.target.innerText) === "PLAY") {
                    e.target.innerText = "STOP"
                    // playSequence()
                } else if((e.target.innerText) === "STOP") {
                    e.target.innerText = "PLAY"
                    // stopSequence()
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
            
            else if(e.target.matches(".sequencer-kick")){
                e.target.classList.toggle("sequencer-kick-lit")
            }
            else if(e.target.matches(".sequencer-snare")){
                e.target.classList.toggle("sequencer-snare-lit")
            }
            else if(e.target.matches(".sequencer-closehat")){
                e.target.classList.toggle("sequencer-closehat-lit")
            }
            else if(e.target.matches(".sequencer-openhat")){
                e.target.classList.toggle("sequencer-openhat-lit")
            }
                
        })
    }

    const tempoIncrease = () => {
        let bpm = document.querySelector("#bpm")
        let currewntBpm = parseInt(bpm.innerText)
        let newBpm = currewntBpm + 1

        bpm.innerText = newBpm
        
    }

    const tempoDecrease = () => {
        let bpm = document.querySelector("#bpm")
        let currewntBpm = parseInt(bpm.innerText)
        let newBpm = currewntBpm - 1

        bpm.innerText = newBpm
    }


    clickHandler()
})