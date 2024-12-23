const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    department_id: {
      type: Schema.Types.ObjectId,
      ref: 'departments',
      required: true,
    },
    office_id: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'offices',
    },
    designation_id: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'designations',
    },
    team_id: {
      type: Schema.Types.ObjectId,
      trim: true,
      ref: 'teams',
    },
    manager_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      default: null,
    },
    employee_id: {type: String, trim: true},
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true, trim: true},
    mobile: {type: Number, required: true},
    gender: {
      type: String,

      enum: ['MALE', 'FEMALE', 'OTHERS'],
    },
    refresh_token: {type: String, trim: true},
    status: {
      type: String,
      required: true,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
    date_of_joining: {type: Date},
    work_phone: {type: Number},
    father_or_hursband_name: {type: String, trim: true},
    refresh_token: {type: String, required: true, trim: true},
  },
  {timestamps: true},
);

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
