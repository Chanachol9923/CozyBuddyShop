import { useParams } from "react-router"
import { useProduct } from "../hooks/useProduct"



export default function Product(){
  const {id} = useParams()
  const {data} = useProduct(id)


  if (!data){
    return <p>Loading...</p>
  }


  return <h1>Product {id}: 
  {data.name} 
  - {data.price} bth 
  <br></br>{data.image} 
  <br></br>{data.description} </h1>

}
