
export const required = value => (value ? undefined : 'Field is Required');

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const maxLength10 = maxLength(10);
export const maxLength20 = maxLength(20);