import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

import { Account } from '~/shared/models/account.model';

@Component({
  selector: 'account-autocomplete',
  templateUrl: './account-autocomplete.component.html',
  styleUrls: ['./account-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AccountAutocompleteComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AccountAutocompleteComponent,
    },
  ],
})
export class AccountAutocompleteComponent implements ControlValueAccessor, OnInit, Validator {
  public filteredAccounts$: Observable<Account[]>;
  public accountFilterFC: FormControl = new FormControl();
  public touched: boolean = false;
  private onChange = (accountId: number | null) => {};
  private onTouched = () => {};

  @Input() public isRequired: boolean = false;
  @Input() public selectedAccountId: number | null;
  @Input() public accounts: Account[] = [];
  @Input()
  set reset(reset: boolean) {
    if (reset) {
      this.selectedAccountId = null;
      this.markAsTouched();
      this.onChange(null);
    }
  }
  constructor() {}

  writeValue(accountId: number): void {
    this.selectedAccountId = accountId;
    this.markAsTouched();
    this.onChange(null);
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  public ngOnInit(): void {
    this.filteredAccounts$ = this.accountFilterFC.valueChanges.pipe(
      startWith(''),
      map(val => {
        return val
          ? this.accounts.filter((account: Account) => {
              return new RegExp(val, 'g').test(account.name);
            })
          : this.accounts;
      }),
    );
  }

  public selectAccount(event: MatSelectChange): void {
    this.markAsTouched();
    this.onChange(event.value);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return !!control.value ? null : { required: true };
  }

  private markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
