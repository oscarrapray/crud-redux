import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Header from './components/Header';
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';
import "../node_modules/sweetalert2/dist/sweetalert2.css"
import './css/estilos.css'
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {

  return (
    <BrowserRouter>
    <Provider store={store}>
        <Header />
        <Routes>
          <Route path='/' element = {<Productos />}/>
          <Route path="/productos/nuevo" element={<NuevoProducto />} />
          <Route path="/productos/editar/:id" element={<EditarProducto />} />
        </Routes>
    </Provider>
    </BrowserRouter>
  )
}

export default App