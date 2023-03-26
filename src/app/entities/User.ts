import { randomUUID } from 'node:crypto';

export interface UserProps {
  name: string;
  email: string;
  password: string;
}

export class User {
  constructor(private props: UserProps, private _id?: string) {
    this._id = _id ?? randomUUID();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get email() {
    return this.props.email;
  }

  set email(newEmail: string) {
    this.props.email = newEmail;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }
}
