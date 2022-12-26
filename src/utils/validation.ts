namespace App {
    /**
     * Validation logic
     * Interface describes an object
     */
   export interface Validatable {
        value: string | number;
        required: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }

    export function validate(validatableInput: Validatable) {
        let isValid = true;

        if (validatableInput.required) {
            // If what's after the && it's false then javascript returns false
            // Since we can have either string or number as "value" then we have to convert the "value" into a string before trying to trim it
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }

        if(validatableInput.minLength != null && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
        }

        if(validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }

        if(validatableInput.min != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }

        if(validatableInput.max != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }

        return isValid;
    }
}