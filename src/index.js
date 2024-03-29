let results =[];

document.getElementById('form').addEventListener('submit', async (e) =>  {
    e.preventDefault();

    const searchPanel = document.getElementById('reqwest-place')
    let inputValue = searchPanel.value
    

    const response = await fetch(`https://api.github.com/search/repositories?q=${inputValue}`);

    if(response.ok){
        const data = await response.json();
        const results = data.items;
        
        if(results.length > 10){
            results.length = 10;
        }
        
        clearInput();
        showResults(results);
        console.log(results);
        inputValidation(inputValue);
        
    }
    else{
        document.getElementById('results').innerHTML = `<p>"There is no response!"</p>`;
    }
    
});

function showResults(results){
    let res = document.getElementById('results');
    let out = ' ';

    results.forEach(function(item){
        if(item.description == null){
            item.description = 'отсутствует';
        };

        out += `<div class="resCardHolder">
                    <a href=${item.clone_url} target="_blanck" class="search-text">Имя: ${item.name}</a>
                    <p class="search-text">Описание: ${item.description}</p>
                    <p class="search-text">Дата создания: ${item.created_at}</p>
                </div>`;

    });

    if(results.length == 0){
        out += `<p class="search-text">Error 404: Упс! По вашему запросу ничего не нашлось!</p>`;
    };

    res.innerHTML = out;
};

function clearInput(){
    document.getElementById('reqwest-place').addEventListener('focus',()=>{
        document.getElementById('reqwest-place').value = '';
        document.getElementById('results').innerHTML = ``;
    })
};

function inputValidation(inputValue){
    if(inputValue == 0){
        document.getElementById('results').innerHTML = `<p>Запрос не может быть пустым</p>`;
    }
    if(inputValue.length < 4){
        document.getElementById('results').innerHTML = `<p>Запрос не может быть короче 3 символов</p>`
    }
    if(inputValue.search(/[-!"#$%&'()*+,./:;<=>?@[\\\]_`{|}~]/) > -1){
        document.getElementById('results').innerHTML = `<p>Запрос не должен содержать данный знак</p>`
    }
    if(inputValue.toString()[0] == ' '){
        document.getElementById('results').innerHTML = `<p>Запрос не должен начинаться с пробела</p>`
    }
}