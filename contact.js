document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const successBox = document.getElementById('success-box');

    form.addEventListener('submit', e => {
        e.preventDefault();
        form.querySelectorAll('p.error').forEach(p => p.remove());
        let isValid = true;

        // First name
        const firstname = form.querySelector('.names .input-class:nth-child(1) input');
        if (firstname.value.trim() === "") {
            showError(firstname, "This field is required");
            isValid = false;
        } else if (/\d/.test(firstname.value.trim())) {
            showError(firstname, "Name can't have numbers");
            isValid = false;
        }else{
            clearError(firstname);
        }

        // Last name
        const lastname = form.querySelector('.names .input-class:nth-child(2) input');
        if (lastname.value.trim() === "") {
            showError(lastname, "This field is required");
            isValid = false;
        } else if (/\d/.test(lastname.value.trim())) {
            showError(lastname, "Name can't have numbers");
            isValid = false;
        }else{
            clearError(lastname)
        }

        // Email
        const email = form.querySelector('.input-class:nth-child(3) input');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === "") {
            showError(email, "This field is required");
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, "Please enter a valid email address");
            isValid = false;
        }else{
            clearError(email);
        }

        // Radios
        const radioInputs = form.querySelectorAll("input[type='radio']");
        const selectedRadio = [...radioInputs].some(radio => radio.checked);
        if (!selectedRadio) {
            let radioGroup = form.querySelector('.radio-group');
            showError(radioGroup, "Please select a query type");
            isValid = false;
        }

        // Message
        const message = form.querySelector('.message');
        if (message.value.trim() === "") {
            showError(message, "This field is required");
            isValid = false;
        }else{
            clearError(message);
        }

        // Checkbox
        const checkbox = form.querySelector("input[type='checkbox']");
        if (!checkbox.checked) {
            showError(checkbox, "To submit this form, please consent to be contacted");
            isValid = false;
        }

        // Success
        if (isValid) {
            successBox.classList.add('active');
            form.reset();

            setTimeout(() => {
                successBox.classList.remove('active');
            }, 4000);
        }
    });

    function showError(element, displayMessage) {
        const error = document.createElement('p');
        error.textContent = displayMessage;
        error.classList.add('error');
        element.classList.add("error-border");

        if (element.closest(".input-class")) {
            element.closest(".input-class").appendChild(error);
        } else if (element.closest(".radio-group")) {
            element.closest(".radio-group").appendChild(error);
        } else if (element.closest(".checkbox-wrapper")) {
            element.closest(".checkbox-wrapper").appendChild(error);
        } else {
            element.insertAdjacentElement("afterend", error);
        }
    }

    function clearError(element) {
        element.classList.remove("error-border");
        const existingError = element.parentElement.querySelector(".error");
        if (existingError) existingError.remove();
    }

});
