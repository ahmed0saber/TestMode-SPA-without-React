let questions = [
    cppQuestions,
    htmlQuestions,
    cssQuestions,
    jsQuestions,
    jsonQuestions,
    jqueryQuestions,
    bootstrapQuestions,
    reactQuestions
]

let tests = [
    {
        title: "C++ Test",
        description: "This test covers Data Types, Variables, Console Output, User Input, Comments, Operators, Conditional Statements, Loops, Arrays and Functions.",
    },
    {
        title: "HTML Test",
        description: "This test covers Attributes.",
    },
    {
        title: "CSS Test",
        description: "This test covers Selectors.",
    },
    {
        title: "JavaScript Test",
        description: "This test covers Variables.",
    },
    {
        title: "JSON Test",
        description: "This test covers Properties.",
    },
    {
        title: "jQuery Test",
        description: "This test covers $ selector.",
    },
    {
        title: "Bootstrap Test",
        description: "This test covers Text Classes.",
    },
    {
        title: "React Test",
        description: "This test covers ReactDOM.",
    }
]

for(let i = 0; i < tests.length; i++){
    document.getElementsByClassName("tests")[0].innerHTML += `
    <div class="test">
        <div class="btns">
            <h2>${tests[i].title}</h2>
            <span>${questions[i].length} Questions</span>
        </div>
        <p>${tests[i].description}</p>
        <div class="btns">
            <a class="startBtn" onclick="toTest(${i})">Start the Test</a>
            <!-- <a class="startBtn" onclick="toLeaderboard(${i})"><i class="fa fa-award"></i></a> -->
        </div>
    </div>
    `
}