import { getSession, useSession } from "next-auth/react";

function Blog({ dataProps }) {
  const { data: session } = useSession();

  return (
    <h1>
      Blog page - {dataProps} {session.user.name}
    </h1>
  );
}

export default Blog;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log({ sesi: session });
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin?callbackUrl=http://localhost:3000/blog",
        permanent: false,
      },
    };
  }
  return {
    props: {
      dataProps: "List of 100 personalized blogs",
      session,
    },
  };
}
