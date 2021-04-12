/*test functions for sorting of Covid-19 Statistics*/

//Sorts numerical Covid-19 statistics from greatest to least.
function QuickSortNumMost(statnum) {
    
    switch(statnum) {
        case 0:
            
            break;
    }
}

//Sorts numerical Covid-19 statistics from least to greatest.
// -> dont need to entirely sort it, just reverse the order, might be better to handle this by drawing the graph backwards, maybe not, keep length of file in mind
function QuickSortNumLeast(statnum) {
    var statlist=[]
    switch(statnum) {
        case 0:
            statlist=[0]
            break;
    }
    
    const listlength = 0;
    var i;
    for (i = 0; i < listlength/2; i++) {
        const temp = statlist[i];
        statlist[i] = statlist[listlength-1-i]
        statlist[listlength-1-i] = temp;
    }
}

//Sorts string Covid-19 statistics in alphabetical order.
function QuickSortStringAZ(statnum) {
    switch(statnum) {
        case 0:
            
            break;
    }
}

//Sorts string Covid-19 statistics in reverse alphabetical order
// -> dont need to entirely sort it, just reverse the order, might be better to handle this by drawing the graph backwards, maybe not, keep length of file in mind
function QuickSortStringZA(statnum) {
    var statlist=[]
    switch(statnum) {
        case 0:
            statlist=[0]
            break;
    }
    
    const listlength = 0;
    var i;
    for (i = 0; i < listlength/2; i++) {
        const temp = statlist[i];
        statlist[i] = statlist[listlength-1-i]
        statlist[listlength-1-i] = temp;
    }
}