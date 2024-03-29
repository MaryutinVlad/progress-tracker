function findBoughtItem(list, target, prop) {
  let counter = 0;
  for (let item of list) {
    if (item[prop] === target) {
      return { index: counter, item };
    }
    counter++;
  }
}

function calculateRewards(values, targetProp) {

  let reward = 0;

  for (let [key, value] of Object.entries(values)) {
    reward += value[targetProp];
  }

  return reward;
}

function distributeResults(provider, consumer) {
  
  for (let i = 0; i < provider.length; i ++) {
    for (let j = 0; j < consumer.length; j ++ ) {
      if (provider[i].name === consumer[j].name) {
        consumer[j] = provider[i];
      }
    }
  }

  return consumer;
}

function calculatePercentage(minor, major) {
  return Math.round((minor / major) * 100)
}

export { findBoughtItem, calculateRewards, distributeResults, calculatePercentage };