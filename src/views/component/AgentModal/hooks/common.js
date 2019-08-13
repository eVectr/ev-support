import {useState} from 'react'
import { mergeState } from '../utils/state'

export const useMergeState = initValue => {
    const [value, setValue] = useState(initValue)
    const updateFunction = mergeState(value, setValue)

    return [ updateFunction, value, setValue]
}
