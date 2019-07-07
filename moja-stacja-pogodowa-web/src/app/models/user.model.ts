// tslint:disable:max-classes-per-file

export class User {
  id?: number;
  name: string;
  surname: string;
  email: string;
  constructor(name: string, surname: string, email: string, id?: number) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
  }
}

export interface RegisteredUser extends User {
  albumID: number;
  profileName: string;
  password: string;
}

export class UnregisteredUser extends User {
  course: string;
  typeOfStudy: string;
  constructor(
    name: string,
    surname: string,
    email: string,
    course: string,
    typeOfStudy: string,
  ) {
    super(name, surname, email);
    this.course = course;
    this.typeOfStudy = typeOfStudy;
  }
}

export class UnregisteredUserModel extends UnregisteredUser {
  // course: string;
  completionDate: string;
  // typeOfStudy: string;
  constructor(user: UnregisteredUser) {
    super(user.name, user.surname, user.email, user.course, user.typeOfStudy);
  }
}
