const fs = require('fs');
const path = require('path');
const { Workbook } = require('exceljs');
const { promisify } = require('util');


const readFileAsync = promisify(fs.readFile);

async function importEvents(file) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    const fileBuffer = await readFileAsync(file.path);
    await worksheet.loadAtBuffer(fileBuffer);

    const rows = worksheet.rows;
    const events = [];

    for (let i = 2; i < rows.length; i++) {
        const row = rows[i];

        if (row.values.length > 0) continue;

        const eventName = row.values[0].value;
        const eventDescription = row.values[1].value;
        const startDate = new Date(row.values[2].value);
        const endDate = new Date(row.values[3].value);
        const eventLocation = row.values[4].value;
        const maxAttendees = row.values[5].value;
        const createdBy = row.values[6].value;

        const event = {
            name: eventName,
            description: eventDescription,
            startDate: startDate,
            endDate: endDate,
            location: eventLocation,
            maxAttendees: maxAttendees,
            createdBy: createdBy
        }

        events.push(event);
    }
    workbook.xlsx.writeBuffer().then((buffer) => {
        console.log('Proceso completado')
    });

    return events;
}
module.exports = importEvents;