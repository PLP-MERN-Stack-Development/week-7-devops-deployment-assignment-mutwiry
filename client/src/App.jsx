import React, { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentView, setCurrentView] = useState('list') // 'list' or 'single'
  const [currentPost, setCurrentPost] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ title: '', content: '' })
  
  // Authentication state
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [showAuth, setShowAuth] = useState('login') // 'login' or 'register'

  const API_URL = 'http://localhost:5000/api'

  // Move loadPosts above useEffect
  const loadPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/posts`)
      const data = await response.json()
      setPosts(data)
      setError(null)
    } catch (err) {
      setError('Error loading posts. Make sure the server is running.')
      console.error('Error loading posts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Check if user is already logged in
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    
    loadPosts()
  }, [])

  const handleLogin = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
  }

  const handleRegister = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const switchToRegister = () => {
    setShowAuth('register')
  }

  const switchToLogin = () => {
    setShowAuth('login')
  }

  // Show authentication forms if user is not logged in
  if (!user) {
    return (
      <div className="app">
        <header className="header">
          <div className="container">
            <h1><i className="fas fa-blog"></i> Modern Blog System</h1>
          </div>
        </header>
        
        <main className="main-content">
          {showAuth === 'login' ? (
            <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
          ) : (
            <Register onRegister={handleRegister} onSwitchToLogin={switchToLogin} />
          )}
        </main>
      </div>
    )
  }

  const viewPost = async (id) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/posts/${id}`)
      const post = await response.json()
      setCurrentPost(post)
      setCurrentView('single')
      setError(null)
    } catch (err) {
      setError('Error loading post.')
      console.error('Error loading post:', err)
    } finally {
      setLoading(false)
    }
  }

  const backToList = () => {
    setCurrentView('list')
    setCurrentPost(null)
  }

  const showAddForm = () => {
    setIsEditing(false)
    setFormData({ title: '', content: '' })
    setShowForm(true)
  }

  const showEditForm = (post) => {
    setIsEditing(true)
    setFormData({ title: post.title, content: post.content })
    setShowForm(true)
  }

  const hideForm = () => {
    setShowForm(false)
    setIsEditing(false)
    setFormData({ title: '', content: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Please fill in both title and content')
      return
    }

    try {
      const url = isEditing ? `${API_URL}/posts/${currentPost.id}` : `${API_URL}/posts`
      const method = isEditing ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        hideForm()
        if (currentView === 'single' && isEditing) {
          viewPost(currentPost.id)
        } else {
          loadPosts()
        }
        setError(null)
      } else {
        setError('Error saving post')
      }
    } catch (err) {
      setError('Error saving post. Make sure the server is running.')
      console.error('Error saving post:', err)
    }
  }

  const deletePost = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        if (currentView === 'single' && currentPost?.id === id) {
          backToList()
        } else {
          loadPosts()
        }
        setError(null)
      } else {
        setError('Error deleting post')
      }
    } catch (err) {
      setError('Error deleting post. Make sure the server is running.')
      console.error('Error deleting post:', err)
    }
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (currentView === 'single' && currentPost) {
    return (
      <div className="app">
        <header className="header">
          <div className="container">
            <h1><i className="fas fa-blog"></i> Modern Blog System</h1>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={backToList}>
                <i className="fas fa-arrow-left"></i> Back to Posts
              </button>
              <div className="user-info">
                <span>Welcome, {user.username}!</span>
                <button className="btn btn-outline" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="main-content">
          <div className="container">
            {error && <div className="error">{error}</div>}
            
            <article className="single-post">
              <h1>{currentPost.title}</h1>
              <p>{currentPost.content}</p>
              <div className="post-actions">
                <button className="btn btn-secondary" onClick={() => showEditForm(currentPost)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-danger" onClick={() => deletePost(currentPost.id)}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </article>
          </div>
        </main>

        {showForm && (
          <div className="modal-overlay" onClick={hideForm}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{isEditing ? 'Edit Post' : 'Add New Post'}</h2>
                <button className="close-btn" onClick={hideForm}>&times;</button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={hideForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? 'Update Post' : 'Add Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1><i className="fas fa-blog"></i> Modern Blog System</h1>
          <div className="header-actions">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button className="btn btn-primary" onClick={showAddForm}>
                <i className="fas fa-plus"></i> New Post
              </button>
            </div>
            <div className="user-info">
              <span>Welcome, {user.username}!</span>
              <button className="btn btn-outline" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          {error && <div className="error">{error}</div>}
          
          {filteredPosts.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-file-alt"></i>
              <h3>No posts found</h3>
              <p>{searchTerm ? 'Try adjusting your search terms.' : 'Create your first blog post to get started!'}</p>
              {!searchTerm && (
                <button className="btn btn-primary" onClick={showAddForm}>
                  <i className="fas fa-plus"></i> Create First Post
                </button>
              )}
            </div>
          ) : (
            <div className="posts-grid">
              {filteredPosts.map(post => (
                <article key={post.id} className="post-card" onClick={() => viewPost(post.id)}>
                  <h3>{post.title}</h3>
                  <p>{post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}</p>
                  <div className="post-actions" onClick={(e) => e.stopPropagation()}>
                    <button className="btn btn-secondary" onClick={() => showEditForm(post)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-danger" onClick={() => deletePost(post.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      {showForm && (
        <div className="modal-overlay" onClick={hideForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{isEditing ? 'Edit Post' : 'Add New Post'}</h2>
              <button className="close-btn" onClick={hideForm}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={hideForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Update Post' : 'Add Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
