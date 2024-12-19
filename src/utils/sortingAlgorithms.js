export const getBubbleSortSteps = (array) => {
  const steps = [];
  const arr = [...array];
  let swapped;

  steps.push({
    array: [...arr],
    comparing: [],
    currentLine: 0
  });

  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      steps.push({
        array: [...arr],
        comparing: [i, i + 1],
        currentLine: 3
      });

      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;

        steps.push({
          array: [...arr],
          comparing: [i, i + 1],
          currentLine: 5,
          swapped: true
        });
      }
    }
  } while (swapped);

  steps.push({
    array: [...arr],
    comparing: [],
    currentLine: -1
  });

  return steps;
};

export const getQuickSortSteps = (array) => {
  const steps = [];
  const arr = [...array];

  steps.push({
    array: [...arr],
    comparing: [],
    currentLine: 0,
    explanation: 'Starting Quick Sort algorithm'
  });

  const partition = (low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...arr],
      comparing: [high],
      currentLine: 2,
      explanation: `Selected pivot element: ${pivot} at position ${high}`
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, high],
        currentLine: 4,
        explanation: `Comparing element ${arr[j]} with pivot ${pivot}`
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          array: [...arr],
          comparing: [i, j],
          currentLine: 7,
          explanation: `Swapped ${arr[i]} and ${arr[j]} since ${arr[j]} < ${pivot}`
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      array: [...arr],
      comparing: [i + 1, high],
      currentLine: 10,
      explanation: `Placed pivot ${pivot} in its correct position`
    });

    return i + 1;
  };

  const quickSort = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  };

  quickSort(0, arr.length - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    currentLine: -1,
    explanation: 'Quick Sort completed!'
  });

  return steps;
};

export const getMergeSortSteps = (array) => {
  const steps = [];
  const arr = [...array];

  steps.push({
    array: [...arr],
    comparing: [],
    currentLine: 0,
    explanation: 'Starting Merge Sort algorithm'
  });

  const merge = (left, mid, right) => {
    const temp = [];
    let i = left;
    let j = mid + 1;
    
    while (i <= mid && j <= right) {
      steps.push({
        array: [...arr],
        comparing: [i, j],
        currentLine: 4,
        explanation: `Comparing elements: ${arr[i]} and ${arr[j]}`
      });

      if (arr[i] <= arr[j]) {
        temp.push(arr[i]);
        steps.push({
          array: [...arr],
          comparing: [i],
          currentLine: 6,
          explanation: `Selected ${arr[i]} as it's smaller or equal`
        });
        i++;
      } else {
        temp.push(arr[j]);
        steps.push({
          array: [...arr],
          comparing: [j],
          currentLine: 8,
          explanation: `Selected ${arr[j]} as it's smaller`
        });
        j++;
      }
    }

    while (i <= mid) {
      temp.push(arr[i++]);
    }

    while (j <= right) {
      temp.push(arr[j++]);
    }

    for (let k = 0; k < temp.length; k++) {
      arr[left + k] = temp[k];
      steps.push({
        array: [...arr],
        comparing: [left + k],
        currentLine: 7,
        explanation: `Placing ${temp[k]} in its sorted position`
      });
    }
  };

  const mergeSort = (left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      steps.push({
        array: [...arr],
        comparing: [left, right],
        currentLine: 2,
        explanation: `Dividing array from index ${left} to ${right}`
      });
      mergeSort(left, mid);
      mergeSort(mid + 1, right);
      merge(left, mid, right);
    }
  };

  mergeSort(0, arr.length - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    currentLine: -1,
    explanation: 'Merge Sort completed!'
  });

  return steps;
};

export const getInsertionSortSteps = (array) => {
  const steps = [];
  const arr = [...array];

  steps.push({
    array: [...arr],
    comparing: [],
    explanation: 'Starting Insertion Sort algorithm'
  });

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      comparing: [i],
      explanation: `Selected ${key} as key element`
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        explanation: `Comparing ${arr[j]} with ${key}`
      });

      arr[j + 1] = arr[j];
      j--;

      steps.push({
        array: [...arr],
        comparing: [j + 1],
        explanation: `Shifted ${arr[j + 1]} to the right`
      });
    }

    arr[j + 1] = key;
    steps.push({
      array: [...arr],
      comparing: [j + 1],
      explanation: `Placed ${key} in its correct position`
    });
  }

  steps.push({
    array: [...arr],
    comparing: [],
    explanation: 'Insertion Sort completed!'
  });

  return steps;
};

export const getSelectionSortSteps = (array) => {
  const steps = [];
  const arr = [...array];

  steps.push({
    array: [...arr],
    comparing: [],
    explanation: 'Starting Selection Sort algorithm'
  });

  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;

    steps.push({
      array: [...arr],
      comparing: [i],
      explanation: `Looking for smallest element starting from index ${i}`
    });

    for (let j = i + 1; j < arr.length; j++) {
      steps.push({
        array: [...arr],
        comparing: [minIdx, j],
        explanation: `Comparing ${arr[minIdx]} with ${arr[j]}`
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...arr],
          comparing: [minIdx],
          explanation: `Found new minimum: ${arr[minIdx]}`
        });
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        array: [...arr],
        comparing: [i, minIdx],
        explanation: `Swapped ${arr[i]} with ${arr[minIdx]}`,
        swapped: true
      });
    }
  }

  steps.push({
    array: [...arr],
    comparing: [],
    explanation: 'Selection Sort completed!'
  });

  return steps;
};