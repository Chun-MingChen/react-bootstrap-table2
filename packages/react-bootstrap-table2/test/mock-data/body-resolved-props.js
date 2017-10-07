import Const from 'const';

const { ROW_SELECT_DISABLED, UNABLE_TO_CELL_EDIT } = Const;

export const cellSelectionResolvedProps = {
  mode: ROW_SELECT_DISABLED
};

export const cellEditResolvedProps = {
  mode: UNABLE_TO_CELL_EDIT
};

export default {
  cellEdit: cellEditResolvedProps,
  selectRow: cellSelectionResolvedProps
};
