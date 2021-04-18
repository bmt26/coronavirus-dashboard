/*test functions for sorting of Covid-19 Statistics*/

//Sets value of statlist array to that of the specified Covid-19 stat and call the corresponding sort function
export function SortInit() {
    var sortstat=arguments[0];
    var mostleast=arguments[1];
    var statlist=arguments[2];
    var newpos=[];
    var i;
    for (i = 0; i<statlist.length; i++) {
        newpos[i]=i;
    }
    switch(sortstat) {
        case "New Confirmed":
        case "Total Confirmed":
        case "New Deaths":
        case "Total Deaths":
        case "New Recovered":
        case "Total Recovered":
            if (mostleast) { QuickSortMost(statlist, newpos, 0, statlist.length-1); }
            else { QuickSortLeast(statlist, newpos, 0, statlist.length-1); }
            break;
        case "Countries":
            if (mostleast) { QuickSortLeast(statlist, newpos, 0, statlist.length-1); }
            else { QuickSortMost(statlist, newpos, 0, statlist.length-1); }
            break;
    }
    return newpos;
}

//Swaps the value of two statlist items
function Swap(statlist, newpos, index1, index2) {
    var temp = statlist[index1];
    statlist[index1] = statlist[index2];
    statlist[index2] = temp;
    temp = newpos[index1];
    newpos[index1] = newpos[index2];
    newpos[index2] = temp;
}

//Partitions stats based on which is greater
function PartitionMost(statlist, newpos, left, right) {
    var pivot = statlist[Math.floor((left+right)/2)];
    var x = left;
    var y = right;
    while (y >= x) {
        while (pivot < statlist[x]) {
            x++;
        }
        
        while (pivot > statlist[y]) {
            y--;
        }
        if (y >= x)  {
            Swap(statlist, newpos, x, y);
            x++;
            y--;
        }
    }
    return x;
}

//Sorts numerical Covid-19 statistics from greatest to least.
function QuickSortMost(statlist, newpos, left, right) {
    var index;
    
    if (statlist.length>1) {
        index =  PartitionMost(statlist, newpos, left, right); 
        
        if (index-1 > left) {
            QuickSortMost(statlist, newpos, left, index-1);
        }
        
        if (right > index) {
            QuickSortMost(statlist, newpos, index, right);
        }
    }
}

//Partitions stats based on which is lesser
function PartitionLeast(statlist, newpos, left, right) {
    var pivot = statlist[Math.floor((left+right)/2)];
    var x = left;
    var y = right;
    while (y >= x) {
        while (pivot > statlist[x]) {
            x++;
        }
        
        while (pivot < statlist[y]) {
            y--;
        }
        if (y >= x)  {
            Swap(statlist, newpos, x, y);
            x++;
            y--;
        }
    }
    return x;
}

//Sorts string Covid-19 statistics in from least to greatest
function QuickSortLeast(statlist, newpos, left, right) {
    var index;
    
    if (statlist.length>1) {
        index =  PartitionLeast(statlist, newpos, left, right); 
        
        if (index-1 > left) {
            QuickSortLeast(statlist, newpos, left, index-1);
        }
        
        if (right > index) {
            QuickSortLeast(statlist, newpos, index, right);
        }
    }
}


export default SortInit;