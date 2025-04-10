import { Action } from '../models';

export class ActionsRepository {
  static create(
    action: string,
    userId?: number,
    actionable?: string,
    actionableId?: number,
    description?: string,
    rawData?: string
  ) {
    return Action.create({
      userId,
      action,
      actionable,
      actionableId,
      description,
      rawData
    });
  }
}

export default ActionsRepository;
