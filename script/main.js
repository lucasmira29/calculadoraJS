const visorInput = document.querySelector('.visor');
const buttonsCalculator = document.querySelectorAll('.button__calculator');
const tableHistoric = document.querySelector('.table__historic');

//o número máximo de caracteres no visor
const maximumCharacters = 10;

// Iterar sobre cada botão e adicionar um ouvinte de evento de clique
buttonsCalculator.forEach((btn) => {
    
    btn.addEventListener('click', () => {
        const valorBtn = btn.textContent;
        
        // Verificar se o limite de caracteres foi atingido no visor
        if (visorInput.value.length > maximumCharacters){
            
            visorInput.value = 'Limite de Caracteres Atingido!';

            setTimeout(() => {
                visorInput.value = '';
            }, 2000)

            return
        }

        // Se o botão clicado for '=', realizar cálculo
        if (valorBtn === '=' && visorInput.value !== ''){
            const dateTime = moment().format('DD/MM/YYYY H:mm:ss');
            const mathAccount = visorInput.value;
            
            try {
                const result = math.evaluate(visorInput.value);
                visorInput.value = result;
                
                // Inserir cálculo e data no histórico
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

// Função para inserir um elemento na tabela de histórico
function insertElement (dateAndTime, mathAccount) {
    const tableRow = document.createElement("tr");
    
    const tableData = document.createElement("td");
    const tableData2 = document.createElement("td");

    
    tableData2.classList.add('td_button');
    tableData2.classList.add('button__historic');
    tableData2.classList.add('btn_math')
    tableData.classList.add('td_button');
    tableData.classList.add('button__historic');

   
    tableData.textContent = `${dateAndTime}`;
    tableData2.textContent = `${mathAccount}`;

    // Adicionar função ao clicar no elemento para inserir o valor no visor
    tableData2.onclick = () => {
        visorInput.value = mathAccount;
    }

   
    tableHistoric.append(tableRow);
    tableRow.append(tableData);
    tableRow.append(tableData2);

    return tableRow
}
