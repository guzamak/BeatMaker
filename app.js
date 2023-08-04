class Drumkit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.playbtn = document.querySelector(".play");
        this.kick = document.querySelector(".kick-sound");
        this.snare = document.querySelector(".snare-sound");
        this.hihat = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.playing = null;
        this.selects = document.querySelectorAll("select");//ใช้ class contains เเยก 
        this.mutes = document.querySelectorAll(".mute");
        this.slider = document.querySelector(".tempo-slider");
        this.tempotext = document.querySelector(".tempo-text");
    }
    repeat(){
        let step = this.index % 8
        console.log(step);
        const activeBar = document.querySelectorAll(`.b${step}`);//all เพราะ kick snare hihat
        activeBar.forEach((bar)=>{
            bar.style.animation = "playTrack 0.3s alternate ease 2"
            // check class active
            if(bar.classList.contains("active")){
                // check kick snare hihat
                if(bar.classList.contains("kick-pad")){
                    this.kick.currentTime = 0// reset เป็น 0s ทุกรอบ
                    this.kick.play()
                }
                else if(bar.classList.contains("snare-pad")){
                    this.snare.currentTime = 0
                    this.snare.play()
                }
                else if(bar.classList.contains("hihat-pad")){
                    this.hihat.currentTime = 0
                    this.hihat.play()
                }
            }
        })
        this.index++
    }
    start(){
        const interval = (60/this.bpm) *1000
        // function ไว้กดตอนเริ่ม
        if(!this.playing){
            this.playing = setInterval(()=>{this.repeat()}, interval);
        }else{
            clearInterval(this.playing) 
            this.playing = null //clear เเล้ว ตัวเเปร = 2
            this.index = 0;
        }
        
    }
    activePad(){
        this.classList.toggle("active")
    }

    updateBth(){
        if(!this.playing){
            this.playbtn.innerText = "Play"
        }else{
            this.playbtn.innerText = "Stop"
        }
    }

    updateSound(changesound){
        const value = changesound.value
        if(changesound.id == "kick-select"){
            this.kick.setAttribute("src", value)
        }
        else if(changesound.id == "snare-select"){
            this.snare.setAttribute("src", value)
        }
        else if(changesound.id == "hihat-select"){
            this.hihat.setAttribute("src", value)
        }
    }

    muteSound(mute){
        mute.classList.toggle("active")
        const muteindex = mute.getAttribute("data-track")
        switch(muteindex){
            case "0":
                this.kick.volume = 0;
                break
            case "1":
                this.snare.volume = 0;
                break
            case "2":   
                this.hihat.volume = 0;
                break
        }
    }

    tempochnage(tempo){
        this.bpm = tempo
        this.tempotext.innerText =  `${tempo}`
    }

    tempoupdate(){
        clearInterval(this.playing)
        this.playing = null
        if (this.playbtn.innerText == "Stop"){//check ว่าเล่นอยู่ไหม
            this.start()
        }
    }

}

const drumkit = new Drumkit();

drumkit.pads.forEach((pad)=>{
    pad.addEventListener("click", drumkit.activePad)//this เปลี่ยนเป็น e.target
    pad.addEventListener("animationend", function(){//this เปลี่ยนเป็น e.target
        this.style.animation = ""
    })
})

drumkit.playbtn.addEventListener("click",() => {
    drumkit.start()
    drumkit.updateBth()
})//() => {} this ไม่เปลี่ยน (window)

drumkit.selects.forEach((select)=>{
    select.addEventListener("click",(e) => {
        drumkit.updateSound(e.target)
    }) 
})

drumkit.mutes.forEach((mutes)=>{
    mutes.addEventListener("click",(e) =>{
        drumkit.muteSound(e.target)
    }) 
})

drumkit.slider.addEventListener("input",(e) => { //ทุกครั้งที่ input เปลี่ยน
    drumkit.tempochnage(e.target.value)
})

drumkit.slider.addEventListener("change",() => {
    drumkit.tempoupdate()
})