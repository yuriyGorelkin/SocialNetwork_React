
export const required = value => (value ? undefined : 'Field is Required');

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const maxLength50 = maxLength(50);
