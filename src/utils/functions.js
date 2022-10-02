function findBoughtItem(list, target) {
  let counter = 0;

  for (let item of list) {
    if (item.name === target) {
      return counter;
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

export { findBoughtItem, calculateRewards, distributeResults };