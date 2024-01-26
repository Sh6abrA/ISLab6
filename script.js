let studyBtn = document.getElementById('studyBtn');
let expertBtn = document.getElementById('expertBtn');
let colNumberInput = document.getElementById('colNumberInput');
let firstTable = document.getElementById('firstTable');
let secondTable = document.getElementById('secondTable');
let output = document.getElementById('output');
let detectedClass = document.getElementById('detected-class');
let randomClass = document.getElementById('randomClass');
let randomClassVector = document.getElementById('randomClassVector');
let count = 0;


randomClass.addEventListener('click', () => {
    let vector = [];
    for(let i = 0; i < 7; i++) {
        vector.push(Math.round(Math.random()));
    }
    randomClassVector.innerHTML = `(${vector})`;
    let matrix = tableToMatrix();
    let result = multiplyMatrices(matrix, vector);
    output.innerHTML = "(" + result + ")";
    getMaxIndex(result);
})
studyBtn.addEventListener('click', () => {
    let column = colNumberInput.value;
    processTables(column);
})
expertBtn.addEventListener('click', () => {
    let column = colNumberInput.value;
    let matrix = tableToMatrix();
    let columnArray = getColumnAsArray(column);
    let result = multiplyMatrices(matrix, columnArray);
    output.innerHTML = "(" + result + ")";
    getMaxIndex(result);
})

function getMaxIndex(array) {
    let max = array[0];
    let maxIndex = [];
    for(let i = 0; i < array.length; i++) {
        if(array[i] > max) {
            max = array[i];
        }
    }
    for(let i = 0; i < array.length; i++) {
        if(array[i] == max) {
            maxIndex.push(i);
        }
    }
    let ths = firstTable.getElementsByTagName('th');
    let result = "";
    for(let i = 0; i < maxIndex.length; i++) {
        result += ths[maxIndex[i]].innerHTML + " ";
    }
    detectedClass.innerHTML = "Подходящие классы: " + result;
}
function processTables(columnNumber) {
    columnNumber--;
    // Получаем таблицы
    let table1 = document.getElementsByTagName('table')[0];
    let table2 = document.getElementsByTagName('table')[1];

    // Получаем строки таблиц
    let rows1 = table1.getElementsByTagName('tr');
    let rows2 = table2.getElementsByTagName('tr');

    // Перебираем строки, начиная со второй (индекс 1), так как первая строка - заголовок
    for (let i = 1; i < rows1.length; i++) {
        // Получаем ячейки текущей строки
        let cells1 = rows1[i].getElementsByTagName('td');
        let cells2 = rows2[i].getElementsByTagName('td');

        // Проверяем, что указанный номер столбца существует
        if (columnNumber >= 0 && columnNumber < cells1.length) {
            for(let j = 0; j < cells1.length; j++) {
                // Преобразуем значения ячеек в числа и выполняем операции
                let value1 = parseInt(cells1[columnNumber].innerHTML);
                let value2 = parseInt(cells2[j].innerHTML);

                // Прибавляем значение из второй таблицы к значению из первой
                if(columnNumber == j)
                {
                    cells2[j].innerHTML = value1 + value2;
                }
                else{
                    cells2[j].innerHTML = value2 - value1;
                }

            }
            
        }
    }
    count++;
    console.log(count);
}

function tableToMatrix() {
    
    let matrix = [];
  
    for (let i = 1; i < secondTable.rows.length; i++) {
      let row = [];
      for (let j = 0; j < secondTable.rows[i].cells.length; j++) {
        row.push(parseInt(secondTable.rows[i].cells[j].innerHTML));
      }
      matrix.push(row);
    }
  
    return matrix;
}

function getColumnAsArray(columnNumber){
    columnNumber--;
    let column = [];
    for(let i = 1; i < firstTable.rows.length; i++) {
        column.push(parseInt(firstTable.rows[i].cells[columnNumber].innerHTML));
    }
    return column;
}

function multiplyMatrices(matrix1, matrix2) {
    let result = [];

    for(let i = 0; i < matrix1[0].length; i++) {
        let c = 0;
        for(let j = 0; j < matrix1.length; j++) {
            c += matrix1[j][i] * matrix2[j];
        }
        result.push(c);
    }

    return result;
}