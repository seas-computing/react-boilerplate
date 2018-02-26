import React, { Component } from "react";

export class Element extends Component {
  render() {
    return (
      <div
        style={{ display: "absolute", width: 500, height: 300 }}
        ref="dummy"
      />
    );
  }
}

export const element = <Element />;

export const collection = [
  {
    id: 40,
    name: "Arthur",
    display: "Arthur Dent",
    fullName: "Arthur Dent",
    listName: "Dent, Arthur",
    cssId: "arthur-dent"
  },
  {
    id: 41,
    name: "Ford",
    display: "Ford Prefect",
    fullName: "Ford Prefect",
    listName: "Prefect, Ford",
    cssId: "ford-prefect"
  }
];

export const object = {
  id: 42,
  name: "Marvin",
  fullName: "Marvin the Paranoid Android",
  listName: "Marvin the Paranoid Android",
  cssId: "marvin-the-paranoid-android"
};

export const newObject = {
  id: 42,
  name: "Zaphod",
  fullName: "Zaphod Beeblebrox, President of the Galaxy",
  listName: "Zaphod Beeblebrox, President of the Galaxy",
  cssId: "zaphod-beeblebrox-president-of-the-galaxy"
};

export const array = ["Life", "Universe", "Everything"];

export const string = "Don't Panic";

export const safeString = "dont-panic";

export const int = 42;
export const number = 42;

export const year = 2018;

export const Year = {
  id: 2018,
  display: "2017-2018"
};

export const Years = [
  Year,
  {
    id: 2017,
    display: "2016-2017"
  },
  {
    id: 2016,
    display: "2015-2016"
  }
];

export const yearList = [
  { id: 2018, display: "2017 - 2018" },
  { id: 2019, display: "2018 - 2019" }
];

export const HUID = "88888888";

export const email = "help@seas.harvard.edu";

export const webUser = {
  id: 31313131,
  permission: "Read-Only"
};

export const regularUser = {
  HUID: "12345678",
  id: "12345678",
  email: "regular@seas.harvard.edu",
  firstName: "Regular",
  lastName: "User",
  accessLevel: "Read-Only",
  settings: {}
};

export const privilegedUser = {
  HUID: "23571113",
  id: "23571113",
  email: "privileged@seas.harvard.edu",
  firstName: "Privileged",
  lastName: "User",
  accessLevel: "Privileged",
  settings: {}
};
export const adminUser = {
  HUID: "99999989",
  id: "99999989",
  email: "admin@seas.harvard.edu",
  firstName: "Super",
  lastName: "Admin",
  accessLevel: "Admin",
  settings: {}
};

export const brokenUser = {
  HUID: "00000000",
  id: "00000000",
  email: "help@seas.harvard.edu",
  firstName: "Broken",
  lastName: "Data",
  accessLevel: "Double-Secret",
  settings: {}
};

export const users = [regularUser, privilegedUser, adminUser];
