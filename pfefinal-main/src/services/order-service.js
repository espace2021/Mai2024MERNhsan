import Axios from "../Axios/Api";
const ORDER_API = '/orders';
const GetOrder=async()=> {
const orders= await Axios.get(ORDER_API);
console.log("order services est ",orders)
return orders;
}
const GetOrderById=async(id)=> {
return await Axios.get(ORDER_API +'/' + id
);
}
const DeleteOrder=async(id)=> {
return await Axios.delete(ORDER_API +'/' + id)
}
const AddOrder=async(order)=> {
   
return await Axios.post(ORDER_API+"/", order);
}
const EditOrder=async (id, status) => {
    try {
      const response = await Axios.put(`${ORDER_API}/${id}`, {
        status: status
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return response;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };

export const OrderService = {
GetOrder,
GetOrderById,
DeleteOrder,
AddOrder,
EditOrder
}