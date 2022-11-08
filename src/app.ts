class ProjectInput {
    /**
     * Properties to store HTML elements from the index.html
     * templateElement = template#project-input
     * hostElement = div#app
     * element = form inside of the template#project-input
     */
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;

    /**
     * Form fields
     */
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        /**
         * By using the ! at the end we're telling TS that it will never be null
         * We also must tell TS the type of the we're getting from the HTML element and for that we use type casting
         */
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        /**
         * Returns a copy of node. If deep is true, the copy also includes the node's descendants.
         * Imports the first element of the node and stores it into a property
         */
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        /**
         * Store form fields into indiviual properties
         */
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector(
            '#description'
        ) as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private submitHandler(event: Event) {
        event.preventDefault();

        /**
         * If we try to access the class properties whithin this method we won't be able to get the value
         * of them the solution would be to bind the when we call the method
         * By adding the bind we can then tell TS that the "this" will refer to the "this" of the class
         * therefore we can access the class properties values
         */
        console.log(this.titleInputElement.value);
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }

    private attach() {
        /**
         * Inserts the propery "element" html content into the property "hostElement"
         */
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const projectInput = new ProjectInput();
