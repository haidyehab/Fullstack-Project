//add note
const saveButton = document.querySelector('#btnSave')
const titleInput = document.querySelector('#title')
const descriptionInput = document.querySelector('#description')
const notesContainer = document.querySelector('#notes__container')
const deleteButton = document.querySelector('#btnDelete')

//clear form
function clearForm()
{
    titleInput.value ='';
    descriptionInput.value ='';
    deleteButton.classList.add('hidden');
}

function displayNoteInForm(note) {
titleInput.value = note.title;
descriptionInput.value = note.description;
deleteButton.classList.remove('hiiden');

deleteButton.setAttribute('data-id',note.id)
saveButton.setAttribute('data-id',note.id)
}

//getNoteById
function getNoteById(id){
    fetch(`https://localhost:7282/api/notes/${id}`)
    .then(data => data.json())
    .then(response => displayNoteInForm(response));
}


function populateForm(id){
 getNoteById(id)
}

//add note
function addNote(title,description)
{
    const body ={
title:title,
description:description,
isVisible:true
 };
fetch('https://localhost:7282/api/notes',{
    method:'post',
    body:JSON.stringify(body),
    headers:{
        "content-type":"application/json"
    }
})
.then(data => data.json())
.then(response => {
    console.log(response);
    clearForm();
    getAllNotes();
});
}

//dispaly all note
function displayNotes(notes){
let allNote ='';
notes.forEach(note => {
 const noteElement =
    `<div class="note" data-id="${note.id}">
<h3> ${note.title}</h3>
<p>${note.description}</p>
</div>
`    ;
allNote += noteElement

});
notesContainer.innerHTML = allNote;

//add event lisener
document.querySelectorAll('.note').forEach(note =>{
    note.addEventListener('click',function() {
        console.log('wwwww');
        populateForm(note.dataset.id);
    });
});
}

//get all notes from database
function getAllNotes(){
    fetch('https://localhost:7282/api/notes')
    .then(data => data.json())
    .then(response => displayNotes(response));
}
getAllNotes();

//update note

function updateNote(id,title,description){
    const body ={
        title:title,
        description:description,
        isVisible:true
         };
        fetch(`https://localhost:7282/api/notes/${id}`,{
            method:'PUT',
            body:JSON.stringify(body),
            headers:{
                "content-type":"application/json"
            }
        })
        .then(data => data.json())
        .then(response => {
            console.log(response);
            clearForm();
            getAllNotes();
        });
}


saveButton.addEventListener('click',function(){
    const id =saveButton.dataset.id;
    if(id)
    {
        updateNote(id,titleInput.value ,descriptionInput.value);
    }
    else{
        addNote(titleInput.value ,descriptionInput.value);
    }

});

//delete note

function deleteNote(id){
    fetch(`https://localhost:7282/api/notes/${id}`,{
        method:'DELETE',
       
        headers:{
            "content-type":"application/json"
        }
    })
    .then(response => {
        console.log(response);
       clearForm();
       getAllNotes();
    });
}

deleteButton.addEventListener('click',function(){
   const id= deleteButton.dataset.id;
    deleteNote(id);
});



