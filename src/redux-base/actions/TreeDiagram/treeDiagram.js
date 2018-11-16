export const OFFENCE_ALLOCATION_ADD_EXTRA_FIELD = 'OFFENCE_ALLOCATION_ADD_EXTRA_FIELD';
export const OFFENCE_ALLOCATION_REMOVE_EXTRA_FIELD = 'OFFENCE_ALLOCATION_REMOVE_EXTRA_FIELD';

export const offenceAllocationAddExtraField = (payload, id) => (
  {
    type: OFFENCE_ALLOCATION_ADD_EXTRA_FIELD,
    data: { payload, id }
  }
);

export const offenceAllocationRemoveExtraField = (key, id) => (
  {
    type: OFFENCE_ALLOCATION_REMOVE_EXTRA_FIELD,
    data: { key, id }
  }
);
