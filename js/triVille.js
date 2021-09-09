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
 * @param {*} list
 */
function swap(list, i, j) {
    nbPermutation++;
    let current_s = list[i];
    list[i] = list[j];
    list[j] = current_s;
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
           listVille = shellsort(listVille);
            break;
        case 'merge':
          listVille = mergeSort(listVille);
            break;
        case 'heap':
            listVille = heapsort(listVille);
            break;
        case 'quick':
           listVille = quicksort(listVille, 0, listVille.length - 1);
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
       }
   return list_villes;

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

            swap(list_villes2, i, smallest)

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
            if (isLess(list_villes3[i + 1],current2)) {
                swap(list_villes3, i, i+1)
                swapped = true;
            }
        }
    }
    return list_villes3;


}
console.log("bubblesort - done !");


function shellsort(list_villes4) {
    // nbPermutation = 0;

    let all_list = list_villes4.length;
    let gap = 0;
    while (gap < all_list) {
        gap = (3 * gap + 1);
    }
    while (gap !== 0) {
        gap = Math.floor(gap / 3);
        for (let i = gap; i < all_list; i++) {
            let current = list_villes4[i];
            let j = i;  // nbPermutation++;
            while ((j > gap - 1) && isLess(current, list_villes4[j - gap]))
            {
                swap(list_villes4, j, j-gap)  //tableau[j] = tableau[j - n]
                j = j - gap;
            }
            list_villes4[j]=current;
        }
    }
    return list_villes4;
}


console.log("shellsort - done!");

function mergeSort(list_villes5) { //Tri par fusion

        let all_list5 = list_villes5.length;
        let half = Math.floor(all_list5 / 2);
        const left = list_villes5.slice(0, half)
        const right = list_villes5.slice(half, all_list5)

        if (all_list5 <= 1) {
            return list_villes5;
        } else {
            let merged_left = mergeSort(left);
            let merged_right = mergeSort(right);

            return merge(merged_left, merged_right);
        }
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
        if (isLess(left[0], right[0])) {
            array1.push(left.shift())
            return array1.concat(merge(left, right))
        } else {
            array1.push(right.shift())
            return array1.concat(merge(left, right))
        }
    }

console.log("mergesort - done!");


function heapsort (list_villes6) {
    maxheap(list_villes6)
    for (let i = 0; i < list_villes6.length - 1; i++) {
        swap(list_villes6, 0, i)
        sink(list_villes6, i, 0)
    }
}


    function maxheap(list_villes6) {
        for(let i = 0; i <list_villes6.length -1; i++) {
            heapify(list_villes6, i)
    }

}


    function heapify(list_villes6, index) {
    if (list_villes6[index] > list_villes6[index/2]) {
        swap(list_villes6, index, index /2)
        heapify(list_villes6, index /2)
    }
   }

   function sink(list_villes6, element, index) {
     let  leftChild = (2 * index + 1);
       let max = leftChild;

     if (leftChild < element) {
         if (list_villes6[leftChild] > list_villes6[2*index]) {
             let max = leftChild;
         }
         else {
             let max = (2*index);
         }
     if(list_villes6[max]> list_villes6[index]) {
         swap(list_villes6, max, index)
         sink(list_villes6, element, max)
         }
       }
     return list_villes6;

   }

// function heapsort(list_villes6) {
//
//     const buildMaxHeap = (list_villes6) => {
//         // Get index of the middle element
//         // let i = Math.floor(list_villes6.length / 2 - 1);
//      //   let i = list_villes6.length - 1
//
//
//
//         // Build a max heap out of
//         // All array elements passed in
//         while (i >= 0) {
//             heapify(list_villes6, i, list_villes6.length);
//             i -= 1;
//         }
//     }
//
//     const heapify = (heap, i, max) => {
//
//         let index;
//         let leftChild;
//         let rightChild;
//
//         while (i < max) {
//             index = i;
//
//             // Get the left child index
//             // Using the known formula
//             leftChild = 2 * i + 1;
//
//             // Get the right child index
//             // Using the known formula
//             rightChild = leftChild + 1;
//
//             // If the left child is not last element
//             // And its value is bigger
//             if (leftChild < max && heap[leftChild] > heap[index]) {
//                 index = leftChild;
//             }
//
//             // If the right child is not last element
//             // And its value is bigger
//             if (rightChild < max && heap[rightChild] > heap[index]) {
//                 index = rightChild;
//             }
//
//             // If none of the above conditions is true
//             // Just return
//             if (index === i) {
//                 return;
//             }
//
//             // Else swap elements
//             swap(heap, i, index);
//
//             // Continue by using the swapped index
//             i = index;
//         }
//     }
//
//     const swap = (list_ville6, firstItemIndex, lastItemIndex) => {
//         const temp = list_ville6[firstItemIndex];
//
//         // Swap first and last items in the array
//         list_ville6[firstItemIndex] = list_ville6[lastItemIndex];
//         list_ville6[lastItemIndex] = temp;
//     }
//
//
//
//
//
//     // Build max heap
//     buildMaxHeap(list_villes6);
//
//     // Get the index of the last element
//     let lastElement = list_villes6.length - 1;
//
//     // Continue heap sorting until we have
//     // One element left
//     while (lastElement > 0) {
//         swap(list_villes6, 0, lastElement);
//         heapify(list_villes6, 0, lastElement);
//         lastElement -= 1;
//     }
//
//     // Return sorted array
//     return list_villes6;
// }





console.log("heapsort - implement me !");



function quicksort(list_villes7, first_qs, last) {


    if (first_qs < last) {

        let pi = partitionner(list_villes7, first_qs, last)
        quicksort(list_villes7, first_qs, pi - 1)
        quicksort(list_villes7, pi + 1, last)
    }
    return list_villes7;
}

function partitionner(list_villes7, first_qs, last) {
        let pivot = list_villes7[last];
        let j = first_qs;

        for (let i = first_qs; i < last; i++) {
            if (isLess(list_villes7[i], pivot)) {
                swap(list_villes7, i, j)
                j = j + 1;
            }
        }
        swap(list_villes7, j, last)
        return j;
    }

console.log("quicksort - done!");



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



//----------------------------








