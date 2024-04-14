
const visorInput = document.querySelector('.visor');
const buttonsCalculator = document.querySelectorAll('.button__calculator');
const tableHistoric = document.querySelector('.table__historic');

const maximumCharacters = 10;

buttonsCalculator.forEach((btn) => {
    
    btn.addEventListener('click', () => {
        const valorBtn = btn.textContent;
        
        if (visorInput.value.length > maximumCharacters){
            
            visorInput.value = 'Limite de Caracteres Atingido!';

            setTimeout(() => {
                visorInput.value = '';
            }, 2000)

            return
        }

        if (valorBtn === '=' && visorInput.value !== ''){
            const dateTime = moment().format('DD/MM/YYYY H:mm:ss');
            const mathAccount = visorInput.value;
            
            try {
                const result = math.evaluate(visorInput.value);
                visorInput.value = result;
                
                insertElement(dateTime, mathAccount);

                if (result === Infinity){
                    throw 'Erro: divisão por zero';
                }

            } catch (error) {
                visorInput.value = error
                
                setTimeout(()=> {
                    visorInput.value = '';
                }, 2000);
            }
        
        } else if (valorBtn === 'C') {
            visorInput.value = '';
        } else if (valorBtn === 'X') {
            visorInput.value += '*';
        }
        
        else {
            visorInput.value += valorBtn;   
        }
       
    })
})


function insertElement (dateAndTime, contaMatematica) {
    const tableRow = document.createElement("tr");
    
    const tableData = document.createElement("td");
    const tableData2 = document.createElement("td");


    tableData2.classList.add('td_button');
    tableData2.classList.add('button__historic');
    tableData2.classList.add('btn_math')
    tableData.classList.add('td_button');
    tableData.classList.add('button__historic');
    tableData.textContent = `${dateAndTime}`;
    tableData2.textContent = `${contaMatematica}`;

    tableData2.onclick = () => {
        visorInput.value = contaMatematica;
    }


    tableHistoric.append(tableRow);
    tableRow.append(tableData);
    tableRow.append(tableData2);

    return tableRow
}
