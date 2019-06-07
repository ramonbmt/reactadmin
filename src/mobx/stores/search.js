import { action, observable } from 'mobx'
import { Debounce } from 'lodash-decorators/debounce'
import PropTypes from 'prop-types'

const searchStoreProps = {
    searchStore: PropTypes.shape({
        handleChangeText : PropTypes.func.isRequired,
        searchText       : PropTypes.string
    }).isRequired
}

class SearchStore {
    @observable searchText = ''

    handleChangeText = ({ target }) => {
        this.setSearch(target.value)
    }

    @Debounce(350)
    @action setSearch (value) {
        this.searchText = value
    }
}

export {
    searchStoreProps
}

export default SearchStore
