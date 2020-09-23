import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getApplication from "app/applications/queries/getApplication"
import updateApplication from "app/applications/mutations/updateApplication"
import ApplicationForm from "app/applications/components/ApplicationForm"

export const EditApplication = () => {
  const router = useRouter()
  const applicationId = useParam("applicationId", "number")
  const [application, { mutate }] = useQuery(getApplication, { where: { id: applicationId } })

  return (
    <div>
      <h1>Edit Application {application.id}</h1>
      <pre>{JSON.stringify(application)}</pre>

      <ApplicationForm
        initialValues={application}
        onSubmit={async () => {
          try {
            const updated = await updateApplication({
              where: { id: application.id },
              data: { name: "MyNewName" },
            })
            mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/applications/[applicationId]", `/applications/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating application " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditApplicationPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Edit Application</title>
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditApplication />
        </Suspense>

        <p>
          <Link href="/applications">
            <a>Applications</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

EditApplicationPage.getLayout = (page) => <Layout title={"Edit Application"}>{page}</Layout>

export default EditApplicationPage
