import { createSlice } from '@reduxjs/toolkit';

export const alertaSlice = createSlice({
    name: 'alerta',
    initialState: {
        alerta:null
    },
    reducers: {
        mostrarAlerta: (state, action  ) => {
            state.alerta = action.payload.alerta
        },
        ocultarAlerta: ( state ) => {
            state.alerta = null;
        }
    }
});

export const {mostrarAlerta,ocultarAlerta} = alertaSlice.actions