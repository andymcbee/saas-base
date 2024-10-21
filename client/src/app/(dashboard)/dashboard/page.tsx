import { getPosts } from "@/data-access/posts";

export default async function BlogsPage() {
  // TODO const user = await getUser();

  /* // TODO if (!user) {
    redirect("/sign-in");
  } */

  //const teamData = await getTeamForUser(user.id);

  /*   if (!teamData) {
    throw new Error("Team not found");
  } */

  const posts = await getPosts();

  console.log("Posts::::");
  console.log(posts);

  return (
    <>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            {post.message} -- account id: {post.account_id}
          </div>
        );
      })}
    </>
  );
}
