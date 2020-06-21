import React from 'react'
import { Tree } from 'antd'

const SearchProducts = props => {
    const { treeData, onSelect } = props
    return (
        <Tree
            //checkable
            //onCheck={onCheck}
            onSelect={onSelect}
            treeData={treeData}
            defaultExpandAll
        />
    )
}
export default SearchProducts
