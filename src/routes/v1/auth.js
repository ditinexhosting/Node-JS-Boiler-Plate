const express = require('express');
const {Auth} = require('../../controllers');

const multer = require('multer');
const router = express.Router();

router.get('/check-organisation', Auth.CheckOrganisationStatus);

/**
 * @openapi
 * /v1/auth/register-business:
 *  post:
 *     tags:
 *     - Auth
 *     summary: Registion and on-boarding for business
 *     parameters:
 *       - $ref: '#/components/schemaExamples/auth/registerBusiness/params'
 *     requestBody:
 *       $ref: '#/components/schemaExamples/auth/registerBusiness/body'
 *     responses:
 *       200:
 *         $ref: '#/components/schemaExamples/auth/registerBusiness/response'
 */

router.post('/register-business', Auth.RegisterBusiness);
/**
 * @openapi
 * /auth/login:
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login for any user
 *     requestBody:
 *       $ref: '#/components/schemaExamples/auth/login/body'
 *     responses:
 *       200:
 *         $ref: '#/components/schemaExamples/auth/login/response'
 */
router.post('/login', Auth.Login);
/**
 * @openapi
 * /auth/refresh-token:
 *  post:
 *     tags:
 *     - Auth
 *     summary: Refresh Token
 *     requestBody:
 *       $ref: '#/components/schemaExamples/auth/refreshToken/body'
 *     responses:
 *       200:
 *         $ref: '#/components/schemaExamples/auth/refreshToken/response'
 */
router.post('/refresh-token', Auth.RefreshToken);
router.get('/fetch-logo', Auth.FetchLogo);

module.exports = router;
