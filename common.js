function getBrowserLang()
{
	let langs_browser=navigator.languages;
	for(var i=0; i<langs_browser.length; ++i)
	{
		console.log(langs_browser[i]);
	}
	let lang="en";
	for(var i=0; i<langs_browser.length; ++i)
	{
		if(langs_browser[i].startsWith("ja"))
		{
			lang="ja";
			break;
		}
		else if(langs_browser[i].startsWith("en"))
		{
			lang="en";
			break;
		}
	}
	return lang;
}

function updateText(lang)
{
	let elements=document.getElementsByClassName("la");
	for(let ei=0; ei<elements.length; ++ei)
	{
		if(elements[ei].classList.contains(lang) || elements[ei].classList.contains("any"))
		{
			if(elements[ei].tagName.toUpperCase()=="DIV")
			{
				elements[ei].style.display="block";
			}
			else if(elements[ei].tagName.toUpperCase()=="SPAN")
			{
				elements[ei].style.display="inline";
			}
		}
		else
		{
			elements[ei].style.display="none";
		}
	}
}


function updateTextLa(lang, la_text)
{
	fix_text={};
	for (const [name, la_t] of Object.entries(la_text))
	{
		for(let li=0; li<la_t.length; ++li)
		{
			let la=la_t[li][0];
			let text=la_t[li][1];
			if(la.includes(lang) || la.includes("any"))
			{
				fix_text[name]=text
				break
			}
		}
	}
	return fix_text;
}


function update(lang, la_text)
{
	updateText(lang);
	name_text=updateTextLa(lang, la_text);
	document.title=name_text["title"];
}


function load(la_text)
{
	let lang=getBrowserLang();
	update(lang, la_text);
}


function template()
{
	document.head.insertAdjacentHTML('beforeend', `
		<meta charset="utf-8">

		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>

		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		
		<link href="./common.css" rel="stylesheet">
	`);

	document.body.addEventListener("load", load(la_text));

	document.body.insertAdjacentHTML("afterbegin", `
		<div class="container"></div>
	`);
	let container=document.body.getElementsByClassName("container")[0];
	container.appendChild(document.getElementById("main"));
	
	url=window.location.href;
	console.log(url);
	console.log(url.split("/"));
}


template();