
// GRID creation
const puzzleBoard = document.querySelector('#puzzle');
const solveButton = document.querySelector('#solve-button');
const solutionDisplay = document.querySelector('#solution');
const squares = 81;
let submission = []; // to be submitted to API

for(let i = 0; i < squares; i++) {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'number');
    inputElement.setAttribute('min', 1);
    inputElement.setAttribute('max', 9);
    if(
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
    ) {
        inputElement.classList.add('add-section');
    }

    puzzleBoard.appendChild(inputElement);
}

// GRID elements
const inputs = document.querySelectorAll('input');

// Create an data structure to sent to API
const joinValues = () => {
    
     // get pseudo array of nodes
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value)
        } else {
            submission.push('.'); // '.' - is an empty square
        }
    })
    console.log(submission);
}

// Populate solution values (string) received  from API into inputs
const populateSolutionValues = (isSolvable, solution) => {
    // if puzzle is solvable and has a solution
    if(isSolvable && solution) {
        inputs.forEach((input, index) => {
            input.value = solution[index] // put into the input.value iterable element of the string  
        })
        solutionDisplay.innerHTML = 'This the SUDOKU solution';
    }   else {
        solutionDisplay.innerHTML = 'This the not solvable';
    }
}

//API request to get sudoku solution
const solve = () => {
    joinValues();
const dataToSolve = { numbers: submission.join('') }; // create string from submission array - need to be an Object
    console.log('data', dataToSolve);
    // when 'Solve' button clicked - fetch request to our local server page with configured request to API - 
    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(dataToSolve) // stringify Object to JSON string and send to backend

    })  .then(response => response.json())  // get the response from back-end and return Promise that resolves to a JS object
        .then(data => {  // parsed data - JS Object with data received from backend
            console.log(data) 
            populateSolutionValues(data.solvable, data.solution)  //  populate received data to inputs
            
            submission = []; //reset submission
        })
        .catch((error) => {
            console.error('Error', error);
        })
}

// get the solution button
solveButton.addEventListener('click', solve)