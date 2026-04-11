let speed = 0;
const droneId = '2d4f63bd-253f-4941-b29e-0c8b9923bb0e';

setInterval(async () => {
    speed += 5;

    if (speed > 100) speed = 0;

    const telemetry = {
        lat: 39.6 + Math.random() * 0.01, // ;)
        lng: -9.07 + Math.random() * 0.01, // ;)
        speed,
        altitude: 100 + Math.random() * 50,
    };
    try {
        await fetch(`http://localhost:3000/drones/${droneId}/telemetry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(telemetry),
        });

        console.log('Sent:', telemetry);
    } catch (err) {
        console.error('Error sending telemetry:', err.message);
    }

}, 5000);

/*

Core Idea for dynamic data generation
  START:

  Drones initialize

    we loop a data pack (speed, lat, lng, altitude) every 5 seconds
    speed increases by 5 units, loops back to 100 reaches 100
    lat, lng have insignifcant variations (randomized) around an anchor point (lat, lng), altidude works similarly
    data pack is sent via POST /drones/:id/telemetry
END

*/