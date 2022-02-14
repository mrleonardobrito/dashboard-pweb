const casosConfirmadosCTX = document.getElementById('casosConfirmados').getContext('2d');
const obitosSemanaCTX = document.getElementById('obitosSemana').getContext('2d');
const obitosCTX = document.getElementById('obitos').getContext('2d');

function getCasosEmArapiraca(url){
    const request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

function main(){
    const casos = JSON.parse(getCasosEmArapiraca('http://localhost:5000/covidArapiraca'));
    criarGraficoDeCasosConfirmados(casos)
    criarGraficoDeObitos(casos)
    criarGraficoDeObitosNosUltimosSeteDias(casos)
}

function criarGraficoDeCasosConfirmados(casos){    
    const dataDosCasos = casos.map((caso) => caso['Data'])
    const casosConfirmados = casos.map((caso) => caso['Confirmações no dia'])

    new Chart(casosConfirmadosCTX, {
        type: 'bar',
        data: {
            labels: dataDosCasos,
            datasets: [{
                label: 'Confirmados no dia',
                data: casosConfirmados,
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            layout: {
                padding: { left: 20, right: 20, bottom: 10 }
            }
        }
    });
}

function criarGraficoDeObitos(casos){
    
    const dataDosCasos = casos.map((caso) => caso['Data'])
    const obitos = casos.map((caso) => caso['Óbitos no dia'])

    new Chart(obitosCTX, {
        type: 'bar',
        data: {
            labels: dataDosCasos,
            datasets: [{
                label: 'Òbitos no dia',
                data: obitos,
                backgroundColor: 'rgb(49,53,110)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            layout: {
                padding: { left: 20, right: 20, bottom: 10 }
            }
        }
    });
}

function criarGraficoDeObitosNosUltimosSeteDias(casos){
    
    const ultimaSemana = casos.slice(-8);
    const dataSemana = ultimaSemana.map((caso) => caso['Data']);
    const obitos = ultimaSemana.map((caso) => caso['Óbitos no dia']);
    
    new Chart(obitosSemanaCTX, {
        type: 'bar',
        data: {
            labels: dataSemana,
            datasets: [{
                label: 'Óbitos no dia',
                data: obitos,
                backgroundColor: 'rgb(47,95,152)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            layout: {
                padding: { left: 20, right: 20, bottom: 10 }
            }
        }
    });
}

main()