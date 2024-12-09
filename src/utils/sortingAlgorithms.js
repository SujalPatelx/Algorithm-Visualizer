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

  const partition = (low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...arr],
      comparing: [high],
      currentLine: 2
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, high],
        currentLine: 4
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          array: [...arr],
          comparing: [i, j],
          currentLine: 7
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      array: [...arr],
      comparing: [i + 1, high],
      currentLine: 10
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

  steps.push({
    array: [...arr],
    comparing: [],
    currentLine: 0
  });

  quickSort(0, arr.length - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    currentLine: -1
  });

  return steps;
};

export const getMergeSortSteps = (array) => {
  const steps = [];
  const arr = [...array];

  const merge = (left, mid, right) => {
    const temp = [];
    let i = left;
    let j = mid + 1;
    
    while (i <= mid && j <= right) {
      steps.push({
        array: [...arr],
        comparing: [i, j],
        currentLine: 4
      });

      if (arr[i] <= arr[j]) {
        temp.push(arr[i++]);
      } else {
        temp.push(arr[j++]);
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
        currentLine: 7
      });
    }
  };

  const mergeSort = (left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSort(left, mid);
      mergeSort(mid + 1, right);
      merge(left, mid, right);
    }
  };

  steps.push({
    array: [...arr],
    comparing: [],
    currentLine: 0
  });

  mergeSort(0, arr.length - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    currentLine: -1
  });

  return steps;
};