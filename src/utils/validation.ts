export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

export function validate(validateInput: Validatable){
    let isValid = true;
    let value = validateInput.value;
    // required
    if (validateInput.required) {
        isValid = isValid && value.toString().trim().length !== 0;
    }
    // minLen
    if (validateInput.minLength != null && typeof value === 'string') {
        isValid = isValid && (value.length >= validateInput.minLength);
    }
    // maxLen
    if (validateInput.maxLength != null && typeof value === 'string') {
        isValid = isValid && (value.length <= validateInput.maxLength);
    }
    // min
    if (validateInput.min != null && typeof value === 'number') {
        isValid = isValid && (value >= validateInput.min);
    }
    // max
    if (validateInput.max != null && typeof value === 'number') {
        isValid = isValid && (value <= validateInput.max);
    }
    return isValid;
}