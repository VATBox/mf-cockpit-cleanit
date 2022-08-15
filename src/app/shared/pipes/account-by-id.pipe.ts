import { Pipe, PipeTransform } from '@angular/core';
import {Account} from "~/shared/models/account.model";

@Pipe({ name: 'accountById' })
export class AccountByIdPipe implements PipeTransform {
  private static accounts: any = {};

  public static init(accounts: Account[]) {
    accounts.forEach(account => {
      this.accounts[account.id] = account;
    });
  }

  transform(value: number): any {
    if (Object.keys(AccountByIdPipe.accounts).length === 0) {
      throw new Error('AccountByIdPipe: Initialize accounts first!');
    }
    return AccountByIdPipe.accounts[value];
  }
}
