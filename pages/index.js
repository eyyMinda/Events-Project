import Link from "next/link";

export default function HomePage() {
  const specificRoutes = [
    { id: 'comicon', name: 'ComiCon' }
  ]
  const pathname = '/events/'

  return (
    <div>
      <h1>Events Home Page</h1>

      <ul>
        <li>
          <Link href={{
            pathname
          }}>Events</Link>
        </li>
        <li>
          <Link href={{
            pathname: pathname + '[id]',
            query: { id: specificRoutes[0].id }
          }}>Event Details Page ({specificRoutes[0].name})</Link>
        </li>
        <li>
          <Link href={{
            pathname: pathname + '[year]/' + '[month]',
            query: { year: '2023', month: '8' }
          }}>Filtered Events Page</Link>
        </li>
      </ul>
    </div>
  )
}
