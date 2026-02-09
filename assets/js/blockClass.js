class Block{
    constructor(id, name, description, grades = [], tasks = [], notes = []){
        this.id = id;
        this.name = name;
        this.description = description;
        this.grades = Array.isArray(grades) ? grades : [];
        this.tasks = tasks;
        this.notes = notes;
    }

    addGrade(gradeName,grade,ponderation) {
        const gradeObject = {
            name: gradeName,
            grade: parseFloat(grade),
            ponderation: parseFloat(ponderation)
        }
        this.grades.push(gradeObject);
    }

    removeGrade(index){
        this.grades.splice(index,1);
    }
    
    addTask(nameDate, startDate, endDate) {
        const task = {
            name : nameDate,
            startTask : startDate,
            endTask : endDate
        }
        this.tasks.push(task);
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
    }

    addNote(title,content){
        const note = {
            title : title,
            content : content
        }
        this.notes.push(note);
    }

    removeNote(index){
        this.notes.splice(index, 1);
    }
}