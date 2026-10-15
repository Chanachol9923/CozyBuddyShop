import { useProducts } from "../hooks/useProducts"


export default function Shop() {
  const { data, isLoading, isError } = useProducts()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error kub eiei - connect api maidai!</p>
  }


  if (!data) {
    return <ul></ul>
  }

  return (
    <ul>
      {data.map((product) => (
        <li key={product.id}>
          {product.name} {product.price} Bath
        </li>
      ))}
    </ul>
  )
}
