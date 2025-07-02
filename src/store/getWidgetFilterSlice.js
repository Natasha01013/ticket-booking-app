import { createSlice } from "@reduxjs/toolkit";

const data = JSON.parse(localStorage.getItem('trains'))


export const getWidgetFilterSlice = createSlice({
    name: 'widgetFilter',
    initialState: {
        train: {},
        filterOptions: {
            first: false,
            second: false,
            third: false,
            air: false,
            wifi: false,
            express: false
        }
    },
    reducers: {
        getOptions: (state, { payload }) => {
            console.log(payload)
        },
        option: (state, { payload}) => {
            
        }
    }
})

export const { getOptions } = getWidgetFilterSlice.actions
export default getWidgetFilterSlice.reducer