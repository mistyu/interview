// 只能倒出水和倒入水 因此 a * jug1Capacity + b * jug2Capacity = targetCapacity  (a, b 为正整数)
function canMeasureWater (jug1Capacity, jug2Capacity, targetCapacity) {
  if (jug1Capacity + jug2Capacity < targetCapacity) return false
  // 获取 (jug1Capacity, jug2Capacity) 的最大公约数
  const getMeasure = (jug1Capacity, jug2Capacity) => {
      if (jug2Capacity === 0) return jug1Capacity
      return getMeasure(jug2Capacity, jug1Capacity % jug2Capacity)
  }

  return targetCapacity % getMeasure(jug1Capacity, jug2Capacity) === 0
}
