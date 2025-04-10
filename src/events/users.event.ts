import { EventEmitter } from "events";
import ActionsRepository from "../repositories/actions.repository";
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from "../constants/events";

const UserEmitter = new EventEmitter();

UserEmitter.on(AUTH_LOGIN, (action: any) => {
  ActionsRepository.create(AUTH_LOGIN, action.userId);
});

UserEmitter.on(AUTH_LOGOUT, (action: any) => {
  ActionsRepository.create(AUTH_LOGOUT, action.userId);
});

export default UserEmitter;
