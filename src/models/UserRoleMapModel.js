const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRoleMapSchema = new Schema(
  {
    role_id: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'roles',
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'users',
    },
  },
  {timestamps: true},
);

const UserRoleMapModel =
  mongoose.models.user_role_maps ||
  mongoose.model('user_role_maps', UserRoleMapSchema);
module.exports = UserRoleMapModel;
