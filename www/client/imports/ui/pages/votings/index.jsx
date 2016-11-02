import React from 'react'
import Votings from '../../../../../imports/api/votings/votings'
import CollectionTable from '../../components/collection-table'

class VotingsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selector: {$or: [{deleted: false}, {deleted: null}]},
      fields: ['title', 'description', 'candidates']
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
    collection={Votings}
    publication='votings.index'
    itemComponent={ContractsUserIndexItem}
    filter={this.state.filter}
    fields={this.state.fields}
    headers={['Titulo', 'Descripcion', {name: 'Candidatos', func: this.getName}]}
    selector={this.getSelector()}
    options={this.getOptions()}
      />
    )
  }
}
