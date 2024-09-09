const app = Vue.createApp({
    data() {
        return {
            newTask: '',
            tasks: [],
            searchQuery: '',
        }
    },
    mounted() {
        if (localStorage.getItem('tasks')) {
            this.tasks = JSON.parse(localStorage.getItem('tasks'))
        }
    },

    computed: {
        filteredTasks() {
            if (this.searchQuery.trim() === '') {
                return this.tasks;
            }
            return this.tasks.filter(task => task.text.toLowerCase().includes(this.searchQuery.toLowerCase()));
        }
    },

    methods: {
        addTask() {
            if (this.newTask.trim() !== '') {
                this.tasks.push({
                    text: this.newTask,
                    completed: false
                });
                this.newTask = ''
                this.saveTasks();

            }
            else {
                alert("Task connot be empty!")
            }
        },
        completeTask(index) {
            this.tasks[index].completed = !this.tasks[index].completed
            this.saveTasks()
        },
        deleteTask(index) {
            this.tasks.splice(index, 1)
            this.saveTasks();
        },
        deleteAll() {
            this.tasks = [];
            this.saveTasks();
        },
        deleteCompletedTasks() {
            this.tasks = this.tasks.filter(task => !task.completed);
            this.saveTasks();
        },

        saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }
})




