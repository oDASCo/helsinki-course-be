const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 1) {
        return blogs[0].likes
    } else {
        const likes = blogs.map(item => item.likes)
        return likes.reduce((sum, item) => {
            return sum + +item
        })
    }
}
const favoriteBlog = (blogs) => {
    function compareBlogs(a, b) {
        if (a.likes > b.likes) {
            return -1
        }
        if (a.likes < b.likes) {
            return 1
        }
        return 0
    }
    return blogs.sort(compareBlogs)[0]
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
