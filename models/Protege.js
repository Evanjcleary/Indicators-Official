var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProtegeSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    uid: {
        type: String,
        required: true,
        unique: true
    },
    imageURL: {
        type: String,
        required: false
    },
    startQuarter: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: false,
        default: ""
    },
    lastName: {
        type: String,
        required: false,
        default: ""
    },
    mentor: {
        type: String,
        required: false,
        default: ""
    },
    allMentors: [{
        type: Schema.Types.ObjectId,
        ref: "Mentor"
    }],
    manager: {
        type: String,
        required: true,
        default: "Joe Naselli"
    },
    sources : {
        type: [String],
        required: false,
        unique: false
    },
    targetMarkets: {
        type: [String],
        required: false,
        unique: false
    },
    dials: [{
        type: Schema.Types.ObjectId,
        ref: "Dial"
    }],
    appointments: [{
        type: Schema.Types.ObjectId,
        ref: "Appointments"
    }],
    todos: [{
        type: Schema.Types.ObjectId,
        ref: "Todos"
    }],
    sales: [{
        type: Schema.Types.ObjectId,
        ref: "Sales"
    }],
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }],
    almaMater: {
        type: String,
        required: false
    },
    homeTown: {
        type: String,
        required: false
    },
    experiencedAdvisor: {
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        timestamps: {
            createdAt: 'created_at'
        }
    })

var Protege = mongoose.model("Protege", ProtegeSchema)

module.exports = Protege;