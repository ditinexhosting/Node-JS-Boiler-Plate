const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const {
  User,
  Role,
  Organisation,
  Office,
  Department,
  UserRolePlay,
  Team,
  Designation,
} = require('../models');

const {
  Count,
  IsExists,
  Insert,
  FindOne,
  Find,
  CompressImageAndUpload,
  FindAndUpdate,
  Delete,
  Aggregate,
  ValidateEmail,
  PasswordStrength,
  ValidateAlphanumeric,
  ValidateLength,
  ValidateMobile,
  GeneratePassword,
  IsExistsOne,
  UpdateMany,
  InsertMany,
} = require('./baseController');
const {
  Handle500Error,
  Handle200Response,
  Handle400Error,
} = require('../helpers');
const {SALT_ROUNDS} = require('../utils/constants');
const {env} = require('../config');

module.exports = {
  /**
   * Check onboarding or login of the business
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns API response
   */
  CheckOrganisationStatus: async (req, res, next) => {
    try {
      const organisationCount = await Organisation.countDocuments();

      let response = {}; // Declare response with `let` to allow reassignment

      if (organisationCount === 0) {
        // No organisation exists
        response = {isOrganisationEmpty: true};
        return Handle200Response(res, response);
      } else {
        // Organisation exists
        response = {isOrganisationEmpty: false};
        return Handle200Response(res, response);
      }
    } catch (err) {
      return Handle500Error(err, req, res, next);
    }
  },

  /**
   * Register or onboarding of the business
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns API response
   */
  RegisterBusiness: async (req, res, next) => {
    try {
      if (!req.files) return Handle400Error(res, 'Please upload a logo.');

      const {logo} = req.files;
      let upload_details = await CompressImageAndUpload(logo, true);

      upload_details = upload_details.path;

      const payload = req.body.payload ? JSON.parse(req.body.payload) : {};
      const {
        organisation = {},
        office = {},
        department = {},
        user = {},
      } = payload;

      // Destructure organisation details
      const {organisation_name, domain} = organisation;
      if (!organisation_name || !domain) {
        return Handle400Error(res, 'Please provide all organisation details.');
      }

      // Create Organisation in database
      const createdOrganisation = await Insert({
        model: Organisation,
        data: {organisation_name, domain, logo: upload_details},
      });

      // 2. Office details
      const {office_name, location} = office;
      if (!office_name || !location) {
        return Handle400Error(res, 'Please provide all office details.');
      }

      // Create an Office for the Organisation
      const createdOffice = await Insert({
        model: Office,
        data: {
          organisation_id: createdOrganisation?._id,
          office_name,
          location,
        },
      });

      // 3. Department details
      const {department_name, department_description} = department;
      if (!department_name || !department_description) {
        return Handle400Error(res, 'Please provide all department details.');
      }

      // Create Department
      const createdDepartment = await Insert({
        model: Department,
        data: {
          organisation_id: createdOrganisation?._id,
          office_id: createdOffice?._id,
          department_name,
          department_description,
          status: 'ACTIVE',
        },
      });

      // Super Admin | User details
      const {name, email, gender, mobile, password, employee_id} = user;
      if (!name || !email || !gender || !mobile || !password) {
        return Handle400Error(res, 'Please provide all user details.');
      }

      // 4. Team -> default : super admin
      const createdTeam = await Insert({
        model: Team,
        data: {
          office_id: createdOffice?._id,
          status: 'ACTIVE',
          team_name: 'SUPER_ADMIN',
        },
      });

      const roles = [
        {
          office_id: createdOffice?._id,
          role_name: 'SUPER ADMIN',
          status: 'ACTIVE',
        },
        {
          office_id: createdOffice?._id,
          role_name: 'HR MANAGER',
          status: 'ACTIVE',
        },
        {
          office_id: createdOffice?._id,
          role_name: 'EMPLOYEE',
          status: 'ACTIVE',
        },
      ];
      // 5. Roles => def: ERD
      const createdRole = await InsertMany({
        model: Role,
        data: roles,
      });

      const createdDesigntion = await Insert({
        model: Designation,
        data: {
          designation_name: 'SUPER_ADMIN',
          status: 'ACTIVE',
          office_id: createdOffice?._id,
          organisation_id: createdOrganisation?._id,
        },
      });

      const lastUser = await FindOne({
        model: User,
        sort: {employee_id: -1},
        select: 'employee_id',
      });

      let newEmployeeId;

      if (employee_id) {
        newEmployeeId = parseInt(employee_id, 10);
      } else {
        if (lastUser && lastUser.employee_id) {
          newEmployeeId = parseInt(lastUser.employee_id, 10) + 1;
        } else {
          newEmployeeId = 100;
        }
      }

      const formattedEmployeeId = String(newEmployeeId).padStart(3, '0');

      const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
      // 7. User
      const createdUser = await Insert({
        model: User,
        data: {
          department_id: createdDepartment?._id,
          office_id: createdOffice,
          designation_id: createdDesigntion?._id,
          team_id: createdTeam?._id,
          name: name,
          email: email,
          password: password_hash,
          employee_id: formattedEmployeeId,
          mobile: mobile,
          gender: gender,
          status: 'ACTIVE',
          refresh_token: GeneratePassword(20),
        },
      });

      // 8. User_Role_Map => user_id role_id
      const createdUserRoleMap = await Insert({
        model: UserRolePlay,
        data: {
          role_id: createdRole[0]?._id,
          user_id: createdUser?._id,
        },
      });

      // Return Response

      const refresh_token = GeneratePassword(20);

      const response = {
        _id: createdUser?._id,
        name: createdUser.name,
        email: createdUser.email,
        gender: createdUser.gender,
        mobile: createdUser.mobile,
        employee_id: createdUser.employee_id,

        refresh_token: refresh_token,

        office_id: createdOffice?._id,
        office_name: createdOffice.office_name,
        location: createdOffice.location,

        designation_id: createdDesigntion?._id,
        designation_name: createdDesigntion.designation_name,

        organisation_id: createdOrganisation?._id,
        organisation_name: createdOrganisation.organisation_name,
        logo: createdOrganisation.logo,
        domain: createdOrganisation.domain,

        department_id: createdDepartment?._id,
        department_name: createdDepartment.department_name,
        department_description: createdDepartment.department_description,
      };

      response.access_token_expiry = moment().add(
        env.token_expiry_limit,
        'minutes',
      );
      response.access_token = jwt.sign({response}, env.secret, {
        expiresIn: env.token_expiry_limit + 'm',
      });

      return Handle200Response(res, response);
    } catch (err) {
      return Handle500Error(err, req, res, next);
    }
  },

  /**
   * Login of any user / business / superadmin
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns API response
   */
  Login: async (req, res, next) => {
    try {
      const {email = null, password = null} = req.body;
      if (!email || !password) {
        return Handle400Error(res, 'please provide all details.');
      }
      if (!ValidateEmail(email)) {
        return Handle400Error(res, 'Invalid email id.');
      }

      const verifyUser = await Find({
        model: User,
        where: {email: email},
        select: '_id password',
      });

      if (
        !verifyUser[0]?._id ||
        !(await bcrypt.compare(password, verifyUser[0]?.password))
      ) {
        return Handle400Error(res, 'Invalid email or password.');
      }

      let user_detail = await Aggregate({
        model: User,
        data: [
          {$match: {email: email}},
          {
            $lookup: {
              from: 'departments',
              localField: 'department_id',
              foreignField: '_id',
              as: 'department_details',
            },
          },
          {
            $unwind: {
              path: '$department_details',
              preserveNullAndEmptyArrays: true,
            },
          },

          // Lookup office details
          {
            $lookup: {
              from: 'offices',
              localField: 'office_id',
              foreignField: '_id',
              as: 'office_details',
            },
          },
          {
            $unwind: {
              path: '$office_details',
              preserveNullAndEmptyArrays: true,
            },
          },

          // Lookup designation details
          {
            $lookup: {
              from: 'designations',
              localField: 'designation_id',
              foreignField: '_id',
              as: 'designation_details',
            },
          },
          {
            $unwind: {
              path: '$designation_details',
              preserveNullAndEmptyArrays: true,
            },
          },

          {
            $lookup: {
              from: 'teams',
              localField: 'team_id',
              foreignField: '_id',
              as: 'team_details',
            },
          },
          {
            $unwind: {
              path: '$team_details',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: 'teams',
              localField: 'team_id',
              foreignField: '_id',
              as: 'team_details',
            },
          },
          {
            $unwind: {
              path: '$team_details',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              email: 1,
              status: 1,
              password: 1,
              refresh_token: 1,
              gender: 1,
              mobile: 1,
              father_or_hursband_name: 1,
              date_of_joining: 1,
              work_phone: 1,

              // Include the entire department object
              department: '$department_details',

              // Include the entire office object
              office: '$office_details',

              // Include the entire designation object
              designation: '$designation_details',

              team: '$team_details',
            },
          },
        ],
      });
      const user = user_detail[0];

      let getRole = await Aggregate({
        model: UserRolePlay,
        data: [
          {$match: {user_id: user._id}},
          {
            $lookup: {
              from: 'roles',
              localField: 'role_id',
              foreignField: '_id',
              as: 'role_details',
            },
          },
          {$unwind: '$role_details'},
          {
            $set: {
              role: {
                _id: '$role_details._id',
                role_name: '$role_details.role_name',
              },
            },
          },
          {$unset: ['role_details', 'role_id']},
        ],
      });

      const refresh_token = GeneratePassword(20);

      const update_user_details = await FindAndUpdate({
        model: User,
        where: {_id: user._id},
        update: {refresh_token: refresh_token},
      });

      const response = {
        name: user.name,
        gender: user.gender,
        mobile: user.mobile,
        date_of_joining: user.date_of_joining,
        father_or_hursband_name: user.father_or_hursband_name,
        work_phone: user.work_phone,
        email: user.email,
        status: user.status,
        refresh_token: refresh_token,
        _id: user._id,
        createdAt: update_user_details.createdAt,
        updatedAt: update_user_details.updatedAt,
        department: user.department,
        office: user.office,
        designation: user.designation,
        team: user.team,
        role: getRole[0].role,
      };

      response.access_token_expiry = moment().add(
        env.token_expiry_limit,
        'minutes',
      );
      response.access_token = jwt.sign({response}, env.secret, {
        expiresIn: env.token_expiry_limit + 'm',
      });

      return Handle200Response(res, response);
    } catch (err) {
      return Handle500Error(err, req, res, next);
    }
  },

  /**
   * Refresh the access token on expiry
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns API response
   */
  RefreshToken: async (req, res, next) => {
    try {
      const {email = null, refresh_token = null} = req.body;

      const new_refresh_token = GeneratePassword(20);

      const user_details = await FindAndUpdate({
        model: User,
        where: {
          email: email,
          refresh_token: refresh_token,
        },
        update: {
          refresh_token: new_refresh_token,
        },
      });

      if (!user_details)
        return Handle400Error(res, 'Invalid email or refresh token.');

      const response = {
        refresh_token: new_refresh_token,
        _id: user_details._id,
        email: user_details.email,
        createdAt: user_details.createdAt,
        updatedAt: user_details.updatedAt,
      };

      response.access_token_expiry = moment().add(
        env.token_expiry_limit,
        'minutes',
      );
      response.access_token = jwt.sign({response}, env.secret, {
        expiresIn: env.token_expiry_limit + 'm',
      });

      return Handle200Response(res, response);
    } catch (err) {
      return Handle500Error(err, req, res, next);
    }
  },
  FetchLogo: async (req, res, next) => {
    try {
      // Fetch logo data from the Organisation model
      const logoData = await FindOne({
        model: Organisation,
        select: 'logo',
      });

      // Handle the case where no logo is found
      if (!logoData || !logoData.logo) {
        return res.status(404).json({error: 'Logo not found'});
      }

      // Construct the full URL for the logo
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const fullLogoUrl = `${baseUrl}/api/images/${logoData.logo}`;

      // Return the logo URL in the response
      return Handle200Response(res, {logo: fullLogoUrl});
    } catch (err) {
      console.error('Error fetching logo:', err);
      return res.status(500).json({error: 'Internal Server Error'});
    }
  },
};
