import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getApplication from "app/applications/queries/getApplication"
import deleteApplication from "app/applications/mutations/deleteApplication"

export const Application = () => {
  const router = useRouter()
  const applicationId = useParam("applicationId", "number")
  const [application] = useQuery(getApplication, { where: { id: applicationId } })

  return (
    <div>
      <h1>Application {application.id}</h1>
      <pre>{JSON.stringify(application, null, 2)}</pre>

      <Link href="/applications/[applicationId]/edit" as={`/applications/${application.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteApplication({ where: { id: application.id } })
            router.push("/applications")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowApplicationPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Application</title>
      </Head>

      <main>
        <p>
          <Link href="/applications">
            <a>Applications</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Application />
        </Suspense>
      </main>
    </div>
  )
}

ShowApplicationPage.getLayout = (page) => <Layout title={"Application"}>{page}</Layout>

export default ShowApplicationPage
