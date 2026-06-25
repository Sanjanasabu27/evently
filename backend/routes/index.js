var express = require('express');
const Registration = require('../model/registration');
const Event = require('../model/event');
var router = express.Router();
module.exports = router;

/* Home Page */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* Add Registration */
router.post('/registrations', async (req, res) => {
    try {
        console.log(req.body);
        const event = await Event.findOne({
  eventName: req.body.nameOfEvent
});

if (!event) {
  return res.status(404).json({
    message: "Event not found"
  });
}
const bookedSeats = await Registration.aggregate([
  {
   $match: {
  nameOfEvent: req.body.nameOfEvent,
  eventDate: new Date(req.body.eventDate)
}
  },
  {
    $group: {
      _id: null,
      totalSeats: {
        $sum: "$ticketCount"
      }
    }
  }
]);
const currentSeats =
  bookedSeats.length > 0
    ? bookedSeats[0].totalSeats
    : 0;

const requestedSeats =
  Number(req.body.ticketCount);
  if (currentSeats + requestedSeats > 25) {

  return res.status(400).json({
    message: "Room Full",
    availableSeats: 25 - currentSeats
  });

}

        const registration = new Registration({
    userName: req.body.userName,
    ticketCount: req.body.ticketCount,
    contact: req.body.contact,
    nameOfEvent: req.body.nameOfEvent,
    room: event.room,
    eventDate: req.body.eventDate,
    paymentStatus: req.body.paymentStatus
});

        await registration.save();

        res.status(201).json({
            message: "Registration Added Successfully",
            registration
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

/* Get All Registrations */
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

/* Get Registration By ID */
router.get('/registrations/:id', async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);

        if (!registration) {
            return res.status(404).json({
                message: "Registration Not Found"
            });
        }

        res.json(registration);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

/* Update Registration */
router.put('/registrations/:id', async (req, res) => {
  try {

    const oldRegistration =
      await Registration.findById(req.params.id);

    if (!oldRegistration) {
      return res.status(404).json({
        message: "Registration not found"
      });
    }

    const event = await Event.findOne({
      eventName: req.body.nameOfEvent
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    const bookedSeats = await Registration.aggregate([
      {
        $match: {
  nameOfEvent: req.body.nameOfEvent,
  eventDate: new Date(req.body.eventDate)
}
      },
      {
        $group: {
          _id: null,
          totalSeats: {
            $sum: "$ticketCount"
          }
        }
      }
    ]);

    let currentSeats =
      bookedSeats.length > 0
        ? bookedSeats[0].totalSeats
        : 0;

    // If editing same event,
    // subtract old ticket count first
    if (
      oldRegistration.nameOfEvent === req.body.nameOfEvent &&
      new Date(oldRegistration.eventDate)
        .toISOString()
        .split("T")[0] === req.body.eventDate
    ) {
      currentSeats -= oldRegistration.ticketCount;
    }

    const requestedSeats =
      Number(req.body.ticketCount);

    if (
      currentSeats + requestedSeats > 25
    ) {
      return res.status(400).json({
        message: "Room Full",
        availableSeats:
          25 - currentSeats
      });
    }

    const updatedRegistration =
      await Registration.findByIdAndUpdate(
        req.params.id,
        {
          userName: req.body.userName,
          ticketCount: req.body.ticketCount,
          contact: req.body.contact,
          nameOfEvent: req.body.nameOfEvent,
          room: event.room,
          eventDate: req.body.eventDate,
          paymentStatus:
            req.body.paymentStatus
        },
        { new: true }
      );

    res.json(updatedRegistration);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

/* Delete Registration */
router.delete('/registrations/:id', async (req, res) => {
    try {
        await Registration.findByIdAndDelete(req.params.id);

        res.json({
            message: "Registration Deleted Successfully"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

/* Search Registration */
router.get('/registrations/search/:text', async (req, res) => {
    try {
        const search = req.params.text;

        const registrations = await Registration.find({
            $or: [
                { userName: { $regex: search, $options: 'i' } },
                { contact: { $regex: search, $options: 'i' } },
                { nameOfEvent: { $regex: search, $options: 'i' } },
                {eventDate: {$regex: search, $options: 'i'}}
            ]
        });

        res.json(registrations);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
router.get("/addevents", async (req, res) => {

  await Event.create({
  eventName: "Coding Contest",
  room: "Room 1",
  eventDates: [
    { date: "2026-06-24", capacity: 25 },
    { date: "2026-06-25", capacity: 25 }
  ]
});

await Event.create({
  eventName: "Workshop",
  room: "Room 2",
  eventDates: [
    { date: "2026-06-26", capacity: 25 }
  ]
});

await Event.create({
  eventName: "Hackathon",
  room: "Room 3",
  eventDates: [
    { date: "2026-06-27", capacity: 25 },
    { date: "2026-06-28", capacity: 25 }
  ]
});

await Event.create({
  eventName: "Quiz Competition",
  room: "Room 4",
  eventDates: [
    { date: "2026-06-29", capacity: 25 }
  ]
});
    res.json({ message: 'events added' });
});
router.get(
  "/seat-availability/:event/:date",
  async (req, res) => {
    const { event, date } = req.params;

    const selectedEvent =
      await Event.findOne({
        eventName: event
      });

    const eventDate =
      selectedEvent.eventDates.find(
        d => d.date === date
      );

    const bookedSeats =
      await Registration.aggregate([
        {
          $match: {
            nameOfEvent: event,
            eventDate: new Date(date)
          }
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$ticketCount"
            }
          }
        }
      ]);

    const booked =
      bookedSeats[0]?.total || 0;

    const available =
  eventDate.capacity - booked;

    res.json({
      availableSeats: available
    });
  }
);
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
module.exports = router;