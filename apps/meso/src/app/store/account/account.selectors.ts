import { UserDto } from '@iwdf/dto';

import { AccountState } from '../../types';

export const selectAccountData = (state: {
  account: AccountState;
}): UserDto | null => state.account.data;
export const selectAccountError = (state: { account: AccountState }): boolean =>
  state.account.error;
export const selectAccountLoaded = (state: {
  account: AccountState;
}): boolean => state.account.loaded;
