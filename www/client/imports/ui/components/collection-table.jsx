import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import {grey400} from 'material-ui/styles/colors'
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'
import _ from 'underscore'

class NoItems extends React.Component {
  render () {
    return (
      <div style={{ textAlign: 'center', padding: 20 }}>
        <p style={{ color: grey400 }}>
          No items found
        </p>
      </div>
    )
  }
}

class LoadingComponent extends React.Component {
  render () {
    return (
      <div style={{ textAlign: 'center', padding: 20 }}>
        <p style={{ color: grey400 }}>
          Loading...
        </p>
      </div>
    )
  }
}

const propTypes = {
  collection: React.PropTypes.object.isRequired,
  publication: React.PropTypes.string.isRequired,
  filter: React.PropTypes.string,
  selector: React.PropTypes.object,
  itemsPerPage: React.PropTypes.number,
  fields: React.PropTypes.array,
  sort: React.PropTypes.object,
  itemComponent: React.PropTypes.any.isRequired,
  loadingComponent: React.PropTypes.any,
  noItemsComponent: React.PropTypes.any,
  parentClassName: React.PropTypes.string,
  lastComponent: React.PropTypes.any,
  firstComponent: React.PropTypes.any,
  localFilter: React.PropTypes.bool,
  options: React.PropTypes.object
}

const defaultProps = {
  itemsPerPage: 1000,
  fields: ['name'],
  sort: { createdAt: -1 },
  filter: '',
  loadingComponent: <LoadingComponent />,
  noItemsComponent: <NoItems />,
  parentClassName: '',
  selector: {},
  localFilter: false,
  options: {}
}

class CollectionTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: props.items,
      sortBy: -1
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      items: nextProps.items
    })
  }

  columnSort (column) {
    var columnName
    if (this.props.fields[column]) {
      columnName = this.props.fields[column]
    } else {
      if (!this.props.headers[column].func) {
        return
      }
      columnName = this.props.headers[column].name
    }
    if (this.state.sortBy === columnName) {
      this.setState({
        items: this.state.items.reverse()
      })
      return
    }
    this.setState({
      items: _.sortBy(this.props.items, columnName),
      sortBy: columnName
    })
  }

  applyFunction (header) {
    var newItems = _.clone(this.state.items)
    _.map(newItems, function (item) {
      item[header.name] = header.func(item)
    })
  }

  renderHeaders () {
    return this.props.headers.map((header, index) => {
      var icon
      var columnName
      if (this.props.fields[index]) {
        columnName = this.props.fields[index]
      } else {
        columnName = this.props.headers[index].name
      }
      if (this.state.sortBy === columnName) {
        icon = <ArrowDownward style={{height: '15px'}} />
      }
      if (_.isObject(header)) {
        var styles = {}
        if (header.styles) {
          styles = header.styles
        }

        if (header.func && typeof header.func === 'function') {
          this.applyFunction(header)
        }
        return (
          <TableHeaderColumn key={index} onTouchTap={this.columnSort.bind(this, index)} style={styles}>{header.name}{icon}</TableHeaderColumn>
        )
      }
      return (
        <TableHeaderColumn key={index} onTouchTap={this.columnSort.bind(this, index)}>{header}{icon}</TableHeaderColumn>
      )
    })
  }

  renderItems () {
    return this.state.items.map((item) => {
      return React.createElement(this.props.itemComponent, {
        key: item._id,
        item: item
      })
    })
  }

  renderLoading () {
    return this.props.loadingComponent
  }

  renderNoItems () {
    return this.props.noItemsComponent
  }

  render () {
    if (this.props.isLoading) {
      return this.renderLoading()
    } else if (this.props.items.length > 0) {
      return (
        <Table fixedHeader>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {this.renderHeaders()}
            </TableRow>
          </TableHeader>
          <TableBody className={this.props.parentClassName} showRowHover>
            {this.renderItems()}
          </TableBody>
        </Table>
      )
    } else {
      return this.renderNoItems()
    }
  }

}

CollectionTable.propTypes = propTypes
CollectionTable.defaultProps = defaultProps

export default createContainer(({ localFilter, filter, publication, itemsPerPage, collection, selector, options }) => {
  var filter = localFilter ? null : filter
  const handler = Meteor.subscribe(publication, filter, itemsPerPage)
  const items = collection.find(selector, options).fetch()
  const isLoading = !handler.ready()
  return { items, isLoading }
}, CollectionTable)
