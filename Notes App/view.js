export default class view{
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete }={}){
        this.root=root;
        this.onNoteSelect=onNoteSelect;
        this.onNoteAdd=onNoteAdd;
        this.onNoteDelete=onNoteDelete;
        this.onNoteEdit=onNoteEdit;

        this.root.innerHTML = `
            <div class="notes_sideBar">
                <button class="notes_add" type="button">Add Notes</button>
                <div class="notes_list"></div>
            </div>
            <div class="notes_preview">
                <input class="title" type="text" placeholder="Enter a title...">
                <textarea class="body">Enter Your Notes...</textarea>
            </div>
        `;

        const btnNode  = this.root.querySelector(".notes_add");
        const inpTitle  = this.root.querySelector(".title");
        const inpBody  = this.root.querySelector(".body");

        btnNode.addEventListener("click", ()=>{
            this.onNoteAdd();
        });
        
        [inpTitle, inpBody].forEach(inputField =>{
            inputField.addEventListener("blur", ()=>{
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        // console.log ( this._createListItemHTML ( 300 , " Hey " , " Yeah mate " , new Date ( ) ) ) ;
        this.updateNotePriviewVisibility(false);
    }


    _createListItemHTML(id, title, body, updated){
        const max_body_length=60;

        return `
            <div class="notes_list_item" data-note-id="${id}">
                <div class="notes_title">${title}</div>
                <div class="notes_body">
                    ${body.substring(0, max_body_length)}
                    ${body.legth > max_body_length ? "..." : ""}
                </div>
                <div class="notes_updated">
                    ${updated.toLocaleString(undefined, {dateStyle: "full", timeStyle: "short"})}
                </div>
            </div>
        `
    }

    updateNoteList(notes){
        const notesListContainer = this.root.querySelector(".notes_list");

        notesListContainer.innerHTML = "";

        for(const note of notes){
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        notesListContainer.querySelectorAll(".notes_list_item").forEach(noteListItem=>{
            noteListItem.addEventListener("click", ()=>{
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("dblclick", ()=>{
                const doDelete = confirm("Are you sure to delete the note?");

                if(doDelete){
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            })
        })
    }

    updateActiveNote(note){
        this.root.querySelector(".title").value = note.title;
        this.root.querySelector(".body").value = note.body;

        this.root.querySelectorAll(".notes_list_item").forEach(noteListItem=>{
            noteListItem.classList.remove("notes_list_item--selected");
        })

        // console.log(`.notes_list_item[data-note-id="${note.id}"]`.classList)
        this.root.querySelector(`.notes_list_item[data-note-id="${note.id}"]`).classList.add("notes_list_item--selected");
    }

    updateNotePriviewVisibility(visible){
        this.root.querySelector(".notes_preview").style.visibility=visible?"visible":"hidden";

    }
}