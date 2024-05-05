// handle error for saving unique mmsi to db, exec later
vessel.save(function (err) {
    if (err) {
        // Handle error here, e.g., send error message to client
        console.error('Error saving vessel:', err.message);
    } else {
        console.log('Vessel saved successfully!');
    }
});
