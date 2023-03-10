let results =[];

document.getElementById('form').addEventListener('submit', async (e) =>  {
    e.preventDefault();

    const searchPanel = document.getElementById('reqwest-place')
    let inputValue = searchPanel.value

    const response = await fetch(`https://api.github.com/search/repositories?q=${inputValue}`);

    if(response.ok){
        const data = await response.json();
        const results = data.items;
        showResults(results);
        console.log(results)

        
    }
    else{
        alert("There is no data!")
    }
    
})

function showResults(results){
    let res = document.getElementById('results');
    let out = ' ';

    results.forEach(function(item){
        out +=`<p class="search-text">Name: ${item.name}</p>`;
        out += `<a href=${item.clone_url} target="_blanck" class="search-text">Link: ${item.clone_url}</a>`;
    })
    res.innerHTML = out;
}