const {Users} = require('../models');

const userController = {
    
    // create a user
    createUser({body}, res) {
        Users.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // get all users
    getAllUsers(req, res) {
        Users.find({})
        // populate user thoughts
        .populate({path: 'thoughts', select: '-__v'})
        // populate user friends
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get user by ID
    getUserById({params}, res) {
        Users.findOne({_id: params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'User not found'});
                return; 
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // update user by ID
    updateUser({params, body}, res) {
        Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },

    // delete user
    deleteUser({params}, res) {
        Users.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // add friend by ID
    addFriend({params}, res) {
        Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'User not found'});
                return;
            }
        res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // delete a friend
    deleteFriend({ params }, res) {
        Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }

};

// export user controller
module.exports = userController; 