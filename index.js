const theTable = document.querySelector('tbody');
function ThaFunck(e) {
    e.target.innerHTML = "Done"
    let id = e.target.getAttribute('id')
    let executionsArray = JSON.parse(localStorage.getItem('executionsArray'));
    executionsArray.forEach((execution) => {
        if(id == execution.id ) {
            execution.executed = true;
        } 
    })

    localStorage.setItem('executionsArray', JSON.stringify(executionsArray))
    updateExecutions()
}

function purgeExecution(e) {
    let executionsArray = JSON.parse(localStorage.getItem('executionsArray'));
    let targetNumber = e.target.getAttribute('id');
    executionsArray.forEach((execution, index)=> {
        if(index == targetNumber){
            executionsArray.splice(targetNumber, 1)   
            executionsArray.forEach((execution, index)=> {
                execution.id = index;
            })
        } else {
            executionsArray.forEach((execution, index)=> {
                execution.id = index;
            })      
        }

    })
    localStorage.setItem('executionsArray', JSON.stringify(executionsArray))
    updateExecutions()    
}
function updateExecutions(){
    theTable.innerHTML = ""

    let data;

    let executionsArray = JSON.parse(localStorage.getItem('executionsArray')) ;
    if(!executionsArray || executionsArray == null) return
    executionsArray.forEach((execution)=> {

        data = 
        `
            <tr>
                <th scope="row">${execution.id}</th>
                <td>${execution.toExecute}</td>

                <td>
                    <button type="button" class="btn btn-secondary" id="${execution.id}">${(execution.executed == true) ? "Done" : "Pending"}</button>
                </td>
                <td>
                    <button type="button" class="btn btn-secondary" id="${execution.id}">Purge</button>
                </td>
                <td>
                    <input type="number" name="" id="${execution.id}" min="0" max="10" value="${execution.rating}">
                </td>
            </tr>
        `
        theTable.innerHTML += data;
    })

    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
        if(button.innerText == 'Purge') {
            button.addEventListener('click',purgeExecution)
        } else {
            button.addEventListener('click',ThaFunck)
        }
        
    })
}




//Add a execution 

const knopie = document.querySelector('knopie');



knopie.addEventListener('click', (e) => {
    if(!document.querySelector('input').value) return
    let executionNumber;
    let executionsArray = JSON.parse(localStorage.getItem('executionsArray')) ;
    if(!executionsArray) {
        executionsArray = []
        executionNumber = 0;
    } else {
        executionNumber = executionsArray.length
    }

    let newExecution = {
        toExecute: document.getElementById('taskInput').value,
        executed: false,
        id: executionNumber,
        rating: 0
    }

    executionsArray.push(newExecution)
    localStorage.setItem('executionsArray', JSON.stringify(executionsArray))
    updateExecutions()
})
updateExecutions()

//Add Rating
const numberInputs = document.querySelectorAll('Input[type=number]');

numberInputs.forEach((numberInput) => {
   numberInput.addEventListener('click', updateRating)
})
function updateRating(e) {
 let executionsArray = JSON.parse(localStorage.getItem('executionsArray')) ;
 let targetNumber = e.target.getAttribute('id')
 executionsArray.forEach((execution, index)=> {
    if(index == targetNumber ) {
        execution.rating = e.target.value;
    }

    localStorage.setItem('executionsArray', JSON.stringify(executionsArray)) 
})
}