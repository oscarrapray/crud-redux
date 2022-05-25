import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

export const productosSlice = createSlice({
    name: 'productos',
    initialState: {
        productos: [],
        error: null,
        loading: false, 
        productoeliminar: null,
        productoeditar: null
    },
    reducers: {
        startLoading:(state)=>{
            state.loading = true
        },
        LoadingError: (state) =>{
            state.loading = false
            state.error = true
        },
        descargarProductos:(state,action) =>{
            state.loading = false,
            state.error = null,
            state.productos = action.payload.productos
        },
        agregarProducto:(state,action) =>{
            state.loading = false
            state.productos = [...state.productos, action.payload]
        },
        obtenerProductoEliminar: (state,action)  =>{
            state.productoeliminar = action.payload
        },
        ProductoEliminado: (state  ) => {
            state.productos = state.productos.filter( producto => producto.id !== state.productoeliminar )
            state.productoeliminar = null

        },
        obtenerProductoEditar : (state,action) =>{
            state.productoeditar = action.payload
        },
        productoEditado : (state,action) =>{
            state.productoeditar = null,
            state.productos = state.productos.map( producto => producto.id === action.payload.id ? producto = action.payload : producto)
        }
    }
});

// Action creators are generated for each case reducer function
export const { startLoading,LoadingError,agregarProducto,descargarProductos,
obtenerProductoEliminar,ProductoEliminado, obtenerProductoEditar,productoEditado } = productosSlice.actions;

export const obtenerProductos = ( ) => {
    return async( dispatch, getState ) => {
        dispatch(startLoading());
        try {
            const respuesta = await axios.get('http://localhost:4000/productos');
            dispatch( descargarProductos({
                    loading: false,
                    error: null,
                    productos: respuesta.data
                }) )
        } catch (error) {
            //console.log(error);
            dispatch( LoadingError())
        }
    }
}

export function nuevoProducto(producto) {
    return async (dispatch) => {
        dispatch( startLoading() );
        try {
            await axios.post('http://localhost:4000/productos', producto);

            dispatch( agregarProducto({
                loading: false,
                 productos: producto
                }) );

            Swal.fire(
                'Correcto', 
                'El producto se agregó correctamente',
                'success'
            );

        } catch (error) {
            console.log(error);
            dispatch( LoadingError() );
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

export function borrarProducto(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar (id));

        try {
            await axios.delete(`http://localhost:4000/productos/${id}`);
            dispatch( ProductoEliminado ());

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado',
                'El producto se eliminó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(LoadingError ());
        }
    }
}

// Edita un registro en la api y state
export function editarProducto(producto) {
    return async (dispatch) => {
        try {
            await axios.put(`http://localhost:4000/productos/${producto.id}`, producto);    
            dispatch( productoEditado ());
        } catch (error) {
            console.log(error);
            dispatch(LoadingError ());
        }
    }
}