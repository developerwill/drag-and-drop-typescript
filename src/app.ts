/**
 *
 * @param _ // Tells TS that we know we aren't using this parameter but
 *             still need him to be there in order to access the descriptor parameter
 * @param _2 // Same as the above
 * @param descriptor // Gets the original method so we can bind the "this" that will
 *                      refer to the "this" of the Class, after that we can access
 *                      the Class properties values
 */
function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjustedDescriptor;
}

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
         * Stores form fields into indiviual properties
         */
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
        this.attach();
    }

    /**
     * We are able to get the Class properties values in this method because of the autoBind decorator.
     * The autoBind decorator binds the Class properties values to this method
     */
    @autoBind
    private submitHandler(event: Event) {
        event.preventDefault();

        console.log(this.titleInputElement.value);
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    private attach() {
        /**
         * Inserts the propery "element" html content into the property "hostElement"
         */
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const projectInput = new ProjectInput();
