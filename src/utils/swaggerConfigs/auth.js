module.exports = {
  /**
   * Schema for business registration
   */
  registerBusiness: {
    body: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['organisation', 'office', 'department', 'user'],
            properties: {
              organisation: {
                type: 'object',
                required: ['organisation_name', 'domain'],
                properties: {
                  organisation_name: {
                    type: 'string',
                    example: 'Ditinex',
                    description: 'Name of the organisation',
                  },
                  domain: {
                    type: 'string',
                    example: 'ditinex.com',
                    description: 'Domain of the organisation',
                  },
                },
              },

              office: {
                type: 'object',
                required: ['organisation_id', 'office_name', 'location'],
                properties: {
                  organisation_id: {
                    type: 'integer',
                    example: 32453674683652,
                    description:
                      'ID of the organisation to which the office belongs',
                  },
                  office_name: {
                    type: 'string',
                    example: 'Ditinex Headquarters',
                    description: 'Name of the office',
                  },
                  location: {
                    type: 'string',
                    example: 'India',
                    description: 'Location of the office',
                  },
                },
              },
              department: {
                type: 'object',
                required: [
                  'organisation_id',
                  'office_id',
                  'department_name',
                  'status',
                ],
                properties: {
                  organisation_id: {
                    type: 'integer',
                    example: 32453674683652,
                    description:
                      'ID of the organisation to which the department belongs',
                  },
                  office_id: {
                    type: 'integer',
                    example: 87265328490281038,
                    description:
                      'ID of the office to which the department belongs',
                  },
                  department_name: {
                    type: 'string',
                    example: 'Engineering',
                    description: 'Name of the department',
                  },
                  department_description: {
                    type: 'string',
                    example:
                      'Handles product development and technical operations.',
                    description: 'Description of the department’s functions',
                  },
                  status: {
                    type: 'string',
                    enum: ['Active', 'Inactive'],
                    example: 'Active',
                    description: 'Status of the department',
                  },
                },
              },
              user: {
                type: 'object',
                required: ['name', 'email', 'password', 'mobile', 'gender'],
                properties: {
                  name: {
                    type: 'string',
                    example: 'Asif Akram',
                    description: 'Full name of the user',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'asif@ditinex.com',
                    description: 'Email address of the user',
                  },
                  password: {
                    type: 'string',
                    example: 'Asif1234',
                    description: 'Password for the user account',
                  },
                  mobile: {
                    type: 'string',
                    example: '8973478372',
                    description: 'Mobile number of the user',
                  },
                  gender: {
                    type: 'string',
                    enum: ['MALE', 'FEMALE', 'OTHERS'],
                    example: 'MALE',
                    description: 'Gender of the user',
                  },
                },
              },
            },
          },
        },
      },
    },
    params: {
      in: 'query',
      name: 'userId',
      schema: {
        type: 'boolean',
      },
      required: false,
      description: 'Specifies if the response should include a welcome message',
    },
    response: {
      description: '200 Response',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '672dae09af927bcda8c217bb',
              },
              name: {
                type: 'string',
                example: 'Asif Akram',
                description: 'Full name of the user',
              },
              email: {
                type: 'string',
                format: 'email',
                example: 'asif@ditinex.com',
                description: 'Email address of the user',
              },
              employee_id: {
                type: 'string',
                example: '100',
              },
              gender: {
                type: 'string',
                example: 'MALE',
                description: 'Gender of the user',
              },
              mobile: {
                type: 'string',
                example: '8973478372',
                description: 'Mobile number of the user',
              },
              office_id: {
                type: 'string',
                example: '672dae08af927bcda8c217af',
                description: 'ID of the office to which the user belongs',
              },
              office_name: {
                type: 'string',
                example: 'Ditinex Headquarters',
                description: 'Name of the office',
              },
              location: {
                type: 'string',
                example: 'India',
                description: 'Location of the office',
              },
              designation_id: {
                type: 'string',
                example: '672dae09af927bcda8c217b9',
                description: 'ID of the user’s designation',
              },
              designation_name: {
                type: 'string',
                example: 'SUPER_ADMIN',
                description: 'Name of the user’s designation',
              },
              organisation_id: {
                type: 'string',
                example: '672dae08af927bcda8c217ad',
                description: 'ID of the organisation to which the user belongs',
              },
              organisation_name: {
                type: 'string',
                example: 'Ditinex',
                description: 'Name of the organisation',
              },
              domain: {
                type: 'string',
                example: 'ditinex.com',
                description: 'Domain of the organisation',
              },
              department_id: {
                type: 'string',
                example: '672dae09af927bcda8c217b1',
                description: 'ID of the department to which the user belongs',
              },
              department_name: {
                type: 'string',
                example: 'Engineering',
                description: 'Name of the department',
              },
              department_description: {
                type: 'string',
                example:
                  'Handles product development and technical operations.',
                description: 'Description of the department',
              },
              access_token_expiry: {
                type: 'string',
                format: 'date-time',
                example: '2024-11-08T07:22:01.507Z',
                description: 'Expiration time of the access token',
              },
              access_token: {
                type: 'string',
                example:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNwb25zZSI6eyJfaWQiOiI2NzJkYWUwOWFmOTI3YmNkYThjMjE3YmIiLCJuYW1lIjoiQXNpZiBBa3JhbSIsImVtYWlsIjoiYXNpZjVAZGl0aW5leC5jb20iLCJnZW5kZXIiOiJNQUxFIiwibW9iaWxlIjo4OTczNDc4MzcyLCJvZmZpY2VfaWQiOiI2NzJkYWUwOGFmOTI3YmNkYThjMjE3YWYiLCJvZmZpY2VfbmFtZSI6IkRpdGluZXggSGVhZHF1YXJ0ZXJzIiwibG9jYXRpb24iOiJJbmRpYSIsImRlc2lnbmF0aW9uX2lkIjoiNjcyZGFlMDlhZjkyN2JjZGE4YzIxN2I5IiwiZGVzaWduYXRpb25fbmFtZSI6IlNVUEVSX0FETUlOIiwib3JnYW5pc2F0aW9uX2lkIjoiNjcyZGFlMDhhZjkyN2JjZGE4YzIxN2FkIiwib3JnYW5pc2F0aW9uX25hbWUiOiJEaXRpbmV4IiwiZG9tYWluIjoiZGl0aW5leC5jb20iLCJkZXBhcnRtZW50X2lkIjoiNjcyZGFlMDlhZjkyN2JjZGE4YzIxN2IxIiwiZGVwYXJ0bWVudF9uYW1lIjoiRW5naW5lZXJpbmciLCJkZXBhcnRtZW50X2Rlc2NyaXB0aW9uIjoiSGFuZGxlcyBwcm9kdWN0IGRldmVsb3BtZW50IGFuZCB0ZWNobmljYWwgb3BlcmF0aW9ucy4iLCJhY2Nlc3NfdG9rZW5fZXhwaXJ5IjoiMjAyNC0xMS0wOFQwNzoyMjowMS41MDdaIn0sImlhdCI6MTczMTA0NjkyMSwiZXhwIjoxNzMxMDUwNTIxfQ.8VQwPAdbq79adksxnrTGCFEzH_2nabu5RivRnQDdq8o',
                description: 'Access token for user authentication',
              },
            },
          },
        },
      },
    },
  },
  login: {
    body: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
                example: 'asifakramsk@gmail.com',
                description: 'Email address of the user',
              },
              password: {
                type: 'string',
                example: 'asifakramsk',
                description: 'Password for the user account',
              },
            },
          },
        },
      },
    },
    response: {
      description: '200 Response',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              first_name: {
                type: 'string',
                example: 'Asif',
              },
              last_name: {
                type: 'string',
                example: 'Akram',
              },
              email: {
                type: 'string',
                format: 'email',
                example: 'asifakramsk@gmail.com',
              },
              status: {
                type: 'string',
                example: 'ACTIVE',
              },
              refresh_token: {
                type: 'string',
                example: 'O4EGz9MR7Oj35ACV1Toi',
              },
              _id: {
                type: 'string',
                example: '6722a54ff3031774ad429414',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2024-10-30T21:29:51.424Z',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                example: '2024-10-30T21:29:51.424Z',
              },
              role: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '67226dafb53719217efd205a',
                  },
                  role_name: {
                    type: 'string',
                    example: 'BUSINESS MANAGER',
                  },
                },
              },
              access_token_expiry: {
                type: 'string',
                format: 'date-time',
                example: '2024-10-30T22:29:51.469Z',
              },
              access_token: {
                type: 'string',
                example:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkX3VzZXJfZGV0YWlscyI6eyJmaXJzdF9uYW1lIjoiQXNpZiIsImxhc3RfbmFtZSI6IkFrcmFtIiwiZW1haWwiOiJhc2lmYWtyYW1za0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRyVllqSUY1aUN3bEIuVEVmSEZHVlcuQVFNZ0VqamNNMWI1WFQvOXNiL1VwRm1mWVhVVkpuSyIsInJvbGVfaWQiOiI2NzIyNmRhZmI1MzcxOTIxN2VmZDIwNWEiLCJzdGF0dXMiOiJBQ1RJVkUiLCJmb3JjZV9wYXNzd29yZF9jaGFuZ2UiOmZhbHNlLCJyZWZyZXNoX3Rva2VuIjoiTzRFR3o5TVI3T2ozNUFDVjFUb2kiLCJfaWQiOiI2NzIyYTU0ZmYzMDMxNzc0YWQ0Mjk0MTQiLCJjcmVhdGVkQXQiOiIyMDI0LTEwLTMwVDIxOjI5OjUxLjQyNFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTEwLTMwVDIxOjI5OjUxLjQyNFoiLCJfX3YiOjB9LCJpYXQiOjE3MzAzMjM3OTEsImV4cCI6MTczMDMyNzM5MX0.EzrEYrCUXsf2VyMcDuEnNOprh8tNMwylOD8FLwrgY3Q',
              },
            },
          },
        },
      },
    },
  },
  refreshToken: {
    body: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'refresh_token'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
                example: 'asifakramsk@gmail.com',
                description: 'Email address of the user',
              },
              refresh_token: {
                type: 'string',
                example: 'fzVeNSeadJE8xElcXRxm',
                description: 'Refresh token for the user session',
              },
            },
          },
        },
      },
    },
    response: {
      description: '200 Response',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                format: 'email',
                example: 'asifakramsk@gmail.com',
              },
              refresh_token: {
                type: 'string',
                example: 'fzVeNSeadJE8xElcXRxm',
              },
              _id: {
                type: 'string',
                example: '6722a6748d3ce5a086085ee4',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2024-10-30T21:34:44.945Z',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                example: '2024-11-02T18:17:22.899Z',
              },
              access_token_expiry: {
                type: 'string',
                format: 'date-time',
                example: '2024-11-02T19:17:23.015Z',
              },
              access_token: {
                type: 'string',
                example:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNwb25zZSI6eyJyZWZyZXNoX3Rva2VuIjoiZnpWZU5TZWFkSkU4eEVsY1hSeG0iLCJfaWQiOiI2NzIyYTY3NDhkM2NlNWEwODYwODVlZTQiLCJlbWFpbCI6ImFzaWZha3JhbXNrQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjQtMTAtMzBUMjE6MzQ6NDQuOTQ1WiIsInVwZGF0ZWRBdCI6IjIwMjQtMTEtMDJUMTg6MTc6MjIuODk5WiIsImFjY2Vzc190b2tlbl9leHBpcnkiOiIyMDI0LTExLTAyVDE5OjE3OjIzLjAxNVoifSwiaWF0IjoxNzMwNTcxNDQzLCJleHAiOjE3MzA1NzUwNDN9.W1wDXA_Acq2fio_P9lEFWxqz9enf3QII9Z_UAcqwxy8',
              },
            },
          },
        },
      },
    },
  },
};
