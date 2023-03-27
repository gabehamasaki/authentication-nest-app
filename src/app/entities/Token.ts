import { randomUUID } from 'node:crypto';

export interface TokenProps {
  userId: string;
  expiresIn: number;
}

export class Token {
  constructor(private props: TokenProps, private _id?: string) {
    this._id = _id ?? randomUUID();
  }

  get id() {
    return this._id;
  }

  get userId() {
    return this.props.userId;
  }

  get expiresIn() {
    return this.props.expiresIn;
  }
}
