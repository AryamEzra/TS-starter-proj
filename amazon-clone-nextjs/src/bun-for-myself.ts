// import { serve } from 'bun';

// // Define the Post interface
// interface Post {
//   id: string;
//   title: string;
//   content: string;
// }


// // In-memory data store
// let blogPosts: Post[] = [];

// // Handlers
// function handleGetAllPosts(): Response {
//   return new Response(JSON.stringify(blogPosts), {
//     headers: { "Content-Type": "application/json" },
//   });
// }

// function handleGetPostById(id: string): Response {
//   const post = blogPosts.find((p) => p.id === id);
//   if (!post) {
//     return new Response(JSON.stringify({ error: "Post not found" }), {
//       status: 404,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
//   return new Response(JSON.stringify(post), {
//     headers: { "Content-Type": "application/json" },
//   });
// }

// function handleCreatePost(title: string, content: string): Response {
//   const newPost: Post = {
//     id: blogPosts.length.toString(),
//     title,
//     content,
//   };
//   blogPosts.push(newPost);
//   return new Response(JSON.stringify(newPost), {
//     status: 201,
//     headers: { "Content-Type": "application/json" },
//   });
// }

// function handleUpdatePost(id: string, title: string, content: string): Response {
//   const index = blogPosts.findIndex((p) => p.id === id);
//   if (index === -1) {
//     return new Response(JSON.stringify({ error: "Post not found" }), {
//       status: 404,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
//   blogPosts[index] = { ...blogPosts[index], title, content };
//   return new Response(JSON.stringify({ message: "Post updated" }), {
//     headers: { "Content-Type": "application/json" },
//   });
// }

// function handleDeletePost(id: string): Response {
//   const index = blogPosts.findIndex((p) => p.id === id);
//   if (index === -1) {
//     return new Response(JSON.stringify({ error: "Post not found" }), {
//       status: 404,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
//   blogPosts.splice(index, 1);
//   return new Response(JSON.stringify({ message: "Post deleted" }), {
//     headers: { "Content-Type": "application/json" },
//   });
// }

// // Start server
// const PORT = 3049;

// serve({
//   port: PORT,
//   async fetch(req: Request): Promise<Response> {
//     const { method } = req;
//     const url = new URL(req.url);
//     const pathname = url.pathname;

//     // GET all posts
//     if (method === "GET" && pathname === "/api/posts") {
//       return handleGetAllPosts();
//     }

//     // GET post by ID
//     const postIdMatch = pathname.match(/^\/api\/posts\/([^/]+)$/);
//     if (method === "GET" && postIdMatch) {
//       const id = postIdMatch[1];
//       return handleGetPostById(id);
//     }

//     // CREATE new post
//     if (method === "POST" && pathname === "/api/posts") {
//       const body = await req.json();
//       return handleCreatePost(body.title, body.content);
//     }

//     // UPDATE post
//     if (method === "PATCH" && postIdMatch) {
//       const id = postIdMatch[1];
//       const body = await req.json();
//       return handleUpdatePost(id, body.title, body.content);
//     }

//     // DELETE post
//     if (method === "DELETE" && pathname === "/api/posts") {
//       const body = await req.json();
//       return handleDeletePost(body.id);
//     }

//     // Default 404
//     return new Response(JSON.stringify({ error: "Not found" }), {
//       status: 404,
//       headers: { "Content-Type": "application/json" },
//     });
//   },
// });

// console.log(`🚀 Server running on http://localhost:${PORT}`);
