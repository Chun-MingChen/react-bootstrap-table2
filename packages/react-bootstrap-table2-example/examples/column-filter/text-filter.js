import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(8);

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
`;

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      columns: [{
        dataField: 'id',
        text: 'Product ID'
      }, {
        dataField: 'name',
        text: 'Product Name',
        filter: textFilter({
          getFilterBy: (filterBy) => {
            this.filterBy = filterBy;
          }
        })
      }, {
        dataField: 'price',
        text: 'Product Price',
        filter: textFilter()
      }]
    };
  }


  handleClick() {
    this.filterBy('0');
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={ this.handleClick }>
          click to filter product name by 0
        </button>

        <BootstrapTable
          keyField="id"
          data={ products }
          columns={ this.state.columns }
          filter={ filterFactory() }
        />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}

