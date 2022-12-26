import Component from './base-component';
import * as Validation from '../utils/validation';
import { autoBind } from '../decorators/autobind';
import { state as projectState } from '../state/project-state';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    // Form fields
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');

        // Stores form fields into individual properties
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {
    }

    // This method returns a tuple of 2 strings and a number
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validation.Validatable = {
            value: enteredTitle,
            required: true,
        };

        const descriptionValidatable: Validation.Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };

        const peopleValidatable: Validation.Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };

        if (
            !Validation.validate(titleValidatable) ||
            !Validation.validate(descriptionValidatable) ||
            !Validation.validate(peopleValidatable)
        ) {
            alert('Invalid input, please try again!');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople]; // Returns a tuple. The + sign before the variable converts to int
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    /**
     * We are able to get the Class properties values in this method because of the autoBind decorator.
     * The autoBind decorator binds the Class properties values to this method
     */
    @autoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();

        /**
         * Since tuple doesn't exist in vanilla javascript we have to check the values like this
         */
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;

            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }
}