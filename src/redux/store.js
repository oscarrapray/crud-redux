import { configureStore } from '@reduxjs/toolkit';
import { alertaSlice } from './alertaSlice';
import { productosSlice } from './productosSlice';

export const store = configureStore({
  reducer: {
      alerta: alertaSlice.reducer,
      productos: productosSlice.reducer
  }
})