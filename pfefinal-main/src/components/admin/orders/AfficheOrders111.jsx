import Table from 'react-bootstrap/Table';
import ReactLoading from 'react-loading';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch,useSelector} from "react-redux";

import {updateOrder,deleteOrder} from "../../../features/orderSlice";


const AffOrders = () => {

  const dispatch = useDispatch();

 const {orders,isLoading,error} = useSelector((state) =>state.order);

  const onChangeInput = (e, _id) => { 
    const {  value } = e.target

    const order={_id , status:value}
    dispatch(updateOrder(order))

   }

const statusColors = {
    'Not processed': "badge bg-danger",
    Processing: "badge bg-primary",
    Shipped: "badge bg-warning text-dark",
    Delivered: "badge bg-success",
    };

  const handleDeleteOrder=async(_id)=>{
    if (!window.confirm('Are you sure to delete')) {
      return;
    }
  
    await dispatch(deleteOrder(_id))
      .then(() => {
        console.log('successfully deleted!');
          })
      .catch((error) => {
        console.log(error);
      });
  
    
  }  
    
  return (
    <>
{ isLoading ? <center><ReactLoading type='spokes' color="red" height={'8%'} width={'8%'} /></center> :null}
{error ? <p>Impossible d'afficher la liste des articles...</p>:null}

{ orders && <Table striped bordered hover>
        <thead>
          <tr>
            <th>Action</th>
            <th>Status</th>
            <th>Date</th>
            <th>Client</th>
            <th>Total</th>
            <th style={{ minWidth: '550px' }}>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(({ _id,status, createdAt,user, amount, allProduct },ind) => (
            <tr key={ind}>
              <td>
              <span  onClick={() => {
               handleDeleteOrder(_id);
               }}>
              <DeleteIcon style={{ color: "red" }}/>
           </span>        

              </td>
              <td>
                <select
                  name="status"
                  value={status}
                  type="text"
                  onChange={(e) => onChangeInput(e, _id)}
                  placeholder="Type status"
                  className={`${statusColors[status] || "badge bg-light text-dark"} `}
                >
                  <option value="Not processed">Not processed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  </select>
              </td>
              <td>
               {new Date(createdAt).toLocaleDateString()}
              </td>
              <td>
               {user}
              </td>
              <td>
               {amount}
              </td>
              <td style={{ display: 'flex', flexDirection: 'column' }}>
               {allProduct.map((value,i)=>{
                return <div key={i}>
                <div> 
                  <span style={{ display: 'flex', flexDirection: 'row' }}>
                    <img src ={value.article?.imageart} alt="" width="35" height="35" />
                    {value.article?.designation}
                  </span>
                </div>  
                <div>Quantity : {value.quantity}</div>
                <div>Total Price : {value.price}</div>
                </div>
               })}
              </td>
            </tr>
          ))}
        </tbody>
        </Table>
    }
     </>
  )
}

export default AffOrders
