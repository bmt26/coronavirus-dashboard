/*test functions for sorting of Covid-19 Statistics*/

//Sets value of statlist array to that of the specified Covid-19 stat and call the corresponding sort function
function SortInit(statnum, mostleast) {
    var statlist=[5, 4, 3, 2, 1];
    switch(statnum) {
        case 0:
        case 1:
            if (mostleast) { statlist = QuickSortNumMost(statlist, 0, statlist.length-1); }
            else { statlist = SortNumLeast(statlist); }
            break;
        case 2:
        case 3:
            if (mostleast) { statlist = QuickSortStringAZ(statlist, 0, statlist.length-1); }
            else { statlist = SortStringZA(statlist); }
            break;
    }
    return statlist;
}

//Swaps the value of two statlist items
function Swap(statlist, index1, index2) {
    const temp = statlist[index1];
    statlist[index1] = statlist[index2]
    statlist[index2] = temp;
}

//Partitions stats based on which is greater
function PartitionNumMost(statlist, left, right) {
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
            Swap(statlist, x, y);
            x++;
            y--;
        }
    }
    return x;
}

//Sorts numerical Covid-19 statistics from greatest to least.
function QuickSortNumMost(statlist, left, right) {
    var index;
    
    if (statlist.length>1) {
        index =  PartitionNumMost(statlist, left, right); 
        
        if (index-1 > left) {
            QuickSortNumMost(statlist, left, index-1);
        }
        
        if (right > index) {
            QuickSortNumMost(statlist, index, right);
        }
    }
    return statlist;
}

//Sorts numerical Covid-19 statistics from least to greatest.
// -> dont need to entirely sort it, just reverse the order
function SortNumLeast(statlist) {
    var i;
    for (i = 0; i < Math.floor(statlist.length/2); i++) {
        Swap(statlist, i, statlist.length-1-i);
    }
    return statlist;
}

//Partitions stats based on alphabetical order
function PartitionStringAZ(statlist, left, right) {
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
            Swap(statlist, x, y);
            x++;
            y--;
        }
    }
    return x;
}

//Sorts string Covid-19 statistics in alphabetical order.
function QuickSortStringAZ(statlist, left, right) {
    var index;
    
    if (statlist.length>1) {
        index =  PartitionStringAZ(statlist, left, right); 
        
        if (index-1 > left) {
            QuickSortStringAZ(statlist, left, index-1);
        }
        
        if (right > index) {
            QuickSortStringAZ(statlist, index, right);
        }
    }
    return statlist;
}

//Sorts string Covid-19 statistics in reverse alphabetical order
// -> dont need to entirely sort it, just reverse the order
function SortStringZA(statlist) {
    var i;
    for (i = 0; i < Math.floor(statlist.length/2); i++) {
        Swap(statlist, i, statlist.length-1-i);
    }
    return statlist;
}


console.log(SortInit(2, false));