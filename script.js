function urlChange() {
	"https://www.youtube.com/watch?v=dQw4w9WgXcQ" == input.value
		? (input.value = "")
		: "" == input.value && (input.value = "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
}
function handleSearch(e = "hd") {
	mainFunction((url = input.value), e), (img.style.opacity = 0), (imgLoader.style.display = "inline-block");
}
function mainFunction(e, t = "hd") {
	let a,
		s = e.match(/^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|shorts\/)?(.{11})/);
	s && (a = s[1]);
	let n = getImgLink(a, t);
	(img.onload = function () {
		(imgLoader.style.display = "none"), (img.style.opacity = 1);
	}),
		(img.src = n);
}
function getImgLink(e, t = null) {
	return (
		"webp" == t
			? ((imgUrl = `https://img.youtube.com/vi_webp/${e}/maxresdefault.webp`),
			  document.getElementById("webp").classList.add("active"),
			  document.getElementById("hd").classList.remove("active"))
			: ((imgUrl = `https://img.youtube.com/vi/${e}/maxresdefault.jpg`),
			  document.getElementById("hd").classList.add("active"),
			  document.getElementById("webp").classList.remove("active")),
		imgUrl
	);
}
function download() {
	let e = document.getElementById("download-icon");
	e.classList.remove("fa-download"), e.classList.add("fa-sync", "fa-spin");
	let t = img.src,
		a,
		s = `${t.match(/\/vi(?:_webp)?\/(\w{11})/)[1]}.${t.match(/\.(\w+)$/)[1]}`;
	fetch(`https://api.codetabs.com/v1/proxy/?quest=${t}`)
		.then((t) => {
			t.blob().then((t) => {
				e.classList.remove("fa-sync", "fa-spin"), e.classList.add("fa-check");
				let a = window.URL.createObjectURL(t),
					n = document.createElement("a");
				(n.style.display = "none"),
					(n.href = a),
					(n.download = s),
					document.body.appendChild(n),
					n.click(),
					document.body.removeChild(n),
					window.URL.revokeObjectURL(a),
					setTimeout(() => {
						e.classList.remove("fa-check"), e.classList.add("fa-download");
					}, 5e3);
			});
		})
		.catch((t) => {
			console.error(t),
				e.classList.remove("fa-sync", "fa-spin"),
				e.classList.add("fa-download"),
				setTimeout(() => {
					e.classList.remove("fa-check"), e.classList.add("fa-download");
				}, 5e3);
		});
}
(img = document.getElementById("img")),
	((input = document.getElementById("input")).value = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
	(button = document.getElementById("button")),
	(imgLoader = document.getElementById("imgLoader")),
	(loader = document.getElementById("loader")),
	handleSearch(),
	input.addEventListener("focus", urlChange),
	input.addEventListener("blur", urlChange),
	button.addEventListener("click", handleSearch),
	$(input).on("paste", function () {
		setTimeout(handleSearch, 10);
	}),
	window.addEventListener("load", () => {
		setTimeout(() => {
			(loader.style.cssText = "opacity:0;pointer-events:none"),
				(document.getElementById("spin").style.transform = "scale(.000001)");
		}, 1e3);
	});
