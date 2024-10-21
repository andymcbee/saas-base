import { getPosts } from "@/data-access/posts";

export default async function BlogsPage() {
  const posts = await getPosts();

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
