/**
 * A data object that defines a user of the system.
 * @typedef  {Object}      UserData
 * @property {?string}     [_id]
 * @property {string}      HUID
 * @property {string}      firstName
 * @property {string}      lastName
 * @property {AccessLevel} accessLevel
 * @property {Object}      [settings]
 */

/**
 * Enum for user access levels.
 * @enum {string}
 */
const AccessLevel = {
  READ_ONLY: "Read-Only",
  PRIVILEGED: "Privileged",
  ADMIN: "Admin"
};
let accessLevelValues = [];
for (let key of Object.keys(AccessLevel)) {
  accessLevelValues.push(AccessLevel[key]);
}

/**
 * Represents a user of the system.
 * @class
 */
export default class User {
  static get AccessLevel() {
    return AccessLevel;
  }
  static getAccessLevelValues() {
    return accessLevelValues;
  }

  /**
     * Creates a new User.
     * @constructor
     * @param {UserData} userData
     */
  constructor({ _id, HUID, firstName, lastName, accessLevel, settings }) {
    this._id = _id || null;
    this.HUID = HUID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.accessLevel = accessLevel;
    this.settings = settings || {};
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
     * Returns a data object representation of this user.
     * @returns {UserData}
     */
  serialize() {
    let { _id, HUID, firstName, lastName, accessLevel, settings } = this;
    return { _id, HUID, firstName, lastName, accessLevel, settings };
  }

  /**
     * Returns true if this user has Admin level access. Otherwise returns false.
     * @returns {boolean}
     */
  isAdmin() {
    return this.accessLevel === AccessLevel.ADMIN;
  }

  /**
     * Returns true if this user has Privileged level access. Otherwise returns false.
     * @returns {boolean}
     */
  isPrivileged() {
    return this.accessLevel === AccessLevel.PRIVILEGED;
  }

  /**
     * Returns true if this user has Read-Only level access. Otherwise returns false.
     * @returns {boolean}
     */
  isReadOnly() {
    return this.accessLevel === AccessLevel.READ_ONLY;
  }

  /**
     * Updates this user using the given data. Only fields present in the data object will be
     * updated.
     * @param {Object}      data
     * @param {string}      [data.HUID]
     * @param {string}      [data.firstName]
     * @param {string}      [data.lastName]
     * @param {AccessLevel} [data.accessLevel]
     * @param {AccessLevel} [data.settings]
     */
  update(data) {
    let properties = [
      "HUID",
      "firstName",
      "lastName",
      "accessLevel",
      "settings"
    ];
    for (let p of properties) {
      if (data[p] !== undefined) {
        this[p] = data[p];
      }
    }
  }

  /**
     * Overridden toString method.
     * @returns {string}
     */
  toString() {
    return `User(${this.fullName})`;
  }
}
