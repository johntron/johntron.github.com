export default function run() {
    fetch('posts.json')
		.then(res => res.json())
 		.then(json => fetch_page(json))
		.then(posts => posts.map(munge).map(extract_abstract))
		.then(abstracts => Promise.all(abstracts.map(to_html)))
		.then(htmls => {
			htmls.forEach(html => {
				var post = document.createRange().createContextualFragment(html);
				document.body.appendChild(post);
			});
		});

}

function fetch_page(posts, begin=0, end=10) {
	var page = posts.slice(begin, end);
	var fetches = page.map(fetch_post);
	return Promise.all(fetches);
}

function fetch_post(url) {
	return fetch(url).then(post => post.text());
}

function munge(post) {
	return post.trim().replace(/\n\s*\n/g, '\n\n'); // Remove tabs/spaces from empty lines
}

function extract_abstract(post) {
	return post.match(/# .*\n+.+(\n\n|$)/g)[0].trim();
}

function to_html(abstract) {
	return fetch('https://api.github.com/markdown/raw', {
		method: 'post',
		headers: {'Content-Type': 'text/x-markdown'},
		body: abstract
	}).then(response => response.text());
}
