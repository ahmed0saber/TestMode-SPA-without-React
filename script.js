/*if(window.location.href.split("/").pop() == ""){
    toHome()
}*/
toHome()
function scrollToTop(){
    setTimeout(function(){
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, 100)
}
scrollToTop()
let score = 0, i = 0, j = 0, id, checked = false, valid, answers = [], time, myTimeout, counting, testId, testName

function newTurn(){
    if(i==j){
        for(let x=0; x<4; x++){
            document.getElementById("answer"+x).checked=false
        }
    }
    document.getElementById("question").textContent = questions[testId][i].question
    document.getElementById("code").textContent = questions[testId][i].code
    document.getElementById("choice1").textContent = questions[testId][i].answers[0]
    document.getElementById("choice2").textContent = questions[testId][i].answers[1]
    document.getElementById("choice3").textContent = questions[testId][i].answers[2]
    document.getElementById("choice4").textContent = questions[testId][i].answers[3]
    document.getElementById("num").textContent = i+1
    if(i == j){
        for(let x=0; x<4; x++){
            document.getElementById("answer"+x).disabled = false
        }
    }
}

function checkAnswer(){
    if(checked || i < j){
        Swal.fire(
            'Already answered',
            'Press Next',
            'info'
        )
        return
    }
    valid = false
    for(let x=0; x<4; x++){
        if(document.getElementById("answer"+x).checked){
            valid = true
            answers.push(x)
            break
        }
    }
    if(!valid){
        Swal.fire(
            'Not answered',
            'Choose an answer first',
            'info'
        )
        return
    }
    clearTimeout(myTimeout)
    counting = false
    id = "answer" + questions[testId][i].correctAnswer
    if(document.getElementById(id).checked){
        Swal.fire(
            'Correct Answer',
            '',
            'success'
        )
        if(time>0){
            score += 5
        }else{
            score += 2
        }
        document.getElementById("score").textContent = "Score : " + score
    }else{
        Swal.fire(
            'Wrong Answer',
            '',
            'error'
        )
    }
    document.getElementById(id).parentElement.classList.add('correct')
    for(let x=0; x<4; x++){
        document.getElementById("answer"+x).disabled = true
    }
    i++
    if(i = j+1){
        j++
    }
    checked = true
}

function nextQuestion(){
    if(!checked && !(i<j)){
        Swal.fire(
            'Answer first',
            'You can\'t go next until you answer the question and check for the correct answer',
            'info'
        )
        return
    }else if(i<j){
        for(let k=0; k<4; k++){
            id = "answer" + k
            document.getElementById(id).parentElement.classList.remove('correct')
        }
        i++
        if(i<j){
            id = "answer" + questions[testId][i].correctAnswer
            document.getElementById(id).parentElement.classList.add('correct')
            for(let x=0; x<4; x++){
                document.getElementById("answer"+x).checked=false
            }
            id = "answer" + answers[i]
            document.getElementById(id).checked = true
        }else{
            beginTimer()
        }
    }else{
        document.getElementById(id).parentElement.classList.remove('correct')
        beginTimer()
    }
    if(i==questions[testId].length){
        clearTimeout(myTimeout)
        if(score>questions[testId].length*3){
            window.location.href = "./#certificate"
            scrollToTop()
            testName = tests[testId].title
        }else{
            window.location.href = "./#fail"
            scrollToTop()
        }
    }else{
        newTurn()
    }
    checked = false
}

function backQuestion(){
    if(i<=0){
        Swal.fire(
            'First question',
            'You can\'t go back',
            'info'
        )
    }else if(counting){
        Swal.fire(
            'Answer first',
            'You can\'t go back while timer is running',
            'info'
        )
    }else{
        clearTimeout(myTimeout)
        counting = false
        if(checked && i>1){
            i--
        }
        i--
        for(let i=0; i<4; i++){
            id = "answer" + i
            document.getElementById(id).parentElement.classList.remove('correct')
        }
        for(let x=0; x<4; x++){
            document.getElementById("answer"+x).checked=false
        }
        id = "answer" + answers[i]
        document.getElementById(id).checked = true
        id = "answer" + questions[testId][i].correctAnswer
        document.getElementById(id).parentElement.classList.add('correct')
        newTurn()
        for(let x=0; x<4; x++){
            document.getElementById("answer"+x).disabled = true
        }
    }
}

function toTest(id){
    score = 0, i = 0, j = 0, checked = false, answers = []
    document.getElementById("score").textContent = "Score : " + score
    testId = id
    window.location.href = "./#test"
    scrollToTop()
    document.getElementById("numOfQ").textContent = questions[testId].length
    newTurn()
    clearTimeout(myTimeout)
    beginTimer()
}

function beginTimer(){
    counting = true
    time = 60
    document.getElementById("timer").textContent = time
    myTimeout = setInterval(function(){
        time--
        document.getElementById("timer").textContent = time
        if(time == 0){
            clearTimeout(myTimeout)
            counting = false
            Swal.fire(
                'Time out',
                'If you answer the question correctly, you will gain only 2 points instead of 5',
                'info'
            )
        }
    }, 1000)
}

/* function toLeaderboard(id){
    testId = id
    window.location.href = "./#leaderboard"
    scrollToTop()
} */

function toHome(){
    window.location.href = "./#home"
    scrollToTop()
}