import { ReactNode, Suspense } from "react"
import { Head, Link } from "blitz"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const LoginButtons = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <div className="flex flex-grow justify-end">
        <button
          className="btn-primary btn"
          onClick={async () => {
            await logout()
          }}
        >
          Logout
        </button>
      </div>
    )
  } else {
    return (
      <div className="flex flex-grow justify-end">
        <Link href="/signup">
          <a className="btn-purple mx-2">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href="/login">
          <a className="btn-purple">
            <strong>Login</strong>
          </a>
        </Link>
      </div>
    )
  }
}

const Header = (props) => (
  <div className="'navbar navbar-inverse'">
    <div className="container-fluid">
      <div className="navbar-header">
        <button
          type="button"
          className="collapsed navbar-toggle"
          data-toggle="collapse"
          data-target="#bs-example-navbar-collapse-6"
          aria-expanded="false"
        >
          {" "}
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>{" "}
        <a href="#" className="navbar-brand">
          Syndex
        </a>
      </div>
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-6">
        <ul className="nav navbar-nav">
          <li className="active">
            {" "}
            <Link href="/issues">
              <a>Issues</a>
            </Link>
          </li>{" "}
          <li>
            {" "}
            <Link href="/accounts">
              <a>Accounts</a>
            </Link>
          </li>{" "}
          <li>
            {" "}
            <Link href="/applications">
              <a className="inline-block hover:text-gray-dark mr-4">Applications</a>
            </Link>
          </li>{" "}
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            {" "}
            <Suspense fallback={<></>}>
              <LoginButtons />
            </Suspense>
          </li>
        </ul>{" "}
      </div>
    </div>
  </div>
)

const Layout = ({ title, children }: LayoutProps) => (
  <>
    <Head>
      <title>{title || "investor-portal-interview"}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <div className="container mx-auto">{children}</div>
  </>
)

export default Layout
