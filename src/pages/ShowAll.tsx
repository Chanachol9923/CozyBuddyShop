import ImageSlot from "../components/ui/ImageSlot"
import { buttonClass } from "../components/ui/buttonStyles"
import { useShowAll } from "../hooks/useShowAll"
import { formatPrice } from "../utils/format"

export default function ShowAll() {
  const { data, isLoading, isError, refetch } = useShowAll()


  if (isLoading) {
    return <p className="py-16 text-center text-cozy-muted">Loading...</p>

  }


  if (isError || !data) {
    return (
      <section className="py-16 text-center">
        <p className="mb-4 text-cozy-muted">Error loading</p>
        <button type="button" onClick={() => refetch()} className={buttonClass("md", "green")}>
          Try again
        </button>
      </section>
    )
  }

  //ตาราง
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="mb-2 text-3xl font-medium text-cozy-green-dark">All API Data</h1>
      <p className="mb-6 text-cozy-muted"> stuff {data.length} item</p>

      <div className="overflow-x-auto">
        <table className="table">

          <thead className="text-cozy-green-dark">

            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Type</th>
              <th>Price</th>
              <th>Best seller</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.pid}>
                <td>

                  <ImageSlot src={item.pimage} alt={item.pname} className="size-16" />

                </td>

                <td>{item.pid}</td>
                <td className="font-semibold">{item.pname}</td>
                <td>{item.catname}</td>
                <td>{item.ptype}</td>
                <td className="whitespace-nowrap">{formatPrice(item.pprice)} ฿</td>
                <td>{item.pisBestSeller ? "Yes" : "No"}</td>
                <td className="max-w-xs truncate">{item.pdescription}</td>

              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </section>
  )
}
