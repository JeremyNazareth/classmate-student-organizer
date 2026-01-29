//we create de editor Quill to use later, with aditionals tools
const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline'], 
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], 
            [{ 'color': [] }, { 'background': [] }], 
            ['image'] 
          ],
    }
});

let isEditing = false
function openEditor(){
    document.getElementById('modal').style.display = 'block';    
    let createBtn = document.getElementById('createBtn');
    let saveBtn = document.getElementById('saveBtn');
    let title = document.getElementById('title');
    title.value  = '';
    isEditing = false;
    quill.setContents([]);
    if (!isEditing){
        saveBtn.style.display = 'none';
        createBtn.style.display = 'block';
        console.log('what');
    }
}

function closeEditor(){
    document.getElementById('modal').style.display = 'none';
    saveBlockToSessionStorage();
}

function createNote(){
    const title = document.getElementById('title').value;
    const delta = quill.getContents();
    const note = {
        title: title,
        content: delta
    };
    selectedBlock.addNote(note.title,note.content);
    document.getElementById('modal').style.display = 'none';
    saveBlockToSessionStorage();
    showNotes();
}

function saveNote(index){
    
    console.log(notesTable);
    let titleDiv = document.getElementById('title');
    selectedNote = selectedBlock.notes[index];
    console.log(selectedNote);
    selectedNote.title = titleDiv.value;
    selectedNote.content = quill.getContents();
    console.log(selectedBlock.notes);
    showNotes();
    closeEditor();
    
}
function removeNote(index){
    selectedBlock.notes.splice(index,1);
    showNotes();
}
function showNotes(){
    const notesContainer= document.getElementById('notes-table-body');
    const notesTable = document.getElementById('notes-table');
    notesContainer.innerHTML = '';
    selectedBlock.notes.forEach((note, index) =>{
        const noteDiv = document.createElement('tr');
        notesTable.style.display = `table`;
        noteDiv.innerHTML=`
            <tr>
                <td>${note.title}</td>
                <td>
                    <button class="btn btn-primary" onclick="editNote(${index})">
                        <span class="material-icons">
                            edit_note
                        </span>
                    </button>
                </td>
                <td>
                    <button class="btn btn-primary" onclick="showNote(${index})">
                        <span class="material-icons">
                            visibility
                        </span>
                    </button></td>
                <td>
                    <button class="btn btn-danger" onclick="removeNote(${index})">
                        <span class="material-icons">
                            delete
                        </span>
                    </button></td>                
            </tr>
        `
        notesContainer.appendChild(noteDiv);
    });
    
}

function showNote(index){
    document.getElementById('modalNote').style.display = 'block';
    let showDiv = document.getElementById('note-content');
    let titleDiv = document.getElementById('showTitle');
    titleDiv.innerHTML = '';
    showDiv.innerHTML = '';
    showDiv.className = 'note-content';
    const selectedNote = selectedBlock.notes[index];
    const quill = new Quill(document.createElement("div"));
    quill.setContents(selectedNote.content);
    const content = document.createElement("div");
    content.innerHTML = quill.root.innerHTML;
    showDiv.appendChild(content);
    titleDiv.textContent = `${selectedNote.title}`;
}

function closeNoteModal(){
    document.getElementById('modalNote').style.display = 'none';
}

function editNote(index){
    isEditing = true;
    document.getElementById('modal').style.display = 'block';
    let titleDiv = document.getElementById('title');
    let createBtn = document.getElementById('createBtn');
    let saveBtn = document.getElementById('saveBtn');
    
    saveBtn.setAttribute('onclick',`saveNote(${index})`)
    const selectedNote = selectedBlock.notes[index];
    
    quill.setContents([]);
    quill.setContents(selectedNote.content);
    titleDiv.value = '';
    titleDiv.value = `${selectedNote.title}`;

    if (isEditing){
        saveBtn.style.display = 'block';
        createBtn.style.display = 'none';
        console.log('what');
    }
}

