export default class notesAPI{
    static getALLNotes(){
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        // return notes;
        return notes.sort((a, b)=>{
            return new Date(a.updated) > new Date(b.updated) ? -1:1;
        });
    }

    static saveNotes(notesToSave){
        const notes = notesAPI.getALLNotes();

        const existing = notes.find(notes => notes.id==notesToSave.id);

        if(existing){
            existing.title = notesToSave.title;
            existing.body = notesToSave.body;
            existing.updated = new Date().toISOString();
        }
        else{
            notesToSave.id = Math.floor(Math.random() * 1000000);
            notesToSave.updated = new Date().toISOString();
            notes.push(notesToSave);
        }

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    static deleteNotes(id){
        const notes=notesAPI.getALLNotes();

        const newNotes=notes.filter(note => note.id!=id);

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}