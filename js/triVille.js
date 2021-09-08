let csvFile;
let listVille = [];
let nbPermutation = 0;
let nbComparaison = 0;

document.querySelector("#read-button").addEventListener('click', function () {
    csvFile = document.querySelector("#file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        // récupération de la liste des villes
        listVille = getArrayCsv(e.target.result);

        // Calcul de la distance des villes par rapport à Grenoble
        listVille.forEach(ville => {
            ville.distanceFromGrenoble = distanceFromGrenoble(ville);
        });
        // Tri
        const algo = $("#algo-select").val();
        nbPermutation = 0;
        nbComparaison = 0;
        sort(algo);

        // Affichage 
        displayListVille()
    });
    reader.readAsText(csvFile)
})

/**
 * Récupére la liste des villes contenu dans le fichier csv
 * @param csv fichier csv brut
 * @returns la liste des villes mis en forme
 */
function getArrayCsv(csv) {
    let listLine = csv.split("\n")
    listVille = [];
    let isFirstLine = true;
    listLine.forEach(line => {
        if (isFirstLine || line === '') {
            isFirstLine = false;
        } else {
            let listColumn = line.split(";");
            listVille.push(
                new Ville(
                    listColumn[8],
                    listColumn[9],
                    listColumn[11],
                    listColumn[12],
                    listColumn[13],
                    0
                )
            );
        }
    });
    return listVille;
}

/**
 * Calcul de la distance entre Grenoble et une ville donnée
 * @param ville ville
 * @returns la distance qui sépare la ville de Grenoble
 */
function distanceFromGrenoble(ville) {

    let lat1 = ville.latitude;
    let lon1 = ville.longitude;

    let lat2 = 45.166667;
    let lon2 = 5.716667;
    //
    // let y = lat2 - lat1;
    // let x = lon2 - lon1;
    //
    // return (x * x + y * y)


    const R = 6371e3; // metres
    const la = lat1 * Math.PI/180; // φ, λ in radians
    const la2 = lat2 * Math.PI/180;
    const cont_lat = (lat2-lat1) * Math.PI/180;
    const cont_long = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(cont_lat/2) * Math.sin(cont_lat/2) +
        Math.cos(la) * Math.cos(la2) *
        Math.sin(cont_long/2) * Math.sin(cont_long/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres

    console.log('implement me !');
    return d;
}

/**
 * Retourne vrai si la ville i est plus proche de Grenoble
 * par rapport à j
 * @param {*} i distance de la ville i
 * @param {*} j distance de la ville j
 * @return vrai si la ville i est plus proche
 */
function isLess(i, j) {
if (i.distanceFromGrenoble < j.distanceFromGrenoble)
    return true;


}
console.log('implement me !');
/**
 * interverti la ville i avec la ville j dans la liste des villes
 * @param {*} i
 * @param {*} j
 * * * @param {*} list
 */
function swap(list, i, j) {
    nbPermutation++;
    let x = list[i];
    list[i] = list[j];
    list[j] = x;
}

function sort(type) {
    switch (type) {
        case 'insert':
          // listVille = insertsort(listVille);
            insertsort(listVille);
            break;
        case 'select':
            selectionsort(listVille);
            break;
        case 'bubble':
            bubblesort(listVille);
            break;
        case 'shell':
            shellsort(listVille);
            break;
        case 'merge':
          listVille = mergeSort(listVille);
            break;
        case 'heap':
            heapsort();
            break;
        case 'quick':
            quicksort();
            break;
    }
}

function insertsort(list_villes) {
    nbPermutation=0;
    // list_villes = [...list_villes];

        let all_list = list_villes.length;
        for (let i = 0; i < all_list; i++) {
            let current = list_villes[i];
            let j = i;

            while (j > 0 && isLess(current, list_villes[j-1])) {
                 swap(list_villes,j,j-1);
               j--;
            }
            list_villes[j] = current;
        }
   return list_villes;

    // let all_list = list_villes.length;
    // for (let i = 1; i < all_list; i++) {
    //     let current = list_villes[i].distanceFromGrenoble;
    //     let j = i - 1;
    //
    //     while (j >= 0 && list_villes[j].distanceFromGrenoble > current) {
    //
    //         list_villes[j + 1].distanceFromGrenoble = list_villes[j].distanceFromGrenoble;
    //         j = j - 1;
    //     }
    //     list_villes[j + 1].distanceFromGrenoble = current;
    // }
    //
    // return list_villes;
 }
console.log("insertsort - done !");


function selectionsort(list_villes2) {

    let all_list2 = list_villes2.length;

    for (let i = 0; i < all_list2; i++) {
        let smallest = i;
        for (let j = i + 1; j < all_list2; j++) {
              if (isLess(list_villes2[j], list_villes2[smallest])) {
                smallest = j;
            }
        }
        if (smallest !== i) {
            let current = list_villes2[i];
            swap(list_villes2, i, smallest)
            list_villes2[smallest] = current;
        }
    }
    return list_villes2;
}
console.log("selectionsort - done!");



function bubblesort(list_villes3) {
    let swapped = true;

    while (swapped) {
        swapped = false;
        for (let i = 0; i < list_villes3.length - 1; i++) {
            let current2 = list_villes3[i];
            if (isLess(list_villes3[i + 1],list_villes3[i])) {
                swap(list_villes3, i, i+1)
                list_villes3[i + 1] = current2;
                swapped = true;
            }
        }
    }
    return list_villes3;


}
console.log("bubblesort - done !");


function shellsort(list_villes4) {

    let all_list4 = list_villes4.length;

    for (let gap = Math.floor(all_list4 /2); gap > 0; gap = Math.floor(gap /2)) //math.floor pra arredondar as dividsoes
    {

        for (let i = gap; i < all_list4; i += 1) //o =, de alguma forma, impede a pagina tenha problemas pra recarregar
        {
           let current3 = list_villes4[i];
           let j;

            for (j = i; j >= gap && isLess(current3, list_villes4[j-gap]); j -= gap) { //aqui o = faz o mesmo
                swap(list_villes4, j, j-gap)
            }
            list_villes4[j] = current3;
        }
    }

    return list_villes4;
}
console.log("shellsort - done!");





function mergeSort(list_villes5) {
        // list_villes5 = [...list_villes5.slice(0, 4)]
        let all_list5 = list_villes5.length;
        let half = Math.floor(all_list5 / 2);
        const left = list_villes5.slice(0, half)
        const right = list_villes5.slice(half, all_list5)



        if (all_list5 <= 1) { //não entendo isso aqui (rever o pseudo) 1 ou 2?
            return list_villes5;
        } else {
            let merged_left = mergeSort(left);
            let merged_right = mergeSort(right);

            return merge(merged_left, merged_right);
        }
        // const left = list_villes5.splice(0, half)
        // const right = list_villes5.splice(half+1, list_villes5.length)
        //
        // let res = merge(merged_left, merged_right);
        // return res;
    }


    function merge(left, right) {
        let array1 = []

        if (left.length === 0) {
            return right;
        }

        if (right.length === 0) {
            return left;
        }

        nbPermutation++;
        //   while (left.length && right.length) {
        if (isLess(left[0], right[0])) {
            array1.push(left.shift())
            return array1.concat(merge(left, right))
        } else {
            array1.push(right.shift())
            return array1.concat(merge(left, right))
        }
        //  }
        //  return [ ...array1, ...left, ...right ]
    }

console.log("mergesort - done!");




function heapsort() {
    console.log("heapsort - implement me !");
}

function quicksort() {
    console.log("quicksort - implement me !");
}

/** MODEL */

class Ville {
    constructor(nom_commune, codes_postaux, latitude, longitude, dist, distanceFromGrenoble) {
        this.nom_commune = nom_commune;
        this.codes_postaux = codes_postaux;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dist = dist;
        this.distanceFromGrenoble = distanceFromGrenoble;
    }
}

/** AFFICHAGE */
function displayPermutation(nbPermutation) {
    document.getElementById('permutation').innerHTML = nbPermutation + ' permutations';
}

function displayListVille() {
    document.getElementById("navp").innerHTML = "";
    displayPermutation(nbPermutation);
    let mainList = document.getElementById("navp");
    for (var i = 0; i < listVille.length; i++) {
        let item = listVille[i];
        let elem = document.createElement("li");
        elem.innerHTML = item.nom_commune + " - \t" + Math.round(item.distanceFromGrenoble * 100) / 100 + ' m';
        mainList.appendChild(elem);
    }
}


