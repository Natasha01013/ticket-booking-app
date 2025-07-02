import { configureStore } from '@reduxjs/toolkit'
import citySlice from './getCitySlice'
import choiceSlice from './choiceSlice'
import subscribeSlice from './subscribeSlice'
import getTrainsSlice from './getTrainsSlice'
import getLastRoutes from './getLastRoutes'
import getTrainSeatSlice from './getTrainSeatSlice'
import getFilterSlice from './getFilterSlice'
import getSeatsSlice from './getSeatsSlice'
import passangersSlice from './passangersSlice'


export const store = configureStore({
    reducer: {
        city: citySlice,
        choice: choiceSlice,
        subscribe: subscribeSlice,
        trains: getTrainsSlice,
        lastRoutes: getLastRoutes,
        filter: getFilterSlice,
        trainSeat: getTrainSeatSlice,
        seats: getSeatsSlice,
        passanger: passangersSlice
    }
})