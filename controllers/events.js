const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find();

  res.status(200).json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    const savingEvent = await event.save();

    res.status(201).json({
      ok: true,
      event: savingEvent,
      ok: true,
      msg: "createEvent",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador...",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.status(201).json({
      ok: true,
      event: updateEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador..",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe",
      });
    }

    res.status(200).json({
      ok: true,
      msg: "succes, remove!",
      event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador....",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
