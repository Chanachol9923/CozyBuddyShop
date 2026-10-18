import { buttonClass } from "../components/ui/buttonStyles"

import { useProducts } from "../hooks/useProducts"
import { useCategories } from "../hooks/useCategories"

export default function ShowAll() {
  return (
    <>
       <ShowCatAPI />
       <ShowProductAPI />
     
    </>
  )
}

function ShowProductAPI() {
  const { data, isLoading, isError, refetch } = useProducts()



  if (isLoading) {
    return <p className="py-16 text-center text-cozy-muted">Loading...</p>

  }


  if (isError || !data) {
    return (
      <section className="py-16 text-center">
        <p><br></br>Products-<br></br></p>
        <p className="mb-4 text-cozy-muted">error loading</p>
        <button type="button" onClick={() => refetch()} className={buttonClass("md", "green")}>
          try again
        </button>
      </section>
    )
  }

  //rawJson
  return (
    <section>

      <pre >
        <p><br></br>Products-<br></br></p>
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  )
}

function ShowCatAPI() {
  const { data, isLoading, isError, refetch } = useCategories()



  if (isLoading) {
    return <p className="py-16 text-center text-cozy-muted">Loading...</p>

  }


  if (isError || !data) {
    return (

      <section className="py-16 text-center">
        <p><br></br>Catagory-<br></br></p>
        <p className="mb-4 text-cozy-muted">error loading</p>
        <button type="button" onClick={() => refetch()} className={buttonClass("md", "green")}>
          try again
        </button>
      </section>
    )
  }

  //rawJson
  return (
    <section>

      <pre >
        <p><br></br>Catagory-<br></br></p>
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  )
}

