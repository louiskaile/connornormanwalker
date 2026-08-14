import { client } from '@/sanity/lib/client'
import { POSTS_QUERY } from '@/sanity/lib/queries'

type Post = { _id: string; title: string; excerpt?: string }

export default async function Home() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY)

  return (
    <main>
      <p className="eyebrow">Sanity + Next.js</p>
      <h1>Your content starter is ready.</h1>
      <p className="intro">Create a post in Sanity Studio, publish it, and it will appear here.</p>
      <section aria-label="Posts">
        {posts.length ? posts.map((post) => <article key={post._id}><h2>{post.title}</h2>{post.excerpt && <p>{post.excerpt}</p>}</article>) : <p className="empty">No published posts yet.</p>}
      </section>
    </main>
  )
}
