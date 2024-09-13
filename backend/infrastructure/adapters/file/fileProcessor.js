const fs = require('fs').promises;
const xlsx = require('xlsx');

class FileProcessor {
    async processFile(filePath) {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = xlsx.utils.sheet_to_json(worksheet);
        return rows;
    }
}

module.exports = FileProcessor;