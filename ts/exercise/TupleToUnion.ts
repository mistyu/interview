type TupleToUnion<T extends ArrayLike<any>> = 
  T extends ArrayLike<infer U> 
    ? U
    : never

let a : TupleToUnion<[0, 1, 2, 3, 4]>
