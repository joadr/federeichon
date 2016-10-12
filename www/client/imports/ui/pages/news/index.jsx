import React from 'react'
import News from '../../../../../imports/api/news/news'
import CollectionTable from '../../components/collection-table'

class NewsList extends React.Component {
	constructor (props) {
    super(props)
    this.state = {
      selector: {$or: [{deleted: false}, {deleted: null}]},
      fields: ['title', 'body', 'createdby']
    }
  }

  getSelector () {
    if (!this.state.filter) {
      return this.state.selector
    } else {
      const filters = this.state.fields.map((field) => {
        var obj = {}
        obj[field] = new RegExp(`${this.state.filter}.*`, 'i')
        return obj
      })
      return { $and: [{ $or: filters }, this.state.selector] }
    }
  }

  getOptions () {
    return {
      sort: this.state.sort,
      limit: this.state.itemsPerPage
    }
  }
  getName () {
  	return 'Diego'
  }
  render () {
  	return (
  		<CollectionTable
        collection={News}
        publication='news.index'
        itemComponent={ContractsUserIndexItem}
        filter={this.state.filter}
        fields={this.state.fields}
        headers={['Titulo', 'Cuerpo', {name: 'Creado por', func: this.getName}]}
        selector={this.getSelector()}
        options={this.getOptions()}
      />
    )
  }
}