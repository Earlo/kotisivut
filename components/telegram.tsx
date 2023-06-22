import { useEffect, useState } from 'react'

// Telegram Component
export const Telegram = () => {
  const [tgPosts, setTgPosts] = useState<string[]>([])
  useEffect(() => {
    fetch('/api/telegram')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        // Reverse the array and take the first 5 posts
        const latestPosts = data.reverse().slice(0, 5)
        setTgPosts(latestPosts)
      })
  }, [])

  return (
    <section className="flex flex-col items-center p-4 md:p-10">
      <h2 className="text-2xl font-bold mb-4">Latest Telegram Posts</h2>
      {tgPosts.map((post, index) => (
        <div
          className="w-full py-1 px-10"
          key={index}
          dangerouslySetInnerHTML={{ __html: post }}
        />
      ))}
    </section>
  )
}
