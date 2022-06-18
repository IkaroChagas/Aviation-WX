    document.querySelector('.search-info').addEventListener('submit', async (event)=>{ // Enviei uma promise 'async' 
    event.preventDefault(); // Aqui irá ocorrer o evento de previnir a ação padrão do formulário 'submit', que seria enviar as informações
    
    let input = document.querySelector('#searchInput').value; // Neste campo teremos detalhes da informação que o usuário digitou em input
  
    if(input !== '') {
        clearInfo();  // Função usada para limpar a informação antes de aparecer o aviso
        showWarning('Carregando...');

    let url = `https://api.checkwx.com/metar/${(input)}/decoded`
    let urlTAF = `https://api.checkwx.com/taf/${(input)}/decoded`
    let results = '';
    let resultsTaf = '';

    results = await fetch(url,{headers:{"X-API-Key": "f774f00a63134a5c9e4ea3681b"}}); // Neste campo, o 'submit' vai pegar o resultados digitados dentro do campo de pesquisa, recebidos após a promise, retornará com os resultados da API no "await".
    let json = await results.json();
    
    resultsTaf = await fetch(urlTAF,{headers:{"X-API-Key": "f774f00a63134a5c9e4ea3681b"}});
    let jsonTaf = await resultsTaf.json();

    if(json.data, jsonTaf.data) {
      showInfo({  
        metar: json.data[0].raw_text
      });
      showinfoTaf ({
        taf: jsonTaf.data[0].raw_text
      })

    } else {
      clearInfo() // Função usada para limpar a informação antes de aparecer o aviso
      showWarning('Não encontramos esta localização');
    }
  }

});

  function showInfo(results) {
  showWarning('');

  let metarResult = results;
  
  document.querySelector('.result').style.display = 'block'; // FICA PARA FINALIZAR A EXIBIÇÃO EM TELA
  document.getElementById('metarInfo').innerHTML = metarResult.metar;
  
}

function showinfoTaf (resultsTaf) {

  let tafResult = resultsTaf;
  document.querySelector('.result-taf').style.display = 'block';
  document.getElementById('tafInfo').innerHTML = tafResult.taf;

}

function clearInfo() {
  showWarning('');
  document.querySelector('.result').style.display = 'none';
}
        
function showWarning(msg) {
    document.querySelector('.default-warning').innerHTML = msg;
}
