// store/passangersSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const passangersSlice = createSlice({
    name: 'passangers',
    initialState: {
        passanger: [],
        orderPassanger: [],
        paymentMethod: '',
        loading: false,
        error: false,
        isInitialized: false,
    },
    reducers: {
        addPassanger: (state, { payload }) => {
            //Генерируем уникальный ID для каждого нового пассажира 
            const newPassenger = {
                // Добавляем дефолтные значения, если они не пришли с payload
                age: "Взрослый", // Дефолтное значение
                name: "",
                surname: "",
                father: "",
                gender: "",
                check: false,
                series: "",
                number: "",
                birthNumber: "",
                birthday: "",
                ...payload,
                id: payload.id || Date.now() + Math.random(), // Используем переданный ID или генерируем новый
            };
            state.passanger = [...state.passanger, newPassenger];
        },

        removePassanger: (state, { payload: idToRemove }) => {
            state.passanger = state.passanger.filter(
                (p) => p.id !== idToRemove
            );
        },

        clearPassangers: (state) => {
            state.passanger = []; // Очищаем массив пассажиров
            state.orderPassanger = []; // Очищать orderPassanger тоже при сбросе пассажиров
            state.paymentMethod = ''; // Очищать способ оплаты
            state.isInitialized = false;
        },

        setPassangersInitialized: (state) => {
            state.isInitialized = true;
        },

        addOrderPassanger: (state, { payload }) => {
            // Проверяем, существует ли уже пассажир с такими же данными
            const existingPassengerIndex = state.orderPassanger.findIndex(
                p => p.id === payload.id // <--- Ищем по ID
            );

            if (existingPassengerIndex !== -1) {
               state.orderPassanger[existingPassengerIndex] = {
                ...state.orderPassanger[existingPassengerIndex], // Сохраняем старые данные, если они есть
                ...payload // Применяем новые данные
               };
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

export const { addPassanger, removePassanger, addOrderPassanger, addPaymentMethod, clearPassangers, setPassangersInitialized } = passangersSlice.actions;

export default passangersSlice.reducer;