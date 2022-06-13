const accessToken = "IGQVJXOTlPZAF9LZAmd1RzFPT1ZA6alQyYXA0LXkwMkxrbEg0OHFTWExiSVVGemQ3d05XeFBKUDREZADlTLUdacllxRV83X2xnWjNhcHVLU3JEM1V4LTk5T0VYeUhHN29MVUJWdUliN0tMTUthMzVXNWNicAZDZD"
const fields = "id,media_type,media_url,timestamp,permalink"
const section = document.querySelector("section")

const refreshAccessToken = async () => {
    const superhiApi = `https://api.superhi.com/api/test/token/instagram?access_token=${accessToken}`
    const response = await fetch(superhiApi)
    const {access_Token} = await response.json()
    return accessToken
}

const fetchPosts = async () => {
    try {
    const newToken = await refreshAccessToken()
    const apiUrl = `https://graph.instagram.com/me/media?fields=${fields}=&access_token=${newToken}`
    const response = await fetch(apiUrl)
    const {data} = await response.json()

    section.innerHTML = ""
    data.forEach(post => {
        let a = document.createElement("a")
        a.href = post.permalink
        a.target = "_blank"
        a.rel = "noreferrer noopener"

        let container
        if (post.media_type === "VIDEO") {
            container = document.createElement("video")
            container.preload = true
            container.autoplay = true
            container.muted = true
            container.loop = true
        } else {
            container = document.createElement("img")
        }
        container.src = post.media_url
        a.appendChild(container)
        section.appendChild(a)
    })
    } catch (error) {
        section.innerHTML = "Cannot fetch posts"
        console.error(error)
    }
}

fetchPosts()