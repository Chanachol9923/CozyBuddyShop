// ลิงก์ JSON Server ของเรา (ยังไม่มี ใส่ URL แทน "#" ได้เลย)
const JSON_SERVER_URL = "#"

const LINK_CLASS = "font-semibold text-cozy-green underline hover:text-cozy-green-dark"

// แหล่งที่มาของข้อมูลสินค้า (Mock API ที่ทำเองจากข้อมูลของ Hazel Village)
export default function ApiAttribution() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 lg:py-14">
      <h2 className="mb-3 font-heading text-2xl font-bold text-cozy-green sm:text-3xl">API Attribution</h2>
      <p className="font-slab leading-7 text-cozy-muted">
        We created our own Mock API using original data from{" "}
        <a href="http://hazelvillage.com/" target="_blank" rel="noreferrer" className={`break-all ${LINK_CLASS}`}>
          http://hazelvillage.com/
        </a>
      </p>
      <p className="font-slab leading-7 text-cozy-muted">
        View our JSON Server{" "}
        <a href={JSON_SERVER_URL} target="_blank" rel="noreferrer" className={LINK_CLASS}>
          HERE
        </a>
      </p>
    </section>
  )
}
