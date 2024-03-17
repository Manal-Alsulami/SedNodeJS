const express = require('express');
const API = express.Router();

module.exports = (db) => {
    API.post('/otp', (request, response) => {
        const { userId, otpValue } = request.body;
        db.query('SELECT * FROM otps WHERE user_ID = ? AND OTP_value = ? AND is_used = 0', [userId, otpValue], (error, results) => {
            if (error) {
                console.error('Error verifying OTP:', error);
                request.status(500).json({ error: 'Error verifying OTP' }); // 500 is response code: There was an internal error. A stack trace is provided and logged in the FusionAuth log files. The response will be empty.
                return;
            }
            if (results.length === 0) {
                request.status(401).json({ error: 'Invalid OTP' }); // 401 is responce code: You did not supply a valid Authorization header. The header was omitted or your API key was not valid. The response will be empty. 
                return;
            }
            db.query('UPDATE otps SET is_used = 1 WHERE OTP_ID = ?', [results[0].OTP_ID], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating OTP status:', updateErr);
                    response.status(500).json({ error: 'Error updating OTP status' }); // 500 is response code: // // // ...
                    return;
                }
                response.status(200).json({ message: 'OTP verified successfully' });  // 200 is response code: The request was successful. The response will contain a JSON body.
            });
        });    });

    return API;
};

// API to handle OTP code submission
//otps post to verify
//API.post('/verify-otp', (request, response) => {
  
//});
