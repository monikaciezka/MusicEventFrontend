import {User} from "../user/user";

export class Comment{
  id: number;
  user: User;
  nick: String;
  text: String;
  votes: number;

  constructor(nick: String, text: String) {
    this.nick = nick;
    this.text = text;
    this.votes = 0;
  }
}
