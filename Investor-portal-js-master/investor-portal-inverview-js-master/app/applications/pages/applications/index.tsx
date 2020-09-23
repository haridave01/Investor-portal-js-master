import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getApplications from "app/applications/queries/getApplications"

const ITEMS_PER_PAGE = 100

export const ApplicationsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ applications, hasMore }] = usePaginatedQuery(getApplications, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {applications.map((application) => (
          <li key={application.id}>
            <Link href="/applications/[applicationId]" as={`/applications/${application.id}`}>
              <a>{application.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ApplicationsPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Applications</title>
      </Head>

      <main>
        <h1>Applications</h1>

        <p>
          <Link href="/applications/new">
            <a>Create Application</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ApplicationsList />
        </Suspense>
      </main>
    </div>
  )
}

ApplicationsPage.getLayout = (page) => <Layout title={"Applications"}>{page}</Layout>

export default ApplicationsPage
