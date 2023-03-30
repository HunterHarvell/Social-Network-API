const {Thoughts, Users} = require('../models');

const thoughtController = {

    // create a thought
    createThought({params, body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'Thought not created'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err)); 
    },

    // get all thoughts
    getAllThoughts(req,res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get thought by ID
    getThoughtById({params}, res) {
        Thoughts.findOne({ _id: params.id })
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
            res.status(404).json({message: 'Thought not found'});
            return;
        }
        res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // update thought by ID
    updateThought({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'Thought not found'});
                return;
            }
                res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // delete a thought by ID
    deleteThought({params}, res) {
        Thoughts.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'Thought not found'});
                return;
            }
            res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // add reaction
    addReaction({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'Thought not found'});
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))

    },

    // delete a reaction
    deleteReaction({params}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'Thought not found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    }

};

// exporting thought controller
module.exports = thoughtController;