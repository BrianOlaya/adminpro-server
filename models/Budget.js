const mongoose = require('mongoose');

const BudgetSchema = mongoose.Schema({
    budget: {
        type: Number,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    date: {
        type: Date,
        default: Date.now()
    },

});

module.exports = mongoose.model('Budget', BudgetSchema);

