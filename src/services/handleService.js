// Manage change in state within forms
export const handleChange = (e, formData, setFormData) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
};
