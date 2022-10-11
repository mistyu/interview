func romanToInt(s string) int {
	symbolValues  := map[byte]int{
		'I': 1,
		'V': 5,
		'X': 10,
		'L': 50,
		'C': 100,
		'D': 500,
		'M': 1000
	}
	res := 0
	lenth := len(s)
	for i := range s {
		value := symbolValues[s[i]]
		if i < lenth - 1 && symbolValues[s[i+1]] > value {
			res -= value
		} else {
			res += value
		}
	}

	return res
}
