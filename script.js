document.getElementById("mode").addEventListener("change", function() {
    if (this.value === "live") {
        window.location.href = "live.html"; // Redirect to live.html
    }
});

const typing_ground =document.querySelector('#textarea');
const btn = document.querySelector('.btn');
const score = document.querySelector('#score');
const show_sentence = document.querySelector('#ShowSentence');

let startTime, endtime, totalTimeTaken;

const sentences =['The quick brown fox jumps over the lazy dog 1',
    'The quick brown fox jumps over the lazy dog 2',
    'The quick brown fox jumps over the lazy dog 3']


    const calculateTypingSpeed = (time_taken) => {
        let totalWords = typing_ground.value.trim();
        let actualWords = totalWords === '' ? 0 : totalWords.split(" ").length;

        if(actualWords !== 0){
            let typing_speed= (actualWords / time_taken) * 60;
            typing_speed = Math.round(typing_speed);
            score.innerHTML = `Your typing speed is ${typing_speed} words per minutes & your wrote ${actualWords} words & time taken ${time_taken} sec`;
        }
    }
const endTypingTest = () => {
    btn.innerText ="Start";

    let date = new Date();
    endtime = date.getTime();

    totalTimeTaken = (endtime - startTime) / 1000;
    
    calculateTypingSpeed(totalTimeTaken);

    show_sentence.innerHTML = "";
    typing_ground.value = "";

}
const startTyping = () =>{
    let randomNumber = Math.floor(Math.random() * sentences.length);
    show_sentence.innerHTML = sentences[randomNumber];

    let date = new Date();
    startTime = date.getTime();

    btn.innerText = "Done";
}

btn.addEventListener('click', () => {
    switch (btn.innerHTML.toLowerCase()) {
        case "start":
            typing_ground.removeAttribute('disabled');
            startTyping();
            break;
        case "done":
            typing_ground.setAttribute('disabled','true');
            endTypingTest();
            break;
    }
})