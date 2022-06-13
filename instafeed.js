const accessToken = "IGQVJXOTlPZAF9LZAmd1RzFPT1ZA6alQyYXA0LXkwMkxrbEg0OHFTWExiSVVGemQ3d05XeFBKUDREZADlTLUdacllxRV83X2xnWjNhcHVLU3JEM1V4LTk5T0VYeUhHN29MVUJWdUliN0tMTUthMzVXNWNicAZDZD"
const fields = "id,media_type,media_url,timestamp,permalink"
const apiUrl = `https://graph.instagram.com/me/media?fields=${fields}=&access_token=${accessToken}`
const section = document.querySelector("section")

const fetchPosts = async () => {
    try {
    const response = await fetch(apiUrl)
    const {data} = await response.json()

    data.forEach(post => {
        let a = document.createElement("a")
        a.href = post.permalink
        a.target = "_blank"
        a.rel = "noreferrer noopener"

        if (post.media_type === "VIDEO") {
            let video = document.createElement("video")
            video.src = post.media_url
            video.preload = true
            video.autoplay = true
            video.muted = true
            video.loop = true
            a.appendChild(video)
        } else {
            let img = document.createElement("img")
            img.src = post.media_url
            a.appendChild(img)
        }
        section.appendChild(a)
    })
    } catch (error) {
        console.error(error)
    }
}

fetchPosts()