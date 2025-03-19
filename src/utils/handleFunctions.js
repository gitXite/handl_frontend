import { validatePassword } from '@utils/passwordValidator';


// Manage change in state within forms
export const handleChange = (e, formData, setFormData, setPasswordErrors) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});

    if (name === 'password') {
        const validation = validatePassword(value);
        setPasswordErrors(validation.errors);
    }
};
