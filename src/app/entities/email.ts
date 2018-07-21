export class Email {

  objet: string;
  msg: string;
  from: string;
  to: string;


  constructor(objet: string, msg: string, from: string, to: string) {
    this.objet = objet;
    this.msg = msg;
    this.from = from;
    this.to = to;
  }
}
