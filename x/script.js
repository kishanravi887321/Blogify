document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle")
  const htmlElement = document.documentElement

  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  // Set initial theme
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    htmlElement.setAttribute("data-theme", "dark")
    if (themeToggle) {
      themeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun")
    }
  }

  // Toggle theme when button is clicked
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme")
      const icon = themeToggle.querySelector("i")

      if (currentTheme === "dark") {
        htmlElement.removeAttribute("data-theme")
        localStorage.setItem("theme", "light")
        icon.classList.replace("fa-sun", "fa-moon")
      } else {
        htmlElement.setAttribute("data-theme", "dark")
        localStorage.setItem("theme", "dark")
        icon.classList.replace("fa-moon", "fa-sun")
      }
    })
  }

  // User menu dropdown
  const userMenuToggle = document.getElementById("user-menu-toggle")
  const userDropdown = document.getElementById("user-dropdown")

  if (userMenuToggle && userDropdown) {
    userMenuToggle.addEventListener("click", (e) => {
      e.stopPropagation()
      userDropdown.classList.toggle("show")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (userDropdown.classList.contains("show") && !userDropdown.contains(e.target) && e.target !== userMenuToggle) {
        userDropdown.classList.remove("show")
      }
    })
  }

  // Search functionality
  const searchInput = document.getElementById("search-input")
  const searchDropdown = document.getElementById("search-dropdown")
  const searchResults = document.getElementById("search-results")
  const searchTabs = document.querySelectorAll(".search-tab")

  if (searchInput && searchDropdown) {
    // Show dropdown when input is focused
    searchInput.addEventListener("focus", () => {
      searchDropdown.classList.add("show")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-container")) {
        searchDropdown.classList.remove("show")
      }
    })

    // Handle tab switching
    searchTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        searchTabs.forEach((t) => t.classList.remove("active"))
        tab.classList.add("active")

        const tabType = tab.getAttribute("data-tab")
        performSearch(searchInput.value, tabType)
      })
    })

    // Handle search input
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim()
      const activeTab = document.querySelector(".search-tab.active")
      const tabType = activeTab ? activeTab.getAttribute("data-tab") : "posts"

      if (query.length > 0) {
        performSearch(query, tabType)
        searchDropdown.classList.add("show")
      } else {
        searchDropdown.classList.remove("show")
      }
    })
  }

  // Mock search function - in a real app, this would call an API
  function performSearch(query, type) {
    // Clear previous results
    if (searchResults) {
      searchResults.innerHTML = ""
    }

    if (query.length === 0) return

    // Mock data
    let results = []

    if (type === "users") {
      results = [
        { name: "Alex Morgan", username: "@alexmorgan", avatar: "/placeholder.svg?height=40&width=40" },
        { name: "Jane Smith", username: "@janesmith", avatar: "/placeholder.svg?height=40&width=40" },
        { name: "John Doe", username: "@johndoe", avatar: "/placeholder.svg?height=40&width=40" },
      ]
    } else {
      results = [
        { title: "Web Development Tips", author: "Alex Morgan", avatar: "/placeholder.svg?height=40&width=40" },
        { title: "Learning JavaScript in 2023", author: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40" },
        { title: "CSS Grid vs Flexbox", author: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
      ]
    }

    // Filter results based on query
    results = results.filter((item) => {
      if (type === "users") {
        return (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.username.toLowerCase().includes(query.toLowerCase())
        )
      } else {
        return (
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.author.toLowerCase().includes(query.toLowerCase())
        )
      }
    })

    // Display results
    if (results.length === 0) {
      searchResults.innerHTML = `<div class="search-result">No results found for "${query}"</div>`
    } else {
      results.forEach((result) => {
        const resultElement = document.createElement("div")
        resultElement.className = "search-result"

        if (type === "users") {
          resultElement.innerHTML = `
            <img src="${result.avatar}" alt="${result.name}">
            <div class="search-result-info">
              <h4>${result.name}</h4>
              <p>${result.username}</p>
            </div>
          `
        } else {
          resultElement.innerHTML = `
            <img src="${result.avatar}" alt="${result.author}">
            <div class="search-result-info">
              <h4>${result.title}</h4>
              <p>By ${result.author}</p>
            </div>
          `
        }

        searchResults.appendChild(resultElement)
      })
    }
  }

  // Follow button functionality
  const followBtn = document.getElementById("follow-btn")

  if (followBtn) {
    followBtn.addEventListener("click", function () {
      if (this.classList.contains("following")) {
        this.classList.remove("following")
        this.innerHTML = "Follow"
      } else {
        this.classList.add("following")
        this.innerHTML = "<span>Following</span>"
      }
    })
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show")
    })
  }

  // Like button functionality
  const likeButtons = document.querySelectorAll(".like-btn")

  likeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i")
      const count = this.querySelector("span")

      if (icon.classList.contains("far")) {
        icon.classList.remove("far")
        icon.classList.add("fas")
        icon.style.color = "#e0245e"
        count.textContent = Number.parseInt(count.textContent) + 1
      } else {
        icon.classList.remove("fas")
        icon.classList.add("far")
        icon.style.color = ""
        count.textContent = Number.parseInt(count.textContent) - 1
      }
    })
  })

  // Comment button functionality
  const commentButtons = document.querySelectorAll(".comment-btn")

  commentButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const post = this.closest(".post")
      const comments = post.querySelector(".comments")

      if (comments) {
        comments.style.display = comments.style.display === "none" ? "block" : "none"
      }
    })
  })

  // Profile tabs functionality
  const tabButtons = document.querySelectorAll(".tab-btn")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Here you would typically show/hide content based on the selected tab
      // For demonstration purposes, we're just changing the active state
    })
  })

  // Form validation for login
  const loginForm = document.getElementById("login-form")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      if (!email || !password) {
        alert("Please fill in all fields")
        return
      }

      // Here you would typically send the form data to a server
      // For demonstration purposes, we're just showing an alert
      alert("Login successful!")

      // Redirect to home page
      window.location.href = "index.html"
    })
  }

  // Form validation for signup
  const signupForm = document.getElementById("signup-form")

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("name").value
      const username = document.getElementById("username").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirm-password").value
      const terms = document.getElementById("terms").checked

      if (!name || !username || !email || !password || !confirmPassword) {
        alert("Please fill in all fields")
        return
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match")
        return
      }

      if (!terms) {
        alert("Please agree to the Terms of Service and Privacy Policy")
        return
      }

      // Password validation
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
      if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long and include a number and a special character")
        return
      }

      // Here you would typically send the form data to a server
      // For demonstration purposes, we're just showing an alert
      alert("Signup successful!")

      // Redirect to home page
      window.location.href = "index.html"
    })
  }

  // Forgot password form validation
  const forgotPasswordForm = document.getElementById("forgot-password-form")

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value

      if (!email) {
        alert("Please enter your email address")
        return
      }

      // Here you would typically send the form data to a server
      // For demonstration purposes, we're just showing an alert
      alert("Password reset link has been sent to your email address")

      // Redirect to login page
      window.location.href = "login.html"
    })
  }

  // Post form functionality
  const postForm = document.querySelector(".post-form")

  if (postForm) {
    const textarea = postForm.querySelector("textarea")
    const postButton = postForm.querySelector(".post-btn")

    textarea.addEventListener("input", function () {
      if (this.value.trim().length > 0) {
        postButton.style.opacity = "1"
        postButton.disabled = false
      } else {
        postButton.style.opacity = "0.5"
        postButton.disabled = true
      }
    })

    postForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const content = textarea.value.trim()

      if (!content) {
        return
      }

      // Here you would typically send the post data to a server
      // For demonstration purposes, we're creating a new post element

      const posts = document.querySelector(".posts")
      const newPost = document.createElement("div")
      newPost.className = "post"

      newPost.innerHTML = `
        <div class="post-avatar">
          <img src="/placeholder.svg?height=50&width=50" alt="User avatar">
        </div>
        <div class="post-content">
          <div class="post-header">
            <div class="post-user">
              <h4>Your Name</h4>
              <span>@yourname</span>
            </div>
            <span class="post-time">Just now</span>
          </div>
          <div class="post-text">
            <p>${content}</p>
          </div>
          <div class="post-actions">
            <button class="like-btn"><i class="far fa-heart"></i> <span>0</span></button>
            <button class="comment-btn"><i class="far fa-comment"></i> <span>0</span></button>
            <button class="share-btn"><i class="far fa-share-square"></i></button>
          </div>
        </div>
      `

      // Add the new post at the top of the posts list
      posts.insertBefore(newPost, posts.firstChild)

      // Clear the textarea
      textarea.value = ""
      postButton.style.opacity = "0.5"
      postButton.disabled = true

      // Add event listeners to the new post's buttons
      const likeBtn = newPost.querySelector(".like-btn")
      likeBtn.addEventListener("click", function () {
        const icon = this.querySelector("i")
        const count = this.querySelector("span")

        if (icon.classList.contains("far")) {
          icon.classList.remove("far")
          icon.classList.add("fas")
          icon.style.color = "#e0245e"
          count.textContent = Number.parseInt(count.textContent) + 1
        } else {
          icon.classList.remove("fas")
          icon.classList.add("far")
          icon.style.color = ""
          count.textContent = Number.parseInt(count.textContent) - 1
        }
      })
    })
  }
})
