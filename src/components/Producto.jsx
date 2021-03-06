import React from 'react';
import Swal from 'sweetalert2';


// Redux
import { useDispatch } from 'react-redux';
import { borrarProducto, obtenerProductoEditar} from '../redux/productosSlice';
import { useNavigate } from 'react-router-dom';

const Producto = ({producto}) =>{
    let navigate = useNavigate();
    const { nombre, precio,id } = producto;
    const dispatch = useDispatch();
// Confirmar si desea eliminarlo
const confirmarEliminarProducto = id => {

    // preguntar al usuario
    Swal.fire({
        title: '¿Estas seguro?',
        text: "Un producto que se elimina no se puede recuperar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            // pasarlo al action
            dispatch( borrarProducto(id) );
        }
    });
}

// función que redirige de forma programada
const redireccionarEdicion = producto => {
    dispatch( obtenerProductoEditar(producto) );
    navigate(`/productos/editar/${producto.id}`)
}
    return(
        <tr>
           <td>{nombre}</td>
           <td>$ {precio}</td>
           <td>
               <button className="btn btn_edit"  onClick={ () => redireccionarEdicion(producto) }>Editar</button>
               <button className="btn btn_delete"  onClick={() => confirmarEliminarProducto(id)}>Eliminar</button>
           </td>
         </tr>
    )
}

export default Producto