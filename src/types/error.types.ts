export const enum ERROR_TYPES {
  exceededLength = '22001',
  invalidTypeData = '22P02',
  duplicateValue = '2305',
  typeORMDuplicate = '23505',
  tokenExpired = 'TokenExpiredError',
  invalidToken = 'JsonWebTokenEror',
  sequelizeValidation = 'SequelizeValidationError',
  sequelizeDatabase = 'SequelizeDatabaseError',
}
