var express = require('express');
const Registration = require('../model/registration');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/registrations', async (req, res) => {

    console.log("POST route hit");
    console.log(req.body);

    let registration = new Registration({
        userName: req.body.userName,
        ticketCount: req.body.ticketCount,
        contact: req.body.contact,
        paymentStatus: req.body.paymentStatus
    });

    await registration.save();

    console.log("Saved to MongoDB");

    res.json({
        message: "Registration Added Successfully"
    });
});
router.put('/registrations/:id', async (req, res) => {
    console.log("PUT route hit");
    console.log(req.params.id);

    let registrationId = req.params.id;

    await Registration.findByIdAndUpdate(registrationId, {
        userName: req.body.userName,
        ticketCount: req.body.ticketCount,
        contact: req.body.contact,
        paymentStatus: req.body.paymentStatus
    });

    res.json({
        message: "Registration Updated Successfully"
    });
});
router.get('/registrations/search', async (req, res) => {
    console.log("Search route hit");
    console.log(req.query.search);
    try {
        const search = req.query.search;

        const registrations = await Registration.find({
            $or: [
                { userName: { $regex: search, $options: 'i' } },
                { contact: { $regex: search, $options: 'i' } }
            ]
        });

        res.json(registrations);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
router.get('/registrations/:id', async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        res.json(registration);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
router.delete('/registrations/:id', async (req, res) => {
    try {
        const registrationId = req.params.id;

        const registration = await Registration.findByIdAndDelete(registrationId);

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        res.json({
            message: "Registration Deleted Successfully"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
router.get('/registrations', async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.json(registrations);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;
