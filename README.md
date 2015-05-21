This is an early prototype of a super minimalist blog I'm working on - it uses ES6 extensively.

# Rendering
1. Read list of paths to posts from [posts.json](posts.json) (Need to add a script to generate this).
2. Load posts' content.
3. Munge data and extract abstracts for homepage.
4. Pass abstracts through api.github.com/markdown.
5. Insert into page.
