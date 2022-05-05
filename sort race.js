// ======================================== Begin Function setup ========================================
function setup() 
{
    input_list = selectionSortString = poreSortString = quickSortString = mergedSortString = "0684FB89C3D5754E";
    selectionSortHasFinished = poreSortHasFinished = mergedSortHasFinished = false;
    quickSortIndex = [0, input_list.length - 1];

    currentRow = 1;
    numberOfIterations = 0;
    numberOfPasses = 0;
    
    grid = { width: 80, height: input_list.length * (input_list.length + 1), cellSize: 10 }; 

    poreSortColumn = Math.round(input_list.length + (grid.width - input_list.length * 4) / 3);
    mergeSortColumn = Math.round(grid.width - 2 * input_list.length - (grid.width - input_list.length * 4) / 3);
    quickSortColumn = grid.width - input_list.length;

    createCanvas(grid.width * grid.cellSize, grid.height * grid.cellSize); // use the grid object to create a canvas

    fill(300);
    textSize(10);
    textAlign(LEFT, TOP); 
    text("Selection Sort",0,0);
    text("Gold's Poresort", poreSortColumn * grid.cellSize, 0);
    text("Mergesort", mergeSortColumn * grid.cellSize, 0);
    text("Quicksort", quickSortColumn * grid.cellSize, 0);

    // Display all function's first string here
    displaySelectionSortString();
    displayPoreSortString();
    displayQuickSortString();
    displayMergedSortString();

    // Speed of outputs
    frameRate(1); //slow mode
    //frameRate(30); //super speed
}
// ======================================== End of the setup function ========================================


// ======================================== Begin draw function ========================================
function draw() 
{
    ++currentRow;
    if (selectionSortHasFinished && poreSortHasFinished  && !quickSortIndex.length)
    {
        // if a sorting algorithm has not finished, then perform a pass and display the result
        if (++numberOfIterations < input_list.length)
        {
            input_list = selectionSortString = mergedSortString = poreSortString = quickSortString = rotateRightward(input_list);
            poreSortHasFinished = selectionSortHasFinished = mergedSortHasFinished = false;
            quickSortIndex = [0, input_list.length - 1];
            numberOfPasses = 0;
            ++currentRow;

            displaySelectionSortString();
            displayPoreSortString();
            displayQuickSortString();
            displayMergedSortString();
            return;
        }
    }
    if (!selectionSortHasFinished)
    {
        SelectionSort();
        displaySelectionSortString();
    }
    if(quickSortIndex.length)
    {
        QuickSort();
        displayQuickSortString();
    }
    if (!poreSortHasFinished)
    {
        GoldPoreSort();
        displayPoreSortString();
    }
    
    if (numberOfPasses <= 3)
    {
        MergeSort();
        displayMergedSortString();
    }
    
    ++numberOfPasses;
}
// ======================================== End of draw function ========================================


// ======================================== Begin function of all sorting algorithms ========================================
function SelectionSort()
{
    let index = numberOfIterations;
    let min = selectionSortString[index];
    let mindex = index;

    for (let i = index; i < input_list.length; i++)
    {
        if (selectionSortString[i] < min)
        {
            min = selectionSortString[i];
            mindex = i;
        }        
    }

    numberOfIterations++;

    if (numberOfIterations == selectionSortString.length)
    {
        numberOfIterations = 0;
        selectionSortHasFinished = true;
    }

    selectionSortString = swapCharacters(selectionSortString, index, mindex);
}

function MergeSort()
{
    let FirstLeftValue = firstRightValue = endLeftValue = endRightValue = 0;
    let newMergedString = "";

    for (let index = 0; index < input_list.length; index += 2 * 2 ** numberOfPasses)
    {

        FirstLeftValue = index;
        firstRightValue = index + 2 ** numberOfPasses;
        
        if (firstRightValue >= input_list.length)
        {
            while (FirstLeftValue < input_list.length)
                newMergedString += mergedSortString[FirstLeftValue++];
            break;
        }

        endLeftValue = firstRightValue - 1;
        if (firstRightValue + 2 ** numberOfPasses - 1 < input_list.length) 
            endRightValue = firstRightValue + 2 ** numberOfPasses - 1;
        else
            endRightValue = input_list.length - 1;
        
        while (FirstLeftValue <= endLeftValue && firstRightValue <= endRightValue)
        {
            if(mergedSortString[FirstLeftValue] <= mergedSortString[firstRightValue])
            {
                newMergedString += mergedSortString[FirstLeftValue++]; // after this statement is executed, the "++" operator updates the first sublist's current character (the "++" operator is used like this a few more times)

                if (FirstLeftValue > endLeftValue)
                {
                    while(firstRightValue <= endRightValue)
                        newMergedString += mergedSortString[firstRightValue++];
                }
            }
            // if the current character in the second sublist is smaller, then add that to the updated mergesort string
            else
            {
                newMergedString += mergedSortString[firstRightValue++];
                
                // if popping that character depleted the second sublist, then append what's left of the second sublist to the updated mergesort string
                if (firstRightValue > endRightValue)
                {
                    while(FirstLeftValue <= endLeftValue)
                        newMergedString += mergedSortString[FirstLeftValue++];
                }
            }
        }
    }

    // replace the old string with the updated mergesort string
    mergedSortString = newMergedString;

    //if(2 * 2 ** numberOfPasses >= input_list.length)
        //mergesortHasFinished = true;
    if(numberOfPasses <= 4)
    {
        mergesortHasFinished = true;
    }
}

function QuickSort()
{
    /*
        Iterate through each spot in the array
        Place a pivot and a Ending variable
        Compare and swap if necessary
        WHEN COMPLETED, Finish it off by changing the pivot side or the Ending side
    */

    for (let index = quickSortIndex.length / 2; index > 0; --index)
    {
        const pivot = i = quickSortIndex.shift(); // pivot is also the pivot in this case
        const End = j = quickSortIndex.shift();
        
        // Start the iteration
        while (i <= End) 
        {
            ++i;
            
            if (i > j)
            {
                quickSortString = swapCharacters(quickSortString, pivot, j);
                break; 
            }

            if (quickSortString[i] > quickSortString[pivot])
            {
                while (true) 
                {
                    if(j < i)
                    {
                        quickSortString = swapCharacters(quickSortString, pivot, j);
                        i = End + 1; 
                        break;
                    }
                    if (quickSortString[j] < quickSortString[pivot])
                    {
                        quickSortString = swapCharacters(quickSortString, i, j);
                        break;
                    }
                    --j; 
                }
            }
        }

        // After the iteration is finished, go here
        if (pivot < j - 1)
        {
            quickSortIndex.push(pivot);
            quickSortIndex.push(j - 1);
        }
        if (j + 1 < End)
        {
            quickSortIndex.push(j + 1);
            quickSortIndex.push(End);
        }
    }
}

function GoldPoreSort()
{
    /*
        1) Swapping even pairs
        2) Swapping odd pairs
        3) Check each pair of elements starting with the first 2 elem
            4.1) EVEN PAIR ONLY
        4) Check each pairs of element with 2nd and 3rd in string
            5.1) ODD PAIR ONLY
        5) When we swap, have the holder set to false so we can continue the sorting
        6) When finish, the holder will get set back to true to let us know that it's completed
    */
   // Going through all even pairs in the string
   poreSortHasFinished = true;

   for (let i = 0; i + 1 < input_list.length; i += 2)
   {
       // Start swapping if needed
       if (poreSortString[i] > poreSortString[i + 1])
       {
            poreSortString = swapCharacters(poreSortString, i, i + 1);
            poreSortHasFinished = false;
       }
   }

   // Going through all odd pairs in the string
   for (let i = 1; i + 1 < input_list.length; i += 2)
   {
       // Start swapping if needed
       if (poreSortString[i] > poreSortString[i + 1])
       {
            poreSortString = swapCharacters(poreSortString, i, i + 1);
            poreSortHasFinished = false;

       }
   }
}
// ======================================== End of functions of all algorithms ========================================


// ======================================== Function to display progress of all the sorting functions ========================================
// Function to display progress of sorting algorithms
function displaySelectionSortString()
{
    for (let i = 0; i < input_list.length; ++i)
        text(selectionSortString[i], i * grid.cellSize, currentRow * grid.cellSize);
}

function displayPoreSortString()
{
    for (let i = 0; i < input_list.length; ++i)
        text(poreSortString[i], (poreSortColumn + i) * grid.cellSize, currentRow * grid.cellSize);
}

function displayQuickSortString()
{
    for (let i = 0; i < input_list.length; ++i)
    {
        text(quickSortString[i], (quickSortColumn + i) * grid.cellSize, currentRow * grid.cellSize);
    }
}

function displayMergedSortString()
{
    for (let i = 0; i < input_list.length; ++i)
        text(mergedSortString[i], (mergeSortColumn + i) * grid.cellSize, currentRow * grid.cellSize);
}
// ======================================= End of Function to display progress ==============================================================


// ============================================= Begin Function of necessary funcstion ========================================================
function swapCharacters(input_string, value, otherValue)
{
    if (value == otherValue) 
    { 
        return input_string;
    }

    return input_string.substring(0, value) + 
        input_string[otherValue] + input_string.substring(value + 1, otherValue) + 
        input_string[value] + input_string.substring(otherValue + 1);
}

function rotateRightward(input_string)
{
    return input_string[input_string.length - 1] + input_string.substring(0, input_string.length - 1);
}
// ============================================= End of Function of necessities =============================================================
