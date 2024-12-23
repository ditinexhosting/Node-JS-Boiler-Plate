const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    office_id: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'offices',
    },
    role_name: {type: String, required: true, trim: true},
    status: {
      required: true,
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
  },
  {timestamps: true},
);

const RoleModel = mongoose.model('roles', RoleSchema);
module.exports = RoleModel;
