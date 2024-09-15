const fs = require('fs');
const path = require('path');
const { Workbook } = require('exceljs');
const { promisify } = require('util');
const { read, utils } = require('xlsx');


const readFileAsync = promisify(fs.readFile);
class FileProcessorUtils {

    static async importEvents(file) {
        console.log('Importando eventos...');
        try {
            const fileBuffer = await readFileAsync(file.path);
            const workbook = read(fileBuffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const events = [];
            const range = utils.decode_range(worksheet['!ref']);

            for (let i = range.s.r + 2; i <= range.e.r; i++) {
                const row = utils.encode_row(i);
                const cellRef = `${utils.encode_col(range.s.c)}${row}`;

                if (worksheet[cellRef] && worksheet[cellRef].v !== undefined) {
                    const values = utils.sheet_to_json(worksheet, { header: 1 })[i - 1];

                    if (values.length > 0) {
                        const [title, description, startDate, endDate, location, maxAttendees, createdBy] = values;
                        const event = {
                            title: title?.toString() ?? '',
                            description: description?.toString() ?? '',
                            startDate: startDate ? new Date(startDate) : null,
                            endDate: endDate ? new Date(endDate) : null,
                            location: location?.toString() ?? '',
                            maxAttendees: maxAttendees ? parseInt(maxAttendees.toString(), 10) : 0,
                            createdBy: createdBy?.toString() ?? ''
                        };
                        events.push(event);
                    } else {
                        console.log('No se encontraron valores en la fila:', i);
                    }
                }
            }

            console.log('Archivo cargado correctamente');

            return events;

        } catch (error) {
            console.error('Error al cargar el archivo:', error);
            throw new Error('No se pudo cargar el archivo Excel');
        }
    }
}

module.exports = FileProcessorUtils;