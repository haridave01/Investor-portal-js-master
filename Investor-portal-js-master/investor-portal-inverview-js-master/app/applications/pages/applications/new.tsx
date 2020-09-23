import React from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, BlitzPage } from "blitz"
import createApplication from "app/applications/mutations/createApplication"
import ApplicationForm from "app/applications/components/ApplicationForm"

const NewApplicationPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>New Application</title>
      </Head>

      <main>
        <h1>Create New Application</h1>

        <ApplicationForm
          initialValues={{ name: "", accountId: 0 }}
          onSubmit={async (event) => {
            try {
              const application = await createApplication({
                data: {
                  name: event.name,
                },
              })
              alert("Success!" + JSON.stringify(application))
              router.push("/applications/[applicationId]", `/applications/${application.id}`)
            } catch (error) {
              alert("Error creating application " + JSON.stringify(error, null, 2))
            }
          }}
        />

        <p>
          <Link href="/applications">
            <a>Applications</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

NewApplicationPage.getLayout = (page) => <Layout title={"Create New Application"}>{page}</Layout>

export default NewApplicationPage
