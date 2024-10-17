// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// const catListener1 = document.getElementById('firstCat')
// catListener1.addEventListener('click', (e) => {
//     fetch('https://opentdb.com/api.php?amount=8&category=20&difficulty=easy&type=multiple')
//     .then(response => response.json())
//     .then(data => {
//         const shuffledData = shuffleArray(data);
//         console.log(shuffledData);
//         shuffledData.array.forEach(question => {
//             console.log('Correct Answer:', question.correct_answer);
//         });
//     })
//     .catch(error => console.error('Error:', error));
// })
let pointCounter = 0;
let answeredCount = 0;
let backButton;
const hideFirstDiv = document.getElementById('firstDiv');
const hideSecondDiv = document.getElementById('secondDiv');
const hideThirdDiv = document.getElementById('thirdDiv')

const catListener1 = document.getElementById('firstCat');
const catListener2 = document.getElementById('secondCat')
hideSecondDiv.style.display = 'none';
catListener1.addEventListener('click', (e) => {
    resetQuiz();
    hideFirstDiv.style.display = 'none';
    hideSecondDiv.style.display = 'inline-block';
    fetch('https://opentdb.com/api.php?amount=8&category=20&difficulty=easy&type=multiple')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Check the structure of the data

        // Accessing the keys
        const questions = data.results; // 'results' contains the array of questions
        const quizContainer = document.getElementById('secondDiv'); // Get the quiz container
        const questionDivs = [];

        const showResults = document.createElement('button');
        showResults.innerHTML = 'Results';
        showResults.className = 'showResults';
        showResults.style.display = 'none';
        

        questions.forEach((question, index) => {
            // Create a div for each question
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question'); // Add a class for styling (optional)
            if (index !== 0) {
                questionDiv.style.display = 'none';
            }

            const questionCounter = document.createElement('p');
            questionCounter.className = 'questionCounter'; // Add a class for styling (optional)
            questionCounter.innerHTML = `Question ${index + 1} of ${questions.length}`;
            questionDiv.appendChild(questionCounter); // Append it to the question div

            // Add the question text
            const questionText = document.createElement('p');
            questionText.innerHTML = `${index + 1}. ${question.question}`;
            questionDiv.appendChild(questionText);

            // Combine correct and incorrect answers
            const answers = [...question.incorrect_answers, question.correct_answer];
            // Shuffle answers
            const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

            // Create a list for answers
            const answerList = document.createElement('ul');
            let hasAnswered = false;

            shuffledAnswers.forEach(answer => {
                const answerItem = document.createElement('li');
                answerItem.className = 'answer_li';
                answerItem.innerHTML = answer; // Set answer text
                answerList.appendChild(answerItem); // Add answer to the list

                answerItem.addEventListener('click', (e) => {
                    if (!hasAnswered) {
                        if (question.incorrect_answers.includes(answer)) {
                            answerItem.className = 'wrong_answer';
                            const correctAnswer = question.correct_answer;
                            const correctAnswerItem = Array.from(answerList.children).find(item => item.innerHTML === correctAnswer);
                            if (correctAnswerItem) {
                                correctAnswerItem.className = 'correct_answer'; // Add styling for correct answer
                            }
                        } else {
                            answerItem.className = 'correct_answer';
                            pointCounter += 1;
                        }  

                        hasAnswered = true;
                        answeredCount++; // Increment when answered

                        // Show Results button if last question answered
                        if (answeredCount === 8) {
                            showResults.style.display = 'inline-block'; // Show Results button
                        }
                    }
                });
            });

            questionDivs[index] = questionDiv;
            questionDiv.appendChild(answerList); // Add answer list to question div
            quizContainer.appendChild(questionDiv); // Add question div to the container
        });
        

        questionDivs.forEach((questionDiv, i) => {
            const prevButton = document.createElement('button');
            prevButton.innerHTML = 'Previous Question';
            prevButton.className = 'prevButton';
            if (i === 0) {
                prevButton.style.display = 'none';
            }
            prevButton.addEventListener('click', (e) => {
                questionDiv.style.display = 'none';
                questionDivs[i - 1].style.display = 'inline-block';
            });

            const nextButton = document.createElement('button');
            nextButton.innerHTML = 'Next Question';
            nextButton.className = 'nextButton';
            nextButton.addEventListener('click', (e) => {
                questionDiv.style.display = 'none';
                if (i < questionDivs.length - 1) {
                    questionDivs[i + 1].style.display = 'inline-block';
                }


            });
             let quizButtons = document.createElement('div')
           quizButtons.className ='quizButtons'

            quizButtons.appendChild(prevButton);
            quizButtons.appendChild(nextButton);
            quizButtons.appendChild(showResults);
            questionDiv.appendChild(quizButtons);
            quizContainer.appendChild(questionDiv)

            if (i === questions.length - 1) {
                nextButton.style.display = 'none'; // Hide Next Question button
            }
        });
        if(!backButton) {
            backButton = document.createElement('button');
            backButton.innerHTML = 'Back to Start';
            backButton.className = 'backButton';
            backButton.style.display = 'block'; // Ensure it's displayed
            hideThirdDiv.appendChild(backButton);

            backButton.addEventListener('click', (e) => {
                hideThirdDiv.style.display = 'none';
                hideFirstDiv.style.display = 'inline-block';
    
            })
        }




        showResults.addEventListener('click', (e) => {
            hideSecondDiv.style.display = 'none';
                        hideThirdDiv.style.display = 'flex'
            hideThirdDiv.style.flexDirection = 'column'
            const displayScore = document.getElementById('displayScore');
            displayScore.innerHTML = `Your score: ${pointCounter} out of ${questions.length}`
        });
    })
    .catch(error => console.error('Error:', error));
});

catListener2.addEventListener('click', (e) => {
    resetQuiz();
    hideFirstDiv.style.display = 'none';
    hideSecondDiv.style.display = 'inline-block';
    fetch('https://opentdb.com/api.php?amount=8&category=15&difficulty=easy&type=multiple')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Check the structure of the data

        // Accessing the keys
        const questions = data.results; // 'results' contains the array of questions
        const quizContainer = document.getElementById('secondDiv'); // Get the quiz container
        const questionDivs = [];

        const showResults = document.createElement('button');
        showResults.innerHTML = 'Results';
        showResults.className = 'showResults';
        showResults.style.display = 'none';
        

        questions.forEach((question, index) => {
            // Create a div for each question
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question'); // Add a class for styling (optional)
            if (index !== 0) {
                questionDiv.style.display = 'none';
            }

            const questionCounter = document.createElement('p');
            questionCounter.className = 'questionCounter'; // Add a class for styling (optional)
            questionCounter.innerHTML = `Question ${index + 1} of ${questions.length}`;
            questionDiv.appendChild(questionCounter); // Append it to the question div

            // Add the question text
            const questionText = document.createElement('p');
            questionText.innerHTML = `${index + 1}. ${question.question}`;
            questionDiv.appendChild(questionText);

            // Combine correct and incorrect answers
            const answers = [...question.incorrect_answers, question.correct_answer];
            // Shuffle answers
            const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

            // Create a list for answers
            const answerList = document.createElement('ul');
            let hasAnswered = false;

            shuffledAnswers.forEach(answer => {
                const answerItem = document.createElement('li');
                answerItem.className = 'answer_li';
                answerItem.innerHTML = answer; // Set answer text
                answerList.appendChild(answerItem); // Add answer to the list

                answerItem.addEventListener('click', (e) => {
                    if (!hasAnswered) {
                        if (question.incorrect_answers.includes(answer)) {
                            answerItem.className = 'wrong_answer';
                            const correctAnswer = question.correct_answer;
                            const correctAnswerItem = Array.from(answerList.children).find(item => item.innerHTML === correctAnswer);
                            if (correctAnswerItem) {
                                correctAnswerItem.className = 'correct_answer'; // Add styling for correct answer
                            }
                        } else {
                            answerItem.className = 'correct_answer';
                            pointCounter += 1;
                        }  

                        hasAnswered = true;
                        answeredCount++; // Increment when answered

                        // Show Results button if last question answered
                        if (answeredCount === 8) {
                            showResults.style.display = 'inline-block'; // Show Results button
                        }
                    }
                });
            });

            questionDivs[index] = questionDiv;
            questionDiv.appendChild(answerList); // Add answer list to question div
            quizContainer.appendChild(questionDiv); // Add question div to the container
        });
        

        questionDivs.forEach((questionDiv, i) => {
            const prevButton = document.createElement('button');
            prevButton.innerHTML = 'Previous Question';
            prevButton.className = 'prevButton';
            if (i === 0) {
                prevButton.style.display = 'none';
            }
            prevButton.addEventListener('click', (e) => {
                questionDiv.style.display = 'none';
                questionDivs[i - 1].style.display = 'inline-block';
            });

            const nextButton = document.createElement('button');
            nextButton.innerHTML = 'Next Question';
            nextButton.className = 'nextButton';
            nextButton.addEventListener('click', (e) => {
                questionDiv.style.display = 'none';
                if (i < questionDivs.length - 1) {
                    questionDivs[i + 1].style.display = 'inline-block';
                }


            });
             let quizButtons = document.createElement('div')
           quizButtons.className ='quizButtons'

            quizButtons.appendChild(prevButton);
            quizButtons.appendChild(nextButton);
            quizButtons.appendChild(showResults);
            questionDiv.appendChild(quizButtons);
            quizContainer.appendChild(questionDiv)

            if (i === questions.length - 1) {
                nextButton.style.display = 'none'; // Hide Next Question button
            }
        });
        if(!backButton) {
            backButton = document.createElement('button');
            backButton.innerHTML = 'Back to Start';
            backButton.className = 'backButton';
            backButton.style.display = 'block'; // Ensure it's displayed
            hideThirdDiv.appendChild(backButton);

            backButton.addEventListener('click', (e) => {
                hideThirdDiv.style.display = 'none';
                hideFirstDiv.style.display = 'inline-block';
    
            })
        }




        showResults.addEventListener('click', (e) => {
            hideSecondDiv.style.display = 'none';
                        hideThirdDiv.style.display = 'flex'
            hideThirdDiv.style.flexDirection = 'column'
            const displayScore = document.getElementById('displayScore');
            displayScore.innerHTML = `Your score: ${pointCounter} out of ${questions.length}`
        });
    })
    .catch(error => console.error('Error:', error));
});

function resetQuiz() {
    pointCounter = 0;
    answeredCount = 0;
    hideSecondDiv.innerHTML = ''; // Clear the quiz container
    hideThirdDiv.style.display = 'none'; // Hide results div
}


