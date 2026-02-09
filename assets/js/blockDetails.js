document.addEventListener("DOMContentLoaded", function() {
    
    const blockId = sessionStorage.getItem('selectedBlockId');
    console.log(blockId)
    const savedBlocks = JSON.parse(sessionStorage.getItem('blocks'));
    const selectedBlockData = savedBlocks[blockId]; 
    
    //Variables for data from Block selected
    selectedBlock = new Block (selectedBlockData.id,selectedBlockData.name,selectedBlockData.description,selectedBlockData.grades,selectedBlockData.tasks, selectedBlockData.notes)    
    //console.log(selectedBlock, selectedBlockData);
    let nameBlock = document.getElementById('nameSelectedBlock');
    let descriptionBlock = document.getElementById('descriptionSelectedBlock');    
    //To print the data of the JSON Block
    nameBlock.innerHTML = `${selectedBlock.name}`;
    descriptionBlock.innerHTML = `${selectedBlock.description}`;
    updateTask();
    showGrades();
    showActivities();
    showNotes();    
});

function handleSubtmit(event){
    console.log()
    event.preventDefault();
    return false;
}

function addingGrade(){
    const gradeName = document.getElementById('gradeName').value;
    const grade = document.getElementById('grade').value;
    const ponderation = document.getElementById('ponderation').value;
    if (gradeName && grade && ponderation){
        selectedBlock.addGrade(gradeName,grade,ponderation);
        saveBlockToSessionStorage();
        showGrades();
    }
    
}

function removingGrade(index){    
    selectedBlock.removeGrade(index)
    showGrades();
    saveBlockToSessionStorage();
}

function showGrades(){
    
    const gradesTableBody = document.getElementById('grades-table-body');
    const gradesTable = document.getElementById('grades-table');
    const gpa = document.getElementById('gpa');
    gradesTableBody.innerHTML = '';
    let productsSum = 0;
    let ponderationSum = 0;
    
    if (selectedBlock && selectedBlock.grades.length > 0) {
        selectedBlock.grades.forEach((grade, index) => {
            
            gradesTable.style.display = `table`;
            const gradeTr = document.createElement('tr');
            gradeTr.innerHTML = ``;
            gradeTr.innerHTML = `
                <tr>
                    <td>${grade.name}</td>
                    <td>${grade.grade}</td>
                    <td>${grade.ponderation}%</td>
                    <td><button class="btn btn-danger btn-delete" onclick = "removingGrade(${index})"> 🗑️ </button></td>
                </tr>
                
            `;
            //Grade Point Average
            productsSum += grade.grade * (grade.ponderation / 100);
            ponderationSum += grade.ponderation;
            
            gradesTableBody.appendChild(gradeTr);
        });
        if (ponderationSum === 100) {
            gpa.textContent = `Tu promedio es: ${productsSum}`;
            gpa.style.display = `block`
        } else{
            gpa.style.display = `block`
            gpa.textContent = `Las ponderaciones deben sumar hasta el 100% para tener un promedio.`;
        }
    }
}

function saveBlockToSessionStorage() {

    if (selectedBlock) {
        console.log(selectedBlock)
        const block = blocks.find(b => b.id === selectedBlock.id)
        block.grades = selectedBlock.grades
        block.tasks = selectedBlock.tasks
        block.notes = selectedBlock.notes
        sessionStorage.setItem('blocks', JSON.stringify(blocks));
        console.log(blocks);
    } else {
        console.error('selectedBlock no está definido.');
    }
}

function addingActivity (){
    const taskName = document.getElementById("taskName").value;
    const taskStart = document.getElementById("startTask").value;
    const endTask = document.getElementById("endTask").value;

    selectedBlock.addTask(taskName,taskStart,endTask);
    saveBlockToSessionStorage();
    showActivities();
    console.log(selectedBlock.tasks)
}

function removingActivity (index){
    selectedBlock.removeTask(index);
    saveBlockToSessionStorage();
    showActivities();
}

function showActivities(){
    const tasksTableBody = document.getElementById('activities-table-body');
    const tasksTable = document.getElementById('tasks-table');
    tasksTableBody.innerHTML = '';
    
    if (selectedBlock && selectedBlock.tasks.length > 0){
        selectedBlock.tasks.forEach((task, index) => {
            tasksTable.style.display = `table`;
            const taskDiv = document.createElement('tr');
            taskDiv.className = 'task';
            
            // Parse dates
            const endDate = new Date(task.endTask);
            const currentDate = new Date();
            const timeDiff = endDate - currentDate; 
            const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

            let statusText = '';
            let statusClass = '';
            let taskColor = '';

            if (daysLeft > 5) {
                statusText = `Quedan ${daysLeft} días`;
                statusClass = 'status-green';
                taskColor = '#d4edda;'; 
            } else if (daysLeft > 2) {
                statusText = `Quedan ${daysLeft} días`;
                statusClass = 'status-orange';
                taskColor = '#fff3cd;';
            } else if (daysLeft < 3 && daysLeft > 0) {
                statusText = `Quedan ${daysLeft} días`;
                statusClass = 'status-orange';
                taskColor = '#fff3cd;';
            } else {
                
                statusText = 'Vencido';
                statusClass = 'status-red';
                taskColor = '#f8d7da;'; 
            }

            taskDiv.innerHTML = `
            <tr>
                <td style="max-width:300px; word-break: break-word;">${task.name}</td>
                <td>${task.startTask}</td>
                <td>${task.endTask}</td>
                <td style="background-color:${taskColor}; border-radius: 15px;">${statusText}</td>
                <td><button class="btn btn-danger btn-delete" onclick = "removingActivity(${index})"> Remover </button></td>
            </tr>
            `;
            tasksTableBody.appendChild(taskDiv);
        });
    }
}


function updateTask() {
    document.querySelectorAll('.task').forEach(task => {
        const dateInputs = task.querySelectorAll('input[type="date"]');
        const startDateInput = dateInputs[0]; 
        const endDateInput = dateInputs[1]; 
        const statusSpan = task.querySelector('.status');
        const currentDate = new Date(); 
        
        if (startDateInput && endDateInput || selectedBlock.tasks.length > 0) {
            
            
            if (endDateInput.value) {
                const endDate = new Date(endDateInput.value);
                const daysLeft = Math.ceil((endDate - currentDate) / (1000 * 3600 * 24)); 

                
                if (daysLeft > 7) {
                    task.style.backgroundColor = '#d4edda'; 
                    statusSpan.textContent = ' (En plazo)';
                    
                } else if (daysLeft <= 7 && daysLeft > 3) {
                    task.style.backgroundColor = '#fff3cd'; 
                    statusSpan.textContent = ' (Pronto)';
                } else if (daysLeft <= 3 && daysLeft >= 0) {
                    task.style.backgroundColor = '#f8d7da'; 
                    statusSpan.textContent = ' (Urgente)';
                    
                } else {
                    task.style.backgroundColor = '#f8d7da'; 
                    statusSpan.textContent = ' (Vencida)';
                }
            } else {
                task.style.backgroundColor = '#f9f9f9'; 
                statusSpan.textContent = '';
            }
        }
    });
}

function selectedBlockLog(){
    console.log(selectedBlock.notes);
};