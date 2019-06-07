import { action, observable } from 'mobx'
import PropTypes from 'prop-types'

const dateFilterStoreProps = {
    dateFilterStore: PropTypes.shape({
        clearEndDate   : PropTypes.func.isRequired,
        clearStartDate : PropTypes.func.isRequired,
        endDate        : PropTypes.string,
        setEndDate     : PropTypes.func.isRequired,
        setStartDate   : PropTypes.func.isRequired,
        startDate      : PropTypes.string
    }).isRequired
}

class DateFilterStore {
    @observable startDate = null

    @observable endDate = null

    @action setStartDate = date => {
        this.startDate = date?.toISOString() || null
    }

    @action setEndDate = date => {
        this.endDate = date?.toISOString() || null
    }

    @action clearStartDate = () => {
        this.startDate = null
    }

    @action clearEndDate = () => {
        this.endDate = null
    }
}

export {
    dateFilterStoreProps
}

export default DateFilterStore
