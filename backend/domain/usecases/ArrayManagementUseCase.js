class ArrayManagementUseCase {

    async processArray(req) {
        try {
            const dailyResult = {};
            const dates = new Set();
            const events = req.body.list;

            //Obtener fechas
            events.forEach(event => {
                const startEvent = new Date(event.start_date);
                const endEvent = new Date(event.end_date);
                const durationEvent = Math.round((endEvent - startEvent) / (1000 * 3600 * 24));

                for (let i = 0; i <= durationEvent; i++) {
                    const date = new Date(startEvent.getTime() + i * 1000 * 3600 * 24);
                    dates.add(date.toISOString().split('T')[0]);
                }
            });

            //Calular asistentes por fecha
            events.forEach(event => {
                const startEvent = new Date(event.start_date);
                const endEvent = new Date(event.end_date);
                const durationEvent = Math.round((endEvent - startEvent) / (1000 * 3600 * 24));

                for (let i = 0; i <= durationEvent; i++) {
                    const date = new Date(startEvent.getTime() + i * 1000 * 3600 * 24);
                    const dateString = date.toISOString().split('T')[0];

                    if (!dailyResult[dateString]) {
                        dailyResult[dateString] = 0;
                    }
                    dailyResult[dateString] += event.attendance;
                }
            });

            //Calcular asistentes totales y ordenar por fecha
            const datesResult = Array.from(dates).sort();
            const finalResults = {};

            datesResult.forEach(date => {
                let totalAttendees = 0;
                const datesWithSameTotal = [];
                const currentDate = new Date(date);

                datesResult.forEach(d => {
                    const dateToCompare = new Date(d);

                    if (currentDate.getDate() === dateToCompare.getDate()) {
                        datesWithSameTotal.push(d);
                    }
                });

                datesWithSameTotal.forEach(d => {
                    const dateToCompare = new Date(d);

                    if (currentDate.getMonth() === dateToCompare.getMonth() &&
                        currentDate.getFullYear() === dateToCompare.getFullYear()) {
                        totalAttendees += dailyResult[d];
                    }
                });
                finalResults[date] = totalAttendees;
            });
            const response = Object.keys(finalResults).map(date => ({
                date,
                attendees: finalResults[date]
            }));

            return { status: 200, body: response };
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = ArrayManagementUseCase;