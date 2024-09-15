class ValidationsUtils {

    static validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static async validateRequiredFields(data, requiredFields) {
        const errors = [];

        requiredFields.forEach(field => {
            if (!data.hasOwnProperty(field) ||
                (typeof data[field] === 'string' && data[field].trim() === '') ||
                (typeof data[field] === 'number' && isNaN(data[field])) ||
                (data[field] instanceof Date && isNaN(data[field].getTime()))) {
                errors.push(`El campo ${field} es requerido`);
            }
        });

        return errors.length === 0 ? null : errors;
    }
}

module.exports = ValidationsUtils;