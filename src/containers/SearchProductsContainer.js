import React, { useState, useEffect } from 'react'
import SearchProducts from '../components/SearchProducts/SearchProducts'
import {
    getCountries,
    getLeagues,
    getClubs,
} from '../utils/selectValuesHandler'
import { connect } from 'react-redux'
import {
    actionChangeFilter,
    actionFetchProductsRequest,
} from '../actions/index'
const SearchProductsContainer = props => {
    const [filter, setFilter] = useState([])
    const { page, fetchProducts, changeFilter } = props
    useEffect(() => {
        fetchProducts(filter, page)
        changeFilter(filter, page)
    }, [filter, page])
    const treeData = () => {
        const data = [
            {
                title: 'Tất cả',
                key: 'all',
                children: [
                    {
                        title: 'Quốc gia',
                        key: 'country',
                        children: [],
                    },
                    {
                        title: 'Giải đấu',
                        key: 'league',
                        children: [],
                    },
                ],
            },
        ]
        //add countries to 0-0
        getCountries().forEach(country => {
            data[0].children[0].children.push({
                title: country,
                key: country,
            })
        })
        //add leagues and clubs to 0-1
        getLeagues().forEach((league, index) => {
            data[0].children[1].children.push({
                title: league,
                key: league,
                children: [],
            })
            getClubs(league).forEach(club => {
                data[0].children[1].children[index].children.push({
                    title: club,
                    key: club,
                })
            })
        })

        return data
    }
    const onSelect = selectedKeys => {
        setFilter(selectedKeys)
    }
    return <SearchProducts treeData={treeData()} onSelect={onSelect} />
}
const mapStateToProps = state => {
    return {
        page: state.page,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: (filter, page) => {
            dispatch(actionFetchProductsRequest(filter, page))
        },
        changeFilter: filter => {
            dispatch(actionChangeFilter(filter))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchProductsContainer)
