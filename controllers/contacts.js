const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const myFunctions = require('../library/functions');

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  if (myFunctions.isValidDate(req.body.birthday)) {
    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: new Date(req.body.birthday)
    };
    const response = await mongodb.getDb().db().collection('contacts').insertOne(newContact); 
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Could not create a new contact. Please try again.');
    }
  } else {
    res.status(500).json("Invalid birthday. Format should be: yyyy-mm-dd.")
  }
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const favoriteColor = req.body.favoriteColor;
  const birthday = req.body.birthday;

  let updatedContact = {};

  if (birthday && birthday.trim().length > 0) {
    if (myFunctions.isValidDate(birthday)) {
      updatedContact["birthday"] = birthday;
    } else {
      res.status(500).json("Invalid birthday. Format should be: yyyy-mm-dd.");
      return;
    }
  }

  if (firstName && firstName.trim().length > 0) {
    updatedContact["firstName"] = firstName;
  }

  if (lastName && lastName.trim().length > 0) {
    updatedContact["lastName"] = lastName;
  }

  if (email && email.trim().length > 0) {
    updatedContact["email"] = email;
  }

  if (favoriteColor && favoriteColor.trim().length > 0) {
    updatedContact["favoriteColor"] = favoriteColor;
  }

  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .updateOne({ _id: userId }, { $set: updatedContact });
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response || 'Could not update the contact. Please try again.');
  }
}

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Could not delete the contact. Please try again.');
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };