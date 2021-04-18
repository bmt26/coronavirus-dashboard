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
            if (mostleast) { QuickSortNumMost(statlist, newpos, 0, statlist.length-1); }
            else { SortNumLeast(statlist, newpos); }
            break;
        case "Countries":
            if (mostleast) { QuickSortStringAZ(statlist, newpos, 0, statlist.length-1); }
            else { SortStringZA(statlist, newpos); }
            break;
    }
    console.log(newpos);
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
function PartitionNumMost(statlist, newpos, left, right) {
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
function QuickSortNumMost(statlist, newpos, left, right) {
    var index;
    
    if (statlist.length>1) {
        index =  PartitionNumMost(statlist, newpos, left, right); 
        
        if (index-1 > left) {
            QuickSortNumMost(statlist, newpos, left, index-1);
        }
        
        if (right > index) {
            QuickSortNumMost(statlist, newpos, index, right);
        }
    }
}

//Sorts numerical Covid-19 statistics from least to greatest.
// -> dont need to entirely sort it, just reverse the order
function SortNumLeast(statlist, newpos) {
    var i;
    for (i = 0; i < Math.floor(statlist.length/2); i++) {
        Swap(statlist, newpos, i, statlist.length-1-i);
    }
}

//Partitions stats based on alphabetical order
function PartitionStringAZ(statlist, newpos, left, right) {
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

//Sorts string Covid-19 statistics in alphabetical order.
function QuickSortStringAZ(statlist, newpos, left, right) {
    var index;
    
    if (statlist.length>1) {
        index =  PartitionStringAZ(statlist, newpos, left, right); 
        
        if (index-1 > left) {
            QuickSortStringAZ(statlist, newpos, left, index-1);
        }
        
        if (right > index) {
            QuickSortStringAZ(statlist, newpos, index, right);
        }
    }
}

//Sorts string Covid-19 statistics in reverse alphabetical order
// -> dont need to entirely sort it, just reverse the order
function SortStringZA(statlist, newpos) {
    var i;
    for (i = 0; i < Math.floor(statlist.length/2); i++) {
        Swap(statlist, newpos, i, statlist.length-1-i);
    }
}


export default SortInit;