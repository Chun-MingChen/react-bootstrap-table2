import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Header from '../src/header';
import Body from '../src/body';
import BootstrapTable from '../src/bootstrap-table';
import Const from '../src/const';

describe('BootstrapTable', () => {
  let wrapper;
  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];

  describe('simplest table', () => {
    beforeEach(() => {
      wrapper = shallow(<BootstrapTable keyField="id" columns={ columns } data={ data } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('table.table').length).toBe(1);
      expect(wrapper.find(Header).length).toBe(1);
      expect(wrapper.find(Body).length).toBe(1);
      expect(wrapper.find('.react-bootstrap-table-container').length).toBe(1);
    });

    it('should have correct default state', () => {
      expect(wrapper.state().currEditCell).toBeDefined();
      expect(wrapper.state().currEditCell.ridx).toBeNull();
      expect(wrapper.state().currEditCell.cidx).toBeNull();
    });

    it('should have table-bordered class as default', () => {
      expect(wrapper.find('table.table-bordered').length).toBe(1);
    });
  });

  describe('when hover props is true', () => {
    beforeEach(() => {
      wrapper = shallow(<BootstrapTable keyField="id" columns={ columns } data={ data } hover />);
    });

    it('should have table-hover class on table', () => {
      expect(wrapper.find('table.table-hover').length).toBe(1);
    });
  });

  describe('when striped props is true', () => {
    beforeEach(() => {
      wrapper = shallow(<BootstrapTable keyField="id" columns={ columns } data={ data } striped />);
    });

    it('should have table-striped class on table', () => {
      expect(wrapper.find('table.table-striped').length).toBe(1);
    });
  });

  describe('when condensed props is true', () => {
    beforeEach(() => {
      wrapper = shallow(<BootstrapTable keyField="id" columns={ columns } data={ data } condensed />);
    });

    it('should have table-condensed class on table', () => {
      expect(wrapper.find('table.table-condensed').length).toBe(1);
    });
  });

  describe('when bordered props is false', () => {
    beforeEach(() => {
      wrapper = shallow(<BootstrapTable keyField="id" columns={ columns } data={ data } bordered={ false } />);
    });

    it('should not have table-condensed class on table', () => {
      expect(wrapper.find('table.table-condensed').length).toBe(0);
    });
  });

  describe('when cellEdit props is defined', () => {
    const nonEditableRows = [data[1].id];
    const cellEdit = {
      mode: Const.CLICK_TO_CELL_EDIT,
      onEditing: sinon.stub(),
      nonEditableRows: () => nonEditableRows
    };

    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable
          keyField="id"
          columns={ columns }
          data={ data }
          bordered={ false }
          cellEdit={ cellEdit }
        />
      );
    });

    it('should resolve correct cellEdit object to Body component', () => {
      const body = wrapper.find(Body);
      expect(body.length).toBe(1);
      expect(body.props().cellEdit.nonEditableRows).toEqual(nonEditableRows);
      expect(body.props().cellEdit.ridx).toEqual(wrapper.state().currEditCell.ridx);
      expect(body.props().cellEdit.cidx).toEqual(wrapper.state().currEditCell.cidx);
      expect(body.props().cellEdit.onStart).toBeDefined();
      expect(body.props().cellEdit.onEscape).toBeDefined();
      expect(body.props().cellEdit.onComplete).toBeDefined();
    });
  });

  describe('handleRowSelect', () => {
    const rowKey = 1;

    describe('when selectRow.mode is radio', () => {
      beforeEach(() => {
        wrapper = shallow(
          <BootstrapTable
            keyField="id"
            columns={ columns }
            data={ data }
            selectRow={{ mode: 'radio' }}
          />
        );
      });

      it('state.selectedRowKeys should contain single key', () => {
        wrapper.instance().handleRowSelect(rowKey);

        expect(wrapper.state('selectedRowKeys')).toEqual([rowKey]);
      });
    });

    describe('when selectRow.mode is checbox', () => {
      beforeEach(() => {
        wrapper = shallow(
          <BootstrapTable
            keyField="id"
            columns={ columns }
            data={ data }
            selectRow={{ mode: 'checkbox' }}
          />
        );
      });
      describe('if checked is false', () => {
        it('state.selectedRowKeys should pop selected row key', () => {
          wrapper.instance().handleRowSelect(rowKey, false);

          expect(wrapper.state('selectedRowKeys')).not.toContain(rowKey);
        });
      });

      describe('if checked is true', () => {
        it('state.selectedRowKeys should push one extra key', () => {
          wrapper.instance().handleRowSelect(rowKey, true);

          expect(wrapper.state('selectedRowKeys')).toContain(rowKey);
        });
      });
    });
  });

  describe('handleAllRowsSelect', () => {
    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable
          keyField="id"
          columns={ columns }
          data={ data }
        />
      );
    });

    describe('when customized option was not given', () => {
      describe('when nothing was selected', () => {
        it('should select all rows', () => {
          wrapper.setState({ selectedRowKeys: [] });

          wrapper.instance().handleAllRowsSelect();

          expect(wrapper.state('selectedRowKeys').length).toBe(data.length);
        });
      });

      describe('when one or more than one row was selected', () => {
        it('should unselect all rows', () => {
          wrapper.setState({ selectedRowKeys: [...data] });

          wrapper.instance().handleAllRowsSelect();

          expect(wrapper.state('selectedRowKeys').length).toBe(0);
        });
      });
    });

    describe('when customized option was given', () => {
      describe('when option is truthy', () => {
        it('should select all rows', () => {
          wrapper.instance().handleAllRowsSelect(true);

          expect(wrapper.state('selectedRowKeys').length).toBe(data.length);
        });
      });

      describe('when option is falsy', () => {
        it('should unselect all rows', () => {
          wrapper.setState({ selectedRowKeys: [...data] });

          wrapper.instance().handleAllRowsSelect(false);

          expect(wrapper.state('selectedRowKeys').length).toBe(0);
        });
      });
    });
  });
});
