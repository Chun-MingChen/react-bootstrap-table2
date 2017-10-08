export const baseColumns = customized => customized || [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'name',
  text: 'Name'
}];

export const baseColumn = customized => customized || { dataField: 'id', text: 'ID' };

export const baseData = customized => customized || [{
  id: 1,
  name: 'A'
}, {
  id: 2,
  name: 'B'
}];

export const baseRow = customized => customized || { id: 1, name: 'A' };

export const baseKeyField = customized => customized || 'id';

/**
 * baseProps contains those basical props marked as `required` in BootstrapTable
 */
export const baseProps = {
  columns: baseColumns(),
  data: baseData(),
  keyField: baseKeyField()
};
