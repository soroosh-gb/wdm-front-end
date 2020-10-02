document.addEventListener("DOMContentLoaded", () => {
    let playBack;
    let steps = {
        kick: [],
        snare: [],
        closehat: [],
        openhat: [],
    }

    const getBeats = () => {
        fetch("http://localhost:3000/api/v1/beats")
        .then(response => response.json())
        .then(beats => {
            beats.forEach(beat => {
                renderBeat(beat)
            })
        })
    }

    const renderBeat = beat => {
        // console.log(beat)
        const select = document.querySelector("select")
        const newOption = document.createElement("option")
        newOption.dataset.id = beat.id
        newOption.value = beat.id
        newOption.innerHTML = `${beat.name} By ${beat.user.name}` 

        select.prepend(newOption)
    }
    
    const loadBeat = () => {
        const select = document.querySelector("select")
        select.addEventListener("change", e => {
            const beatId = e.target.value

            // fetch(`http://localhost:3000/api/v1/beats/${beatId}/`)
            fetch("http://localhost:3000/api/v1/beats/" + beatId)
            .then(response => response.json())
            .then(beat => {
                loadToSequencer(beat)
                
            })
        })
    }
    //  const kickWrapper = document.querySelector(".kick-button-wrapper")
    // const kicks = kickWrapper.childNodes
            
    // let kickSteps = []
    // kicks.forEach(kick => {
    //     if(kick.className){
    //         kickSteps.push(kick)
    //     }
    // })
    const resetSequencer = () => {
        const kickWrapper = document.querySelector(".kick-button-wrapper")
        const kicks = kickWrapper.childNodes
        kicks.forEach(step => {
            if(step.className){
                step.className = "sequencer-kick"
            }
        })

        const snareWrapper = document.querySelector(".snare-button-wrapper")
        const snares = snareWrapper.childNodes
        snares.forEach(step => {
            if(step.className){
                step.className = "sequencer-snare"
            }
        })

        const closehatWrapper = document.querySelector(".closehat-button-wrapper")
        const closehats = closehatWrapper.childNodes
        closehats.forEach(step => {
            if(step.className){
                step.className = "sequencer-closehat"
            }
        })

        const openhatWrapper = document.querySelector(".openhat-button-wrapper")
        const openhats = openhatWrapper.childNodes
        openhats.forEach(step => {
            if(step.className){
                step.className = "sequencer-openhat"
            }
        })
    }

    const loadToSequencer = beat => {
        let stepsArray = JSON.parse(beat.steps.split("=>").join(":"))

        resetSequencer()
        
        const kickWrapper = document.querySelector(".kick-button-wrapper")
        const kicks = kickWrapper.childNodes
        let kickSteps = []
        kicks.forEach(step => {
            if(step.className){
                kickSteps.push(step)
            }
        })
        let kickArray = stepsArray.kick
        for(let i = 0; i < kickArray.length; i++){
            if(kickArray[i] === 1){
                kickSteps[i].className = "sequencer-kick-lit"
            }
        }

        const snareWrapper = document.querySelector(".snare-button-wrapper")
        const snares = snareWrapper.childNodes
        let snareSteps = []
        snares.forEach(step => {
            if(step.className){
                snareSteps.push(step)
            }
        })
        let snareArray = stepsArray.snare
        for(let i = 0; i < snareArray.length; i++){
            if(snareArray[i] === 1){
                snareSteps[i].className = "sequencer-snare-lit"
            }
        }
        
        const closehatWrapper = document.querySelector(".closehat-button-wrapper")
        const closehats = closehatWrapper.childNodes
        let closehatSteps = []
        closehats.forEach(step => {
            if(step.className){
                closehatSteps.push(step)
            }
        })
        let closehatArray = stepsArray.closehat
        for(let i = 0; i < closehatArray.length; i++){
            if(closehatArray[i] === 1){
                closehatSteps[i].className = "sequencer-closehat-lit"
            }
        }
        
        
        const openhatWrapper = document.querySelector(".openhat-button-wrapper")
        const openhats = openhatWrapper.childNodes
        let openhatSteps = []
        openhats.forEach(step => {
            if(step.className){
                openhatSteps.push(step)
            }
        })
        let openhatArray = stepsArray.openhat
        for(let i = 0; i < openhatArray.length; i++){
            if(openhatArray[i] === 1){
                openhatSteps[i].className = "sequencer-openhat-lit"
            }
        }
        
        
    }

    const tempoIncrease = () => {
        let bpm = document.querySelector("#bpm")
        let currentBpm = parseInt(bpm.innerText)
        let newBpm = currentBpm + 1
        if(newBpm <= 150){
            bpm.innerText = newBpm
            if(document.querySelector("#play-stop-button").innerText === "STOP"){
                stopPlay(false)
                play()
            }
            
        }
    }
    const tempoDecrease = () => {
        let bpm = document.querySelector("#bpm")
        let currentBpm = parseInt(bpm.innerText)
        let newBpm = currentBpm - 1
        if(newBpm >= 60){
            bpm.innerText = newBpm
            if(document.querySelector("#play-stop-button").innerText === "STOP"){
                stopPlay(false)
                play()
            }
        }
    }

    const getBpm = () => {
        return (document.querySelector("#bpm")).innerText
    }
    const getInterval = () =>{
        return (60000 / parseInt(getBpm())) / 4;
        }

    let stepCount = 1
    const playAll = () => {
        runSequencer()
        playKick()
        playSnare()
        playClosehat()
        playOpenhat()
        stepCount++
        if(stepCount > 16) {
            stepCount = 1
        }
    }

    const play = () =>{
        playBack = setInterval(function() {
            playAll();
        }, getInterval())
    }

    function runSequencer() {
        let stringStep = stepCount.toString();
        let step = document.querySelector(`#status-light-${stringStep}`)
        // step.classList.toggle("status-light-lit")
        step.classList = "status-light-lit"
        setTimeout(function () {step.classList = "status-light"}, getInterval())
    }


        
    const stopPlay = (reset = true) => {
        clearInterval(playBack)
        if(reset) {
            stepCount = 1
        }
    }

    const playKick = () => {
        let stringStep = stepCount.toString();
        let kickStep = document.querySelector(`#kick-${stringStep}`)
        let checkMute = document.querySelector("#kick-mute").innerText
        if(kickStep.className === "sequencer-kick-lit" && checkMute === "MUTE") {
            const audio = document.getElementById("909-kick")
            if(!audio) return; 
            audio.currentTime= 0
            audio.volume = 0.8
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
            audio.volume = 0.8
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
            audio.volume = 0.5
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
            audio.volume = 0.4
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
                    audio.volume = 0.8
                    audio.play()
                }
                else if(e.target.matches("#snare-trigger")){
                    // play snare sample from library
                    const audio = document.getElementById("909-snare")
                    if(!audio) return; 
                    audio.currentTime= 0 
                    audio.volume = 0.8
                    audio.play()
                }
                else if(e.target.matches("#closehat-trigger")){
                    // play close hat sample from library
                    const audio = document.getElementById("909-closehat")
                    if(!audio) return; 
                    audio.currentTime= 0
                    audio.volume = 0.5 
                    audio.play()
                }
                else if(e.target.matches("#openhat-trigger")){
                    // play open hat sample from library
                    const audio = document.getElementById("909-openhat")
                    if(!audio) return; 
                    audio.currentTime= 0 
                    audio.volume = 0.4
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
                if(e.target.matches("#reset-btn")){
                    resetSequencer()
                }
                    
            })
        }

        const submitHandler = () => {
            document.addEventListener("submit" , e => {
                e.preventDefault()
                const form = e.target
                if(form.matches("#username-input")){
                    let name = form.name.value

                    enterUser(name)
                    form.reset()
                }
                if(form.matches("#save-beat")){
                    let beatName = form.name.value
                    
                    createConfig(beatName)
                }
            })
        }

        const createConfig = beatName => {
           
            // steps.kick = []
            // steps.snare = []
            // steps.closehat = []
            // steps.openhat = []

            const kickWrapper = document.querySelector(".kick-button-wrapper")
            const kicks = kickWrapper.childNodes
            
            let kickSteps = []
            kicks.forEach(kick => {
                if(kick.className){
                    kickSteps.push(kick)
                }
            })
            kickSteps.forEach(kick => {
                if(kick.className === "sequencer-kick"){
                    let step = 0
                    steps.kick.push(step)
                }
                if(kick.className === "sequencer-kick-lit"){
                    let step = 1
                    steps.kick.push(step)
                    console.log(steps)
                } 
            })

            const snareWrapper = document.querySelector(".snare-button-wrapper")
            const snares = snareWrapper.childNodes
            
            let snareSteps = []
            snares.forEach(snare => {
                if(snare.className){
                    snareSteps.push(snare)
                }
            })
            snareSteps.forEach(snare => {
                if(snare.className === "sequencer-snare"){
                    let step = 0
                    steps.snare.push(step)
                }
                if(snare.className === "sequencer-snare-lit"){
                    let step = 1
                    steps.snare.push(step)
                }  
            })

            const closehatWrapper = document.querySelector(".closehat-button-wrapper")
            const closehats = closehatWrapper.childNodes
            
            let closehatSteps = []
            closehats.forEach(closehat => {
                if(closehat.className){
                    closehatSteps.push(closehat)
                }
            })
            closehatSteps.forEach(closehat => {
                if(closehat.className === "sequencer-closehat"){
                    let step = 0
                    steps.closehat.push(step)
                }
                if(closehat.className === "sequencer-closehat-lit"){
                    let step = 1
                    steps.closehat.push(step)
                }  
            })

            const openhatWrapper = document.querySelector(".openhat-button-wrapper")
            const openhats = openhatWrapper.childNodes
            
            let openhatSteps = []
            openhats.forEach(openhat => {
                if(openhat.className){
                    openhatSteps.push(openhat)
                }
            })
            openhatSteps.forEach(openhat => {
                if(openhat.className === "sequencer-openhat"){
                    let step = 0
                    steps.openhat.push(step)
                }
                if(openhat.className === "sequencer-openhat-lit"){
                    let step = 1
                    steps.openhat.push(step)
                }  
            })

            saveBeat(beatName)
        }
    // name: , tempo: , steps:
        const saveBeat = beatName => {
            const body = document.querySelector("body")
            const userId = body.dataset.id
            
            const bpm = document.querySelector("#bpm")
            const speed = bpm.innerText

            const bName = beatName

            const allSteps = steps
            
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json" 
                },
                body: JSON.stringify({name: bName, tempo: speed, steps: allSteps, user_id: userId }),
            }
            fetch("http://localhost:3000/api/v1/beats", options)
            .then(reponse => reponse.json())
            .then(beat => {
                renderBeat(beat)
            })
        }

        const enterUser = name => {
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({name: name}),
            }
            fetch("http://localhost:3000/api/v1/users/", options)
            .then(reponse => reponse.json())
            .then(user => {
                const body = document.querySelector("body")
                body.dataset.id = user.id
                const nameDiv = document.querySelector("#user-name")
                nameDiv.innerText = `Welcome ${user.name}`
            })
        }

        

    clickHandler()
    submitHandler()
    getBeats()
    loadBeat()
        
})