import { UserProfileStateFeature } from '../reducers/user-profile-state.reducer';

const { selectData, selectIsLoading, selectError } = UserProfileStateFeature;

export const userProfileStateSelectors = {
  selectIsLoading,
  selectError,
  selectData,
};
