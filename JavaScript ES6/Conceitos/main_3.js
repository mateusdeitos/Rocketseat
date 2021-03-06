const arr = [1, 3, 4, 5, 4, 9];

// map: percorre  o array e retorna o dobro do valor de cada item
const newArr = arr.map(function (item) {
    return item * 2;
})

console.log(newArr);

// map: percorre  o array e retorna o valor do item somado com o seu índice no array
const newArr2 = arr.map(function (item, index) {
    return item + index;
})

console.log(newArr2);

// reduce: Soma os itens do array
const sum = arr.reduce(function (total, next) {
    return total + next;
})

console.log(sum);

// filter: filtra os itens do array
const filter = arr.filter(function (item) {
    return item % 2 === 0; // retorna apenas os itens que são pares
})

console.log(filter);

// find: Busca algum item com o valor = 4
const find = arr.find(function(item){
    return item === 4;
});

console.log(find);
