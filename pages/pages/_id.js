import Link from 'next/link'

import AppLayout from '../../components/AppLayout'


const Page = (props) => (
  <AppLayout title={`Editing page ${props.pageID}`}>
    <h1>Editing Page {props.pageID}</h1>

    <style jsx>{`
    `}</style>
  </AppLayout>
)

Page.getInitialProps = async ({ query }) => {
  console.log(`Editing page ${query.id}`);
  const pageID = decodeURIComponent(query.id);
  return {pageID};
}

export default Page
