import React from "react";
import styles from './FormsControls.module.css';

export const Textarea = ({input, meta: {touched, error, warning}, ...props}) => {
    return (
        <div>
            <div className={(touched && (error || warning)) ? styles.unvalid : styles.formControl}>
                <textarea {...input} {...props} />
            </div>
            <div>
                {touched &&
                ((error && <span className={styles.error}>{error}</span>) || (warning && <span  className={styles.warning}>{warning}</span>))}
            </div>
        </div>

    );
}

export const Input = ({input, meta: {touched, error, warning}, ...props}) => {
    return (
        <div>
            <div className={(touched && (error || warning)) ? styles.unvalid : styles.formControl}>
                <input {...input} {...props} />
            </div>
            <div>
                {touched &&
                ((error && <span className={styles.error}>{error}</span>) || (warning && <span  className={styles.warning}>{warning}</span>))}
            </div>
        </div>

    );
}

