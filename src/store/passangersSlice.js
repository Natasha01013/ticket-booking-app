import { createSlice } from "@reduxjs/toolkit";

export const passangersSlice = createSlice({
    name: 'passangers',
    initialState: {
        passanger: [],
        orderPassanger: [],
        paymentMethod: '',
        loading: false,
        error: false
    },
    reducers: {
        addPassanger: (state, { payload }) => {
            state.passanger = [...state.passanger, payload];
        },
        addOrderPassanger: (state, { payload }) => {
            // Проверяем, существует ли уже пассажир с такими же данными
            const existingPassengerIndex = state.orderPassanger.findIndex(
                p => p.firstName === payload.firstName && 
                     p.lastName === payload.lastName && 
                     p.patronymic === payload.patronymic
            );

            if (existingPassengerIndex !== -1) {
                // Обновляем существующего пассажира
                state.orderPassanger = state.orderPassanger.map((p, index) => 
                    index === existingPassengerIndex ? payload : p
                );
            } else {
                // Добавляем нового пассажира
                state.orderPassanger = [...state.orderPassanger, payload];
            }
        },
        addPaymentMethod: (state, { payload }) => {
            state.paymentMethod = payload;
        }
    }
});

export const { addPassanger, addOrderPassanger, addPaymentMethod } = passangersSlice.actions;

export default passangersSlice.reducer;