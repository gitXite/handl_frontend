import { validatePassword } from '@utils/passwordValidator';


// Manage change in state within forms
export const handleChange = (e, formData, setFormData, setPasswordErrors) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});

    if (setPasswordErrors && name === 'password') {
        const validation = validatePassword(value);
        setPasswordErrors(validation.errors);
    }
};

export const handleConfirm = (e, input, onConfirm, setNotice) => {
    e.preventDefault();

    const data = input;
    if (!data) {
        setNotice('Please provide an input');
        return;
    }
    onConfirm(data);
};
