func intToRoman(num int) string {
	thousands := []string{"", "M", "MM", "MMM"}
	hundreds := []string{"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"}
	tens := []string{"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"}
	ones := []string{"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"}

  t := thousands[num / 1000]
  h := hundreds[num % 1000 / 100]
  ten := tens[num % 100 / 10]
  o := ones[num % 10]

	return t + h + ten + o
}