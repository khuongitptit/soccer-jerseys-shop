import React, { useState, useEffect } from 'react'

const useLocalStorage = field => {
    const [item, setItem] = useState('')
    useEffect(() => {
        localStorage.setItem(field, item)
    })
    return [item, setItem]
}

export default useLocalStorage
