
import { useCategories } from "../hooks/useCategories"



export default function Home(){

  const {data} = useCategories()


  if (!data){
    return <p>Loading...</p>
  }


  return (
    <div>
      <h1>Shop by Category</h1>

      {data.map((category) => (
        

        <div key={category.id}>
          <br></br>

          <p>{category.name}</p>
          <p>{category.image}</p>
          
          <button>R</button>

          <br></br><br></br>


        </div>


      ))}
    </div>
  )
}
