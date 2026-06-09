const ical = require('node-ical');

const urls = [
    "https://calendar.google.com/calendar/ical/gaguman1twtch%40gmail.com/private-a18011f5b7c889181af371ea20feaf37/basic.ics",
    "https://calendar.google.com/calendar/ical/k0cgnd8vrqqih5vkf0097o5r1k5cbrb4%40import.calendar.google.com/public/basic.ics"
];

async function getCalendar() {
    console.log("EVENTOS DEL CALENDARIO PARA HOY Y MAÑANA:\\n");
    let allEvents = [];
    
    // Rango de fechas a buscar (hoy y mañana)
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
    
    for (const url of urls) {
        try {
            const data = await ical.async.fromURL(url);
            for (const k in data) {
                const event = data[k];
                if (event.type === 'VEVENT') {
                    // Manejar eventos recurrentes
                    if (typeof event.rrule !== 'undefined') {
                        const dates = event.rrule.between(startOfToday, endOfTomorrow);
                        if (dates.length > 0) {
                            for (const date of dates) {
                                allEvents.push({
                                    summary: event.summary,
                                    start: date,
                                    end: new Date(date.getTime() + (event.end - event.start))
                                });
                            }
                        }
                    } else {
                        // Eventos normales
                        if (event.start >= startOfToday && event.start < endOfTomorrow) {
                            allEvents.push({
                                summary: event.summary,
                                start: event.start,
                                end: event.end
                            });
                        }
                    }
                }
            }
        } catch (e) {
            console.error("Error cargando un calendario.");
        }
    }
    
    if (allEvents.length === 0) {
        console.log("No tienes eventos programados para hoy ni mañana.");
        return;
    }
    
    // Ordenar por fecha
    allEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
    
    for (const ev of allEvents) {
        const dateStr = ev.start.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
        const timeStr = ev.start.getHours() === 0 && ev.start.getMinutes() === 0 ? "Todo el día" : ev.start.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        console.log(`- [${dateStr} a las ${timeStr}] ${ev.summary}`);
    }
}

getCalendar();
